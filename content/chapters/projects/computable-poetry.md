<!--metadata
  title: "Can You Compute a Poetry?"
  authors: ["Subhajit Gorai"]
  dateCreated: "14/04/2026"
  dateEdited: "22/04/2026"
  description: "Generating metrically correct, semantically plausible Bangla poems using formal grammars, constraint satisfaction, and graph-based planning. Without machine learning."
  tags: ["automata", "dijkstra", "graph-theory", "graph", "bangla-poems", "k-hop dijkstra", "constraint satisfaction"]
-->

# Mathematical Foundations of Computable Poetry

> A discrete-structural formalization of algorithmic Bangla poem generation via constraint satisfaction over weighted graphs, formal grammars, and bounded randomness.

---

## Notation

| Symbol | Meaning |
|--------|---------|
| ℕ | Non-negative integers {0, 1, 2, …} |
| ℕ⁺ | Positive integers {1, 2, 3, …} |
| 2^X | Power set of X |
| \|X\| | Cardinality of X |
| X* | Kleene star — set of all finite sequences over X |
| X⁺ | X* \ {ε} — non-empty finite sequences |
| [n] | {1, 2, …, n} for n ∈ ℕ⁺ |
| ⊥ | Failure / undefined |
| Unif(S) | Uniform distribution over finite non-empty set S |

---

## 1. Phonological Algebra

### 1.1 Alphabet

**Definition 1.1** (Bangla Character Classes).
Let the following finite sets be given over Unicode codepoints:

$$\Sigma_V = \{(\text{অ}, \epsilon),\; (\text{আ}, \text{া}),\; (\text{ই}, \text{ি}),\; (\text{ঈ}, \text{ী}),\; (\text{উ}, \text{ু}),\; (\text{ঊ}, \text{ূ}),\; (\text{ঋ}, \text{ৃ}),\; (\text{এ}, \text{ে}),\; (\text{ঐ}, \text{ৈ}),\; (\text{ও}, \text{ো}),\; (\text{ঔ}, \text{ৌ})\}$$

where each pair is (independent form, dependent matra form). Define:
- $V_I = \pi_1(\Sigma_V)$ — the set of 11 independent vowels
- $V_D = \pi_2(\Sigma_V) \setminus \{\epsilon\}$ — the set of 10 dependent vowel marks
- $V = V_I \cup V_D$ — all vowel characters (|V| = 21)

$$
\Sigma_C = \{\text{ক, খ, গ, ঘ, ঙ, চ, ছ, জ, ঝ, ঞ, ট, ঠ, ড, ঢ, ণ, ত, থ, দ, ধ, ন,}\\
\text{প, ফ, ব, ভ, ম, য, র, ল, শ, ষ, স, হ, ড়, ঢ়, য়, ৎ, ং, ঁ}\}
$$

The full alphabet is $\Sigma = V \cup \Sigma_C \cup \{্\}$, where $্$ (U+09CD, *hasanta/virama*) is the conjunct marker.

A **word** is any non-empty string $w \in \Sigma^+$.

### 1.2 Syllable Decomposition

**Definition 1.2** (Syllable Decomposition Function).
A syllable decomposition is a function

$$\sigma : \Sigma^+ \to (\Sigma^+)^*$$

such that for any word $w$, $\sigma(w) = (s_1, s_2, \dots, s_r)$ where $r \geq 1$ and the concatenation $s_1 s_2 \cdots s_r$ reconstructs $w$ (modulo hasanta insertion).

The implementation applies a greedy left-to-right regex scan with pattern priority:

$$\text{CVC} \succ \text{CCV} \succ \text{CV} \succ \text{VC}$$

where $C \in \Sigma_C$ and $V \in V$. An initial independent vowel is split off before scanning. Unmatched residues between matches are collected with hasanta appended.

### 1.3 Syllable Classification

**Definition 1.3** (Open and Closed Syllables).
For a syllable $s \in \Sigma^+$, define the classification predicate:

$$\text{open}(s) \iff \text{last}(s) \in V \qquad (\text{মুক্তদল})$$
$$\text{closed}(s) \iff \neg\,\text{open}(s) \qquad (\text{রুদ্ধদল})$$

Equivalently, $\text{closed}(s) \iff \text{last}(s) \in \Sigma_C \cup \{্\}$.

---

## 2. Mātrā Weight Systems

### 2.1 Per-Syllable Weight Functions

**Definition 2.1** (Chhondo Set).
Let $\mathcal{C} = \{S, M, A\}$ denote the three classical metres:
- $S$ = স্বরবৃত্ত (Swarabritta)
- $M$ = মাত্রাবৃত্ত (Matrabritta)
- $A$ = অক্ষরবৃত্ত (Aksharabritta)

**Definition 2.2** (Per-Syllable Weight).
For syllable $s_i$ at position $i$ within a syllable sequence of length $r$, define:

$$\mu_S(s_i, i, r) = 1$$

$$\mu_M(s_i, i, r) = \begin{cases} 1 & \text{if open}(s_i) \\ 2 & \text{if closed}(s_i) \end{cases}$$

$$\mu_A(s_i, i, r) = \begin{cases} 1 & \text{if open}(s_i) \\ 2 & \text{if closed}(s_i) \wedge (i = r \;\vee\; r = 1) \\ 1 & \text{if closed}(s_i) \wedge i < r \wedge r > 1 \end{cases}$$

Observe: $\mu_S$ is trivial (all syllables unit-weight). $\mu_M$ distinguishes only open/closed. $\mu_A$ adds positional sensitivity — closed syllables are heavy only at word-end.

### 2.2 Word-Level Mātrā

**Definition 2.3** (Word Mātrā).
For a word $w$ with $\sigma(w) = (s_1, \dots, s_r)$ and Chhondo $c \in \mathcal{C}$:

$$m_c(w) = \sum_{i=1}^{r} \mu_c(s_i,\; i,\; r)$$

This yields three integers per word, all pre-computed and stored.

### 2.3 Chhondo Auto-Detection

**Definition 2.4** (Pattern and Chhondo Detection).
A **prosodic pattern** is a tuple $\mathbf{p} = (p_1, p_2, \dots, p_n) \in (\mathbb{N}^+)^n$ where $n$ is the number of parbas per line. The Chhondo detection function:

$$\chi(\mathbf{p}) = \begin{cases} S & \text{if } 2 \leq \max(\mathbf{p}) \leq 4 \\ M & \text{if } 5 \leq \max(\mathbf{p}) \leq 7 \\ A & \text{if } 8 \leq \max(\mathbf{p}) \leq 12 \end{cases}$$

The detected Chhondo determines which $m_c$ is used for all index lookups.

---

## 3. Lexicon as Indexed Set

### 3.1 Word Entry

**Definition 3.1** (Word Entry).
A word entry is a tuple $e \in \mathcal{E}$ where:

$$e = (w,\; \boldsymbol{\sigma},\; m_S(w),\; m_M(w),\; m_A(w),\; \text{pos},\; \tau,\; \phi(\tau),\; \rho(w))$$

with:
- $w \in \Sigma^+$ — surface form
- $\boldsymbol{\sigma} = \sigma(w)$ — syllable sequence
- $m_c(w) \in \mathbb{N}^+$ for each $c \in \mathcal{C}$
- $\text{pos} \in \mathcal{P} = \{\text{NN, VB, JJ, CC, NNP, NNS, VBG, VBP, VBZ, VBD, VBN, RB, RBR, IN, \dots}\}$
- $\tau \in \mathcal{T}$ — semantic tag
- $\phi(\tau) \in \mathcal{F}$ — semantic family
- $\rho(w) \in V$ — rhyme class

### 3.2 Semantic Taxonomy

**Definition 3.2** (Tag and Family Sets).
The semantic tag set is:

$$\mathcal{T} = \{t_1, t_2, \dots, t_{21}\}$$

organized into 9 families $\mathcal{F} = \{F_1, \dots, F_9\}$ via a surjection $\phi : \mathcal{T} \to \mathcal{F}$:

| Family $F$ | Tags $\phi^{-1}(F)$ |
|---|---|
| NATURE | NATURE\_SKY, NATURE\_WATER, NATURE\_FLORA, NATURE\_FAUNA, NATURE\_EARTH |
| LIGHT | LIGHT\_BRIGHT, LIGHT\_SOFT |
| TIME | TIME\_DAWN, TIME\_DAY, TIME\_DUSK |
| MOTION | MOTION\_GENTLE, MOTION\_VIVID |
| SOUND | SOUND\_NATURE, SOUND\_HUMAN |
| EMOTION | EMOTION\_JOY, EMOTION\_PEACE, EMOTION\_WONDER |
| ACTOR | ACTOR\_HUMAN, ACTOR\_ABSTRACT |
| DESCRIPTOR | DESC\_COLOR, DESC\_TEXTURE, DESC\_SIZE |
| CONNECTOR | CONN\_BRIDGE |

### 3.3 Rhyme Class

**Definition 3.3** (Rhyme Class Function).
$\rho : \Sigma^+ \to V \cup \Sigma_C$ extracts the last vowel character by right-to-left scan:

$$\rho(w) = \begin{cases} c_j & \text{where } j = \max\{i : w_i \in V\} \text{ if such } j \text{ exists} \\ w_{|w|} & \text{otherwise} \end{cases}$$

Two words $w_1, w_2$ **rhyme** iff $\rho(w_1) = \rho(w_2)$.

### 3.4 Lexicon and Inverted Index

**Definition 3.4** (Lexicon).
The lexicon is a finite set $\mathcal{L} \subset \mathcal{E}$ of word entries.

**Definition 3.5** (Inverted Index).
Fix a Chhondo $c \in \mathcal{C}$. The inverted index is:

$$I_c : \mathcal{T} \times \mathbb{N}^+ \to 2^{\mathcal{L}}$$
$$I_c(\tau, m) = \{e \in \mathcal{L} \mid e.\tau = \tau \;\wedge\; m_c(e.w) = m\}$$

This is a hash map. Lookup is $O(1)$.

**Definition 3.6** (Rhyme Index).

$$R : V \to 2^{\mathcal{L}}$$
$$R(v) = \{e \in \mathcal{L} \mid \rho(e.w) = v\}$$

### 3.5 Fallback Chains

**Definition 3.7** (Sibling Fallback).
For each tag $\tau \in \mathcal{T}$, declare a sibling sequence:

$$\text{sib} : \mathcal{T} \to \mathcal{T}^*$$

where $\text{sib}(\tau) = (\tau_1', \tau_2', \dots)$ is an ordered list of tags in the same family $\phi(\tau)$.

**Definition 3.8** (Family Fallback).
For each family $F \in \mathcal{F}$, declare:

$$\text{fam} : \mathcal{F} \to \mathcal{F}^*$$

where $\text{fam}(F) = (F_1', F_2', \dots)$ is an ordered list of cross-family neighbours.

**Definition 3.9** (Cascading Candidate Retrieval).
For tag $\tau$, mātrā $m$, Chhondo $c$:

$$\text{Cand}(\tau, m) = \text{first non-empty in the sequence:}$$

$$I_c(\tau, m), \quad I_c(\text{sib}(\tau)_1, m), \quad I_c(\text{sib}(\tau)_2, m), \quad \dots, \quad \bigcup_{\tau' \in \phi^{-1}(\text{fam}(\phi(\tau))_1)} I_c(\tau', m), \quad \dots$$

mātrā $m$ is invariant across the entire chain. Only the tag dimension relaxes.

---

## 4. Semantic Field Graph

### 4.1 Graph Construction

**Definition 4.1** (Partition).
Define two subsets of $\mathcal{F}$:

$$\mathcal{S} = \{\text{NATURE, LIGHT, TIME, MOTION, SOUND, DESCRIPTOR}\} \quad (\text{sensory})$$
$$\mathcal{I} = \{\text{EMOTION, ACTOR}\} \quad (\text{inner})$$
$$\mathcal{F} = \mathcal{S} \;\dot\cup\; \mathcal{I} \;\dot\cup\; \{\text{CONNECTOR}\}$$

**Definition 4.2** (Natural Poetic Pairs).
Let $\mathcal{N} \subset \binom{\mathcal{F}}{2}$ be a set of unordered pairs:

$$\mathcal{N} = \big\{\{a, b\} \subseteq \mathcal{F} \;\big|\; (a,b) \text{ is a poetically instinctive transition}\big\}$$

Enumerated:

$$\mathcal{N} = \big\{ \{\text{NATURE, LIGHT}\},\; \{\text{NATURE, MOTION}\},\; \{\text{NATURE, SOUND}\},\; \{\text{NATURE, DESCRIPTOR}\},$$
$$\{\text{LIGHT, EMOTION}\},\; \{\text{MOTION, SOUND}\},\; \{\text{SOUND, EMOTION}\},$$
$$\{\text{ACTOR, EMOTION}\},\; \{\text{ACTOR, MOTION}\},\; \{\text{TIME, NATURE}\},\; \{\text{TIME, LIGHT}\} \big\}$$

$|\mathcal{N}| = 11$.

**Definition 4.3** (Edge Weight Function).
Define $\omega : \mathcal{F} \times \mathcal{F} \to \mathbb{N}^+$ for $a \neq b$:

$$\omega(a, b) = \begin{cases} 1 & \text{if } a = \text{CONNECTOR} \;\vee\; b = \text{CONNECTOR} \\ 2 & \text{if } \{a, b\} \in \mathcal{N} \\ 3 & \text{if } a \in \mathcal{S} \;\wedge\; b \in \mathcal{S} \;\wedge\; \{a,b\} \notin \mathcal{N} \\ 2 & \text{if } a \in \mathcal{I} \;\wedge\; b \in \mathcal{I} \\ 4 & \text{otherwise (sensory} \leftrightarrow \text{inner, not natural pair)} \end{cases}$$

The rules have strict priority: rule 1 (CONNECTOR) > rule 2 (natural pair) > rules 3–5 (partition membership).

**Definition 4.4** (Semantic Field Graph).
The semantic field graph is a complete directed weighted graph:

$$G = (\mathcal{F},\; E,\; \omega)$$

where $E = \{(a, b) \in \mathcal{F}^2 \mid a \neq b\}$ and $|E| = 9 \times 8 = 72$.

$G$ is constructed once at startup by evaluating $\omega$ for all 72 ordered pairs. Since $\omega(a,b) = \omega(b,a)$ for all pairs (the weight function is symmetric), $G$ is effectively undirected, though represented as a directed graph.

**Proposition 4.1.** *The weight function $\omega$ partitions the 36 unordered edges of $G$ into exactly four weight classes:*

| Weight | Count | Source |
|:---:|:---:|---|
| 1 | 8 | CONNECTOR ↔ each of the other 8 families |
| 2 | 11 | The 11 natural pairs $\mathcal{N}$ (includes ACTOR↔EMOTION, the sole inner↔inner pair) |
| 3 | 8 | Non-natural sensory↔sensory pairs |
| 4 | 9 | Non-natural sensory↔inner crossings |

*Proof.* The 36 unordered edges decompose as follows.

**Weight 1 (8 edges):** CONNECTOR paired with each of the other 8 families. This accounts for 8 edges, leaving 28.

**Weight 2 (11 edges):** Exactly the set $\mathcal{N}$. The natural pairs within $\mathcal{S}$: {N,L}, {N,Mo}, {N,So}, {N,D}, {Mo,So}, {T,N}, {T,L} = 7 pairs. Cross-partition natural pairs: {L,Em}, {So,Em}, {Ac,Mo} = 3 pairs. Inner↔inner: {Ac,Em} = 1 pair. Total: 7 + 3 + 1 = 11 = $|\mathcal{N}|$.

**Weight 3 (8 edges):** Sensory↔sensory pairs not in $\mathcal{N}$. There are $\binom{6}{2} = 15$ sensory pairs total, minus 7 that are natural pairs, leaving 8.

**Weight 4 (9 edges):** Sensory↔inner pairs not in $\mathcal{N}$. There are $6 \times 2 = 12$ sensory↔inner pairs total, minus 3 natural cross-partition pairs, leaving 9.

Check: 8 + 11 + 8 + 9 = 36 = $\binom{9}{2}$. ∎

### 4.2 Resolved Terminal Set

**Definition 4.5** (Resolved Families).
Define $\mathcal{R} \subset \mathcal{F}$:

$$\mathcal{R} = \{\text{EMOTION}, \text{SOUND}\}$$

A valid poem trajectory must terminate in $\mathcal{R}$.

---

## 5. k-Hop Path Planning on Layered Graphs

### 5.1 Layered Graph Construction

**Definition 5.1** (Layered Product Graph).
Given $G = (\mathcal{F}, E, \omega)$ and a positive integer $k$ (number of lines), define the layered graph:

$$G^{(k)} = (V^{(k)}, E^{(k)}, \omega^{(k)})$$

where:
- $V^{(k)} = \mathcal{F} \times \{0, 1, \dots, k-1\}$ — states are (family, layer) pairs
- $E^{(k)} = \{((a, \ell),\; (b, \ell+1)) \mid (a, b) \in E,\; 0 \leq \ell < k-1\}$ — edges connect only adjacent layers
- $\omega^{(k)}((a, \ell), (b, \ell+1)) = \omega(a, b)$

$G^{(k)}$ is a DAG (directed acyclic graph) with $9k$ nodes and $72(k-1)$ edges.

### 5.2 Optimal Trajectory as Shortest Path

**Definition 5.2** (k-Hop Trajectory Problem).
Given a start family $F_0 \in \mathcal{F}$ and terminal set $\mathcal{R}$, find:

$$\pi^* = \argmin_{\pi \in \Pi(F_0, k)} \; \text{cost}(\pi)$$

where:
- $\Pi(F_0, k) = \{(F_0, F_1, \dots, F_{k-1}) \in \mathcal{F}^k \mid F_{k-1} \in \mathcal{R} \;\wedge\; F_i \neq F_i \text{ are not necessarily distinct}\}$
- $\text{cost}(\pi) = \sum_{i=0}^{k-2} \omega(F_i, F_{i+1})$

This is equivalent to single-source shortest path on $G^{(k)}$ from source $(F_0, 0)$ to the terminal set $\{(F, k-1) \mid F \in \mathcal{R}\}$.

**Theorem 5.1** (Correctness and Complexity).
*Dijkstra's algorithm on $G^{(k)}$ solves the k-hop trajectory problem in time $O(k \cdot |\mathcal{F}|^2)$.*

*Proof.* $G^{(k)}$ has $|V^{(k)}| = 9k$ nodes and $|E^{(k)}| = 72(k-1)$ edges, all non-negative weights. Dijkstra with a binary heap runs in $O((|V| + |E|) \log |V|) = O(k \cdot 81 \cdot \log(9k))$. Since $|\mathcal{F}| = 9$ is fixed, this simplifies to $O(k)$ in practice. The layered structure guarantees acyclicity, so even BFS with dynamic programming suffices. ∎

**Definition 5.3** (Field Trajectory).
The output of the path planner is a sequence:

$$\boldsymbol{\pi} = (\pi_0, \pi_1, \dots, \pi_{k-1}) \in \mathcal{F}^k$$

with $\pi_0 = F_0$ (declared start), $\pi_{k-1} \in \mathcal{R}$ (resolved end), and $\text{cost}(\boldsymbol{\pi})$ minimized.

**Example.** For $k = 4$, $F_0 = \text{NATURE}$:

$$\text{NATURE} \xrightarrow{2} \text{MOTION} \xrightarrow{2} \text{SOUND} \xrightarrow{2} \text{EMOTION} \quad \text{cost} = 6$$

---

## 6. Context-Free Grammar for Slot Generation

### 6.1 Slot Definition

**Definition 6.1** (Slot).
A slot is a 4-tuple:

$$s = (\tau,\; \pi,\; m,\; \beta) \in \mathcal{T} \times \mathcal{P} \times \mathbb{N}^+ \times \{0, 1\}$$

where:
- $\tau$ — required semantic tag
- $\pi$ — required part of speech
- $m$ — mātrā budget (from the pattern)
- $\beta$ — rhyme flag (1 iff this is the last slot of an even-indexed line)

### 6.2 Semantic Productions

**Definition 6.2** (Semantic Production).
For each family $F \in \mathcal{F}$, a production is a sequence:

$$\gamma_F^{(j)} = \big((\tau_1, \pi_1),\; (\tau_2, \pi_2),\; \dots,\; (\tau_n, \pi_n)\big) \in (\mathcal{T} \times \mathcal{P})^n$$

where $n = |\mathbf{p}|$ is the number of parbas.

For each family $F$, a set of productions is declared:

$$\Gamma_F = \{\gamma_F^{(1)}, \gamma_F^{(2)}, \dots, \gamma_F^{(q_F)}\}$$

where $q_F = |\Gamma_F|$.

**Validation invariant:** $\forall F \in \mathcal{F},\; \forall \gamma \in \Gamma_F : |\gamma| = n$.

The production counts per family in the current implementation:

| Family | $q_F$ |
|:---:|:---:|
| NATURE | 4 |
| LIGHT | 3 |
| TIME | 3 |
| MOTION | 4 |
| SOUND | 3 |
| EMOTION | 4 |
| ACTOR | 2 |
| DESCRIPTOR | 2 |
| CONNECTOR | 2 |

Total: $\sum q_F = 27$ productions.

### 6.3 Slot Expansion

**Definition 6.3** (Slot Expansion).
Given a family $F$, pattern $\mathbf{p} = (p_1, \dots, p_n)$, and line index $\ell \in \{0, \dots, k-1\}$:

1. Sample $\gamma \sim \text{Unif}(\Gamma_F)$. Let $\gamma = ((\tau_1, \pi_1), \dots, (\tau_n, \pi_n))$.
2. Construct the slot sequence:

$$\mathbf{s}(\gamma, \mathbf{p}, \ell) = \Big((\tau_i,\; \pi_i,\; p_i,\; \beta_i)\Big)_{i=1}^{n}$$

where $\beta_i = [\ell \text{ is odd}] \cdot [i = n]$, using Iverson bracket notation.

The randomness is in step 1 only — the mapping from production to slots is deterministic.

---

## 7. Constraint Satisfaction and Word Selection

### 7.1 Constraint Predicates

**Definition 7.1** (Constraint Predicates).
For a candidate word entry $e \in \mathcal{L}$ and a slot $s = (\tau, \pi, m, \beta)$ with active rhyme class $\hat\rho \in V \cup \{\bot\}$ and used-word set $U \subseteq \Sigma^+$, define the following predicates:

$$C_\mu(e, s) \iff m_c(e.w) = m \qquad (\text{mātrā — inviolable})$$
$$C_\tau(e, s) \iff e.\tau = \tau \qquad (\text{exact tag})$$
$$C_\pi(e, s) \iff e.\text{pos} = \pi \qquad (\text{exact POS})$$
$$C_\rho(e, s, \hat\rho) \iff \rho(e.w) = \hat\rho \qquad (\text{rhyme match})$$
$$C_U(e, U) \iff e.w \notin U \qquad (\text{freshness})$$

### 7.2 Candidate Set Construction

**Definition 7.2** (Base Candidate Set).
For tag $\tau$ and mātrā $m$:

$$\mathcal{B}(\tau, m) = I_c(\tau, m)$$

$C_\mu$ is not a "filter" — it is a precondition for set membership. No entry with wrong mātrā ever enters any candidate set.

### 7.3 Constraint Relaxation Lattice

**Definition 7.3** (Constraint Configuration).
A constraint configuration is a triple:

$$\kappa = (\mathcal{T}^*, \;\text{pos?}, \;\text{rhyme?}) \in \mathcal{T}^{**} \times \{0, 1\} \times \{0, 1\}$$

where:
- $\mathcal{T}^*$ is the tag search scope (a sequence of tags to try)
- $\text{pos?}$ indicates whether POS filtering is active
- $\text{rhyme?}$ indicates whether rhyme filtering is active

**Definition 7.4** (The Six-Pass Chain).
For a slot $s = (\tau, \pi, m, \beta)$, the word picker executes a fixed chain of configurations $\kappa_1 \succ \kappa_2 \succ \cdots \succ \kappa_6$:

| Pass $j$ | Tag scope | POS? | Rhyme? | Condition |
|:-:|---|:-:|:-:|---|
| 1 | $\{\tau\}$ | ✓ | ✓ | Only if $\beta = 1 \wedge \hat\rho \neq \bot$ |
| 2 | $\{\tau\}$ | ✓ | ✗ | Always attempted |
| 3 | $\{\tau\}$ | ✗ | ✗ | |
| 4 | $\text{sib}(\tau)$ | ✓ | ✗ | Iterates through sibling tags |
| 5 | $\text{sib}(\tau)$ | ✗ | ✗ | |
| 6 | $\text{Cand}(\tau, m)$ | ✗ | ✗ | Full cross-family fallback |

**Definition 7.5** (Candidate Set at Pass $j$).
For each pass $j$, define the candidate set $\mathcal{C}_j(s, U, \hat\rho) \subseteq \mathcal{L}$:

$$\mathcal{C}_1 = \{e \in I_c(\tau, m) \mid C_\pi(e,s) \wedge C_\rho(e,s,\hat\rho) \wedge C_U(e,U)\}$$

$$\mathcal{C}_2 = \{e \in I_c(\tau, m) \mid C_\pi(e,s) \wedge C_U(e,U)\}$$

$$\mathcal{C}_3 = \{e \in I_c(\tau, m) \mid C_U(e,U)\}$$

$$\mathcal{C}_4 = \bigcup_{\tau' \in \text{sib}(\tau)} \{e \in I_c(\tau', m) \mid C_\pi(e,s) \wedge C_U(e,U)\} \quad (\text{first non-empty } \tau')$$

$$\mathcal{C}_5 = \bigcup_{\tau' \in \text{sib}(\tau)} \{e \in I_c(\tau', m) \mid C_U(e,U)\} \quad (\text{first non-empty } \tau')$$

$$\mathcal{C}_6 = \{e \in \text{Cand}(\tau, m) \mid C_U(e,U)\}$$

**Remark on Pass 4 and 5 semantics:** In the implementation, passes 4 and 5 iterate through $\text{sib}(\tau)$ and return the candidates from the *first* sibling tag that yields a non-empty set after filtering. They do not union over all siblings.

**Definition 7.6** (Freshness Relaxation).
The freshness predicate $C_U$ has a special relaxation: if $\{e \in S \mid C_U(e, U)\} = \emptyset$ for candidate set $S$, then $S$ itself is returned (allowing word repetition). Formally:

$$\text{fresh}(S, U) = \begin{cases} \{e \in S \mid e.w \notin U\} & \text{if non-empty} \\ S & \text{otherwise} \end{cases}$$

### 7.4 Word Selection

**Definition 7.7** (Single-Slot Selection).
The word selection function $\text{pick} : (\text{Slot} \times 2^{\Sigma^+} \times (V \cup \{\bot\})) \to \Sigma^+ \cup \{\bot\}$:

$$\text{pick}(s, U, \hat\rho) = \begin{cases} e.w \text{ where } e \sim \text{Unif}(\mathcal{C}_j) & \text{if } j = \min\{i \in [6] \mid \mathcal{C}_i \neq \emptyset\} \\ \bot & \text{if } \forall i \in [6] : \mathcal{C}_i = \emptyset \end{cases}$$

The first non-empty pass wins. Within that pass, the choice is uniformly random.

### 7.5 Line Assembly

**Definition 7.8** (Line Generation).
Given a slot sequence $\mathbf{s} = (s_1, \dots, s_n)$, poem-level used set $U_\text{poem}$, and rhyme target $\hat\rho$:

$$\text{fill\_line}(\mathbf{s}, U_\text{poem}, \hat\rho):$$

Initialize $U_\text{line} = \emptyset$, $\mathbf{w} = ()$.

For $i = 1, \dots, n$:
1. $\hat\rho_i = \hat\rho$ if $s_i.\beta = 1$, else $\bot$
2. $w_i = \text{pick}(s_i, \;U_\text{poem} \cup U_\text{line}, \;\hat\rho_i)$
3. If $w_i = \bot$: return $\bot$ (line failure)
4. $U_\text{line} \leftarrow U_\text{line} \cup \{w_i\}$
5. $\mathbf{w} \leftarrow \mathbf{w} \cdot (w_i)$

Return $\mathbf{w} = (w_1, \dots, w_n)$.

**Proposition 7.1** (Metric Correctness of a Line).
*If $\text{fill\_line}$ returns $\mathbf{w} \neq \bot$, then $\forall i \in [n] : m_c(w_i) = p_i$.*

*Proof.* Each $w_i$ is drawn from a candidate set $\mathcal{C}_j$ that is a subset of $I_c(\tau, m)$ for some $\tau$ and $m = p_i$. By definition of the inverted index, $m_c(e.w) = m$ for all $e \in I_c(\tau, m)$. ∎

---

## 8. Rhyme State Machine

### 8.1 ABAB Scheme

**Definition 8.1** (Rhyme State).
The rhyme state is a single variable $\hat\rho \in V \cup \{\bot\}$, updated across lines:

For line index $\ell \in \{0, \dots, k-1\}$:
- If $\ell$ is **even** (0-indexed: $\ell \in \{0, 2, 4, \dots\}$): this is an "odd" line in 1-indexed poetry.
  - $\hat\rho$ is not consumed. After successful generation, set $\hat\rho \leftarrow \rho(w_n)$ where $w_n$ is the last word of this line.
- If $\ell$ is **odd** ($\ell \in \{1, 3, 5, \dots\}$): this is an "even" line.
  - The last slot has $\beta = 1$. The picker constrains it to match $\hat\rho$.

**Proposition 8.1** (ABAB Emergence).
*The state machine produces an ABAB rhyme scheme. Lines 0 and 1 share rhyme class $\rho_A$. Lines 2 and 3 share rhyme class $\rho_B$. For a 2k-line poem, lines $2i$ and $2i+1$ share rhyme class $\rho_i$ for each $i$.*

*Proof.* Line 0 sets $\hat\rho = \rho(w_n^{(0)})$. Line 1's last slot is constrained to $\hat\rho$, so $\rho(w_n^{(1)}) = \hat\rho = \rho(w_n^{(0)})$. Line 2 overwrites $\hat\rho = \rho(w_n^{(2)})$. Line 3 matches it. By induction, $\rho(w_n^{(2i)}) = \rho(w_n^{(2i+1)})$ for all $i$. ∎

---

## 9. Poem Assembly and Retry Semantics

### 9.1 Formal Definition of a Poem

**Definition 9.1** (Poem).
A poem is a tuple $\mathfrak{P} = (\mathbf{p},\; c,\; k,\; \boldsymbol{\pi},\; \mathbf{L})$ where:
- $\mathbf{p} \in (\mathbb{N}^+)^n$ — prosodic pattern
- $c = \chi(\mathbf{p}) \in \mathcal{C}$ — detected Chhondo
- $k \in \mathbb{N}^+$ — number of lines
- $\boldsymbol{\pi} \in \mathcal{F}^k$ — field trajectory with $\pi_{k-1} \in \mathcal{R}$
- $\mathbf{L} = (L_0, L_1, \dots, L_{k-1})$ — line sequence, where each $L_\ell = (w_1^{(\ell)}, \dots, w_n^{(\ell)}) \in (\Sigma^+)^n$

satisfying:
1. **Metric constraint:** $\forall \ell \in [k],\; \forall i \in [n] : m_c(w_i^{(\ell)}) = p_i$
2. **Thematic constraint:** $\boldsymbol{\pi}$ is a minimum-cost path on $G^{(k)}$ terminating in $\mathcal{R}$
3. **Rhyme constraint:** $\forall j \in \{0, \dots, \lfloor(k-2)/2\rfloor\} : \rho(w_n^{(2j)}) = \rho(w_n^{(2j+1)})$

### 9.2 Generation Algorithm

**Algorithm 1:** `GENERATE(𝐩, k, F₀)`

**Input:** Pattern $\mathbf{p}$, line count $k$, start family $F_0$
**Output:** Poem $\mathfrak{P}$ or FAILURE

```c
1.  c ← χ(𝐩)
2.  Build inverted index I_c and rhyme index R
3.  for a ← 1 to MAX_POEM (= 5) do
4.      𝛑 ← k-HOP-DIJKSTRA(G, F₀, ℛ, k)
5.      U_poem ← ∅
6.      𝐋 ← ()
7.      ρ̂ ← ⊥
8.      failed ← false
9.      for ℓ ← 0 to k−1 do
10.         F ← 𝛑[ℓ]
11.         is_even ← (ℓ mod 2 = 1)
12.         ρ_target ← ρ̂ if is_even, else ⊥
13.         𝐰 ← ⊥
14.         for b ← 1 to MAX_LINE (= 10) do
15.             γ ← SAMPLE(Γ_F)
16.             𝐬 ← EXPAND(γ, 𝐩, ℓ)
17.             𝐰 ← FILL_LINE(𝐬, U_poem, ρ_target)
18.             if 𝐰 ≠ ⊥ then break
19.         end for
20.         if 𝐰 = ⊥ then failed ← true; break
21.         U_poem ← U_poem ∪ {w₁, …, wₙ}
22.         if ¬is_even then ρ̂ ← ρ(wₙ)
23.         𝐋 ← 𝐋 · (𝐰)
24.     end for
25.     if ¬failed then return (𝐩, c, k, 𝛑, 𝐋)
26. end for
27. return FAILURE
```

### 9.3 Retry Complexity

**Proposition 9.1.**
*The worst-case number of slot-fill attempts per poem is bounded by:*

$$\text{MAX\_POEM} \times k \times \text{MAX\_LINE} \times n = 5 \times k \times 10 \times n$$

*For $k = 4$, $n = 4$: at most 800 pick operations per poem.*

---

## 10. Probability Space over Poems

### 10.1 Sources of Randomness

The generation algorithm has exactly two sources of randomness:

1. **Production selection** (line 15): $\gamma \sim \text{Unif}(\Gamma_F)$ for each line attempt
2. **Word selection** (within `pick`): $e \sim \text{Unif}(\mathcal{C}_j)$ for each slot

The trajectory $\boldsymbol{\pi}$ is deterministic given $(G, F_0, \mathcal{R}, k)$ — ties in Dijkstra are resolved by heap ordering, which is implementation-dependent but fixed for a given state.

### 10.2 Probability of a Specific Poem

**Definition 10.1** (Poem Probability).
Fix pattern $\mathbf{p}$, start $F_0$, $k$ lines, trajectory $\boldsymbol{\pi}$. Conditioned on no retries being triggered, the probability of generating a specific poem $\mathfrak{P}$ with line words $\mathbf{L} = ((w_1^{(0)}, \dots, w_n^{(0)}), \dots, (w_1^{(k-1)}, \dots, w_n^{(k-1)}))$:

$$\Pr[\mathfrak{P}] = \prod_{\ell=0}^{k-1} \frac{1}{|\Gamma_{\pi_\ell}|} \cdot \prod_{i=1}^{n} \frac{1}{|\mathcal{C}_{j^*}(s_i^{(\ell)}, U_{\ell,i}, \hat\rho_{\ell,i})|}$$

where:
- $j^*$ is the first non-empty pass for slot $s_i^{(\ell)}$
- $U_{\ell,i}$ is the accumulated used-word set at position $(\ell, i)$
- $\hat\rho_{\ell,i}$ is the active rhyme constraint at position $(\ell, i)$

Note that the candidate set sizes depend on all previously chosen words (through the used-set $U$), making successive slot selections **dependent** random variables. The joint probability does not factor into independent terms — it is inherently sequential.

### 10.3 Entropy Bound

**Proposition 10.1** (Per-Line Entropy Upper Bound).
*The entropy of a single generated line is bounded above by:*

$$H(L_\ell) \leq \log_2 |\Gamma_{\pi_\ell}| + \sum_{i=1}^{n} \log_2 |I_c(\tau_i, p_i)|$$

*Equality holds when all filters (POS, rhyme, used) are vacuous. In practice, filtering reduces the candidate sets, decreasing entropy.*

### 10.4 Retry Distribution

**Proposition 10.2** (Success Probability).
*Let $p_\ell$ be the probability that a single attempt at line $\ell$ succeeds (i.e., $\text{fill\_line} \neq \bot$). Then:*

*The probability of the poem succeeding without any retries is:*

$$\Pr[\text{first-try success}] = \prod_{\ell=0}^{k-1} p_\ell$$

*The probability of the poem succeeding within the retry budget is:*

$$\Pr[\text{success}] = 1 - \prod_{a=1}^{\text{MAX\_POEM}} \Big(1 - \prod_{\ell=0}^{k-1} \big(1 - (1 - p_\ell)^{\text{MAX\_LINE}}\big)\Big)$$

*This assumes retry attempts are independent (fresh randomness each time).*

---

## 11. Formal Guarantees

**Theorem 11.1** (Metric Correctness).
*If Algorithm 1 returns a poem $\mathfrak{P}$, then:*

$$\forall \ell \in \{0, \dots, k-1\},\; \forall i \in [n] : m_c(w_i^{(\ell)}) = p_i$$

*Proof.* Every word $w_i^{(\ell)}$ is selected from a candidate set $\mathcal{C}_j \subseteq I_c(\tau, p_i)$ for some tag $\tau$. By construction of $I_c$, every entry $e \in I_c(\tau, m)$ satisfies $m_c(e.w) = m$. Since $m = p_i$ in all six passes, the result follows. mātrā is never relaxed — it is a precondition for index membership, not a filter. ∎

**Theorem 11.2** (Thematic Coherence).
*If Algorithm 1 returns a poem $\mathfrak{P}$, then the field trajectory $\boldsymbol{\pi}$ is the minimum-cost path on $G^{(k)}$ from $(F_0, 0)$ to $\mathcal{R} \times \{k-1\}$.*

*Proof.* Line 4 of Algorithm 1 invokes Dijkstra on the layered graph $G^{(k)}$ with well-defined non-negative edge weights and a fixed terminal set. Dijkstra's algorithm is correct for graphs with non-negative edge weights (Dijkstra, 1959). ∎

**Theorem 11.3** (ABAB Rhyme).
*If Algorithm 1 returns a poem $\mathfrak{P}$ with $k$ lines, then:*

$$\forall j \in \{0, \dots, \lfloor(k-2)/2\rfloor\} : \rho(w_n^{(2j)}) = \rho(w_n^{(2j+1)})$$

*Proof.* By Proposition 8.1 and the construction of the rhyme state machine (lines 11–12, 22 of Algorithm 1). ∎

**Corollary 11.1** (Constraint Satisfaction Completeness).
*A poem $\mathfrak{P}$ returned by Algorithm 1 simultaneously satisfies the metric, thematic, and phonetic constraints. No constraint is satisfied probabilistically — all hold by construction.*

---

## 12. Structural Properties of the System

### 12.1 Monotonicity of Constraint Relaxation

**Proposition 12.1.**
*The six-pass chain is monotonically relaxing: the candidate set at pass $j$ is a superset of the candidate set that would be obtained by intersecting all constraints active at pass $j$, and:*

$$\mathcal{C}_1 \subseteq \mathcal{C}_2 \subseteq \mathcal{C}_3$$

*Passes 4–6 search over strictly wider tag domains, so the union of all possible candidates across passes 1–6 is monotonically non-decreasing.*

*This guarantees that if any pass succeeds, all subsequent passes would also succeed (with potentially different — and larger — candidate sets).*

### 12.2 Termination

**Proposition 12.2.**
*Algorithm 1 always terminates. Its running time is bounded by $O(\text{MAX\_POEM} \cdot k \cdot \text{MAX\_LINE} \cdot n \cdot |\mathcal{L}|)$.*

*Proof.* All loops have finite bounds. The `pick` function iterates through at most 6 passes, each performing at most $O(|\mathcal{L}|)$ filtering work. ∎

### 12.3 Non-Determinism Characterization

**Proposition 12.3.**
*Two invocations of Algorithm 1 with identical inputs may produce different poems. The set of all possible outputs is:*

$$\mathfrak{P}(\mathbf{p}, k, F_0) = \big\{ \mathfrak{P} \mid \mathfrak{P} \text{ satisfies Definition 9.1}\big\}$$

*The cardinality of this set is bounded above by:*

$$|\mathfrak{P}(\mathbf{p}, k, F_0)| \leq \prod_{\ell=0}^{k-1} |\Gamma_{\pi_\ell}| \cdot \prod_{i=1}^{n} |I_c(\tau_i^\text{(max)}, p_i)|$$

*where $\tau_i^\text{(max)}$ is the tag yielding the largest bucket at mātrā $p_i$. In practice, the actual reachable set is significantly smaller due to used-word filtering and cascading constraint dependencies.*

---

## 13. Connection to Established Frameworks

### 13.1 As a Constraint Satisfaction Problem

The system can be formulated as a CSP $(\mathcal{X}, \mathcal{D}, \mathcal{C})$ where:

- **Variables:** $\mathcal{X} = \{x_{(\ell, i)} \mid \ell \in \{0, \dots, k-1\},\; i \in [n]\}$ — one variable per word slot across all lines.
- **Domains:** $\mathcal{D}(x_{(\ell,i)}) = \{e.w \mid e \in I_c(\tau_i^{(\ell)}, p_i)\}$ — the set of words at the slot's tag and mātrā.
- **Constraints:**
  - Metric: $m_c(x_{(\ell,i)}) = p_i$ — enforced by domain definition
  - Semantic: $x_{(\ell,i)}.\tau \in \text{tag-scope}(\tau_i^{(\ell)})$ — the tag scope is the tag itself plus its fallback chain
  - Rhyme: $\rho(x_{(\ell, n)}) = \rho(x_{(\ell-1, n)})$ for odd $\ell$
  - Uniqueness (soft): $x_{(\ell,i)} \neq x_{(\ell',i')}$ for $(\ell,i) \neq (\ell',i')$ — relaxed if infeasible

The solver is a **constructive, sequential, forward-checking** algorithm with **random restarts** (line retries with fresh CFG production) and **no backtracking within a line**.

This places it in the family of local-search CSP solvers described by Dechter (2003), with the distinction that the hard constraint (mātrā) is enforced structurally through index construction rather than through filtering.

### 13.2 As a Formal Language Construction

The two-level grammar can be viewed as a **stochastic context-free grammar** (SCFG) where:

$$G_\text{poem} = (N, \Sigma^+, R, \langle\text{POEM}\rangle)$$

with non-terminals $N = \{\langle\text{POEM}\rangle, \langle\text{LINE}_F\rangle_{F \in \mathcal{F}}, \langle\text{SLOT}_{(\tau, \pi, m)}\rangle\}$ and production rules:

$$\langle\text{POEM}\rangle \to \langle\text{LINE}_{\pi_0}\rangle \;\langle\text{LINE}_{\pi_1}\rangle \;\cdots\; \langle\text{LINE}_{\pi_{k-1}}\rangle$$

$$\langle\text{LINE}_F\rangle \to \langle\text{SLOT}_{\gamma^{(j)}_1}\rangle \;\cdots\; \langle\text{SLOT}_{\gamma^{(j)}_n}\rangle \quad \text{with probability } \frac{1}{|\Gamma_F|}$$

$$\langle\text{SLOT}_{(\tau, \pi, m)}\rangle \to w \quad \text{for each } w \in I_c(\tau, m), \text{ uniformly}$$

The distinction from standard SCFGs is that slot-level probabilities are conditioned on the used-word history (a non-Markov dependency), making the process **context-sensitive in the probability model** while remaining context-free in structure.

### 13.3 As Graph-Constrained Generation

The trajectory planning stage is an instance of the **resource-constrained shortest path problem** (Irnich & Desaulniers, 2005) on a layered (time-expanded) graph, where the resource is the number of hops (constrained to exactly $k$) and the terminal constraint restricts the final node to $\mathcal{R}$.

More precisely, it is equivalent to the **$k$-hop shortest path problem with terminal constraints**, studied in network optimization:

Given $G = (V, E, w)$, source $s$, target set $T \subseteq V$, and integer $k$, find:
$$\min_{p \in \mathcal{P}_{s,T}^k} \sum_{(u,v) \in p} w(u,v)$$
where $\mathcal{P}_{s,T}^k$ is the set of all exactly-$k$-hop paths from $s$ to any $t \in T$.

---

## References

- Dechter, R. (2003). *Constraint Processing*. Morgan Kaufmann.
- Dijkstra, E. W. (1959). "A note on two problems in connexion with graphs." *Numerische Mathematik*, 1, 269–271.
- Hopcroft, J., Motwani, R., & Ullman, J. (2006). *Introduction to Automata Theory, Languages, and Computation*. Addison-Wesley.
- Irnich, S. & Desaulniers, G. (2005). "Shortest Path Problems with Resource Constraints." In *Column Generation*, Springer, 33–65.
- Astigarraga, A., et al. (2017). "Poet's Little Helper: A methodology for computer-based poetry generation." *Proc. CC-NLG 2017*, 2–10.
- Gonçalo Oliveira, H. (2017). "O Poeta Artificial 2.0: Increasing Meaningfulness in a Poetry Generation Twitter bot." *Proc. CC-NLG 2017*, 11–20.
- Toivanen, J. M. *Methods and Models in Linguistic and Musical Computational Creativity*. University of Helsinki.
- Meehan, J. R. (1977). "TALE-SPIN, An Interactive Program that Writes Stories." *IJCAI-77*, 91–98.

---

## Appendix A: Summary of Constants

| Constant | Value | Source |
|----------|:-----:|--------|
| $\|\Sigma_C\|$ | 38 | Character class definition |
| $\|V\|$ | 21 | Vowel set (independent + dependent) |
| $\|\mathcal{C}\|$ | 3 | Chhondo count |
| $\|\mathcal{T}\|$ | 21 | Semantic tag count |
| $\|\mathcal{F}\|$ | 9 | Family count |
| $\|\mathcal{N}\|$ | 11 | Natural poetic pairs |
| $\|\mathcal{R}\|$ | 2 | Resolved terminal families |
| $\|E\|$ | 72 | Directed edges in $G$ |
| $\sum q_F$ | 27 | Total production count |
| MAX\_LINE | 10 | Line retry budget |
| MAX\_POEM | 5 | Poem retry budget |

## Appendix B: Weight Matrix of $G$

Let the families be ordered as: N(ature), L(ight), T(ime), Mo(tion), So(und), Em(otion), Ac(tor), D(escriptor), Co(nnector).

$$W = \begin{pmatrix} \cdot & 2 & 2 & 2 & 2 & 4 & 4 & 2 & 1 \\ 2 & \cdot & 2 & 3 & 3 & 2 & 4 & 3 & 1 \\ 2 & 2 & \cdot & 3 & 3 & 4 & 4 & 3 & 1 \\ 2 & 3 & 3 & \cdot & 2 & 4 & 2 & 3 & 1 \\ 2 & 3 & 3 & 2 & \cdot & 2 & 4 & 3 & 1 \\ 4 & 2 & 4 & 4 & 2 & \cdot & 2 & 4 & 1 \\ 4 & 4 & 4 & 2 & 4 & 2 & \cdot & 4 & 1 \\ 2 & 3 & 3 & 3 & 3 & 4 & 4 & \cdot & 1 \\ 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & \cdot \end{pmatrix}$$

$W$ is symmetric ($W = W^\top$). The CONNECTOR row/column is all 1s. The matrix eigenstructure encodes the partition geometry of the semantic space.
