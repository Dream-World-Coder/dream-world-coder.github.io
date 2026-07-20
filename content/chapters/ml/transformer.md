<!--metadata
  title: "Transformer"
  authors: ["Subhajit Gorai"]
  dateCreated: "20/07/2026"
  dateEdited: "20/07/2026"
  description: ""
  tags: [""]
-->

# The Transformer Architecture: Encoder–Decoder Mechanisms

## Preface

The Transformer, introduced by Vaswani et al. (2017), replaced recurrence and convolution with a purely attention-based mechanism for sequence transduction. Its significance is not merely empirical (parallelizability, superior long-range dependency modeling) but architectural: it recasts sequence modeling as a problem of learned, content-addressable routing between positions, expressed entirely as compositions of matrix multiplications, softmax normalizations, and pointwise nonlinearities.

This treatise is written for a reader who already possesses fluency in linear algebra, multivariable calculus, and the standard vocabulary of deep learning (gradients, backpropagation, normalization layers, embeddings). The goal is not to motivate *why* attention is useful — that is assumed — but to establish the architecture with textbook-grade rigor: precise definitions, explicit tensor-dimension bookkeeping at every transformation, and a direct correspondence between the mathematics and a working PyTorch implementation.

Four parts follow. Part 1 establishes the atomic operation — Scaled Dot-Product Attention — and its generalization to Multi-Head Attention. Part 2 assembles the Encoder from residual sub-layers. Part 3 assembles the Decoder, introducing causal masking and cross-attention as the mechanism by which decoder states query encoder memory. Part 4 places a complete, minimal PyTorch implementation into correspondence with the preceding mathematics, block by block.

---

## Table of Contents

- Conventions and Notation 
- Part 1 — The Core Mechanism: Scaled Dot-Product & Multi-Head Attention 
  - 1.1 Scaled Dot-Product Attention 
  - 1.2 Derivation of the Scaling Factor 
  - 1.3 Multi-Head Attention 
- Part 2 — The Encoder Architecture 
  - 2.1 Sub-layer 1: Multi-Head Self-Attention 
  - 2.2 Residual Connections and Layer Normalization 
  - 2.3 Sub-layer 2: Position-wise Feed-Forward Networks 
  - 2.4 Positional Encoding 
  - 2.5 The Full Encoder Stack 
- Part 3 — The Decoder Architecture & The Interaction Layer 
  - 3.1 Masked Multi-Head Self-Attention 
  - 3.2 Encoder–Decoder Cross-Attention 
  - 3.3 The Full Decoder Stack 
  - 3.4 Linear and Softmax Projection Layer 
- Part 4 — Minimal, Functional PyTorch Implementation 
- References and Reading Notes 

---

## Conventions and Notation

| Symbol | Meaning |
|---|---|
| $B$ | batch size |
| $S$ | source sequence length (encoder) |
| $T$ | target sequence length (decoder), or generic sequence length when unambiguous |
| $D$ | model dimension, $d_{\text{model}}$ |
| $H$ | number of attention heads |
| $d_k$ | per-head key/query dimension, $d_k = D / H$ |
| $d_v$ | per-head value dimension (in this treatise $d_v = d_k$) |
| $d_{ff}$ | inner dimension of the position-wise feed-forward network |
| $\mathbf{X} \in \mathbb{R}^{T \times D}$ | a single-sequence matrix of $D$-dimensional row vectors, one per position |
| $\mathbf{Q}, \mathbf{K}, \mathbf{V}$ | query, key, value matrices |
| $W_Q, W_K, W_V \in \mathbb{R}^{D \times D}$ | learned right-multiplying projections producing $Q, K, V$ in the mathematical convention |
| $W_O \in \mathbb{R}^{D \times D}$ | learned output projection recombining attention heads |
| $\odot$ | elementwise (Hadamard) product |
| $[\,\cdot\,]$ | tensor shape annotation, e.g. $[B, T, D]$ |

Throughout, tensors carry an explicit leading batch dimension $B$ in the implementation, but the *mathematical* definitions in Parts 1–3 are stated for a single sequence (batch size elided) unless batching materially changes the operation (as with masking). Where code and mathematics are cross-referenced, both conventions are shown side by side so the correspondence is unambiguous.

**Row-vector and PyTorch convention.** The mathematics below represents a token as a row vector and therefore writes a learned map as $XW+b$. By contrast, `nn.Linear(in_features, out_features)` stores `weight` with shape `[out_features, in_features]` and computes $XW_{\text{torch}}^\top+b$. Thus `self.W_q(query)` is precisely $Q=\text{query}\,W_Q+b_Q$ if $W_Q=W_{\text{torch},q}^{\top}$. This is a notational transpose only; no runtime transpose of the activation is performed. The implementation assumes $D$ is even (as in the original $D=512$) so sinusoidal dimensions can be paired, and asserts $H\mid D$ so $d_k=D/H$ is integral.

---

## Part 1 — The Core Mechanism: Scaled Dot-Product & Multi-Head Attention

### 1.1 Scaled Dot-Product Attention

**Definition (Scaled Dot-Product Attention).**
Let $Q \in \mathbb{R}^{T_q \times d_k}$, $K \in \mathbb{R}^{T_k \times d_k}$, $V \in \mathbb{R}^{T_k \times d_v}$ be query, key, and value matrices, where $T_q$ is the number of query positions and $T_k$ is the number of key/value positions. Attention is defined as

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V \tag{1.1}
$$

where $\text{softmax}(\cdot)$ is applied row-wise over the last axis (the key axis, of size $T_k$), following Vaswani et al. (2017), Section 3.2.1.

**Structural Walkthrough.**
Decompose the computation into three stages:

1. **Compatibility scoring.** $S = QK^\top \in \mathbb{R}^{T_q \times T_k}$. Entry $S_{ij} = q_i \cdot k_j$ measures the (unnormalized) affinity between query position $i$ and key position $j$ as an inner product in $\mathbb{R}^{d_k}$.
2. **Scaling and normalization.** $A = \text{softmax}\!\left(S / \sqrt{d_k}\right) \in \mathbb{R}^{T_q \times T_k}$, a row-stochastic matrix: each row $A_{i,:}$ sums to 1 and defines a categorical distribution over key positions, conditioned on query $i$.
3. **Aggregation.** $\text{Attention}(Q,K,V) = AV \in \mathbb{R}^{T_q \times d_v}$. With no attention dropout (in particular, at evaluation), row $i$ is a convex combination $\sum_j A_{ij}v_j$ of the values. The reference code applies dropout *after* softmax during training; PyTorch then zeroes and rescales selected weights, so the sampled row need not sum to one. The deterministic, pre-dropout $A$ remains the probability distribution and the appropriate object for the convex-combination interpretation.

An optional additive mask $M \in \{0,1\}^{T_q \times T_k}$ (or, in the batched case, broadcastable to $[B, 1, T_q, T_k]$) may be applied before the softmax:

$$
S' = S / \sqrt{d_k} + (1 - M) \cdot (-\infty) \tag{1.2}
$$

which forces $A_{ij} \to 0$ for masked pairs, since $\lim_{x \to -\infty} e^x = 0$. Masking is central to Part 3.

### 1.2 Derivation of the Scaling Factor $1/\sqrt{d_k}$

**Claim.** If the components of $q, k \in \mathbb{R}^{d_k}$ are i.i.d. random variables with mean $0$ and variance $1$, then $\text{Var}(q \cdot k) = d_k$, and the scaling factor $1/\sqrt{d_k}$ restores unit variance to the dot product.

**Derivation.** Write $q \cdot k = \sum_{i=1}^{d_k} q_i k_i$. Since $q_i, k_i$ are independent of each other and mutually independent across $i$, with $\mathbb{E}[q_i] = \mathbb{E}[k_i] = 0$ and $\text{Var}(q_i) = \text{Var}(k_i) = 1$:

$$
\mathbb{E}[q_i k_i] = \mathbb{E}[q_i]\,\mathbb{E}[k_i] = 0
$$

$$
\text{Var}(q_i k_i) = \mathbb{E}[q_i^2 k_i^2] - (\mathbb{E}[q_i k_i])^2 = \mathbb{E}[q_i^2]\,\mathbb{E}[k_i^2] - 0 = 1 \cdot 1 = 1
$$

By linearity of variance under independence,

$$
\text{Var}\!\left(\sum_{i=1}^{d_k} q_i k_i \right) = \sum_{i=1}^{d_k} \text{Var}(q_i k_i) = d_k \tag{1.3}
$$

Hence $\text{Std}(q \cdot k) = \sqrt{d_k}$, and $q \cdot k$ grows in magnitude as $d_k$ increases, even though each term $q_ik_i$ has fixed unit variance. Dividing by $\sqrt{d_k}$,

$$
\text{Var}\!\left(\frac{q \cdot k}{\sqrt{d_k}}\right) = \frac{1}{d_k}\cdot d_k = 1 \tag{1.4}
$$

restores the pre-softmax logits to unit variance regardless of $d_k$.

**Why this matters (complete softmax-gradient argument).** Fix one query and write its unscaled logits as $z\in\mathbb{R}^{T_k}$ and its softmax probabilities as

$$
p_i = \operatorname{softmax}(z)_i = \frac{e^{z_i}}{\sum_{r=1}^{T_k}e^{z_r}}. \tag{1.5}
$$

Differentiating the quotient with respect to $z_j$ gives

$$
\frac{\partial p_i}{\partial z_j}
= \frac{e^{z_i}\delta_{ij}\sum_r e^{z_r}-e^{z_i}e^{z_j}}
       {\left(\sum_r e^{z_r}\right)^2}
=p_i(\delta_{ij}-p_j). \tag{1.6}
$$

Thus the Jacobian is $J_{\mathrm{sm}}(z)=\operatorname{diag}(p)-pp^\top$. In particular,

$$
\frac{\partial p_i}{\partial z_i}=p_i(1-p_i),
\qquad
\frac{\partial p_i}{\partial z_j}=-p_ip_j\quad(i\ne j). \tag{1.7}
$$

Suppose a single logit wins by a margin $\Delta>0$: $z_m-z_j\ge\Delta$ for every $j\ne m$. Then

$$
1-p_m
=\frac{\sum_{j\ne m}e^{z_j-z_m}}{1+\sum_{j\ne m}e^{z_j-z_m}}
\le (T_k-1)e^{-\Delta},
$$

and hence $0\le \partial p_m/\partial z_m=p_m(1-p_m)\le (T_k-1)e^{-\Delta}$. For $i\ne m$, $p_i\le e^{-\Delta}$, so every diagonal and off-diagonal derivative in (1.7) is $O(e^{-\Delta})$. The Jacobian therefore becomes exponentially close to zero when the distribution is nearly one-hot. This is the precise sense in which softmax is *saturated*; it is the separation between logits, not merely their common additive offset, that destroys sensitivity.

For independent unit-variance components, Eq. (1.3) says an unscaled score has standard deviation $\sqrt{d_k}$. If two representative scores differ by a constant number of standard deviations, their typical gap is $\Delta=\Theta(\sqrt{d_k})$, and the preceding bound makes gradients $O(\exp[-\Theta(\sqrt{d_k})])$. Scaling uses $\tilde z=z/\sqrt{d_k}$, so $\operatorname{Var}(\tilde z_i)=1$ by Eq. (1.4), preventing the *initial* score scale from increasing with head width. The scale cannot guarantee nonsaturation after learning, but it removes the systematic $d_k$-dependent cause. This formalizes the motivation stated by Vaswani et al. (2017, §3.2.1).

For back-propagation, if $g=\partial\mathcal L/\partial p$, then $\partial\mathcal L/\partial z=J_{\mathrm{sm}}(z)^\top g$. Saturation consequently attenuates all learning signals entering the query and key projections. With scaled logits $\tilde z=z/\sqrt{d_k}$, the chain rule also gives $\partial\mathcal L/\partial z=(1/\sqrt{d_k})J_{\mathrm{sm}}(\tilde z)^\top g$; the explicit factor is benign because the Jacobian is no longer exponentially collapsed solely as $d_k$ grows.

**Implementation Note.** In the accompanying code, `ScaledDotProductAttention.forward` computes exactly $S = QK^\top$ via `torch.matmul(Q, K_t)`, divides by `math.sqrt(d_k)` (where `d_k = Q.size(-1)`), applies the mask via `masked_fill`, and finally applies `F.softmax(scores, dim=-1)` — normalizing over the last axis, which is precisely the key axis $T_k$, matching Equation (1.1).

### 1.3 Multi-Head Attention

Single-head attention computes one attention distribution per query, averaging value vectors along a single subspace. Multi-Head Attention (MHA) instead projects $Q, K, V$ into $H$ distinct learned subspaces, applies Scaled Dot-Product Attention independently ("in parallel") within each, and recombines the results.

**Definition (Multi-Head Attention).** Given input matrices $Q, K, V \in \mathbb{R}^{T \times D}$ (query/key/value length may differ; here presented with matched $T$ for notational economy), and per-head projections $W_i^Q, W_i^K \in \mathbb{R}^{D \times d_k}$, $W_i^V \in \mathbb{R}^{D \times d_v}$ for $i = 1, \dots, H$:

$$
\text{head}_i = \text{Attention}(QW_i^Q,\ KW_i^K,\ VW_i^V) \tag{1.8}
$$

$$
\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1, \dots, \text{head}_H)\,W^O \tag{1.9}
$$

where $W^O \in \mathbb{R}^{Hd_v \times D}$ and, per Vaswani et al. (2017, §3.2.2), $d_k = d_v = D/H$, so that $Hd_v = D$ and the concatenated heads occupy the same dimensionality as the original model space.

**Mathematical Transformation — dimension tracking (single sequence, no batch):**

$$
Q, K, V \in \mathbb{R}^{T \times D} \xrightarrow{\ \times W_i^{Q,K,V}\ } q_i, k_i, v_i \in \mathbb{R}^{T \times d_k}
\xrightarrow{\ \text{Attn}\ } \text{head}_i \in \mathbb{R}^{T \times d_k}
$$
$$
\text{Concat}_{i=1}^{H}(\text{head}_i) \in \mathbb{R}^{T \times D} \xrightarrow{\ \times W^O\ } \text{MultiHead}(Q,K,V) \in \mathbb{R}^{T \times D}
$$

**Implementation Note — the batched, "combined-then-split" formulation.** Rather than instantiating $H$ separate small projection matrices $W_i^{Q,K,V}$, the implementation uses one full-width map $W_Q=[W_1^Q\mid\cdots\mid W_H^Q]\in\mathbb{R}^{D\times D}$ (and analogously for $K,V$). It is a *horizontal concatenation* of the head-specific matrices, not a block-diagonal restriction: every head may use every input feature. Reshaping merely exposes the contiguous $d_k$ output-coordinate block belonging to each head. This is exactly equivalent to Equations (1.8)–(1.9).

With batch dimension $B$ restored, the tensor-dimension trace through `MultiHeadAttention.forward` is:

$$
\begin{aligned}
\text{query} &: [B, T_q, D] &\xrightarrow{W_Q} \quad Q &: [B, T_q, D] \\
\text{key} &: [B, T_k, D] &\xrightarrow{W_K} \quad K &: [B, T_k, D] \\
\text{value} &: [B, T_k, D] &\xrightarrow{W_V} \quad V &: [B, T_k, D]
\end{aligned}
$$

**split heads** — `view(B, T, H, d_k)` then `transpose(1, 2)`:

$$
[B, T, D] \;\to\; [B, T, H, d_k] \;\to\; [B, H, T, d_k]
$$

**scaled dot-product attention per head** (Part 1.1, batched over $B$ and $H$ simultaneously):

$$
[B, H, T_q, d_k],\ [B, H, T_k, d_k],\ [B, H, T_k, d_k] \;\to\; \text{context} : [B, H, T_q, d_k]
$$

**merge heads** — `transpose(1, 2)` then `contiguous().view(B, T_q, H \cdot d_k)`:

$$
[B, H, T_q, d_k] \;\to\; [B, T_q, H, d_k] \;\to\; [B, T_q, D]
$$

**output projection** $W_O$:

$$
[B, T_q, D] \xrightarrow{W_O} [B, T_q, D]
$$

This final shape is identical to the input query shape, which is precisely what permits attention sub-layers to be embedded inside a residual block (Part 2.2).

**Why multiple heads?** A single head emits one attention distribution and one value mixture per query. $H$ independently parameterized projections give the model multiple compatibility functions and value spaces at the same position; they can therefore represent distinct relationships simultaneously rather than forcing every relation through one score matrix. The useful intuition in Alammar's exposition is that different learned projections can focus on different positions and representation subspaces, while the original paper reports qualitative evidence that heads learn different attentional behavior. These are descriptive intuitions, not a guarantee that every trained head has a clean linguistic role: heads can be redundant, and the final $W_O$ mixes them again.

---

## Part 2 — The Encoder Architecture

**Definition (Encoder Stack).** The encoder is a stack of $N$ identical layers, each layer composed of exactly two sub-layers: multi-head self-attention followed by a position-wise feed-forward network, each wrapped in a residual connection and layer normalization. Given a source sequence embedded and positionally encoded into $X^{(0)} \in \mathbb{R}^{S \times D}$, the encoder computes:

$$
X^{(\ell)} = \text{EncoderLayer}_\ell(X^{(\ell-1)}), \qquad \ell = 1, \dots, N
$$

with the final encoder output (the "memory," consumed by cross-attention in the decoder) being $\text{Memory} = X^{(N)} \in \mathbb{R}^{S \times D}$.

### 2.1 Sub-layer 1: Multi-Head Self-Attention

In *self*-attention, the same tensor serves as query, key, and value:

$$
\text{SelfAttn}(X) = \text{MultiHead}(X, X, X) \tag{2.1}
$$

Every encoder position attends to every other encoder position (subject only to a padding mask, never a causal mask — the encoder has full bidirectional visibility, in contrast to the decoder of Part 3). Each row $x_i$ of $X$ is thereby recontextualized as a learned mixture of all $x_j$, $j = 1, \dots, S$, weighted by learned content-based compatibility.

**Implementation Note.** In `TransformerEncoderLayer.forward`, this is `self.self_attn(x, x, x, src_mask)`, where `src_mask` (shape $[B,1,1,S]$, from `make_src_mask`) masks out padding positions only — it broadcasts over both the head axis $H$ and the query-position axis $T_q$, since padding validity does not depend on the querying position.

### 2.2 Residual Connections and Layer Normalization

**Definition (Residual Sub-layer).** Following He et al.'s residual formulation as adapted by Vaswani et al. (2017, §3.1), each sub-layer $\text{SubLayer}(\cdot)$ (self-attention or FFN) is wrapped as:

$$
\text{Output} = \text{LayerNorm}\big(X + \text{Dropout}(\text{SubLayer}(X))\big) \tag{2.2}
$$

This is the **Post-LN** convention used by the original paper and by the accompanying code: normalization is applied *after* the residual sum. The alternative, **Pre-LN**, normalizes the sub-layer's input before it is transformed:

$$
\text{Output}_{\text{Pre-LN}} = X + \text{Dropout}\big(\text{SubLayer}(\text{LayerNorm}(X))\big) \tag{2.3}
$$

**Structural Walkthrough — Post-LN vs. Pre-LN.**

| Property | Post-LN (2.2) | Pre-LN (2.3) |
|---|---|---|
| Normalization placement | after residual addition | before sub-layer input |
| Residual stream | normalized at every layer boundary; bounded but partially attenuated | unnormalized, additive accumulation across all $N$ layers |
| Gradient at initialization | can vanish/explode in deep stacks without warmup | more stable; identity-like path from output to any layer's input |
| Training stability | typically requires learning-rate warmup (as used in the original Transformer) | more robust to omitting warmup, common in later large-scale variants |
| Fidelity to Vaswani et al. (2017) | exact match | a widely-adopted post-publication modification |

**Mathematical intuition.** Under Post-LN, the identity path $X \to X$ is not preserved verbatim into the next layer because $\text{LayerNorm}$ is applied to $X + \text{SubLayer}(X)$ as a whole, which can distort gradient magnitude as depth $N$ grows — layer normalization renormalizes the *combined* signal, so the residual's variance-stabilizing benefit is only partial. Under Pre-LN, the sum $X + \text{Dropout}(\text{SubLayer}(\text{LayerNorm}(X)))$ preserves $X$ exactly as an additive term untouched by normalization, giving $\partial \text{Output}/\partial X$ a term that is exactly the identity matrix $I_D$ plus a Jacobian contribution from the sub-layer — a cleaner path for gradient backpropagation through many stacked layers.

**Implementation Note.** The provided code implements Post-LN exactly as in Equation (2.2):
```python
attn_out, _ = self.self_attn(x, x, x, src_mask)
x = self.norm1(x + self.dropout1(attn_out))
```
Observe the order of operations: `dropout` → `+ x` (residual) → `norm1`. This is Post-LN, matching Vaswani et al. (2017) precisely, and identically structured for the second sub-layer:
```python
ffn_out = self.ffn(x)
x = self.norm2(x + self.dropout2(ffn_out))
```

**Code–mathematics alignment.** `self.self_attn(x,x,x,src_mask)` is Eq. (2.1) and returns a residual-compatible tensor $[B,S,D]$; the mask affects attention logits, not tensor rank. `dropout1(attn_out)` is added to the unchanged residual stream `x`, and `norm1` then applies LayerNorm along the final $D$ coordinates, exactly realizing Eq. (2.2). The next two lines repeat the same Post-LN composition with the position-wise map of Eq. (2.4). No operation in either residual branch changes $S$ or $D$.

### 2.3 Sub-layer 2: Position-wise Feed-Forward Networks

**Definition (Position-wise FFN).** Applied identically and independently to each position $i \in \{1, \dots, T\}$ (hence "position-wise" — no mixing across the sequence axis occurs within this sub-layer):

$$
\text{FFN}(x) = \max(0,\, xW_1 + b_1)\,W_2 + b_2 \tag{2.4}
$$

with $W_1 \in \mathbb{R}^{D \times d_{ff}}$, $W_2 \in \mathbb{R}^{d_{ff} \times D}$, and $d_{ff} \gg D$ (Vaswani et al. use $d_{ff} = 2048$ against $D = 512$, a ratio of 4).

**Mathematical Transformation — dimension tracking:**

$$
X \in \mathbb{R}^{T \times D} \xrightarrow{\,xW_1 + b_1\,} \mathbb{R}^{T \times d_{ff}} \xrightarrow{\,\text{ReLU}\,} \mathbb{R}^{T \times d_{ff}} \xrightarrow{\,\cdot W_2 + b_2\,} \mathbb{R}^{T \times D}
$$

**Structural Walkthrough.** Equation (2.4) can equivalently be read as two pointwise (position-wise) $1\times1$ convolutions with a ReLU nonlinearity between them — a per-token 2-layer MLP applied with *shared* weights across all $T$ positions. Where the self-attention sub-layer performs cross-position mixing (information exchange across positions), the FFN sub-layer performs purely local, per-position nonlinear feature transformation, expanding into a higher-dimensional space $d_{ff}$ and projecting back to $D$. The two sub-layers are thus complementary: attention routes information *between* positions, FFN transforms information *at* each position independently.

**Implementation Note.** `PositionwiseFeedForward.forward` implements Equation (2.4) exactly: `linear1` ($W_1, b_1$) expands $[B,T,D] \to [B,T,d_{ff}]$, `F.relu` applies the nonlinearity, `dropout` regularizes the hidden activation, and `linear2` ($W_2, b_2$) projects back to $[B,T,D]$.

### 2.4 Positional Encoding

Because self-attention (Eq. 1.1) is permutation-equivariant — it contains no operation sensitive to the ordering of rows in $Q, K, V$ — the model has no intrinsic notion of sequence order. Positional information must be injected explicitly.

**Definition (Sinusoidal Positional Encoding).** For position $pos \in \{0, \dots, T-1\}$ and dimension index $i \in \{0, \dots, D/2 - 1\}$, Vaswani et al. (2017, §3.5) define:

$$
PE_{(pos,\, 2i)} = \sin\!\left(\frac{pos}{10000^{2i/D}}\right) \tag{2.5}
$$

$$
PE_{(pos,\, 2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/D}}\right) \tag{2.6}
$$

Token embeddings are combined with positional encodings additively (not concatenated):

$$
X^{(0)} = \text{Embed}(x) \cdot \sqrt{D} + PE \tag{2.7}
$$

where the $\sqrt{D}$ embedding scaling (also specified in §3.4 of the paper) equalizes the relative magnitude of the (typically variance-normalized) embedding vectors against the fixed-magnitude positional encodings, which lie in $[-1, 1]$ by construction.

**Mathematical Transformation — the geometric argument for relative-position linearity.** A key property motivating the sinusoidal form is that, for any fixed offset $k$, $PE_{pos+k}$ is expressible as a *linear function* of $PE_{pos}$. This follows from the angle-addition identities:

$$
\sin(pos + k)\omega = \sin(pos\cdot\omega)\cos(k\omega) + \cos(pos\cdot\omega)\sin(k\omega)
$$
$$
\cos(pos + k)\omega = \cos(pos\cdot\omega)\cos(k\omega) - \sin(pos\cdot\omega)\sin(k\omega)
$$

where $\omega = 1/10000^{2i/D}$ is the fixed angular frequency of dimension pair $i$. Because $\cos(k\omega)$ and $\sin(k\omega)$ are constants once $k$ is fixed, the pair $(PE_{(pos+k, 2i)}, PE_{(pos+k, 2i+1)})$ is obtained from $(PE_{(pos, 2i)}, PE_{(pos, 2i+1)})$ by a fixed $2\times2$ rotation matrix

$$
\begin{pmatrix} PE_{(pos+k,2i)} \\ PE_{(pos+k,2i+1)} \end{pmatrix}
=
\begin{pmatrix} \cos(k\omega) & \sin(k\omega) \\ -\sin(k\omega) & \cos(k\omega) \end{pmatrix}
\begin{pmatrix} PE_{(pos,2i)} \\ PE_{(pos,2i+1)} \end{pmatrix} \tag{2.8}
$$

independent of $pos$ itself. Vaswani et al. (2017, §3.5) conjecture this property "would allow the model to easily learn to attend by relative positions," since a linear (position-independent) transformation of query or key vectors could, in principle, be learned to encode relative offset directly into the dot-product compatibility score of Equation (1.1).

**Implementation Note.** `PositionalEncoding.__init__` precomputes a buffer `pe` of shape $[1, \text{max\_len}, D]$ via `torch.arange` for position indices and an exponentiated `div_term` implementing $10000^{-2i/D} = \exp\!\big(2i \cdot (-\log 10000 / D)\big)$ — an exact match to the exponent structure of Equations (2.5)–(2.6), computed in log-space for numerical stability. `pe[:, 0::2]` and `pe[:, 1::2]` fill even and odd dimension slots with $\sin$ and $\cos$ respectively. In `forward`, `x + self.pe[:, :T, :]` implements the additive combination of Equation (2.7) (with the $\sqrt{D}$ scaling applied earlier, in `Encoder.forward`, via `self.embed(src) * math.sqrt(self.d_model)`), and the result is broadcast over the batch dimension $B$ since `pe` carries a singleton leading axis.

### 2.5 The Full Encoder Stack

**Structural Block Diagram — one Encoder layer:**
![i#w.400](/images/transformer/d1.png)

**Structural Block Diagram — the full Encoder ($N$ layers):**
![i#w.400](/images/transformer/d2.png)

**Implementation Note.** This diagram corresponds exactly to `Encoder.forward`: embedding lookup and scaling, positional encoding addition (with dropout, folded into `PositionalEncoding`), an `nn.ModuleList` of `N` = `n_layers` stacked `TransformerEncoderLayer` instances applied sequentially, and a final `self.norm(x)` — an additional normalization applied to the output of the entire stack, standard in implementations though not always drawn as a distinct step in illustrative diagrams of the original paper.

---

## Part 3 — The Decoder Architecture & The Interaction Layer

**Definition (Decoder Stack).** The decoder is a stack of $N$ identical layers, each composed of *three* sub-layers (one more than the encoder): masked multi-head self-attention, encoder–decoder cross-attention, and a position-wise feed-forward network — each again wrapped in a residual connection and Post-LN, exactly as in Equation (2.2).

### 3.1 Masked Multi-Head Self-Attention

The decoder must remain **autoregressive**. Let the desired targets be $(y_1,\ldots,y_T)$ and feed the shifted-right sequence $u_1=\langle\mathrm{BOS}\rangle$, $u_t=y_{t-1}$ for $t\ge2$. Training minimizes

$$
\mathcal L(\theta)=-\sum_{t=1}^{T}\log p_\theta(y_t\mid u_{1:T},x). \tag{3.1}
$$

At inference, only $u_{1:t}$ exists when predicting $y_t$. Without a causal mask, the hidden state at position $t$ can attend to position $t+1$, whose input is exactly $u_{t+1}=y_t$ under teacher forcing. The conditional optimized in training then depends on the answer it is scored against, whereas the conditional available at inference does not. This is target leakage, not merely a regularization concern. Causality enforces

$$
p_\theta(y_{1:T}\mid x)=\prod_{t=1}^{T}p_\theta(y_t\mid y_{<t},x), \tag{3.2}
$$

while still allowing all positions to be computed in parallel during training. It is mathematically mandatory for a decoder trained with shifted teacher forcing to represent the same conditional distribution that it will use during generation.

**Definition (Causal / Look-Ahead Mask).** Define $M \in \{0,1\}^{T \times T}$ as the lower-triangular matrix:

$$
M_{ij} = \begin{cases} 1 & j \le i \\ 0 & j > i \end{cases} \tag{3.3}
$$

so that query position $i$ is permitted to attend only to key positions $j \le i$. Combined with Equation (1.2), the masked self-attention logits become:

$$
S'_{ij} = \frac{q_i \cdot k_j}{\sqrt{d_k}} + \begin{cases} 0 & j \le i \\ -\infty & j > i \end{cases} \tag{3.4}
$$

so that after $\text{softmax}$, $A_{ij} = 0$ exactly for all $j > i$ — future positions receive zero attention weight and thus contribute nothing to $\text{Attention}(Q,K,V)_i$.

**Structural Walkthrough — combining causal and padding masks.** In the batched setting, the decoder must respect *both* the causal constraint (Eq. 3.3) and any padding mask for variable-length sequences within a batch. The combined mask is the elementwise logical AND:

$$
\text{tgt\_mask} = \text{pad\_mask} \,\wedge\, \text{causal\_mask}. \tag{3.5}
$$

**Implementation Note.** `Transformer.make_tgt_mask` constructs exactly this composite: `pad_mask` has shape $[B,1,1,T]$ (identical in structure to the encoder's `src_mask`), `causal_mask = torch.tril(torch.ones((T,T)))` produces the lower-triangular matrix of Equation (3.3) with shape $[T,T]$, reshaped to $[1,1,T,T]$, and the two are combined via `&` with broadcasting to produce `tgt_mask` of shape $[B,1,T,T]$ — note this differs from the encoder's mask shape $[B,1,1,S]$ precisely because causal masking is *query-position-dependent* (each query position $i$ sees a different set of valid keys), whereas padding masking alone is not. Every query row must retain at least one valid key (the diagonal for ordinary, non-padding target tokens); applying softmax to an all-$-\infty$ row is undefined and yields `NaN`.

### 3.2 Encoder–Decoder Cross-Attention

Cross-attention is the mechanism by which decoder representations are informed by the source sequence. It is structurally identical to Scaled Dot-Product / Multi-Head Attention (Part 1), but with **queries drawn from the decoder** and **keys/values drawn from the encoder's output memory**:

$$
\text{CrossAttn}(X_{\text{dec}}, \text{Memory}) = \text{MultiHead}(\underbrace{X_{\text{dec}}}_{\text{query}},\ \underbrace{\text{Memory}}_{\text{key}},\ \underbrace{\text{Memory}}_{\text{value}}) \tag{3.6}
$$

**Mathematical Transformation — dimension tracking.** Query length $T$ (decoder) and key/value length $S$ (encoder) may differ, since source and target sequences are generally of unequal length:

$$
X_{\text{dec}} : [B, T, D] \quad\ \text{Memory} : [B, S, D]
$$
$$
Q = X_{\text{dec}}W_Q : [B,T,D] \qquad K = \text{Memory}\,W_K : [B,S,D] \qquad V = \text{Memory}\,W_V : [B,S,D]
$$
$$
QK^\top : [B,H,T,d_k] \times [B,H,d_k,S] \to [B,H,T,S]
$$
$$
\text{softmax}(\cdot)V : [B,H,T,S] \times [B,H,S,d_k] \to [B,H,T,d_k] \to \text{(merge heads)} \to [B,T,D]
$$

The masking applied here (`memory_mask`, structurally identical to `src_mask`, shape $[B,1,1,S]$) masks only source-side padding — there is no causal constraint on cross-attention, since the entire encoder memory is legitimately visible regardless of target position (the encoder was never autoregressive to begin with).

**Structural Walkthrough — interpretation.** Cross-attention is a differentiable **soft key–value lookup**. The decoder produces a query $q_i$, each source-memory position exposes an address $k_j$ and payload $v_j$, and

$$
c_i=\sum_{j=1}^{S}\underbrace{\frac{\exp(q_i\cdot k_j/\sqrt{d_k})}{\sum_{r=1}^{S}\exp(q_i\cdot k_r/\sqrt{d_k})}}_{A_{ij}}v_j. \tag{3.7}
$$

The lookup is *content-addressed* because compatibility is learned from $q_i$ and $k_j$, and *soft* because it returns a differentiable weighted mixture instead of discretely selecting one address. A gradient can adjust both the content stored in a value and the query/key geometry that chooses it. Alammar's practical description—decoder attention helps focus on relevant input positions—matches this equation exactly. It is an intuition, not a claim that $A_{ij}$ is always a human-interpretable word alignment.

### 3.3 The Full Decoder Stack

**Structural Block Diagram — one Decoder layer:**
![i#w.400](/images/transformer/d3.png)

**Structural Block Diagram — the full Decoder ($N$ layers):**
![i#w.400](/images/transformer/d4.png)

**Implementation Note.** This matches `TransformerDecoderLayer.forward` (three residual sub-layers, `norm1`/`norm2`/`norm3` applied in Post-LN order exactly as in Part 2.2) and `Decoder.forward` (embedding, scaling, positional encoding, sequential layer stack each receiving the *same* `memory` tensor, final `LayerNorm`).

### 3.4 Linear and Softmax Projection Layer

**Definition (Generator / Output Projection).** The decoder's final hidden states $\text{dec\_out} \in \mathbb{R}^{T \times D}$ are projected into the target vocabulary space by a learned linear map $W_{\text{vocab}} \in \mathbb{R}^{D \times |V_{\text{tgt}}|}$ (with bias), followed by a softmax to yield a next-token probability distribution at every position:

$$
\text{logits} = \text{dec\_out}\, W_{\text{vocab}} + b_{\text{vocab}} \in \mathbb{R}^{T \times |V_{\text{tgt}}|} \tag{3.8}
$$

$$
P(\hat{y}_t \mid y_{<t}, x) = \text{softmax}(\text{logits}_t) \tag{3.9}
$$

Vaswani et al. (2017, §3.4) additionally note that the same weight matrix may optionally be tied between the input embedding layers and this pre-softmax linear transformation (weight tying), scaled appropriately — a parameter-efficiency detail orthogonal to the core architecture and not required for a minimal implementation.

**Mathematical Transformation — dimension tracking:**

$$
\text{dec\_out} : [B,T,D] \xrightarrow{\ \times W_{\text{vocab}} + b\ } \text{logits} : [B, T, |V_{\text{tgt}}|]
$$

**Implementation Note.** The provided code defines `self.generator = nn.Linear(d_model, tgt_vocab_size)` and applies it as the last operation of `Transformer.forward`: `logits = self.generator(dec_out)`. The softmax of Equation (3.9) is deliberately *not* applied inside the model in this implementation — a standard practice, since training uses `F.cross_entropy` (or `nn.CrossEntropyLoss`), which internally combines `log_softmax` and negative log-likelihood in a single, numerically stable operation. The explicit softmax of Eq. (3.9) is applied only at inference time, when converting logits to a probability distribution for sampling or beam search.

---

## Part 4 — Minimal, Functional PyTorch Implementation

The following sections present the full reference implementation, decomposed to match Parts 1–3 exactly. Tensor shapes are annotated inline as in the source, using the $[B, T, D]$ convention of the Notation section.

### 4.1 Positional Encoding (§2.4)

Implements Equations (2.5)–(2.7).

```python
import math
import torch
import torch.nn as nn
import torch.nn.functional as F


class PositionalEncoding(nn.Module):
    """Sinusoidal positional encodings, added to token embeddings."""

    def __init__(self, d_model, max_len=5000, dropout=0.1):
        super().__init__()
        if d_model % 2 != 0:
            raise ValueError("d_model must be even for paired sinusoidal encodings")
        self.dropout = nn.Dropout(dropout)

        pe = torch.zeros(max_len, d_model)                                    # [max_len, D]
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)   # [max_len, 1]
        div_term = torch.exp(
            torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
        )                                                                     # [D/2]
        pe[:, 0::2] = torch.sin(position * div_term)                          # [max_len, D/2] -> even dims
        pe[:, 1::2] = torch.cos(position * div_term)                          # [max_len, D/2] -> odd dims
        pe = pe.unsqueeze(0)                                                  # [max_len, D] -> [1, max_len, D]
        self.register_buffer("pe", pe)

    def forward(self, x):
        # x: [B, T, D]
        T = x.size(1)
        x = x + self.pe[:, :T, :]          # [B, T, D] + [1, T, D] -> [B, T, D] (broadcast over batch)
        return self.dropout(x)             # [B, T, D]
```

**Line-by-line correspondence.**

- `d_model % 2` enforces the pair index $i\in\{0,\ldots,D/2-1\}$ in Eqs. (2.5)–(2.6); without it, the `0::2` and `1::2` slices have unequal widths.
- `pe = torch.zeros(max_len, d_model)` allocates the matrix whose row is $PE_{pos,:}$. `position.unsqueeze(1)` turns `[max_len]` into a column `[max_len,1]`; broadcasting its product with `div_term:[D/2]` produces the $[\text{max\_len},D/2]$ matrix with entries $pos\,10000^{-2i/D}$.
- The two strided assignments write that matrix's sine and cosine into the even and odd coordinate columns, implementing Eqs. (2.5) and (2.6), not a concatenation of two half-vectors.
- `unsqueeze(0)` changes `[\text{max\_len},D]` to `[1,\text{max\_len},D]`. Consequently `self.pe[:, :T, :]` is `[1,T,D]` and its addition to `x:[B,T,D]` broadcasts only across the batch axis, yielding Eq. (2.7) for every example independently.
- `register_buffer` makes `pe` part of the module's device and state-dict behavior while keeping it outside the parameter set. `dropout` regularizes the *sum* of token and positional features during training; it is the identity at evaluation.

### 4.2 Scaled Dot-Product Attention (§1.1–1.2)

Implements Equations (1.1)–(1.2).

```python
class ScaledDotProductAttention(nn.Module):
    """Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V"""

    def __init__(self, dropout=0.1):
        super().__init__()
        self.dropout = nn.Dropout(dropout)

    def forward(self, Q, K, V, mask=None):
        # Q: [B, H, T_q, d_k]
        # K: [B, H, T_k, d_k]
        # V: [B, H, T_k, d_k]
        d_k = Q.size(-1)

        K_t = K.transpose(-2, -1)                          # [B, H, T_k, d_k] -> [B, H, d_k, T_k]
        scores = torch.matmul(Q, K_t) / math.sqrt(d_k)      # [B,H,T_q,d_k] @ [B,H,d_k,T_k] -> [B, H, T_q, T_k]

        if mask is not None:
            # mask: [B, 1, T_q, T_k] (1 broadcasts over head dim H)
            scores = scores.masked_fill(mask == 0, float("-inf"))  # [B, H, T_q, T_k]

        attn = F.softmax(scores, dim=-1)                    # [B, H, T_q, T_k], softmax over key dim T_k
        attn = self.dropout(attn)                            # [B, H, T_q, T_k]

        context = torch.matmul(attn, V)                      # [B,H,T_q,T_k] @ [B,H,T_k,d_k] -> [B, H, T_q, d_k]
        return context, attn
```

**Line-by-line correspondence.**

- `d_k = Q.size(-1)` obtains the final coordinate dimension, so the divisor is the per-head $d_k$, never the model width $D$.
- `K.transpose(-2, -1)` swaps only the final two axes: `[B,H,T_k,d_k]` becomes `[B,H,d_k,T_k]`. It is the batched form of $K^\top$; batch and head identities are unchanged.
- `torch.matmul(Q, K_t)` contracts its final dimension $d_k$, independently for every broadcast-aligned $(b,h)$ pair. Its element `[b,h,i,j]` is $q_{bhi}\cdot k_{bhj}$, hence `scores` has one row of key logits for each query.
- `masked_fill(mask == 0, -inf)` acts *before* softmax. A false mask entry has $e^{-\infty}=0$, so it has zero probability; it must not be implemented by multiplying probabilities after softmax, which would generally leave the remaining weights unnormalized.
- `F.softmax(scores, dim=-1)` normalizes over keys $j$, not heads or queries. The subsequent dropout is post-normalization regularization, as qualified in §1.1.
- The second `matmul` contracts $T_k$: `context[b,h,i,:]=\sum_j\text{attn}[b,h,i,j]V[b,h,j,:]`, which is Eq. (1.1) with all batch/head computations vectorized.

### 4.3 Multi-Head Attention (§1.3)

Implements Equations (1.8)–(1.9) via the combined-projection formulation.

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads, dropout=0.1):
        super().__init__()
        assert d_model % n_heads == 0, "d_model must be divisible by n_heads"
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

        self.attention = ScaledDotProductAttention(dropout)

    def _split_heads(self, x, B, T):
        # x: [B, T, D] -> [B, T, H, d_k] -> [B, H, T, d_k]
        x = x.view(B, T, self.n_heads, self.d_k)
        return x.transpose(1, 2)

    def forward(self, query, key, value, mask=None):
        # query: [B, T_q, D]   key/value: [B, T_k, D]
        B, T_q, _ = query.shape
        T_k = key.size(1)

        Q = self.W_q(query)    # [B, T_q, D] -> [B, T_q, D]
        K = self.W_k(key)      # [B, T_k, D] -> [B, T_k, D]
        V = self.W_v(value)    # [B, T_k, D] -> [B, T_k, D]

        Q = self._split_heads(Q, B, T_q)   # [B, T_q, D] -> [B, H, T_q, d_k]
        K = self._split_heads(K, B, T_k)   # [B, T_k, D] -> [B, H, T_k, d_k]
        V = self._split_heads(V, B, T_k)   # [B, T_k, D] -> [B, H, T_k, d_k]

        context, attn = self.attention(Q, K, V, mask)   # context: [B, H, T_q, d_k]

        context = context.transpose(1, 2).contiguous()          # [B, H, T_q, d_k] -> [B, T_q, H, d_k]
        context = context.view(B, T_q, self.n_heads * self.d_k)  # [B, T_q, H, d_k] -> [B, T_q, D]

        output = self.W_o(context)   # [B, T_q, D] -> [B, T_q, D]
        return output, attn
```

**Line-by-line correspondence.**

- The divisibility assertion realizes $D=H d_k$. Each `nn.Linear(D, D)` computes the combined map $[W_1\mid\cdots\mid W_H]$ described in §1.3, with a learned bias; it preserves the last-axis shape while changing its representation.
- `_split_heads` first calls `view(B,T,H,d_k)`. This performs no arithmetic and does not permute data: it reinterprets the contiguous last axis of length $D$ as $H$ consecutive blocks of length $d_k$. Its input is a fresh `nn.Linear` result and is contiguous, so `view` is valid.
- `transpose(1,2)` changes the logical indexing order from `[b,t,h,r]` to `[b,h,t,r]`. It creates a non-contiguous strided view, but that is harmless here because `matmul` accepts strided operands and it places the sequence axes where §4.2 expects them.
- The three calls to `_split_heads` may use unequal $T_q$ and $T_k$; this is why `T_q=query.shape[1]` and `T_k=key.size(1)` are tracked separately. It is essential for cross-attention.
- `self.attention(Q,K,V,mask)` is Eq. (1.1) independently for every head. Its output remains `[B,H,T_q,d_k]`.
- The reverse `transpose(1,2)` restores token-major layout `[B,T_q,H,d_k]`. Because the preceding transpose made a non-contiguous view, `contiguous()` materializes storage in that logical order before `view(B,T_q,H*d_k)` coalesces the adjacent head and coordinate axes back into $D$. Omitting `contiguous()` makes `view` invalid or unsafe.
- Finally, `W_o` computes the learned recombination in Eq. (1.9). The module is agnostic to encoder self-attention, decoder self-attention, and cross-attention: only the origins and lengths of `query`, `key`, `value`, and the mask change.

### 4.4 Position-wise Feed-Forward Network (§2.3)

Implements Equation (2.4).

```python
class PositionwiseFeedForward(nn.Module):
    def __init__(self, d_model, d_ff, dropout=0.1):
        super().__init__()
        self.linear1 = nn.Linear(d_model, d_ff)
        self.linear2 = nn.Linear(d_ff, d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        # x: [B, T, D]
        x = self.linear1(x)          # [B, T, D] -> [B, T, d_ff]
        x = F.relu(x)                # [B, T, d_ff]
        x = self.dropout(x)          # [B, T, d_ff]
        x = self.linear2(x)          # [B, T, d_ff] -> [B, T, D]
        return x
```

**Line-by-line correspondence.** `nn.Linear(D,d_{ff})` applies the same affine map $x_iW_1+b_1$ to every pair $(b,i)$ and therefore never contracts or mixes the sequence axis $T$. `F.relu` implements the $max(0,\cdot)$ in Eq. (2.4) elementwise, and dropout regularizes only these expanded hidden features. `nn.Linear(d_{ff},D)` applies $W_2$ and restores the residual-compatible shape `[B,T,D]`. The shared module parameters—not a loop—are what make this a position-wise network.

### 4.5 The Encoder Layer and Encoder Stack (§2.1, 2.2, 2.5)

Implements the Post-LN residual composition of Eq. (2.2), assembled from §4.3 and §4.4.

```python
class TransformerEncoderLayer(nn.Module):
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        self.self_attn = MultiHeadAttention(d_model, n_heads, dropout)
        self.ffn = PositionwiseFeedForward(d_model, d_ff, dropout)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout1 = nn.Dropout(dropout)
        self.dropout2 = nn.Dropout(dropout)

    def forward(self, x, src_mask=None):
        # x: [B, S, D]
        attn_out, _ = self.self_attn(x, x, x, src_mask)      # [B, S, D] -> [B, S, D]
        x = self.norm1(x + self.dropout1(attn_out))          # residual + LayerNorm: [B, S, D]

        ffn_out = self.ffn(x)                                 # [B, S, D] -> [B, S, D]
        x = self.norm2(x + self.dropout2(ffn_out))            # residual + LayerNorm: [B, S, D]
        return x


class Encoder(nn.Module):
    def __init__(self, vocab_size, d_model, n_heads, d_ff, n_layers, max_len, dropout=0.1):
        super().__init__()
        self.d_model = d_model
        self.embed = nn.Embedding(vocab_size, d_model)
        self.pos_enc = PositionalEncoding(d_model, max_len, dropout)
        self.layers = nn.ModuleList(
            [TransformerEncoderLayer(d_model, n_heads, d_ff, dropout) for _ in range(n_layers)]
        )
        self.norm = nn.LayerNorm(d_model)

    def forward(self, src, src_mask=None):
        # src: [B, S] (integer token ids)
        x = self.embed(src) * math.sqrt(self.d_model)   # [B, S] -> [B, S, D], scaled per Vaswani et al.
        x = self.pos_enc(x)                              # [B, S, D] -> [B, S, D]

        for layer in self.layers:
            x = layer(x, src_mask)                        # [B, S, D] -> [B, S, D]

        return self.norm(x)                               # [B, S, D] final encoder memory
```

**Line-by-line correspondence.**

- In `TransformerEncoderLayer.forward`, passing the same `x` as query, key, and value is Eq. (2.1). `src_mask:[B,1,1,S]` broadcasts across heads and across the $S$ query rows, so it excludes padded *key/value* positions uniformly without imposing an ordering constraint.
- `x + dropout1(attn_out)` is well-defined because both tensors are `[B,S,D]`. `norm1` is applied over the last axis $D$ independently at every batch/position pair, giving exactly the Post-LN wrapper in Eq. (2.2). The FFN then receives this normalized result, and the second two lines repeat the same residual algebra.
- In `Encoder.forward`, `Embedding` maps integer ids `[B,S]` to their table rows `[B,S,D]`; multiplication by `sqrt(d_model)` implements Eq. (2.7) before `pos_enc` adds $PE$.
- `ModuleList` registers $N$ distinct layer parameter sets. The `for` loop composes them as $X^{(\ell)}=\mathrm{EncoderLayer}_\ell(X^{(\ell-1)})$ and never changes shape. The terminal `self.norm` is an implementation choice in this reference code; it is additional to the Post-LN operations within the original-paper layers.

### 4.6 The Decoder Layer and Decoder Stack (§3.1–3.3)

Implements the three-sub-layer residual composition, including cross-attention (Eq. 3.6).

```python
class TransformerDecoderLayer(nn.Module):
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        self.self_attn = MultiHeadAttention(d_model, n_heads, dropout)
        self.cross_attn = MultiHeadAttention(d_model, n_heads, dropout)
        self.ffn = PositionwiseFeedForward(d_model, d_ff, dropout)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.norm3 = nn.LayerNorm(d_model)
        self.dropout1 = nn.Dropout(dropout)
        self.dropout2 = nn.Dropout(dropout)
        self.dropout3 = nn.Dropout(dropout)

    def forward(self, x, memory, tgt_mask=None, memory_mask=None):
        # x: [B, T, D]      (decoder input / previous layer output)
        # memory: [B, S, D] (encoder output)

        self_attn_out, _ = self.self_attn(x, x, x, tgt_mask)         # [B, T, D] -> [B, T, D]
        x = self.norm1(x + self.dropout1(self_attn_out))             # residual + LayerNorm: [B, T, D]

        cross_attn_out, _ = self.cross_attn(x, memory, memory, memory_mask)
        # Q: [B, T, D] (from decoder), K/V: [B, S, D] (from encoder) -> output: [B, T, D]
        x = self.norm2(x + self.dropout2(cross_attn_out))            # residual + LayerNorm: [B, T, D]

        ffn_out = self.ffn(x)                                         # [B, T, D] -> [B, T, D]
        x = self.norm3(x + self.dropout3(ffn_out))                    # residual + LayerNorm: [B, T, D]
        return x


class Decoder(nn.Module):
    def __init__(self, vocab_size, d_model, n_heads, d_ff, n_layers, max_len, dropout=0.1):
        super().__init__()
        self.d_model = d_model
        self.embed = nn.Embedding(vocab_size, d_model)
        self.pos_enc = PositionalEncoding(d_model, max_len, dropout)
        self.layers = nn.ModuleList(
            [TransformerDecoderLayer(d_model, n_heads, d_ff, dropout) for _ in range(n_layers)]
        )
        self.norm = nn.LayerNorm(d_model)

    def forward(self, tgt, memory, tgt_mask=None, memory_mask=None):
        # tgt: [B, T] (integer token ids), memory: [B, S, D] (encoder output)
        x = self.embed(tgt) * math.sqrt(self.d_model)    # [B, T] -> [B, T, D]
        x = self.pos_enc(x)                               # [B, T, D] -> [B, T, D]

        for layer in self.layers:
            x = layer(x, memory, tgt_mask, memory_mask)    # [B, T, D] -> [B, T, D]

        return self.norm(x)                                 # [B, T, D] final decoder hidden states
```

**Line-by-line correspondence.**

- `self.self_attn(x,x,x,tgt_mask)` uses the current decoder state in all three roles and the `[B,1,T,T]` mask of Eq. (3.5). Consequently its score tensor has `[B,H,T,T]`, and each row $i$ can use only target keys $j\le i$.
- After its first Post-LN residual update, the changed `x` becomes the query argument of `self.cross_attn(x,memory,memory,memory_mask)`. Here the score shape is `[B,H,T,S]`: the query length is target length $T$, while both key and value length are source length $S$. This is Eq. (3.6), not self-attention.
- `memory_mask=src_mask:[B,1,1,S]` broadcasts across *all* decoder query positions, because every target position may inspect every non-padding source token. There is deliberately no lower-triangular factor on this source axis.
- The third residual branch uses `ffn(x)` after cross-attention. Each of the three residual additions has shape `[B,T,D]`, so none silently changes token count or model width; `Decoder.forward` repeats the same decoder layer $N$ times before its final implementation-level normalization.

### 4.7 The Full Transformer: Masking, Assembly, and Output Projection (§3.4)

Assembles §4.5 and §4.6 and implements Eqs. (3.3), (3.5), and (3.8).

```python
class Transformer(nn.Module):
    def __init__(
        self,
        src_vocab_size,
        tgt_vocab_size,
        d_model=512,
        n_heads=8,
        d_ff=2048,
        n_layers=6,
        max_len=5000,
        dropout=0.1,
        pad_idx=0,
    ):
        super().__init__()
        self.pad_idx = pad_idx
        self.encoder = Encoder(src_vocab_size, d_model, n_heads, d_ff, n_layers, max_len, dropout)
        self.decoder = Decoder(tgt_vocab_size, d_model, n_heads, d_ff, n_layers, max_len, dropout)
        self.generator = nn.Linear(d_model, tgt_vocab_size)   # final projection to vocab logits

        for p in self.parameters():
            if p.dim() > 1:
                nn.init.xavier_uniform_(p)

    def make_src_mask(self, src):
        # src: [B, S]
        src_mask = (src != self.pad_idx).unsqueeze(1).unsqueeze(2)
        # [B, S] -> [B, 1, S] -> [B, 1, 1, S]; broadcasts over heads H and query positions T_q
        return src_mask

    def make_tgt_mask(self, tgt):
        # tgt: [B, T]
        B, T = tgt.shape
        pad_mask = (tgt != self.pad_idx).unsqueeze(1).unsqueeze(2)          # [B, T] -> [B, 1, 1, T]
        causal_mask = torch.tril(torch.ones((T, T), device=tgt.device)).bool()  # [T, T], lower-triangular
        causal_mask = causal_mask.unsqueeze(0).unsqueeze(0)                  # [T, T] -> [1, 1, T, T]
        tgt_mask = pad_mask & causal_mask                                    # [B,1,1,T] & [1,1,T,T] -> [B, 1, T, T]
        return tgt_mask

    def forward(self, src, tgt):
        # src: [B, S] source token ids
        # tgt: [B, T] target token ids (shifted-right during training)
        src_mask = self.make_src_mask(src)   # [B, 1, 1, S]
        tgt_mask = self.make_tgt_mask(tgt)   # [B, 1, T, T]

        memory = self.encoder(src, src_mask)                      # [B, S] -> [B, S, D]
        dec_out = self.decoder(tgt, memory, tgt_mask, src_mask)   # [B, T], [B, S, D] -> [B, T, D]

        logits = self.generator(dec_out)   # [B, T, D] -> [B, T, V_tgt]
        return logits
```

**Line-by-line correspondence.**

- `(src != pad_idx)` is `[B,S]` with `True` exactly at valid source keys. The two `unsqueeze` calls place singleton head and query axes, yielding `[B,1,1,S]`; this broadcasts to encoder score tensors `[B,H,S,S]` and cross-attention score tensors `[B,H,T,S]` without allocating either full mask.
- `pad_mask` similarly begins as valid target keys and has `[B,1,1,T]`. `torch.tril(...).bool()` creates $M:[T,T]$ from Eq. (3.3), then two `unsqueeze` calls produce `[1,1,T,T]`. Bitwise `&` broadcasts these operands to the composite boolean mask `[B,1,T,T]` in Eq. (3.5).
- `memory = encoder(src,src_mask)` preserves the source length and produces `[B,S,D]`. Passing `src_mask` as `memory_mask` is correct because cross-attention's keys and values are exactly the source-derived memory; there is no separate target-dependent memory mask.
- `decoder(tgt,memory,tgt_mask,src_mask)` returns `[B,T,D]`. `generator` is the row-vector affine map in Eq. (3.8), producing unnormalized logits `[B,T,|V_{\mathrm{tgt}}|]`; leave them as logits for `F.cross_entropy`, which applies the stable log-softmax internally.
- Xavier initialization is applied only to matrices. It is a reasonable initialization choice, but it does not replace scaling in attention or mask semantics; those are runtime operations required by Eqs. (1.1) and (3.3)–(3.5).

Xavier-uniform initialization (`nn.init.xavier_uniform_`) is applied to every parameter tensor with more than one dimension (i.e., weight matrices, excluding 1-D bias and LayerNorm parameters) — a standard choice ensuring that the variance of activations is approximately preserved across the initial forward pass, complementing the $1/\sqrt{d_k}$ scaling analysis of §1.2 in stabilizing the network prior to any training signal.

### 4.8 Structural Verification

The `__main__` block instantiates the full model at the canonical hyperparameters of Vaswani et al. (2017) — $D = 512$, $H = 8$ (hence $d_k = 64$), $d_{ff} = 2048$, $N = 6$ layers per stack — and verifies output shape:

```python
if __name__ == "__main__":
    torch.manual_seed(0)

    SRC_VOCAB, TGT_VOCAB = 5000, 5000
    B, S, T = 2, 10, 12   # batch size, source length, target length

    model = Transformer(
        src_vocab_size=SRC_VOCAB,
        tgt_vocab_size=TGT_VOCAB,
        d_model=512,
        n_heads=8,
        d_ff=2048,
        n_layers=6,
        max_len=100,
        dropout=0.1,
        pad_idx=0,
    )

    src = torch.randint(1, SRC_VOCAB, (B, S))   # [B, S]
    tgt = torch.randint(1, TGT_VOCAB, (B, T))   # [B, T]

    logits = model(src, tgt)   # [B, T, V_tgt]
    print(logits.shape)        # torch.Size([2, 12, 5000])

    # A causal-mask invariant: modifying the final input token cannot affect earlier logits.
    model.eval()               # disable all dropout before testing exact equality
    tgt_future = tgt.clone()
    tgt_future[:, -1] = (tgt_future[:, -1] % (TGT_VOCAB - 1)) + 1
    with torch.no_grad():
        prefix_logits = model(src, tgt)
        perturbed_logits = model(src, tgt_future)
    torch.testing.assert_close(prefix_logits[:, :-1], perturbed_logits[:, :-1])
```

**Verification walkthrough.** `torch.randint(1,...)` deliberately avoids `pad_idx=0`, so all mask entries refer to real tokens. The printed output establishes the terminal shape $[B,T,|V_{\text{tgt}}|]=[2,12,5000]$. The second check is stronger than a shape test: after `eval()` disables stochastic dropout, it changes only the final decoder input token to a distinct non-padding id. Under Eqs. (3.3)–(3.5), logits at positions $0,\ldots,T-2$ cannot depend on that future key/value, so `assert_close` must pass. If the lower-triangular mask were missing or had the wrong orientation, the assertion would ordinarily fail.

---

## References and Reading Notes

1. Vaswani, A., Shazeer, N., Parmar, N., *et al.* (2017). [*Attention Is All You Need*](https://arxiv.org/abs/1706.03762). The primary source for the scaled dot-product formula, multi-head construction, sinusoidal encodings, Post-LN sub-layers, and decoder masking.
2. Alammar, J. (2018; updated). [*The Illustrated Transformer*](https://jalammar.github.io/illustrated-transformer/). Used here for pedagogical intuition about projected queries, keys, values, multiple representation subspaces, and decoder focus; the mathematical claims in this text are established independently by the equations above.
3. Rush, S. (2018). [*The Annotated Transformer*](https://nlp.seas.harvard.edu/annotated-transformer/). A valuable code-oriented companion to the original paper. It is particularly useful for comparing vectorized attention, masks, residual wrappers, and the distinction between a pedagogical implementation and a historical architecture specification.
