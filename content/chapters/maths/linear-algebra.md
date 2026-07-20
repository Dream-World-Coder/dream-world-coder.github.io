<!--metadata
    title: "Linear Algebra"
    authors: ["Subhajit", "claude.ai"]
    dateCreated: "20/07/2026"
    dateEdited: "20/07/2026"
    description: "A structural and computational approach to vector spaces, matrix decompositions, and spectral theory — with a running statistical throughline — for ISI M.Stat, IIT JAM, and GATE Statistics entrance exams."
    tags: ["linear algebra", "statistics", "mathematics"]
-->

# Linear Algebra

## Preface

This treatise is written for a reader who already possesses fluency with abstract algebraic structures — groups, rings, fields — and with the grammar of proof-writing (direct proof, contradiction, induction, contrapositive). It does **not** re-derive what a field is, nor does it pause to motivate why linear algebra matters; the reader is assumed to already believe that. Instead, the emphasis throughout is on:

1. **Structural completeness** — every definition is stated in full generality (over $\mathbb{R}$ or $\mathbb{C}$, or an arbitrary field $\mathbb{F}$ where the distinction is immaterial), and every theorem is stated with its precise hypotheses.
2. **Exam-grade rigor** — the proofs given are the ones you would be expected to reproduce, or at least sketch cogently, in an ISI/JAM/GATE written examination.
3. **The statistical undercurrent** — wherever a piece of linear algebra has a direct statistical avatar (idempotents as projections in OLS, positive-definiteness as the admissibility condition for a covariance matrix, the pseudoinverse as the tool of generalized least squares), this is flagged as a **Remark**.

Where a fully general proof is genuinely outside the scope of an entrance-exam treatise (e.g. the existence of Jordan Canonical Form over $\mathbb{C}$), the theorem is stated precisely, its proof is **outlined** with the key lemmas named, and the reader is pointed to the standard references (Hoffman–Kunze, Horn & Johnson, Axler).

Work through the Challenge Problems seriously. They are calibrated to ISI M.Stat subjective-paper difficulty, not to routine JAM objective-paper difficulty — if a Challenge Problem takes you forty minutes and two false starts, that is exactly the intended experience.

---

## Table of Contents

- [Conventions and Notation](#conventions-and-notation)
- **Part 1 — Vector Spaces and Linear Transformations**
  - 1.1 Vector Spaces and Subspaces
  - 1.2 Span, Independence, Basis, Dimension
  - 1.3 Linear Transformations and Matrix Representation
  - 1.4 The Four Fundamental Subspaces and Rank–Nullity
  - 1.5 Challenge Problems
- **Part 2 — Determinant, Trace, Rank, and Inverse**
  - 2.1 Rank Revisited: Sylvester's Inequality
  - 2.2 Trace
  - 2.3 Determinants
  - 2.4 The Inverse, Adjugate, and Matrix Identities
  - 2.5 Problem-Solving Tricks
  - 2.6 Challenge Problems
- **Part 3 — Systems of Linear Equations**
  - 3.1 Matrix Formulation and Consistency
  - 3.2 The Rouché–Capelli Theorem
  - 3.3 Structure of the Solution Set
  - 3.4 The Moore–Penrose Pseudoinverse
  - 3.5 Challenge Problems
- **Part 4 — Eigenvalues, Eigenvectors, and Diagonalization**
  - 4.1 Eigenvalues, Eigenvectors, Characteristic Polynomial
  - 4.2 Multiplicities and Diagonalizability
  - 4.3 Cayley–Hamilton and the Minimal Polynomial
  - 4.4 Similarity Invariants
  - 4.5 Challenge Problems
- **Part 5 — Spectral Theory and Special Matrices**
  - 5.1 Symmetric, Orthogonal, Idempotent, Nilpotent
  - 5.2 The Spectral Theorem
  - 5.3 Positive Definite and Semi-Definite Matrices
  - 5.4 Singular Value Decomposition
  - 5.5 Challenge Problems
- [Appendix: Master Formula Sheet](#appendix-master-formula-sheet)
- [Closing Remark: The Unifying Theme](#closing-remark-the-unifying-theme)

---

## Conventions and Notation

- $\mathbb{F}$ denotes a general field; where a statement requires $\mathbb{R}$ or $\mathbb{C}$ specifically, this is stated.
- $V, W, U$ denote vector spaces over $\mathbb{F}$; $\dim V$ denotes dimension.
- $M_{m\times n}(\mathbb{F})$ is the space of $m\times n$ matrices over $\mathbb{F}$; $M_n(\mathbb{F}) := M_{n\times n}(\mathbb{F})$.
- $A^T$ denotes transpose; $A^{*} = \bar{A}^T$ denotes conjugate transpose (Hermitian adjoint). Over $\mathbb{R}$, $A^* = A^T$.
- $I_n$ (or $I$) is the identity matrix; $0$ is the zero matrix/vector, disambiguated by context.
- $\text{rank}(A)$, $\text{tr}(A)$, $\det(A)$, $\text{null}(A)$ denote rank, trace, determinant, nullity.
- $\mathcal{C}(A)$: column space; $\mathcal{R}(A)$: row space; $\mathcal{N}(A)$: null space (kernel); $\mathcal{N}(A^T)$: left null space.
- $\langle \cdot,\cdot\rangle$ denotes an inner product; on $\mathbb{R}^n$ this is $\langle x,y\rangle = x^Ty$ unless otherwise stated.
- $A \succeq 0$ means $A$ is positive semi-definite; $A \succ 0$ means positive definite. For symmetric $A,B$, $A\succeq B$ means $A-B\succeq0$ (the **Loewner order**).
- $\sigma(A)$ denotes the spectrum (multiset of eigenvalues) of $A$.
- We use $\text{span}(S)$, $\dim(V)$, and $V \oplus W$ (direct sum) in the standard sense.
- All vector spaces considered are **finite-dimensional** unless explicitly stated otherwise.
- $\blacksquare$ closes a proof; $\square$ closes a worked example.

---

## Part 1 — Vector Spaces and Linear Transformations

### 1.1 Vector Spaces and Subspaces

**Definition 1.1.1 (Vector Space).**
A *vector space* over a field $\mathbb{F}$ is a set $V$ equipped with two operations, vector addition $+: V\times V \to V$ and scalar multiplication $\cdot: \mathbb{F}\times V \to V$, satisfying the following axioms for all $u,v,w \in V$ and $\alpha,\beta \in \mathbb{F}$:

1. $(V,+)$ is an abelian group: associativity, commutativity, existence of additive identity $0_V$, existence of additive inverses.
2. $\alpha(u+v) = \alpha u + \alpha v$ (distributivity over vector addition).
3. $(\alpha+\beta)v = \alpha v + \beta v$ (distributivity over scalar addition).
4. $(\alpha\beta)v = \alpha(\beta v)$ (compatibility of scalar multiplication with field multiplication).
5. $1\cdot v = v$ for the multiplicative identity $1 \in \mathbb{F}$.

**Remark.** For $\mathbb{F} = \mathbb{R}$, $V$ is called a *real* vector space; for $\mathbb{F} = \mathbb{C}$, a *complex* vector space. In statistics, real vector spaces dominate (data lives in $\mathbb{R}^n$), but complex vector spaces are indispensable in spectral theory, since a real matrix may have complex eigenvalues.

**Definition 1.1.2 (Subspace).**
A subset $W \subseteq V$ is a *subspace* if $W$ is itself a vector space under the operations inherited from $V$. Equivalently (and this is the operational criterion), $W$ is a subspace iff:

(i) $0_V \in W$;
(ii) $W$ is closed under addition: $u,v \in W \implies u+v \in W$;
(iii) $W$ is closed under scalar multiplication: $\alpha \in \mathbb{F}, v\in W \implies \alpha v \in W$.

(Conditions (ii) and (iii) can be compressed into a single closure-under-linear-combination condition.)

**Theorem 1.1.3.** If $U, W$ are subspaces of $V$, then $U \cap W$ is a subspace of $V$. In general, $U \cup W$ is **not** a subspace unless $U \subseteq W$ or $W \subseteq U$.

*Proof.* $0_V \in U \cap W$ since $0_V \in U$ and $0_V \in W$. Closure under addition and scalar multiplication in $U \cap W$ follows immediately from closure in each of $U$ and $W$ separately. For the second claim: suppose neither $U \subseteq W$ nor $W \subseteq U$. Pick $u \in U \setminus W$ and $w \in W \setminus U$. If $u + w \in U \cup W$, then either $u+w \in U$, forcing $w = (u+w) - u \in U$ — contradiction — or $u + w \in W$, forcing $u \in W$ by the symmetric argument — contradiction. Hence $u+w \notin U\cup W$, so $U \cup W$ fails closure. $\blacksquare$

**Definition 1.1.4 (Sum of Subspaces).** For subspaces $U, W \subseteq V$, the *sum* is
$$U + W := \{u + w : u \in U,\ w \in W\}.$$
This is the smallest subspace of $V$ containing $U \cup W$. If $U \cap W = \{0\}$, the sum is called a *direct sum*, written $U \oplus W$, and every $v \in U \oplus W$ has a **unique** decomposition $v = u + w$.

---

### 1.2 Span, Independence, Basis, Dimension

**Definition 1.2.1 (Linear Span).** For $S = \{v_1,\dots,v_k\} \subseteq V$,
$$\text{span}(S) := \left\{\sum_{i=1}^k \alpha_i v_i : \alpha_i \in \mathbb{F}\right\}.$$
This is a subspace of $V$ — indeed, the intersection of all subspaces containing $S$.

**Definition 1.2.2 (Linear Independence).** $S = \{v_1,\dots,v_k\}$ is *linearly independent* if
$$\sum_{i=1}^k \alpha_i v_i = 0 \implies \alpha_1 = \cdots = \alpha_k = 0.$$
Otherwise $S$ is *linearly dependent*: some $v_j$ is expressible as a linear combination of the others.

**Definition 1.2.3 (Basis).** $\mathcal{B} \subseteq V$ is a *basis* if $\mathcal{B}$ is linearly independent and $\text{span}(\mathcal{B}) = V$.

**Theorem 1.2.4 (Steinitz Exchange Lemma).** Let $\{v_1,\dots,v_m\}$ be linearly independent in $V$ and let $\{w_1,\dots,w_n\}$ span $V$. Then $m \le n$, and $m$ of the $w_i$ can be replaced by the $v_i$ to yield a spanning set.

*Proof sketch.* Induct on $m$. Since $\{w_i\}$ spans $V$, write $v_1 = \sum c_i w_i$; some $c_j \ne 0$ (as $v_1 \ne 0$ by independence), so we may swap $w_j$ out for $v_1$, and the resulting set $\{v_1, w_1,\dots,\widehat{w_j},\dots,w_n\}$ still spans $V$. Repeat this exchange for $v_2,\dots,v_m$; independence of the $v_i$ guarantees at each stage that some $w$-vector remains available to eject (if none did, the current $v_k$ would already lie in the span of the previously-inserted $v_1,\dots,v_{k-1}$, contradicting independence), forcing $m \le n$. $\blacksquare$

**Corollary 1.2.5 (Well-Definedness of Dimension).** Any two bases of $V$ have the same cardinality. This common cardinality is called $\dim(V)$.

**Theorem 1.2.6 (Dimension Formula for Sums).**
$$\dim(U+W) = \dim(U) + \dim(W) - \dim(U\cap W).$$

*(Full proof given in §1.5, Challenge Problem 1 — this is the flagship result of Part 1.)*

**Trick 1.2.7.** To check linear independence of $k$ vectors in $\mathbb{F}^n$ quickly, stack them as rows/columns of a matrix and row-reduce; independence $\iff$ rank equals $k$. For abstract vector spaces (e.g. polynomial spaces), evaluate at $k$ well-chosen points or differentiate, turning the question into a Wronskian/determinant computation.

**Example 1.2.8.** In $P_3(\mathbb{R})$ (polynomials of degree $\le 3$), are $1, x, x^2 - 1, x^3 + x$ linearly independent? Express in the monomial basis coordinates $(1,0,0,0), (0,1,0,0), (-1,0,1,0), (0,1,0,1)$, stack as rows, row reduce:
$$\begin{pmatrix} 1&0&0&0\\0&1&0&0\\-1&0&1&0\\0&1&0&1\end{pmatrix} \xrightarrow{R_3 \to R_3+R_1,\ R_4\to R_4 - R_2} \begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&1\end{pmatrix},$$
rank $4$, so the four vectors are independent (and hence a basis of the $4$-dimensional space $P_3(\mathbb{R})$). $\square$

---

### 1.3 Linear Transformations and Matrix Representation

**Definition 1.3.1 (Linear Transformation).** $T: V \to W$ is *linear* if $T(\alpha u + \beta v) = \alpha T(u) + \beta T(v)$ for all $u,v\in V,\ \alpha,\beta\in\mathbb{F}$.

**Definition 1.3.2 (Matrix Representation).** Fix ordered bases $\mathcal{B} = (v_1,\dots,v_n)$ of $V$ and $\mathcal{C} = (w_1,\dots,w_m)$ of $W$. The matrix representation $[T]_{\mathcal{C}}^{\mathcal{B}} \in M_{m\times n}(\mathbb{F})$ has $j$-th column equal to the $\mathcal{C}$-coordinate vector of $T(v_j)$. Then for any $v \in V$,
$$[T(v)]_{\mathcal{C}} = [T]_{\mathcal{C}}^{\mathcal{B}} [v]_{\mathcal{B}}.$$

**Theorem 1.3.3 (Change of Basis).** Let $\mathcal{B}, \mathcal{B}'$ be two bases of $V$ and let $P$ be the change-of-basis matrix whose columns are the $\mathcal{B}$-coordinates of the $\mathcal{B}'$-basis vectors (so $[v]_{\mathcal{B}} = P[v]_{\mathcal{B}'}$ for every $v \in V$). If $T: V \to V$ is linear with matrix $A = [T]_{\mathcal{B}}^{\mathcal{B}}$, then
$$[T]_{\mathcal{B}'}^{\mathcal{B}'} = P^{-1} A P.$$
That is, matrices representing the same linear operator in different bases are **similar**.

*Proof.* Since $[w]_{\mathcal{B}} = P[w]_{\mathcal{B}'}$ holds for every $w \in V$, equivalently $[w]_{\mathcal{B}'} = P^{-1}[w]_{\mathcal{B}}$ for every $w$. Apply this to $w = T(v)$:
$$[T(v)]_{\mathcal{B}'} = P^{-1}[T(v)]_{\mathcal{B}} = P^{-1}A[v]_{\mathcal{B}} = P^{-1}AP[v]_{\mathcal{B}'}.$$
Since this holds for all $v$, the matrix $P^{-1}AP$ represents $T$ in basis $\mathcal{B}'$. $\blacksquare$

**Remark.** Similarity is the correct notion of "sameness" for linear operators — it will recur throughout Part 4, since eigenvalues, trace, determinant, rank, and the characteristic polynomial are all *similarity invariants*. It is also the abstract statement behind principal component analysis: choosing a new orthonormal basis (the eigenbasis of a covariance matrix $\Sigma$) is nothing but a change of basis of exactly this kind, engineered so that $\Sigma$'s representation in the new basis is diagonal (§5.2).

---

### 1.4 The Four Fundamental Subspaces and Rank–Nullity

For $A \in M_{m\times n}(\mathbb{F})$, viewed as a linear map $\mathbb{F}^n \to \mathbb{F}^m$:

**Definition 1.4.1.**
- **Column space** $\mathcal{C}(A) = \{Ax : x \in \mathbb{F}^n\} \subseteq \mathbb{F}^m$ — the range of $A$.
- **Null space** $\mathcal{N}(A) = \{x \in \mathbb{F}^n : Ax = 0\} \subseteq \mathbb{F}^n$ — the kernel of $A$.
- **Row space** $\mathcal{R}(A) = \mathcal{C}(A^T) \subseteq \mathbb{F}^n$.
- **Left null space** $\mathcal{N}(A^T) = \{y \in \mathbb{F}^m : A^Ty = 0\} \subseteq \mathbb{F}^m$.

**Theorem 1.4.2 (Row Rank = Column Rank).** For any $A \in M_{m\times n}(\mathbb{F})$, $\dim\mathcal{C}(A) = \dim\mathcal{R}(A)$. This common value is $\text{rank}(A)$.

*Proof.* Row-reduce $A$ to row echelon form $R = EA$ ($E$ invertible, a product of elementary matrices). Row operations preserve the row space (each row of $R$ is a linear combination of rows of $A$ and vice versa via $E^{-1}$), so $\dim\mathcal{R}(A) = \dim\mathcal{R}(R) = $ number of nonzero (pivot) rows of $R$. Also, the pivot columns of $R$ correspond exactly to a maximal linearly independent subset of columns of $A$ (since $x \mapsto Ex$ preserves linear dependence relations among columns, $E$ being invertible), giving $\dim\mathcal{C}(A) = $ number of pivot columns $=$ number of pivot rows. $\blacksquare$

**Theorem 1.4.3 (Rank–Nullity Theorem).** For a linear map $T: V \to W$ with $\dim V = n < \infty$,
$$\dim(\ker T) + \dim(\text{im } T) = n.$$
Equivalently, for $A \in M_{m\times n}(\mathbb{F})$: $\text{rank}(A) + \dim\mathcal{N}(A) = n$.

*Proof.* Let $\{u_1,\dots,u_k\}$ be a basis of $\ker T$ ($k = \dim\ker T$). Extend to a basis $\{u_1,\dots,u_k,v_1,\dots,v_{n-k}\}$ of $V$. **Claim:** $\{T(v_1),\dots,T(v_{n-k})\}$ is a basis of $\text{im}(T)$.

*Spanning:* any $T(v) = T(\sum a_iu_i + \sum b_j v_j) = \sum b_j T(v_j)$ since $T(u_i)=0$.

*Independence:* if $\sum b_j T(v_j) = 0$, then $\sum b_j v_j \in \ker T$, so $\sum b_j v_j = \sum a_i u_i$ for some $a_i$, i.e. $\sum b_jv_j - \sum a_iu_i = 0$; independence of the extended basis forces all $a_i = b_j = 0$.

Hence $\dim(\text{im }T) = n-k$, giving $k + (n-k) = n$. $\blacksquare$

**Theorem 1.4.4 (Orthogonality of the Fundamental Subspaces, over $\mathbb{R}$).**
$$\mathcal{R}(A) \perp \mathcal{N}(A) \quad\text{with}\quad \mathcal{R}(A) \oplus \mathcal{N}(A) = \mathbb{R}^n,$$
$$\mathcal{C}(A) \perp \mathcal{N}(A^T) \quad\text{with}\quad \mathcal{C}(A) \oplus \mathcal{N}(A^T) = \mathbb{R}^m.$$

*Proof.* If $x \in \mathcal{N}(A)$ and $y = A^Tz \in \mathcal{R}(A)$, then $\langle x, y\rangle = x^TA^Tz = (Ax)^Tz = 0^Tz = 0$. So $\mathcal{R}(A) \perp \mathcal{N}(A)$. By Theorem 1.4.3 applied to $A: \mathbb R^n \to \mathbb R^m$, $\text{rank}(A) + \dim\mathcal N(A) = n$; by Theorem 1.4.2, $\dim\mathcal R(A) = \text{rank}(A)$, so $\dim\mathcal{R}(A)+\dim\mathcal N(A) = n$. Orthogonality forces $\mathcal R(A) \cap \mathcal N(A) = \{0\}$ (any vector in the intersection is orthogonal to itself, hence zero), so this dimension count forces $\mathcal{R}(A) \oplus \mathcal{N}(A) = \mathbb{R}^n$. The second pair follows by applying the first pair to $A^T$ (noting $\mathcal{R}(A^T) = \mathcal{C}(A)$ by definition). $\blacksquare$

**Remark (Statistical Avatar).** This theorem is the abstract source of a fact every regression student memorizes without always seeing *why* it is true. In ordinary least squares with design matrix $X$, the residual vector $e = y - X\hat\beta$ satisfies the normal equations $X^Te = 0$, i.e. $e \in \mathcal{N}(X^T)$ — the left null space of $X$ — while the fitted values $\hat y = X\hat\beta$ lie in $\mathcal{C}(X)$ by construction. Theorem 1.4.4, applied with $X$ in place of $A$, says precisely $\mathcal{C}(X)\perp\mathcal N(X^T)$: **the residual vector is orthogonal to the fitted values, and to every regressor**, automatically — not a special virtue of least squares to be separately verified, but a direct instance of an orthogonality that holds for *any* matrix $X$. Least squares merely chooses $\hat\beta$ so that $\hat y$ is the point of $\mathcal C(X)$ closest to $y$; orthogonality of the resulting residual is then forced by this theorem.

**Trick 1.4.5.** Rank–Nullity is the single most exam-tested identity in this subject. Any question of the form "given constraints on $\ker T$ or $\text{im }T$, find the other" collapses to bookkeeping via this theorem. Combined with $\text{rank}(A) \le \min(m,n)$, it immediately yields: if $n > m$ (more unknowns than equations), $\mathcal{N}(A) \ne \{0\}$, i.e. $Ax=0$ has a nontrivial solution.

---

### 1.5 Challenge Problems

**Challenge Problem 1.** *(Flagship result — full proof required.)* Let $U, W$ be subspaces of a finite-dimensional vector space $V$. Prove that
$$\dim(U+W) = \dim(U) + \dim(W) - \dim(U\cap W).$$

*Proof.* Let $\dim(U \cap W) = k$, $\dim U = p$, $\dim W = q$. Choose a basis $\{x_1,\dots,x_k\}$ of $U \cap W$. Extend it to a basis $\{x_1,\dots,x_k,u_1,\dots,u_{p-k}\}$ of $U$, and separately extend it to a basis $\{x_1,\dots,x_k,w_1,\dots,w_{q-k}\}$ of $W$.

**Claim:** $\mathcal{S} = \{x_1,\dots,x_k,u_1,\dots,u_{p-k},w_1,\dots,w_{q-k}\}$ is a basis of $U+W$.

*Spanning:* Immediate, since every element of $U$ is a combination of $\{x_i,u_j\}$ and every element of $W$ is a combination of $\{x_i, w_l\}$, and $U+W$ is spanned by $U \cup W$.

*Independence:* Suppose
$$\sum_{i=1}^k a_ix_i + \sum_{j=1}^{p-k} b_ju_j + \sum_{l=1}^{q-k} c_lw_l = 0. \quad (\star)$$
Rearranging, $\sum c_l w_l = -\sum a_ix_i - \sum b_ju_j \in U$ (right side is a combination of $U$-basis vectors). But $\sum c_lw_l \in W$ too, so $\sum c_l w_l \in U \cap W$. Hence $\sum c_lw_l = \sum d_ix_i$ for some scalars $d_i$, i.e.
$$\sum c_lw_l - \sum d_ix_i = 0.$$
Since $\{x_i, w_l\}$ is a basis of $W$ (hence independent), all $c_l = 0$ and all $d_i = 0$. Substituting $c_l=0$ back into $(\star)$ gives $\sum a_ix_i + \sum b_ju_j = 0$; independence of the basis of $U$ forces all $a_i = b_j = 0$. Hence $(\star)$ has only the trivial solution, proving independence.

Therefore $\dim(U+W) = |\mathcal{S}| = k + (p-k) + (q-k) = p+q-k = \dim U + \dim W - \dim(U\cap W)$. $\blacksquare$

**Challenge Problem 2.** Let $T: V \to V$ be a linear operator on a finite-dimensional space with $T^2 = T$ (idempotent, i.e. a projection — see also §5.1). Prove that $V = \ker T \oplus \text{im}(T)$.

*Proof outline.* For $v \in V$, write $v = (v - Tv) + Tv$. Check $Tv \in \text{im}(T)$ trivially, and $T(v-Tv) = Tv - T^2v = Tv - Tv = 0$ so $v - Tv \in \ker T$; this gives $V = \ker T + \text{im}(T)$. For directness, suppose $x \in \ker T \cap \text{im}(T)$; then $x = Ty$ for some $y$, and $Tx = 0$, so $Tx = T^2y = Ty = x$, forcing $x = 0$. Hence the sum is direct. $\blacksquare$ (This result reappears with statistical content in §5.1 and the Closing Remark.)

**Challenge Problem 3** *(ISI-style, abstract operator).* Let $V$ be a finite-dimensional vector space and $T: V \to V$ linear with $\text{rank}(T) = \text{rank}(T^2)$. Prove that $\ker T \cap \text{im}(T) = \{0\}$, and hence $V = \ker T \oplus \text{im}(T)$.

*Proof outline.* By Rank–Nullity applied to $T$ restricted to $\text{im}(T)$: consider $T|_{\text{im}(T)}: \text{im}(T) \to \text{im}(T)$, well-defined since $T(\text{im }T) \subseteq \text{im}(T^2)\subseteq \text{im}(T)$. Its image is $\text{im}(T^2)$, which by hypothesis has the same dimension as $\text{im}(T)$ (the domain of this restricted map), forcing the restricted map to be injective (Rank–Nullity on the restriction: $\dim\ker(T|_{\text{im}T}) = \dim(\text{im }T) - \dim(\text{im }T^2) = 0$). But $\ker(T|_{\text{im}T}) = \ker T \cap \text{im}(T)$, giving the result. Directness of the sum then follows from dimension counting via Rank–Nullity, as in Challenge Problem 2. $\blacksquare$

**Challenge Problem 4** *(A trap for the unwary — conceptual, not computational).* Students who have just proved $\dim(U+W)=\dim U+\dim W-\dim(U\cap W)$ for two subspaces frequently conjecture the analogous inclusion–exclusion formula for three subspaces $U_1,U_2,U_3\subseteq V$:
$$\dim(U_1+U_2+U_3) \stackrel{?}{=} \sum_i \dim U_i - \sum_{i<j}\dim(U_i\cap U_j) + \dim(U_1\cap U_2\cap U_3). \quad (\dagger)$$
Show by an explicit low-dimensional counterexample that $(\dagger)$ is **false** in general, and identify precisely which step of the two-subspace proof fails to generalize.

*Solution.* Take $V=\mathbb R^2$ and
$$U_1 = \text{span}\{(1,0)\},\qquad U_2=\text{span}\{(0,1)\},\qquad U_3=\text{span}\{(1,1)\}.$$
Each $U_i$ is $1$-dimensional, and $U_1+U_2+U_3=\mathbb R^2$ (already $U_1+U_2=\mathbb R^2$), so $\dim(U_1+U_2+U_3)=2$.

Every pairwise intersection is trivial: $U_1\cap U_2=\{0\}$ since $(1,0),(0,1)$ are independent; $U_1\cap U_3=\{0\}$ since $(1,0),(1,1)$ are independent; $U_2\cap U_3=\{0\}$ since $(0,1),(1,1)$ are independent. Consequently $U_1\cap U_2\cap U_3=\{0\}$ as well. Substituting into the right side of $(\dagger)$:
$$\sum_i\dim U_i - \sum_{i<j}\dim(U_i\cap U_j)+\dim(U_1\cap U_2\cap U_3) = (1+1+1)-(0+0+0)+0 = 3 \ne 2 = \dim(U_1+U_2+U_3).$$
So $(\dagger)$ overcounts by exactly $1$, and is false.

*Where the two-subspace proof breaks down.* The proof of Challenge Problem 1 rests on the **modular law** $\dim(U+W)+\dim(U\cap W)=\dim U+\dim W$, which holds for any two subspaces. Iterating it naively for three subspaces implicitly assumes the subspace lattice is *distributive* — that $\cap$ distributes over $+$, i.e. $U_1\cap(U_2+U_3)=(U_1\cap U_2)+(U_1\cap U_3)$ — because that is what licenses expanding a three-term inclusion–exclusion the way it expands for sets (where $\cap$ genuinely does distribute over $\cup$). The lattice of subspaces of a vector space of dimension $\ge 2$ is modular but **not** distributive, and the counterexample above exhibits the failure directly: $U_1\cap(U_2+U_3)=U_1\cap\mathbb R^2=U_1$ (dimension $1$), while $(U_1\cap U_2)+(U_1\cap U_3)=\{0\}+\{0\}=\{0\}$ (dimension $0$) — the two sides disagree. This is the precise mechanism by which $(\dagger)$ fails: pairwise (and triple) intersection *dimensions* alone do not determine $\dim(U_1+U_2+U_3)$, because they do not encode how the intersections sit relative to one another inside the sum. What **does** survive to any number of subspaces is the weaker subadditivity inequality
$$\dim(U_1+\cdots+U_k) \le \sum_{i=1}^k \dim U_i,$$
obtained by inducting on the two-subspace formula and discarding the (nonnegative) intersection term at each stage — this is the fact used, for instance, in Challenge Problem 2 of §2.6. $\blacksquare$

---

## Part 2 — Determinant, Trace, Rank, and Inverse

### 2.1 Rank Revisited: Sylvester's Inequality

**Theorem 2.1.1 (Sub-additivity/Sub-multiplicativity of Rank under Products).** For $A \in M_{m\times n}(\mathbb{F})$, $B\in M_{n\times p}(\mathbb{F})$,
$$\text{rank}(A) + \text{rank}(B) - n \le \text{rank}(AB) \le \min(\text{rank}(A), \text{rank}(B)).$$
The left inequality is **Sylvester's Rank Inequality**.

*Proof.*
*Upper bound:* $\mathcal{C}(AB) \subseteq \mathcal{C}(A)$ since every column of $AB$ is $A$ times something, hence a combination of columns of $A$; so $\text{rank}(AB) \le \text{rank}(A)$. Also $\text{rank}(AB) = \text{rank}((AB)^T) = \text{rank}(B^TA^T) \le \text{rank}(B^T) = \text{rank}(B)$ by the same column-space argument applied to $B^TA^T$.

*Lower bound (Sylvester):* Consider the linear map $A|_{\mathcal{C}(B)}: \mathcal{C}(B)\to \mathbb{F}^m$, the restriction of $x \mapsto Ax$ to the subspace $\mathcal{C}(B) \subseteq \mathbb{F}^n$. We have $\text{im}(A|_{\mathcal{C}(B)}) = \mathcal{C}(AB)$ and $\ker(A|_{\mathcal{C}(B)}) = \mathcal{C}(B)\cap \mathcal{N}(A)$, so by Rank–Nullity applied to this restricted map,
$$\dim\mathcal{C}(B) = \dim(\mathcal{C}(B)\cap\mathcal{N}(A)) + \text{rank}(AB).$$
Now $\mathcal{C}(B) \cap \mathcal{N}(A) \subseteq \mathcal{N}(A)$, so $\dim(\mathcal{C}(B)\cap \mathcal{N}(A)) \le \dim\mathcal{N}(A) = n - \text{rank}(A)$ (Rank–Nullity for $A: \mathbb{F}^n \to \mathbb{F}^m$). Substituting,
$$\text{rank}(B) \le (n - \text{rank}(A)) + \text{rank}(AB) \implies \text{rank}(A)+\text{rank}(B) - n \le \text{rank}(AB). \blacksquare$$

**Remark.** Sylvester's inequality is the standard tool for bounding $\text{rank}(A^k)$ and for showing that products of "sufficiently full rank" matrices retain rank.

---

### 2.2 Trace

**Definition 2.2.1.** For $A \in M_n(\mathbb{F})$, $\text{tr}(A) := \sum_{i=1}^n A_{ii}$.

**Theorem 2.2.2 (Cyclic Property).** For $A \in M_{m\times n}(\mathbb{F})$, $B \in M_{n\times m}(\mathbb{F})$: $\text{tr}(AB) = \text{tr}(BA)$.

*Proof.* $\text{tr}(AB) = \sum_{i=1}^m (AB)_{ii} = \sum_{i=1}^m\sum_{j=1}^n A_{ij}B_{ji} = \sum_{j=1}^n \sum_{i=1}^m B_{ji}A_{ij} = \sum_{j=1}^n (BA)_{jj} = \text{tr}(BA)$. $\blacksquare$

**Corollary 2.2.3 (Invariance under Similarity).** If $A' = P^{-1}AP$ for invertible $P$, then $\text{tr}(A') = \text{tr}(A)$.

*Proof.* Apply the cyclic property with $X=P^{-1}$, $Y=AP$: $\text{tr}(P^{-1}\cdot AP) = \text{tr}(AP\cdot P^{-1}) = \text{tr}(A)$. $\blacksquare$

**Remark.** Trace is therefore a similarity invariant, and (Part 4) equals the sum of eigenvalues (with algebraic multiplicity) — this is often the fastest route to eigenvalue sum without computing the characteristic polynomial explicitly. It also underlies a fact used implicitly in PCA: since a change to an orthonormal eigenbasis is a similarity transformation (indeed an orthogonal one), $\text{tr}(\Sigma)$ — the **total variance** $\sum_i\text{Var}(X_i)$ — is exactly preserved by rotating into principal components; PCA redistributes variance across new coordinate axes without creating or destroying any of it.

**Trick 2.2.4.** $\text{tr}(AA^T) = \sum_{i,j}A_{ij}^2 = \|A\|_F^2 \ge 0$, with equality iff $A = 0$. This is the standard trick for proving a matrix is zero: show $\text{tr}(AA^T) = 0$; equivalently, for a vector, $\|Ax\|^2 = x^TA^TAx = 0 \iff Ax=0$.

---

### 2.3 Determinants

**Definition 2.3.1 (Axiomatic/Multilinear Definition).** $\det: M_n(\mathbb{F}) \to \mathbb{F}$ is the unique function that is (i) multilinear in the rows, (ii) alternating (equal rows $\implies$ determinant $0$), and (iii) normalized so $\det(I) = 1$. Equivalently, via the Leibniz formula,
$$\det(A) = \sum_{\sigma \in S_n} \text{sgn}(\sigma)\prod_{i=1}^n A_{i,\sigma(i)}.$$

**Theorem 2.3.2 (Core Properties).**
(a) $\det(AB) = \det(A)\det(B)$ (multiplicativity).
(b) $\det(A^T) = \det(A)$.
(c) $A$ is invertible $\iff \det(A) \ne 0$.
(d) Row/column swap negates $\det$; scaling a row by $c$ scales $\det$ by $c$; adding a multiple of one row to another leaves $\det$ unchanged.
(e) $\det(cA) = c^n\det(A)$ for $A \in M_n(\mathbb{F})$.

*(These follow directly from the multilinear-alternating axioms; multiplicativity (a) is most cleanly proved via the fact that both sides are, as functions of $A$ for fixed invertible $B$, alternating multilinear functions of the rows of $A$ agreeing at $A=I$, hence equal by uniqueness of the alternating multilinear form up to scalar — or via elementary matrix factorization of $A$.)*

**Theorem 2.3.3 (Cauchy–Binet Formula).** For $A \in M_{m\times n}(\mathbb{F})$, $B \in M_{n\times m}(\mathbb{F})$ with $m \le n$,
$$\det(AB) = \sum_{S \in \binom{[n]}{m}} \det(A_{:,S})\det(B_{S,:}),$$
where the sum is over all $m$-element subsets $S$ of $\{1,\dots,n\}$, $A_{:,S}$ is the $m\times m$ submatrix of $A$ formed by columns indexed by $S$, and $B_{S,:}$ is the $m\times m$ submatrix of $B$ formed by rows indexed by $S$.

**Remark.** Cauchy–Binet generalizes multiplicativity of determinants to non-square factors, and specializes (taking $B = A^T$, so $B_{S,:}=(A_{:,S})^T$) to $\det(AA^T) = \sum_S \det(A_{:,S})^2 \ge 0$ — an important positivity fact used repeatedly in Part 5.

**Theorem 2.3.4 (Block Matrix Determinants).** For a block matrix $M = \begin{pmatrix}A & B\\ C& D\end{pmatrix}$ with $A$ square and invertible,
$$\det(M) = \det(A)\det(D - CA^{-1}B).$$
If instead $D$ is square and invertible,
$$\det(M) = \det(D)\det(A - BD^{-1}C).$$
In particular, if $B=0$ or $C=0$ (block-triangular), $\det(M) = \det(A)\det(D)$.

*Proof.* Use the block factorization
$$\begin{pmatrix}A&B\\C&D\end{pmatrix} = \begin{pmatrix}I&0\\CA^{-1}&I\end{pmatrix}\begin{pmatrix}A&0\\0&D-CA^{-1}B\end{pmatrix}\begin{pmatrix}I&A^{-1}B\\0&I\end{pmatrix}.$$
The two outer factors are unit lower/upper block-triangular, hence have determinant $1$ (triangular with $1$'s on the diagonal blocks). Taking determinants of both sides and using multiplicativity and the block-triangular case gives the result. The second formula is symmetric (pivot on $D$ instead). $\blacksquare$

The matrix $D - CA^{-1}B$ (or $A - BD^{-1}C$) is called the **Schur complement** of $A$ (resp. $D$) in $M$; it reappears throughout §2.4–§2.6 and again in §5.3.

**Corollary 2.3.5 (Matrix Determinant Lemma).** For $A\in M_n(\mathbb F)$ invertible and $u,v\in\mathbb F^n$,
$$\det(A+uv^T) = \det(A)\left(1+v^TA^{-1}u\right).$$
In particular, $\det(I_n+uv^T)=1+v^Tu$.

*Proof.* Consider the block matrix $N = \begin{pmatrix}A & u \\ -v^T & 1\end{pmatrix} \in M_{n+1}(\mathbb{F})$. Applying Theorem 2.3.4 with the invertible top-left block $A$:
$$\det(N) = \det(A)\cdot\det\!\left(1-(-v^T)A^{-1}u\right) = \det(A)(1+v^TA^{-1}u).$$
Applying Theorem 2.3.4 instead with the invertible bottom-right $1\times1$ block:
$$\det(N) = \det(1)\cdot\det\!\left(A-u\cdot1^{-1}\cdot(-v^T)\right) = \det(A+uv^T).$$
Equating the two evaluations of $\det(N)$ gives the claim; setting $A=I_n$ gives the stated special case. $\blacksquare$

**Remark.** This is the determinant-side counterpart of the Sherman–Morrison formula (Theorem 2.4.3 below): both arise from viewing a rank-one perturbation through the *same* bordered $(n+1)\times(n+1)$ matrix $N$, evaluated via its two Schur complements. It also explains where Sherman–Morrison's denominator comes from: $1+v^TA^{-1}u$ is not an arbitrary normalizing constant, it is literally $\det(A+uv^T)/\det(A)$ — so it vanishes exactly when $A+uv^T$ is singular, consistent with Sherman–Morrison's invertibility hypothesis.

---

### 2.4 The Inverse, Adjugate, and Matrix Identities

**Definition 2.4.1 (Adjugate).** For $A \in M_n(\mathbb{F})$, the *adjugate* (classical adjoint) $\text{adj}(A)$ is the transpose of the cofactor matrix: $\text{adj}(A)_{ij} = C_{ji} = (-1)^{i+j}M_{ji}$, where $M_{ji}$ is the $(j,i)$ minor of $A$.

**Theorem 2.4.2.** $A\cdot\text{adj}(A) = \text{adj}(A)\cdot A = \det(A)I$. Consequently, if $\det(A)\ne 0$,
$$A^{-1} = \frac{1}{\det(A)}\text{adj}(A).$$

*Proof.* $(A\cdot\text{adj}(A))_{ii} = \sum_j A_{ij}(\text{adj }A)_{ji} = \sum_j A_{ij}C_{ij} = \det(A)$ by cofactor expansion along row $i$. For $i \ne k$, $(A\cdot\text{adj}(A))_{ik} = \sum_j A_{ij}C_{kj}$, which is the cofactor expansion of the determinant of the matrix obtained from $A$ by replacing row $k$ with a copy of row $i$ — a matrix with a repeated row, hence determinant $0$. $\blacksquare$

**Theorem 2.4.3 (Sherman–Morrison Formula).** For invertible $A \in M_n(\mathbb{F})$ and $u,v \in \mathbb{F}^n$ with $1 + v^TA^{-1}u \ne 0$,
$$(A + uv^T)^{-1} = A^{-1} - \frac{A^{-1}uv^TA^{-1}}{1+v^TA^{-1}u}.$$

*Proof.* Direct verification: multiply the RHS by $(A+uv^T)$ and simplify using the scalar $s := v^TA^{-1}u$:
$$\left(A^{-1} - \tfrac{A^{-1}uv^TA^{-1}}{1+s}\right)(A+uv^T) = I + A^{-1}uv^T - \tfrac{A^{-1}uv^TA^{-1}A + A^{-1}u(v^TA^{-1}u)v^T}{1+s} = I + A^{-1}uv^T - \tfrac{(1+s)A^{-1}uv^T}{1+s} = I.$$ $\blacksquare$

**Theorem 2.4.4 (Woodbury Identity — matrix generalization).** For conformable $A, U, C, V$ with $A, C$ invertible:
$$(A + UCV)^{-1} = A^{-1} - A^{-1}U(C^{-1}+VA^{-1}U)^{-1}VA^{-1}.$$

**Remark.** Sherman–Morrison/Woodbury is the workhorse for rank-one/low-rank updates: recomputing a regression's inverse-covariance after adding one observation (an $O(n^2)$ update rather than an $O(n^3)$ re-inversion) is a direct application. Running this in reverse — **removing** rather than adding an observation — is exactly how closed-form leave-one-out diagnostics in regression (the "hat value" $h_{ii}$, the PRESS statistic, Cook's distance) are derived without literally refitting the model $n$ times: deleting row $i$ of $X$ is a rank-one downdate of $X^TX$, and Sherman–Morrison converts an $O(n^3)$ refit into an $O(p^2)$ correction.

---

### 2.5 Problem-Solving Tricks

**Trick 2.5.1 (Rank Factorization).** Any $A \in M_{m\times n}(\mathbb{F})$ with $\text{rank}(A) = r$ can be written $A = BC$ with $B \in M_{m\times r}$, $C \in M_{r\times n}$, both of rank $r$ (take $B$ = a basis of $\mathcal{C}(A)$ as columns, $C$ = the coefficients expressing each column of $A$ in that basis). This turns rank questions about $A$ into questions about smaller full-rank factors, and is the standard route to prove $\text{rank}(A) = \text{rank}(A^TA) = \text{rank}(AA^T)$ (over $\mathbb{R}$), via $\mathcal N(A^TA)=\mathcal N(A)$ (Trick 2.2.4).

**Trick 2.5.2 (Trace/Determinant for Nilpotency).** $A$ is nilpotent ($A^k=0$ for some $k$) $\iff$ all eigenvalues of $A$ are $0$ $\iff$ $\text{tr}(A^j) = 0$ for all $j=1,\dots,n$ (Newton's identities relate power sums of eigenvalues to elementary symmetric polynomials, i.e. to coefficients of the characteristic polynomial). A quick necessary condition often sufficient for exam purposes: if $A^2 = 0$ then $\mathcal{C}(A)\subseteq\mathcal{N}(A)$, hence $\text{rank}(A) \le n - \text{rank}(A)$, i.e. $\text{rank}(A) \le n/2$.

**Trick 2.5.3 (Schur Complement for Block Inversion).** To invert $M = \begin{pmatrix}A&B\\C&D\end{pmatrix}$ with $A$ invertible, use the block-LDU factorization from Theorem 2.3.4 to get
$$M^{-1} = \begin{pmatrix}A^{-1}+A^{-1}BS^{-1}CA^{-1} & -A^{-1}BS^{-1}\\ -S^{-1}CA^{-1} & S^{-1}\end{pmatrix}, \qquad S := D-CA^{-1}B.$$
This is the standard route for inverting a covariance matrix partitioned into blocks — central to conditional distributions of the multivariate normal.

---

### 2.6 Challenge Problems

**Challenge Problem 1 (Block Determinant Identity).** Let $A,B \in M_n(\mathbb{R})$ with $AB = BA$ (commuting). Prove that
$$\det\begin{pmatrix}A & B\\ -B& A\end{pmatrix} = \det(A^2+B^2).$$

*Proof.* Work in $M_{2n}(\mathbb C)$ and set $M=\begin{pmatrix}A&B\\-B&A\end{pmatrix}$. Consider the $2n\times2n$ matrix, in $n\times n$ blocks,
$$P = \begin{pmatrix}I&I\\iI&-iI\end{pmatrix}.$$
Direct block multiplication — using only that $iI$ is a scalar matrix, so it commutes with every block; commutativity of $A,B$ is **not** needed for this step — gives
$$MP = \begin{pmatrix}A+iB&A-iB\\iA-B&-iA-B\end{pmatrix}, \qquad P\begin{pmatrix}A+iB&0\\0&A-iB\end{pmatrix} = \begin{pmatrix}A+iB&A-iB\\iA-B&-iA-B\end{pmatrix},$$
and the two right-hand sides agree entry by entry, so
$$MP = P\begin{pmatrix}A+iB&0\\0&A-iB\end{pmatrix}. \quad(\ast)$$
Now $P$ is invertible: by Theorem 2.3.4, pivoting on the invertible top-left block $I$,
$$\det P = \det(I)\cdot\det\big(-iI-iI\cdot I^{-1}\cdot I\big) = \det(-2iI) = (-2i)^n \ne 0.$$
So $(\ast)$ rearranges to $M = P\begin{pmatrix}A+iB&0\\0&A-iB\end{pmatrix}P^{-1}$: $M$ is **similar** over $\mathbb C$ to $\text{diag}(A+iB,A-iB)$. Similar matrices have equal determinants (Theorem 4.4.1, or directly from multiplicativity), so
$$\det(M) = \det(A+iB)\det(A-iB). \quad(\ast\ast)$$
This identity holds for **any** square real $A,B$ — commutativity has not yet been used. It enters only in the final step, where $AB=BA$ permits
$$(A+iB)(A-iB) = A^2-iAB+iBA+B^2 = A^2+B^2+i(BA-AB) = A^2+B^2,$$
so that $\det(A+iB)\det(A-iB)=\det\big((A+iB)(A-iB)\big)=\det(A^2+B^2)$ by multiplicativity once more. Combining with $(\ast\ast)$:
$$\det(M) = \det(A^2+B^2). \qquad\blacksquare$$

**Remark.** The intermediate identity $(\ast\ast)$ is worth isolating: it holds unconditionally and is the determinant of the **real representation** of the complex matrix $Z=A+iB$ acting on $\mathbb C^n\cong\mathbb R^{2n}$. When $A,B$ commute, $A-iB=\overline{A+iB}$ (entrywise conjugate, as $A,B$ are real), so $\det(M)=\det(Z)\overline{\det(Z)}=|\det Z|^2\ge0$ — recovering positivity of $\det(A^2+B^2)$ directly, without needing to know $A^2+B^2\succeq0$ (which in fact requires more than mere commutativity to guarantee).

**Challenge Problem 2 (Rank Bound for Sums).** For $A, B \in M_{m\times n}(\mathbb{F})$, prove
$$|\text{rank}(A) - \text{rank}(B)| \le \text{rank}(A+B) \le \text{rank}(A)+\text{rank}(B).$$

*Proof.* Upper bound: $\mathcal{C}(A+B) \subseteq \mathcal{C}(A)+\mathcal{C}(B)$, and $\dim(\mathcal{C}(A)+\mathcal{C}(B)) \le \dim\mathcal{C}(A)+\dim\mathcal{C}(B)$ by Theorem 1.2.6 (dropping the intersection term). Lower bound: apply the upper bound to $A = (A+B) + (-B)$: $\text{rank}(A) \le \text{rank}(A+B)+\text{rank}(B)$, i.e. $\text{rank}(A)-\text{rank}(B)\le\text{rank}(A+B)$; symmetrically for $\text{rank}(B)-\text{rank}(A)$. $\blacksquare$

**Challenge Problem 3 (Schur Complement Positivity — bridges to Part 5).** Let $M = \begin{pmatrix}A&B\\B^T&D\end{pmatrix}$ be symmetric with $A \succ 0$. Prove that $M \succeq 0$ iff the Schur complement $S = D - B^TA^{-1}B \succeq 0$.

*Proof.* By Theorem 2.3.4's factorization (pivoting on the invertible top-left block $A$),
$$M = \begin{pmatrix}I&0\\B^TA^{-1}&I\end{pmatrix}\begin{pmatrix}A&0\\0&S\end{pmatrix}\begin{pmatrix}I&A^{-1}B\\0&I\end{pmatrix}.$$
Writing $L=\begin{pmatrix}I&0\\B^TA^{-1}&I\end{pmatrix}$, the third factor is exactly $L^T$ (since $(B^TA^{-1})^T=A^{-1}B$, using $A^{-1}$ symmetric). So
$$M = L\begin{pmatrix}A&0\\0&S\end{pmatrix}L^T, \quad(\star)$$
a **congruence**: $M$ and $\text{diag}(A,S)$ are congruent via the invertible matrix $L$ (unit lower-triangular, $\det L=1$).

For $x=\binom{x_1}{x_2}$, set $y=L^Tx=\binom{y_1}{y_2}$; since $L^T$ is invertible, $x\mapsto y$ is a bijection. By $(\star)$,
$$x^TMx = y^T\begin{pmatrix}A&0\\0&S\end{pmatrix}y = y_1^TAy_1+y_2^TSy_2.$$

($\Leftarrow$) If $S\succeq0$: since $A\succ0$, $y_1^TAy_1\ge0$ always and $y_2^TSy_2\ge0$ by hypothesis, so $x^TMx\ge0$ for every $x$, i.e. $M\succeq0$.

($\Rightarrow$) If $M\succeq0$: given any $y_2\in\mathbb R^m$, since $L^T=\begin{pmatrix}I&A^{-1}B\\0&I\end{pmatrix}$ is invertible, there is a unique $x$ with $L^Tx=\binom{0}{y_2}$ — namely $x_2=y_2$, $x_1=-A^{-1}By_2$. For this $x$, $x^TMx=0^TA0+y_2^TSy_2=y_2^TSy_2\ge0$ (since $M\succeq0$). As $y_2$ was arbitrary, $S\succeq0$. $\blacksquare$

**Remark (Statistical Payoff).** This is precisely the tool for checking that a *partitioned covariance matrix* is admissible: if $\Sigma=\begin{pmatrix}\Sigma_{11}&\Sigma_{12}\\\Sigma_{21}&\Sigma_{22}\end{pmatrix}$ is the covariance matrix of $(X_1,X_2)$ jointly, with $\Sigma_{11}\succ0$, then $M\succeq0$ automatically (it is a genuine covariance matrix), and this theorem tells you the *conditional* covariance matrix of $X_2\mid X_1$ in the multivariate normal model — which is exactly the Schur complement $\Sigma_{22}-\Sigma_{21}\Sigma_{11}^{-1}\Sigma_{12}$ — is itself a bona fide (PSD) covariance matrix. Conditioning can only shrink uncertainty (in the Loewner order — see Challenge Problem 4 of §5.5), never produce a nonsensical negative-variance direction, and the Schur complement is the precise algebraic reason why.

**Challenge Problem 4 (Rank Additivity via the Schur Complement).** Let $M=\begin{pmatrix}A&B\\B^T&D\end{pmatrix}\in M_{n+m}(\mathbb R)$ be symmetric with $D\in M_m(\mathbb R)$ invertible. Prove that
$$\text{rank}(M) = \text{rank}(D) + \text{rank}\!\left(A-BD^{-1}B^T\right).$$

*Proof.* Mirror the factorization of Theorem 2.3.4, pivoting instead on the invertible **bottom-right** block $D$:
$$M = \begin{pmatrix}I&BD^{-1}\\0&I\end{pmatrix}\begin{pmatrix}A-BD^{-1}B^T&0\\0&D\end{pmatrix}\begin{pmatrix}I&0\\D^{-1}B^T&I\end{pmatrix}.$$
(Verified by the identical block-multiplication check used to prove Theorem 2.3.4, with the two pivot blocks' roles exchanged; expanding the right side reproduces $M$ entry by entry, using $D^{-1}D=I$ to cancel the off-diagonal blocks.) Both outer factors are unit-triangular, hence invertible. Left- or right-multiplying by an invertible matrix does not change rank (it carries a maximal independent set of columns to another maximal independent set), so
$$\text{rank}(M) = \text{rank}\begin{pmatrix}A-BD^{-1}B^T&0\\0&D\end{pmatrix}.$$
For a block-diagonal matrix $\text{diag}(X,Y)$, columns supported in the "$X$-rows" and those supported in the "$Y$-rows" cannot participate in a common linear dependency (any dependency forces the $X$-part and $Y$-part to vanish separately), so a maximal independent set of columns is the concatenation of maximal independent sets from each block: $\text{rank}\,\text{diag}(X,Y)=\text{rank}(X)+\text{rank}(Y)$. Hence
$$\text{rank}(M) = \text{rank}(A-BD^{-1}B^T)+\text{rank}(D). \qquad\blacksquare$$

**Remark.** This is a rank-additivity identity for partitioned symmetric matrices, and it is the rank-theoretic sibling of the determinant and definiteness statements already proved for the same Schur complement (Theorem 2.3.4, Challenge Problem 3). It has a clean statistical use: for a design $X=[\mathbf 1\mid X_1]$ (intercept plus covariates), partition $X^TX=\begin{pmatrix}n&\mathbf1^TX_1\\X_1^T\mathbf1&X_1^TX_1\end{pmatrix}$ this way and pivot on the invertible $1\times1$ top-left block. The rank — and hence the identifiability — of the full regression reduces to the rank of the Schur complement $X_1^TX_1-\tfrac1n(X_1^T\mathbf1)(\mathbf1^TX_1)$, which is exactly $n$ times the sample covariance matrix of the columns of $X_1$. This is the algebraic seed of the **Frisch–Waugh–Lovell theorem**: the covariates' contribution to the model, after partialling out the intercept, is governed entirely by their own centered cross-product matrix.

---

## Part 3 — Systems of Linear Equations

### 3.1 Matrix Formulation and Consistency

**Definition 3.1.1.** A linear system in $n$ unknowns and $m$ equations is written $Ax = b$, $A \in M_{m\times n}(\mathbb{F})$, $x \in \mathbb{F}^n$, $b \in \mathbb{F}^m$. It is *homogeneous* if $b=0$, else *non-homogeneous*. The system is *consistent* if a solution exists.

**Remark.** $Ax=b$ is consistent $\iff b \in \mathcal{C}(A)$ — a restatement of the definition of column space, but the operational move of the whole section is to turn this membership question into a rank comparison.

---

### 3.2 The Rouché–Capelli Theorem

**Definition 3.2.1 (Augmented Matrix).** $[A\,|\,b] \in M_{m\times(n+1)}(\mathbb{F})$ is $A$ with $b$ appended as an extra column.

**Theorem 3.2.2 (Rouché–Capelli / Kronecker–Capelli).** The system $Ax=b$ is consistent iff
$$\text{rank}(A) = \text{rank}([A\,|\,b]).$$
Moreover, if consistent:
- If $\text{rank}(A) = n$ (number of unknowns), the solution is **unique**.
- If $\text{rank}(A) = r < n$, the solution set is an affine subspace of dimension $n-r$ (a $(n-r)$-parameter family).

*Proof.* ($\Rightarrow$) If $Ax=b$ has a solution, then $b \in \mathcal{C}(A)$, so appending $b$ as a column adds no new dimension to the column space: $\text{rank}([A|b]) = \dim\mathcal{C}(A) = \text{rank}(A)$.

($\Leftarrow$) If $\text{rank}(A) = \text{rank}([A|b]) = r$, then since $\mathcal{C}(A) \subseteq \mathcal{C}([A|b])$ and both have dimension $r$, we get $\mathcal{C}(A) = \mathcal{C}([A|b])$, so $b \in \mathcal{C}([A|b]) = \mathcal{C}(A)$, i.e. the system is consistent.

*Uniqueness/parametrization:* If $x_0$ is one solution, the general solution is $x_0 + \mathcal{N}(A)$ (verify: $A(x_0+z) = b \iff Az=0$). By Rank–Nullity, $\dim\mathcal{N}(A) = n - r$. If $r=n$, $\mathcal{N}(A)=\{0\}$, giving uniqueness; else the solution set is a coset of the $(n-r)$-dimensional subspace $\mathcal{N}(A)$. $\blacksquare$

---

### 3.3 Structure of the Solution Set

**Theorem 3.3.1 (Superposition/Affine Structure).** The general solution of a consistent system $Ax=b$ is
$$x = x_p + x_h, \qquad x_p \text{ any particular solution},\ x_h \in \mathcal{N}(A).$$

**Remark (Geometry).** The solution set is a translate of the null space, i.e. an affine subspace parallel to $\mathcal{N}(A)$. The "degrees of freedom" of the system is exactly $\dim\mathcal{N}(A) = n - \text{rank}(A)$ — the number of *free variables* remaining after row-reduction. This is precisely the notion of degrees of freedom that resurfaces in ANOVA decompositions and the residual degrees of freedom in linear regression.

**Trick 3.3.2.** To parametrize $\mathcal{N}(A)$ practically: row-reduce $A$ to reduced row echelon form, identify free columns (non-pivot), and for each free variable set it to $1$ and the rest to $0$, solving for the pivot variables — this generates a basis for $\mathcal{N}(A)$ directly.

---

### 3.4 The Moore–Penrose Pseudoinverse

**Definition 3.4.1.** For $A \in M_{m\times n}(\mathbb{R})$ (possibly non-square, possibly rank-deficient), the *Moore–Penrose pseudoinverse* $A^+ \in M_{n\times m}(\mathbb{R})$ is the unique matrix satisfying the four **Penrose conditions**:
1. $AA^+A = A$
2. $A^+AA^+ = A^+$
3. $(AA^+)^T = AA^+$
4. $(A^+A)^T = A^+A$

**Theorem 3.4.2 (Existence and Uniqueness).** $A^+$ exists and is unique for every $A \in M_{m\times n}(\mathbb{R})$.

*(Proof outline: existence is constructive via the SVD, $A = U\Sigma V^T \implies A^+ = V\Sigma^+U^T$ where $\Sigma^+$ inverts the nonzero singular values in place — see §5.4. Uniqueness follows by a direct algebraic argument from the four Penrose conditions.)*

**Theorem 3.4.3 (Closed Forms in Full-Rank Cases).**
- If $A$ has full column rank ($\text{rank}(A)=n \le m$): $A^+ = (A^TA)^{-1}A^T$ (the "left inverse"; $A^+A = I_n$).
- If $A$ has full row rank ($\text{rank}(A)=m\le n$): $A^+ = A^T(AA^T)^{-1}$ (the "right inverse"; $AA^+ = I_m$).

**Theorem 3.4.4 (Pseudoinverse Solves Least Squares).** For possibly-inconsistent $Ax=b$, $x^* = A^+b$ is the **minimum-norm least-squares solution**: it minimizes $\|Ax-b\|_2$, and among all minimizers, it has the smallest $\|x\|_2$.

**Remark.** This is the crucial statistical avatar of this section: when $A$ (the design matrix) has full column rank, $A^+b = (A^TA)^{-1}A^Tb$ is exactly the **OLS estimator** $\hat\beta$. When $A^TA$ is singular (rank-deficient design, e.g. collinear regressors), the pseudoinverse still delivers a well-defined "solution" — the minimum-norm one — which is precisely what many software implementations of regression fall back to (see Challenge Problem 4 below for exactly what remains well-defined in that case).

---

### 3.5 Challenge Problems

**Challenge Problem 1 (Parameterized Consistency).** For which values of $\lambda \in \mathbb{R}$ does the system
$$x + y + \lambda z = 1,\qquad x+\lambda y + z = 1,\qquad \lambda x + y + z = 1$$
have (a) a unique solution, (b) infinitely many solutions, (c) no solution?

*Solution.* Write the system as $Ax=b$ with
$$A=\begin{pmatrix}1&1&\lambda\\1&\lambda&1\\\lambda&1&1\end{pmatrix}, \qquad b=\begin{pmatrix}1\\1\\1\end{pmatrix}.$$

**Step 1: Compute $\det A$.** Every row of $A$ sums to $\lambda+2$, so adding columns $2$ and $3$ into column $1$ ($C_1\to C_1+C_2+C_3$) produces a common factor:
$$\det A = \det\begin{pmatrix}\lambda+2&1&\lambda\\\lambda+2&\lambda&1\\\lambda+2&1&1\end{pmatrix} = (\lambda+2)\det\begin{pmatrix}1&1&\lambda\\1&\lambda&1\\1&1&1\end{pmatrix}.$$
In the remaining determinant, subtract row $3$ from rows $1$ and $2$ ($R_1\to R_1-R_3$, $R_2\to R_2-R_3$):
$$\det\begin{pmatrix}0&0&\lambda-1\\0&\lambda-1&0\\1&1&1\end{pmatrix} = 1\cdot(-1)^{3+1}\det\begin{pmatrix}0&\lambda-1\\\lambda-1&0\end{pmatrix} = -(\lambda-1)^2$$
(cofactor expansion along column $1$, which has a single nonzero entry). Hence
$$\det A = -(\lambda+2)(\lambda-1)^2.$$
This vanishes exactly at $\lambda=1$ (a double root) and $\lambda=-2$ (a simple root); the leading minus sign does not affect the case analysis below (only the roots matter for that), but it is worth being explicit about — a bare $\det A = (\lambda+2)(\lambda-1)^2$, missing the sign, is a common arithmetic slip and gives the wrong value if the determinant itself is ever needed (e.g. via Cramer's rule).

**Step 2: Case analysis (Rouché–Capelli, Theorem 3.2.2).**

*Case $\lambda\ne1,-2$:* $\det A\ne0$, so $\text{rank}(A)=3=$ number of unknowns. **Unique solution.**

*Case $\lambda=1$:* $A$ becomes the all-ones matrix $J_3$, of rank $1$. Every equation of the system reduces to $x+y+z=1$, so $[A\mid b]$ also has rank $1$; the system is consistent with $\text{rank}(A)=1<3$, giving a $(3-1)=2$-parameter family. **Infinitely many solutions.**

*Case $\lambda=-2$:* Each row of $A$ sums to $\lambda+2=0$, i.e. $A\mathbf 1=0$ where $\mathbf1=(1,1,1)^T$; since $A$ is symmetric, this simultaneously says $\mathbf1$ lies in the *left* null space, $A^T\mathbf1=0$. A direct check of the leading $2\times2$ minor, $\det\begin{pmatrix}1&1\\1&-2\end{pmatrix}=-3\ne0$, confirms $\text{rank}(A)=2$ exactly (not less). By the Fredholm alternative — $Ax=b$ is consistent iff $b$ is orthogonal to every vector in $\mathcal N(A^T)$, which is precisely Theorem 1.4.4 ($\mathcal{C}(A)\perp\mathcal{N}(A^T)$, so $b\in\mathcal C(A)\iff b\perp\mathcal N(A^T)$) — consistency here requires $\mathbf1^Tb=0$. But $\mathbf1^Tb=1+1+1=3\ne0$. **No solution.** $\blacksquare$

**Remark.** The identification of $\mathbf 1$ as spanning $\mathcal N(A^T)$ at the critical value $\lambda=-2$, followed by the one-line check $\mathbf1^Tb\ne0$, is the Rouché–Capelli theorem in its most efficient operational form: rather than row-reducing the full augmented matrix, one only needs a spanning set for the left null space of $A$ (often visible by inspection, as here from the zero row-sum) and a single inner product against $b$.

**Challenge Problem 2 (Pseudoinverse Identity).** Prove that for any $A\in M_{m\times n}(\mathbb R)$,
$$A^+ = (A^TA)^+A^T,$$
and that this reduces to Theorem 3.4.3 when $A$ has full column rank.

*Proof.* Let $A=U\Sigma V^T$ be an SVD of $A$ (Theorem 5.4.1 — logically this problem sits most naturally after §5.4, but is placed here for thematic continuity with the pseudoinverse). Then
$$A^TA = V\Sigma^TU^TU\Sigma V^T = V(\Sigma^T\Sigma)V^T,$$
using $U^TU=I$. This exhibits $A^TA$ in exactly the spectral form of Theorem 5.2.1: an orthogonal matrix times a diagonal PSD matrix times its transpose. The pseudoinverse of a symmetric PSD matrix given in this form is obtained by inverting the nonzero diagonal entries in place:
$$(A^TA)^+ = V(\Sigma^T\Sigma)^+V^T.$$
Hence
$$X:=(A^TA)^+A^T = V(\Sigma^T\Sigma)^+V^T\cdot V\Sigma^TU^T = V(\Sigma^T\Sigma)^+\Sigma^TU^T,$$
using $V^TV=I$. It remains to check $(\Sigma^T\Sigma)^+\Sigma^T=\Sigma^+$. Both sides are $n\times m$ and zero off the "diagonal," so compare the $i$-th diagonal entry, $1\le i\le\min(m,n)$: if $\sigma_i\ne0$, the left side gives $\frac{1}{\sigma_i^2}\cdot\sigma_i=\frac1{\sigma_i}$, matching $\Sigma^+$'s convention; if $\sigma_i=0$, both sides give $0$. Hence $(\Sigma^T\Sigma)^+\Sigma^T=\Sigma^+$ exactly, and
$$X = V\Sigma^+U^T = A^+.$$
This proves the identity for every $A$, with no rank hypothesis.

When $A$ has full column rank ($\text{rank}(A)=n$), all $n$ singular values are nonzero, so $A^TA$ is invertible and $(A^TA)^+=(A^TA)^{-1}$, recovering $A^+=(A^TA)^{-1}A^T$, i.e. Theorem 3.4.3. $\blacksquare$

**Remark.** This identity is the theoretical justification for computing OLS coefficients as $\hat\beta=(X^TX)^{-1}X^Ty$ *even when* one thinks of the conceptually "right" object as $X^+y$: the two expressions provably coincide whenever $X$ has full column rank, and the pseudoinverse route degrades gracefully — delivering the minimum-norm solution — exactly when $(X^TX)^{-1}$ stops existing.

**Challenge Problem 3 (Structural).** Let $A \in M_{m\times n}(\mathbb{R})$. Prove that $Ax=b$ has a solution for **every** $b \in \mathbb{R}^m$ iff $\text{rank}(A) = m$ (i.e. $A$ has full row rank), and relate this to the surjectivity of the linear map $x \mapsto Ax$.

*Proof.* Immediate from Rouché–Capelli: consistency for all $b$ means $\text{rank}(A) = \text{rank}([A|b])$ for every $b$; taking $b \notin \mathcal{C}(A)$ would strictly increase the rank on the right unless $\mathcal{C}(A) = \mathbb{R}^m$ already, i.e. $\dim\mathcal{C}(A)=m$, i.e. $\text{rank}(A)=m$. This is exactly the statement that $x\mapsto Ax$ is onto $\mathbb{R}^m$. $\blacksquare$

**Challenge Problem 4 (Well-Posedness of Fitted Values Under Collinearity).** Let $X\in M_{n\times p}(\mathbb{R})$ be a design matrix with $\text{rank}(X)=r<p$ (so the regressors are collinear and the normal equations $X^TX\beta=X^Ty$ do not pin down a unique $\beta$). Prove that nevertheless **every** solution $\hat\beta$ of the normal equations produces the *same* fitted-value vector $X\hat\beta$, and that this common value equals $Hy$ for the hat matrix $H=XX^+$.

*Proof.* Suppose $\beta_1,\beta_2\in\mathbb R^p$ both satisfy the normal equations: $X^TX\beta_1=X^Ty=X^TX\beta_2$. Then $X^TX(\beta_1-\beta_2)=0$. Writing $\delta:=\beta_1-\beta_2$,
$$\delta^TX^TX\delta = 0 \iff \|X\delta\|_2^2=0 \iff X\delta = 0$$
(Trick 2.2.4, with $X\delta$ in place of $A$), so $X\beta_1=X\beta_2$. **The fitted-value vector is identical for every solution of the normal equations, regardless of the rank deficiency of $X$.**

To identify the common value: the minimum-norm solution $\hat\beta_0:=X^+y$ (Theorem 3.4.4) satisfies the normal equations, since transposing the Penrose identity $XX^+X=X$ and using symmetry of $XX^+$ (Penrose condition 3) gives $X^TXX^+=X^T$, hence $X^TX(X^+y)=X^Ty$ for every $y$. Since every solution gives the same fitted value as $\hat\beta_0$ does, and $X\hat\beta_0=XX^+y=Hy$, every solution $\hat\beta$ satisfies
$$X\hat\beta = Hy. \qquad\blacksquare$$

**Remark.** This is the precise sense in which "OLS is well-defined even with collinear regressors": the *coefficients* $\hat\beta$ are not identifiable (any two solutions differ by a vector in $\mathcal N(X)$, itself nontrivial exactly when $r<p$), but every quantity actually observable from the fit — fitted values, residuals, $R^2$, the hat matrix, predictions at points within $\mathcal C(X)$ — is identical no matter which generalized-inverse solution one's software happens to return. This is why collinearity is diagnosed as a problem for *interpreting individual coefficients*, not as a problem for *prediction*.

---

## Part 4 — Eigenvalues, Eigenvectors, and Diagonalization

### 4.1 Eigenvalues, Eigenvectors, Characteristic Polynomial

**Definition 4.1.1.** For $A \in M_n(\mathbb{F})$, $\lambda \in \mathbb{F}$ (or an algebraic closure thereof) is an *eigenvalue* if there exists $v \ne 0$ with $Av = \lambda v$; $v$ is the corresponding *eigenvector*. The *eigenspace* $E_\lambda := \mathcal{N}(A-\lambda I)$.

**Definition 4.1.2.** The *characteristic polynomial* is $p_A(\lambda) := \det(\lambda I - A)$ (or $\det(A-\lambda I)$, differing by sign $(-1)^n$ by convention — both conventions appear across texts; we use $\det(\lambda I - A)$, monic of degree $n$). Eigenvalues are precisely the roots of $p_A$.

**Theorem 4.1.3.** $p_A(\lambda) = \lambda^n - \text{tr}(A)\lambda^{n-1} + \cdots + (-1)^n\det(A)$. In particular, the sum of the eigenvalues (with algebraic multiplicity, over $\mathbb{C}$) equals $\text{tr}(A)$, and their product equals $\det(A)$.

*(Follows from Vieta's formulas applied to the roots of $p_A$, using the expansion of the determinant $\det(\lambda I - A)$; the coefficient of $\lambda^{n-k}$ is $(-1)^ke_k(\lambda_1,\ldots,\lambda_n)$, where $e_k$ is the $k$-th elementary symmetric polynomial in the eigenvalues.)*

---

### 4.2 Multiplicities and Diagonalizability

**Definition 4.2.1.** The *algebraic multiplicity* $a(\lambda)$ of eigenvalue $\lambda$ is its multiplicity as a root of $p_A$. The *geometric multiplicity* $g(\lambda) := \dim E_\lambda$.

**Theorem 4.2.2.** For every eigenvalue $\lambda$, $1 \le g(\lambda) \le a(\lambda)$.

*Proof.* $g(\lambda)\ge 1$ trivially (eigenspace is nontrivial by definition of eigenvalue). For $g(\lambda)\le a(\lambda)$: let $\{v_1,\dots,v_g\}$ be a basis of $E_\lambda$, extend to a basis of $\mathbb{F}^n$. In this basis, $A$ is similar to a block matrix $\begin{pmatrix}\lambda I_g & B\\0&C\end{pmatrix}$ (since $Av_i=\lambda v_i$ for $i\le g$). Then $p_A(t) = \det(tI-A) = (t-\lambda)^g \det(tI_{n-g}-C)$ (block-triangular determinant), so $(t-\lambda)^g$ divides $p_A(t)$, i.e. $a(\lambda) \ge g$. $\blacksquare$

**Theorem 4.2.3 (Diagonalizability Criterion).** $A \in M_n(\mathbb{F})$ is diagonalizable (similar to a diagonal matrix, over the splitting field of $p_A$) iff $g(\lambda) = a(\lambda)$ for every eigenvalue $\lambda$, iff $\mathbb{F}^n$ (or its algebraic closure) admits a basis of eigenvectors of $A$.

**Theorem 4.2.4 (Sufficient Condition).** If $A$ has $n$ distinct eigenvalues, $A$ is diagonalizable. *(Eigenvectors for distinct eigenvalues are automatically linearly independent — a standard induction argument: suppose a minimal dependent combination $\sum c_iv_i=0$ (all $c_i\ne0$); apply $A$, and separately multiply the original relation by $\lambda_1$, then subtract, to get $\sum_{i\ge2}c_i(\lambda_i-\lambda_1)v_i=0$, a strictly shorter nontrivial dependency (since $\lambda_i\ne\lambda_1$, $c_i\ne0$ for $i\ge2$), contradicting minimality unless no such dependency existed at all.)*

---

### 4.3 Cayley–Hamilton and the Minimal Polynomial

**Theorem 4.3.1 (Cayley–Hamilton).** Every $A \in M_n(\mathbb{F})$ satisfies its own characteristic polynomial: $p_A(A) = 0$.

*Proof sketch (adjugate method).* Let $B(\lambda) = \text{adj}(\lambda I - A)$, a matrix whose entries are polynomials in $\lambda$ of degree $\le n-1$; write $B(\lambda) = \sum_{k=0}^{n-1}B_k\lambda^k$ for constant matrices $B_k$. From Theorem 2.4.2, $(\lambda I-A)B(\lambda) = \det(\lambda I - A)I = p_A(\lambda)I$. Expanding both sides as polynomials in $\lambda$ with matrix coefficients and equating coefficients of like powers of $\lambda$ gives a system relating each $B_k$ to $B_{k-1}$ and to the coefficients $c_k$ of $p_A$; multiplying the $\lambda^k$-coefficient equation on the left by $A^k$ and summing over $k=0,\dots,n$ causes every $B_k$ term to appear once with a $+$ sign and once with a $-$ sign, telescoping the entire left side to $0$ while the right side sums to exactly $\sum_kc_kA^k=p_A(A)$, yielding $p_A(A) = 0$. $\blacksquare$ *(A fully rigorous write-up requires care in tracking the boundary terms of the telescoping sum — standard in Hoffman–Kunze §6.4 or Horn & Johnson §2.4; the outline above captures the mechanism expected on an exam.)*

**Definition 4.3.2.** The *minimal polynomial* $m_A(\lambda)$ is the monic polynomial of least degree with $m_A(A) = 0$.

**Theorem 4.3.3.** $m_A$ divides every polynomial $q$ with $q(A)=0$ (in particular $m_A\mid p_A$, by Cayley–Hamilton), and $m_A$ and $p_A$ have exactly the same **roots** (possibly with different multiplicities).

*Proof.* *Divisibility:* if $q(A)=0$, polynomial division gives $q=hm_A+r$ with $\deg r<\deg m_A$ (or $r=0$). Then $r(A)=q(A)-h(A)m_A(A)=0$. If $r\ne0$, this contradicts minimality of $\deg m_A$ among nonzero annihilating polynomials; hence $r=0$ and $m_A\mid q$.

*Eigenvalue $\Rightarrow$ root of $m_A$:* if $Av=\lambda v$, $v\ne0$, then $A^kv=\lambda^kv$ for every $k\ge0$, so $q(A)v=q(\lambda)v$ for every polynomial $q$. In particular $0=m_A(A)v=m_A(\lambda)v$; since $v\ne0$, $m_A(\lambda)=0$.

*Root of $m_A$ $\Rightarrow$ eigenvalue:* let $\mu$ be a root of $m_A$, and write $m_A(\lambda)=(\lambda-\mu)h(\lambda)$, $\deg h=\deg m_A-1$. Minimality forces $h(A)\ne0$; pick $w$ with $u:=h(A)w\ne0$. Then $(A-\mu I)u=(A-\mu I)h(A)w=m_A(A)w=0$, so $u\ne0$ is an eigenvector with eigenvalue $\mu$.

The roots of $m_A$ are thus exactly the eigenvalues of $A$, which are exactly the roots of $p_A$. $\blacksquare$

**Theorem 4.3.4.** $A$ is diagonalizable iff $m_A$ has no repeated roots (i.e. $m_A$ splits into distinct linear factors over the algebraic closure).

*Proof.* ($\Rightarrow$) Suppose $A$ is diagonalizable with distinct eigenvalues $\lambda_1,\ldots,\lambda_r$. The polynomial $q(\lambda):=\prod_{i=1}^r(\lambda-\lambda_i)$ annihilates $A$: in an eigenbasis, $q(A)$ is diagonal, and every diagonal entry is $q(\lambda_i)=0$ for the relevant eigenvalue $\lambda_i$; hence $q(A)=0$. By Theorem 4.3.3, $m_A\mid q$, and a divisor of a polynomial with only simple roots has only simple roots; so $m_A$ has no repeated roots (and, since every $\lambda_i$ is also a root of $m_A$ by Theorem 4.3.3, in fact $m_A=q$ exactly).

($\Leftarrow$) Suppose $m_A(\lambda)=\prod_{i=1}^r(\lambda-\lambda_i)$ with $\lambda_1,\ldots,\lambda_r$ distinct. Define the Lagrange basis polynomials $P_i(\lambda):=\prod_{j\ne i}\frac{\lambda-\lambda_j}{\lambda_i-\lambda_j}$. The polynomial $\sum_iP_i(\lambda)-1$ has degree $\le r-1$ but $r$ distinct roots $\lambda_1,\ldots,\lambda_r$, forcing $\sum_iP_i\equiv1$ identically. Setting $E_i:=P_i(A)$ gives $\sum_iE_i=I$. Using $m_A(A)=0$ together with the partial-fraction structure of the $P_i$, one further checks $E_i^2=E_i$, $E_iE_j=0$ for $i\ne j$, and $(A-\lambda_iI)E_i=0$, so each $E_i$ is a projection onto (a subspace of) the $\lambda_i$-eigenspace; $\sum_iE_i=I$ then exhibits $\mathbb F^n$ (or its closure) as a direct sum of eigenspaces of $A$, i.e. $A$ has a full eigenbasis. $\blacksquare$ *(The verification that each $E_i$ is idempotent and mutually annihilating is a short computation from the partial-fraction identity for $1/m_A(\lambda)$; see Hoffman–Kunze §7.1 or Axler Ch. 8 for the complete construction.)*

**Remark.** This gives a slick alternative diagonalizability test that avoids computing individual eigenspace dimensions: compute $m_A$ (often via minimal-degree relations found by inspection, e.g. for idempotents/involutions/nilpotents where $m_A$ is forced to divide $\lambda(\lambda-1)$, $\lambda^2-1$, $\lambda^k$ respectively) and check for repeated roots.

---

### 4.4 Similarity Invariants

**Theorem 4.4.1.** If $A \sim B$ (similar, i.e. $B=P^{-1}AP$), then $A,B$ share: characteristic polynomial, eigenvalues (with algebraic and geometric multiplicities), minimal polynomial, trace, determinant, rank.

*(Each follows from direct substitution: e.g. $p_B(\lambda) = \det(\lambda I - P^{-1}AP) = \det(P^{-1}(\lambda I - A)P) = \det(P)^{-1}p_A(\lambda)\det(P) = p_A(\lambda)$, using $\lambda I - P^{-1}AP = P^{-1}(\lambda I - A)P$.)*

**Remark (Jordan Canonical Form — stated without full proof).** Over an algebraically closed field (e.g. $\mathbb{C}$), every $A \in M_n(\mathbb{C})$ is similar to a *Jordan canonical form* — a block-diagonal matrix of Jordan blocks $J_k(\lambda) = \lambda I_k + N_k$ ($N_k$ the nilpotent shift matrix with $1$'s on the superdiagonal). This is the finest similarity invariant: two matrices are similar iff they have the same Jordan form up to block reordering. The full existence/uniqueness proof (via the structure theorem for finitely generated modules over a PID, applied to $\mathbb{F}[\lambda]$ acting on $\mathbb{F}^n$ via $A$) is beyond entrance-exam scope; what is exam-relevant is: (i) the number of Jordan blocks for eigenvalue $\lambda$ equals $g(\lambda)$; (ii) the sizes of the blocks are determined by the ranks of powers of $(A-\lambda I)$; (iii) $A$ is diagonalizable iff every Jordan block has size $1$, consistent with Theorem 4.3.4.

---

### 4.5 Challenge Problems

**Challenge Problem 1 (Minimal Polynomial Trick).** Let $A \in M_n(\mathbb{R})$ satisfy $A^3 = A$. Prove $A$ is diagonalizable (over $\mathbb{R}$, in the sense of being similar to a diagonal matrix with real entries).

*Proof.* $m_A(\lambda)$ divides $\lambda^3-\lambda = \lambda(\lambda-1)(\lambda+1)$, a product of **distinct linear factors** over $\mathbb{R}$. Hence $m_A$ itself is a product of a subset of these distinct linear factors, so $m_A$ has no repeated roots; by Theorem 4.3.4, $A$ is diagonalizable, and since all roots of $m_A$ lie in $\{-1,0,1\}\subset\mathbb{R}$, the diagonalization is over $\mathbb{R}$. $\blacksquare$

**Challenge Problem 2 (Patterned Matrix Diagonalizability).** Let $J_n$ be the $n\times n$ all-ones matrix. Show that $A = (a-b)I_n + bJ_n$ (i.e. $a$ on the diagonal, $b$ off-diagonal) is diagonalizable for all $a,b\in\mathbb{R}$, and find its eigenvalues explicitly.

*Proof.* $J_n$ itself is symmetric, hence diagonalizable (Spectral Theorem, §5.2) with eigenvalues $n$ (multiplicity 1, eigenvector $\mathbf{1}$) and $0$ (multiplicity $n-1$, eigenvectors spanning $\mathbf{1}^\perp$). Since $A$ is an affine function of $J_n$ (i.e. $A = (a-b)I + bJ_n$), $A$ shares the same eigenvectors as $J_n$, with eigenvalues $(a-b)+bn = a+(n-1)b$ (multiplicity 1) and $(a-b)+0 = a-b$ (multiplicity $n-1$). Since $A$ has an eigenbasis, $A$ is diagonalizable. $\blacksquare$ *(This matrix is exactly the equicorrelated covariance structure $\sigma^2[(1-\rho)I+\rho J]$ up to scaling — ubiquitous in exchangeable-random-variable models; see Challenge Problem 2 of §5.5.)*

**Challenge Problem 3 (Matrix Polynomial via Minimal Polynomial).** Let $A \in M_n(\mathbb{C})$ with minimal polynomial $m_A(\lambda) = (\lambda-1)(\lambda-2)$. Compute $A^{100}$ in terms of $A$ and $I$.

*Proof.* Since $m_A$ has distinct roots $1,2$, $A$ is diagonalizable with eigenvalues only $1,2$. Perform polynomial division: $\lambda^{100} = q(\lambda)m_A(\lambda) + (a\lambda+b)$ for some remainder $a\lambda+b$ (degree $<2$). Evaluate at the roots: $1 = a+b$ (from $\lambda=1$), $2^{100}=2a+b$ (from $\lambda=2$). Solve: $a = 2^{100}-1$, $b = 2-2^{100}$. Since $m_A(A)=0$, $A^{100} = aA+bI = (2^{100}-1)A + (2-2^{100})I$. $\blacksquare$ *(This "polynomial remainder via minimal polynomial" trick generalizes to any matrix function once $m_A$'s roots are known, and is the fast route to computing high matrix powers without diagonalizing explicitly.)*

**Challenge Problem 4 (Simultaneous Diagonalization).** Let $A,B\in M_n(\mathbb{F})$ satisfy $AB=BA$, and suppose both $A$ and $B$ are diagonalizable. Prove that $A$ and $B$ are **simultaneously diagonalizable**: there is a single basis of $\mathbb{F}^n$ consisting of eigenvectors of both $A$ and $B$.

*Proof.* **Step 1: every eigenspace of $A$ is $B$-invariant.** Let $\lambda$ be an eigenvalue of $A$ and $v\in E_\lambda(A)$, i.e. $Av=\lambda v$. Then
$$A(Bv) = (AB)v = (BA)v = B(Av) = B(\lambda v) = \lambda(Bv),$$
so $Bv\in E_\lambda(A)$ too. Hence $B\big(E_\lambda(A)\big)\subseteq E_\lambda(A)$.

**Step 2: $B$ restricted to each eigenspace of $A$ is diagonalizable.** Since $B$ is diagonalizable, its minimal polynomial $m_B$ has distinct roots (Theorem 4.3.4). Let $B_\lambda:=B|_{E_\lambda(A)}$, a well-defined operator on $E_\lambda(A)$ by Step 1. Since $m_B(B)=0$ on all of $\mathbb F^n$, restricting to $E_\lambda(A)$ gives $m_B(B_\lambda)=0$; so the minimal polynomial of $B_\lambda$ divides $m_B$ (Theorem 4.3.3), and a divisor of a squarefree polynomial is squarefree. By Theorem 4.3.4 again (applied to $B_\lambda$ on $E_\lambda(A)$), $B_\lambda$ is diagonalizable.

**Step 3: assemble the common eigenbasis.** Since $A$ is diagonalizable, $\mathbb F^n=\bigoplus_\lambda E_\lambda(A)$ (sum over the distinct eigenvalues of $A$). By Step 2, choose within each $E_\lambda(A)$ a basis of eigenvectors of $B_\lambda$; every such vector is automatically an eigenvector of $B$ itself (since $B$ agrees with $B_\lambda$ on $E_\lambda(A)$), and it is already an eigenvector of $A$ with eigenvalue $\lambda$ (by membership in $E_\lambda(A)$). The union of these bases over all eigenvalues $\lambda$ of $A$ is a basis of $\mathbb F^n$ — the concatenation of bases of the summands in a direct-sum decomposition — consisting entirely of common eigenvectors of $A$ and $B$. $\blacksquare$

**Remark (Statistical Payoff).** This is the linear-algebraic core of several multivariate methods that use **two** covariance-type matrices at once — canonical correlation analysis, MANOVA, and Fisher's linear discriminant analysis all hinge on a *generalized* eigenvalue problem $\Sigma_1v=\mu\Sigma_2v$ for a pair of matrices that need not literally commute. The standard resolution "whitens" by $\Sigma_2^{-1/2}$ (when $\Sigma_2\succ0$) to convert the pencil into an ordinary eigenvalue problem for the single symmetric matrix $\Sigma_2^{-1/2}\Sigma_1\Sigma_2^{-1/2}$; the present theorem is the special case that already applies **without** whitening whenever the two matrices happen to commute outright — for instance, whenever both are diagonal in the same natural basis by construction, as with covariance matrices possessing a shared block or circulant structure.

---

## Part 5 — Spectral Theory and Special Matrices

### 5.1 Symmetric, Orthogonal, Idempotent, Nilpotent

**Definition 5.1.1.** $A \in M_n(\mathbb{R})$ is:
- **Symmetric** if $A = A^T$.
- **Orthogonal** if $A^TA = AA^T = I$ (equivalently, columns/rows form an orthonormal basis).
- **Idempotent** (a *projection matrix*) if $A^2 = A$.
- **Nilpotent** if $A^k = 0$ for some $k \ge 1$.

**Theorem 5.1.2 (Eigenvalue Constraints from Structure).**
- If $A$ is orthogonal, every eigenvalue $\lambda$ (possibly complex) satisfies $|\lambda|=1$. *(Proof: $Av=\lambda v \implies \|v\|=\|Av\|=|\lambda|\,\|v\| \implies |\lambda|=1$, using $\|Av\|^2=v^*A^*Av = v^*v=\|v\|^2$ since $A^TA=I$.)*
- If $A$ is idempotent, every eigenvalue is $0$ or $1$. *(Proof: $Av=\lambda v \implies A^2v = \lambda^2v = Av=\lambda v \implies \lambda^2=\lambda \implies \lambda\in\{0,1\}$ for $v \ne 0$.)*
- If $A$ is nilpotent, every eigenvalue is $0$. *(Proof: $Av=\lambda v \implies A^kv = \lambda^kv = 0 \implies \lambda^k=0 \implies \lambda=0$.)*

**Theorem 5.1.3 (Trace and Rank of an Idempotent).** If $A$ is idempotent, $\text{tr}(A) = \text{rank}(A)$.

*Proof.* By Challenge Problem 2 of §1.5, $\mathbb{R}^n = \ker A \oplus \text{im}(A)$, and $A$ acts as the identity on $\text{im}(A)$ (since for $y=Ax\in\text{im}A$, $Ay=A^2x=Ax=y$) and as $0$ on $\ker A$. Choosing a basis adapted to this direct sum (basis of $\ker A$ followed by basis of $\text{im}A$), $A$ is similar to $\begin{pmatrix}0&0\\0&I_r\end{pmatrix}$ where $r=\dim\text{im}(A)=\text{rank}(A)$. Trace is a similarity invariant (Corollary 2.2.3), so $\text{tr}(A) = \text{tr}\begin{pmatrix}0&0\\0&I_r\end{pmatrix} = r = \text{rank}(A)$. $\blacksquare$

**Remark.** This is the identity behind "trace of the hat matrix = number of estimated parameters" in OLS — see the Closing Remark.

---

### 5.2 The Spectral Theorem

**Theorem 5.2.1 (Spectral Theorem for Real Symmetric Matrices).** If $A \in M_n(\mathbb{R})$ is symmetric, then:
(a) All eigenvalues of $A$ are real.
(b) $A$ is *orthogonally diagonalizable*: there exists an orthogonal matrix $Q$ and diagonal $\Lambda$ (real entries) with $A = Q\Lambda Q^T$.
(c) Eigenvectors corresponding to distinct eigenvalues are orthogonal.

*Proof.*
(a) Let $Av=\lambda v$, $v\ne 0$ (possibly complex). Then $v^*Av = \lambda v^*v$. Taking conjugate transpose of the scalar $v^*Av$: $(v^*Av)^* = v^*A^*v = v^*Av$ (since $A$ real symmetric, $A^*=A^T=A$), so $v^*Av$ is real. Since $v^*v = \|v\|^2 >0$ is real and positive, $\lambda = (v^*Av)/(v^*v)$ is real.

(c) Let $Av_1=\lambda_1v_1$, $Av_2=\lambda_2v_2$, $\lambda_1\ne\lambda_2$. Then $\lambda_1\langle v_1,v_2\rangle = \langle Av_1,v_2\rangle = \langle v_1,A^Tv_2\rangle=\langle v_1,Av_2\rangle=\lambda_2\langle v_1,v_2\rangle$ (using symmetry $A=A^T$), so $(\lambda_1-\lambda_2)\langle v_1,v_2\rangle=0$, forcing $\langle v_1,v_2\rangle=0$.

(b) By induction on $n$. Take an eigenvalue $\lambda_1$ (exists, real, by (a) and the Fundamental Theorem of Algebra applied to $p_A$) with unit eigenvector $v_1$. Extend $\{v_1\}$ to an orthonormal basis of $\mathbb{R}^n$; in this basis $A$ is similar (via an orthogonal change of basis matrix, since orthonormal-to-orthonormal change of basis is orthogonal) to $\begin{pmatrix}\lambda_1&0\\0&A'\end{pmatrix}$ where $A' \in M_{n-1}(\mathbb{R})$ is symmetric — symmetry is preserved since the conjugating matrix is orthogonal ($Q^TAQ$ is symmetric whenever $A$ is and $Q$ is orthogonal, as $(Q^TAQ)^T=Q^TA^TQ=Q^TAQ$). Apply the inductive hypothesis to $A'$ and combine the orthogonal matrices block-diagonally. $\blacksquare$

**Remark.** This theorem is the load-bearing wall of Part 5: every subsequent statistical fact — PCA as eigendecomposition of a covariance matrix, positive-definiteness as admissibility for a covariance, SVD via $A^TA$ — descends directly from Theorem 5.2.1.

---

### 5.3 Positive Definite and Semi-Definite Matrices

**Definition 5.3.1.** Symmetric $A\in M_n(\mathbb{R})$ is:
- **Positive semi-definite** ($A\succeq0$) if $x^TAx \ge 0\ \forall x\in\mathbb{R}^n$.
- **Positive definite** ($A\succ0$) if $x^TAx>0\ \forall x\ne0$.

**Theorem 5.3.2 (Characterizations).** For symmetric $A$, TFAE:
(i) $A \succ 0$ (resp. $\succeq 0$).
(ii) All eigenvalues of $A$ are $>0$ (resp. $\ge0$).
(iii) All leading principal minors of $A$ are $>0$ (**Sylvester's Criterion** — for strict positive-definiteness only; the semi-definite analogue requires *all* principal minors, not just leading ones, to be $\ge 0$).
(iv) $A = B^TB$ for some invertible $B$ (resp. $A=B^TB$ for some $B$, possibly singular/rectangular).

*Proof sketch.* (i)$\iff$(ii): By Theorem 5.2.1, $A=Q\Lambda Q^T$; set $y=Q^Tx$ (a bijective change of variables since $Q$ orthogonal), so $x^TAx = y^T\Lambda y = \sum\lambda_iy_i^2$, which is positive for all $x\ne0$ (equivalently all $y\ne0$) iff every $\lambda_i>0$.
(ii)$\Rightarrow$(iv): with $A=Q\Lambda Q^T$, $\Lambda=\Lambda^{1/2}\Lambda^{1/2}$ (entrywise square root, valid since eigenvalues $\ge0$), so $A = (\Lambda^{1/2}Q^T)^T(\Lambda^{1/2}Q^T) = B^TB$ with $B=\Lambda^{1/2}Q^T$.
(iv)$\Rightarrow$(ii)/(i): $x^TAx = x^TB^TBx = \|Bx\|^2\ge0$ always; $=0$ only if $Bx=0$, which (for $B$ invertible) forces $x=0$, giving strict positivity.
(iii) is the classical Sylvester determinantal criterion; proof proceeds by induction using the Schur complement (Theorem 2.3.4) applied to leading blocks — the sign of each successive Schur complement is controlled by the ratio of consecutive leading principal minors. $\blacksquare$

**Remark (A Classic Trap).** The caveat in (iii) is not pedantry: the tempting guess that "all leading principal minors $\ge0$" characterizes PSD-ness is **false**. Take
$$A=\begin{pmatrix}0&0\\0&-1\end{pmatrix}.$$
Both leading principal minors are $M_1=0\ge0$ and $M_2=\det A=0\ge0$, yet $A$ has eigenvalue $-1<0$, so $A\not\succeq0$. The correct semi-definite criterion genuinely requires checking **all** $2^n-1$ principal minors (not just the $n$ leading ones) — considerably more expensive, and the reason Sylvester's criterion is usually quoted only for the strict ($\succ0$) case in practice.

**Corollary 5.3.3 (Positive Definite Square Root).** If $A\succ0$ (resp. $A\succeq0$), there is a symmetric $B\succ0$ (resp. $B\succeq0$) with $B^2=A$; write $B=A^{1/2}$. It satisfies $(A^{1/2})^{-1}=(A^{-1})^{1/2}=:A^{-1/2}$ when $A\succ0$.

*Proof.* From $A=Q\Lambda Q^T$ (Theorem 5.2.1) with $\Lambda=\text{diag}(\lambda_1,\ldots,\lambda_n)$, $\lambda_i>0$ (resp. $\ge0$), set $B:=Q\Lambda^{1/2}Q^T$, $\Lambda^{1/2}:=\text{diag}(\sqrt{\lambda_1},\ldots,\sqrt{\lambda_n})$. Then $B=B^T$, $B\succ0$ (resp. $\succeq0$) by Theorem 5.3.2(ii) since its eigenvalues $\sqrt{\lambda_i}$ inherit the sign of $\lambda_i$, and $B^2=Q\Lambda^{1/2}Q^TQ\Lambda^{1/2}Q^T=Q\Lambda Q^T=A$ (using $Q^TQ=I$). The identity $(A^{1/2})^{-1}=(A^{-1})^{1/2}$ follows by the same computation applied to $\Lambda^{-1}=\text{diag}(1/\lambda_i)$: both sides equal $Q\,\text{diag}(1/\sqrt{\lambda_i})\,Q^T$. $\blacksquare$ *(Uniqueness of the PSD square root is true but not needed below, so we omit it.)*

**Remark (Statistical Payoff).** A covariance matrix $\Sigma$ of a random vector must be $\succeq 0$ (since $\text{Var}(a^TX) = a^T\Sigma a \ge0$ for all $a$), and $\succ0$ is required for a non-degenerate multivariate normal density (so that $\Sigma^{-1}$ exists and the density's quadratic form in the exponent is a genuine "bowl"). This connection is elaborated in the Closing Remark.

---

### 5.4 Singular Value Decomposition

**Theorem 5.4.1 (SVD).** Every $A \in M_{m\times n}(\mathbb{R})$ can be written
$$A = U\Sigma V^T,$$
where $U\in M_m(\mathbb{R})$, $V\in M_n(\mathbb{R})$ are orthogonal, and $\Sigma \in M_{m\times n}(\mathbb{R})$ is diagonal (in the rectangular sense: $\Sigma_{ii}=\sigma_i\ge0$, off-diagonal entries $0$) with $\sigma_1\ge\sigma_2\ge\cdots\ge0$ — the *singular values* of $A$.

*Proof outline.* $A^TA \in M_n(\mathbb{R})$ is symmetric and positive semi-definite (it is of the form $B^TB$ with $B=A$, Theorem 5.3.2(iv)), so by the Spectral Theorem, $A^TA = V\Lambda V^T$ with $V$ orthogonal, $\Lambda=\text{diag}(\lambda_1\ge\cdots\ge\lambda_n\ge0)$. Define $\sigma_i := \sqrt{\lambda_i}$ and, for $\sigma_i>0$, $u_i := \tfrac{1}{\sigma_i}Av_i$; one checks $\{u_i\}$ are orthonormal, since $u_i^Tu_j = \tfrac{1}{\sigma_i\sigma_j}v_i^TA^TAv_j = \tfrac{\lambda_j}{\sigma_i\sigma_j}v_i^Tv_j = \delta_{ij}$ (using orthonormality of the $v_i$, and $\lambda_i/\sigma_i^2=1$ when $i=j$). For indices with $\sigma_i=0$: $\|Av_i\|^2=v_i^TA^TAv_i=\lambda_i=0$, so $Av_i=0$ automatically — no separate $u_i$ is forced by $A$, and the construction extends $\{u_i:\sigma_i>0\}$ to a full orthonormal basis $U$ of $\mathbb{R}^m$ arbitrarily on the remaining coordinates. In either case $Av_i=\sigma_iu_i$ holds for every $i$ (trivially when $\sigma_i=0$), i.e. $AV=U\Sigma$, giving $A=U\Sigma V^T$. $\blacksquare$

**Remark.** So: the singular values of $A$ are the square roots of the eigenvalues of $A^TA$ (equivalently of $AA^T$, which shares the same nonzero eigenvalues); the right singular vectors $V$ are eigenvectors of $A^TA$; the left singular vectors $U$ are eigenvectors of $AA^T$. SVD is thus "the Spectral Theorem applied to $A^TA$, transported back to $A$" — it exists for **every** matrix, not just symmetric/square ones, which is precisely why it underlies PCA (eigendecomposition of the empirical covariance $\tfrac1nX^TX$ is literally an SVD of the centered data matrix $X$).

---

### 5.5 Challenge Problems

**Challenge Problem 1 (Idempotent $\Rightarrow$ Diagonalizable, trace = rank, full proof).** Let $A$ be idempotent (not assumed symmetric). Prove $A$ is diagonalizable and $\text{tr}(A)=\text{rank}(A)$.

*Proof.* Diagonalizability: $A^2-A=0$, so the minimal polynomial $m_A(\lambda)$ divides $\lambda^2-\lambda=\lambda(\lambda-1)$, a product of **distinct** linear factors; by Theorem 4.3.4, $A$ is diagonalizable. Trace = rank: this was proved directly in Theorem 5.1.3 via the direct-sum decomposition $\mathbb{R}^n=\ker A\oplus\text{im}(A)$; alternatively, having established diagonalizability, $A$ is similar to $\text{diag}(\underbrace{1,\dots,1}_{r},\underbrace{0,\dots,0}_{n-r})$ where $r=$ number of eigenvalue-$1$'s $=\dim E_1 = \dim\text{im}(A)=\text{rank}(A)$ (using $E_1=\text{im}(A)$ for idempotents: $Av=v\Rightarrow v\in\text{im}A$ trivially, and conversely $y=Ax\Rightarrow Ay=A^2x=Ax=y$), and $\text{tr}(A)=$ sum of the diagonal entries of the similar diagonal matrix $=r$. $\blacksquare$

**Challenge Problem 2 (Structured Covariance Eigenvalues).** Let $\Sigma = \sigma^2[(1-\rho)I_n+\rho J_n]$ be an equicorrelated covariance matrix ($J_n$ = all-ones matrix), with $-\tfrac{1}{n-1}<\rho<1$ to ensure $\Sigma\succ0$. Find the eigenvalues of $\Sigma$ and verify positive-definiteness reduces to the stated constraint on $\rho$.

*Proof.* Write $\Sigma$ in the form of Challenge Problem 2 of §4.5, $\Sigma=(a-b)I_n+bJ_n$, by matching $a-b=\sigma^2(1-\rho)$ and $b=\sigma^2\rho$ (so $a=\sigma^2$). That problem's conclusion transfers directly: eigenvalues of $\Sigma$ are
$$a+(n-1)b = \sigma^2[1+(n-1)\rho] \quad(\text{multiplicity }1), \qquad a-b = \sigma^2(1-\rho) \quad(\text{multiplicity } n-1).$$
By Theorem 5.3.2(ii), $\Sigma\succ0$ iff both are strictly positive: $1-\rho>0 \Rightarrow \rho<1$, and $1+(n-1)\rho>0 \Rightarrow \rho > -\tfrac{1}{n-1}$. This recovers exactly the stated admissible range — the classical bound on intraclass correlation. $\blacksquare$

**Challenge Problem 3 (Advanced, SVD/rank interplay).** Let $A\in M_{m\times n}(\mathbb{R})$ with SVD $A=U\Sigma V^T$ and $\text{rank}(A)=r$. Prove that the best rank-$k$ approximation to $A$ in Frobenius norm ($k<r$) is $A_k = \sum_{i=1}^k\sigma_iu_iv_i^T$, and that the approximation error is $\|A-A_k\|_F^2 = \sum_{i=k+1}^r\sigma_i^2$.

*Proof outline (Eckart–Young–Mirsky Theorem).* Orthogonal invariance of the Frobenius norm — $\|A-B\|_F = \|U^T(A-B)V\|_F$ for orthogonal $U,V$, since $\|X\|_F^2=\text{tr}(X^TX)$ is invariant under $X\mapsto U^TXV$ by cyclicity of trace (Theorem 2.2.2) — reduces the problem to approximating the diagonal matrix $\Sigma$ by a rank-$\le k$ matrix $U^TBV=:Y$. Among all rank-$\le k$ matrices $Y$, one shows (via a Ky Fan norm / interlacing argument, beyond entrance-exam scope to derive from scratch, but standard — see Horn & Johnson §3.4 or Golub–Van Loan) that $\|\Sigma-Y\|_F$ is minimized by zeroing out the smallest $r-k$ diagonal entries of $\Sigma$, i.e. by $Y=\text{diag}(\sigma_1,\ldots,\sigma_k,0,\ldots,0)$, giving $\|\Sigma-Y\|_F^2=\sum_{i=k+1}^r\sigma_i^2$ and, transporting back via $B=UYV^T=\sum_{i=1}^k\sigma_iu_iv_i^T=A_k$, the stated result. $\blacksquare$ *(The reduction to the diagonal case above is fully rigorous and exam-fair; the optimality of truncation among diagonal competitors is the part cited rather than re-derived.)*

**Challenge Problem 4 (Order-Reversal of Matrix Inversion).** Let $A,B$ be symmetric $n\times n$ matrices with $B\succ0$ and $A\succeq B$ (that is, $A-B\succeq0$, the Loewner order). Prove that $A\succ0$ and
$$B^{-1}\succeq A^{-1}.$$

*Proof.* **$A\succ0$:** for any $x\ne0$, $x^TAx = x^TBx+x^T(A-B)x \ge x^TBx>0$ (using $B\succ0$ and $A-B\succeq0$). So $A\succ0$, and both $A^{-1/2},B^{-1/2}$ exist (Corollary 5.3.3).

**Reduction to a normalized case.** Let $C:=A^{-1/2}BA^{-1/2}$, symmetric since $C^T=A^{-1/2}B^TA^{-1/2}=C$. Congruence preserves the Loewner order: for symmetric $X\succeq Y$ and any matrix $P$, $z^TP^T(X-Y)Pz=(Pz)^T(X-Y)(Pz)\ge0$ for all $z$, i.e. $P^TXP\succeq P^TYP$. So from $B\preceq A$, congruence by $A^{-1/2}$ gives
$$C = A^{-1/2}BA^{-1/2} \preceq A^{-1/2}AA^{-1/2} = I,$$
and from $B\succ0$, the same congruence (strict version) gives $C\succ0$. So $C$ is symmetric with $0\prec C\preceq I$: every eigenvalue of $C$ lies in $(0,1]$.

**Inverting.** Diagonalize $C=R\Gamma R^T$ ($\Gamma=\text{diag}(\gamma_1,\ldots,\gamma_n)$, $0<\gamma_i\le1$). Then $C^{-1}=R\Gamma^{-1}R^T$ has eigenvalues $1/\gamma_i\ge1$, so for any $z$, writing $y=R^Tz$: $z^T(C^{-1}-I)z=y^T(\Gamma^{-1}-I)y=\sum_i(1/\gamma_i-1)y_i^2\ge0$. Hence $C^{-1}\succeq I$.

**Undoing the reduction.** $C^{-1}=(A^{-1/2}BA^{-1/2})^{-1}=A^{1/2}B^{-1}A^{1/2}$ (using $(XYZ)^{-1}=Z^{-1}Y^{-1}X^{-1}$ with $X=Z=A^{-1/2}$). So $A^{1/2}B^{-1}A^{1/2}\succeq I$. Congruence by $A^{-1/2}$ once more:
$$A^{-1/2}\big(A^{1/2}B^{-1}A^{1/2}\big)A^{-1/2} \succeq A^{-1/2}IA^{-1/2},$$
and the left side collapses to $B^{-1}$ while the right side is $A^{-1}$, giving
$$B^{-1}\succeq A^{-1}. \qquad\blacksquare$$

**Remark (Statistical Payoff).** This is the linear-algebraic engine behind every "more information can only help" statement in estimation theory. If $\hat\theta_1,\hat\theta_2$ are two unbiased estimators with $\text{Cov}(\hat\theta_1)\preceq\text{Cov}(\hat\theta_2)$ (the Gauss–Markov/Loewner sense in which $\hat\theta_1$ is *more efficient*), this theorem says the corresponding **precision matrices** (inverse covariances) satisfy the reverse inequality $\text{Cov}(\hat\theta_1)^{-1}\succeq\text{Cov}(\hat\theta_2)^{-1}$ — more efficient estimation corresponds to *more* precision, exactly as intuition demands, but the direction-reversal on inverting is precisely this theorem, and it is easy to get backwards under exam pressure.

---

# Appendix: Master Formula Sheet

### Trace
| Identity | Condition |
|---|---|
| $\text{tr}(A+B)=\text{tr}(A)+\text{tr}(B)$ | always |
| $\text{tr}(AB)=\text{tr}(BA)$ | conformable |
| $\text{tr}(ABC)=\text{tr}(BCA)=\text{tr}(CAB)$ | cyclic, NOT $\text{tr}(ACB)$ in general |
| $\text{tr}(A) = \sum_i\lambda_i$ | sum of eigenvalues (with algebraic multiplicity) |
| $\text{tr}(P^{-1}AP)=\text{tr}(A)$ | similarity invariance |
| $\text{tr}(A)=\text{rank}(A)$ | $A$ idempotent |
| $\text{tr}(AA^T)=\|A\|_F^2\ge0$ | equality iff $A=0$ |

### Determinant
| Identity | Condition |
|---|---|
| $\det(AB)=\det(A)\det(B)$ | square, conformable |
| $\det(A^T)=\det(A)$ | always |
| $\det(A^{-1})=1/\det(A)$ | $A$ invertible |
| $\det(cA)=c^n\det(A)$ | $A\in M_n$ |
| $\det(A)=\prod_i\lambda_i$ | product of eigenvalues |
| $\det\begin{pmatrix}A&B\\0&D\end{pmatrix}=\det(A)\det(D)$ | block-triangular |
| $\det\begin{pmatrix}A&B\\C&D\end{pmatrix}=\det(A)\det(D-CA^{-1}B)$ | $A$ invertible; Schur complement |
| $\det(AB)=\sum_S\det(A_{:,S})\det(B_{S,:})$ | Cauchy–Binet, $A\in M_{m\times n}, B\in M_{n\times m}, m\le n$ |
| $\det(A+uv^T)=\det(A)(1+v^TA^{-1}u)$ | matrix determinant lemma (Cor. 2.3.5); $=1+v^Tu$ when $A=I$ |

### Rank
| Identity | Condition |
|---|---|
| $\text{rank}(A)+\dim\mathcal{N}(A)=n$ | Rank–Nullity |
| $\text{rank}(A)=\text{rank}(A^T)$ | row rank = column rank |
| $\text{rank}(AB)\le\min(\text{rank}A,\text{rank}B)$ | always |
| $\text{rank}(A)+\text{rank}(B)-n\le\text{rank}(AB)$ | Sylvester's inequality |
| $|\text{rank}(A)-\text{rank}(B)|\le\text{rank}(A+B)\le\text{rank}(A)+\text{rank}(B)$ | always |
| $\text{rank}(A)=\text{rank}(A^TA)=\text{rank}(AA^T)$ | over $\mathbb{R}$ |
| $\text{rank}\begin{pmatrix}A&B\\B^T&D\end{pmatrix}=\text{rank}(D)+\text{rank}(A-BD^{-1}B^T)$ | $D$ invertible; Guttman-type rank additivity (§2.6 CP4) |

### Inverse / Block Inversion
| Identity | Condition |
|---|---|
| $A^{-1}=\dfrac{1}{\det A}\text{adj}(A)$ | $\det A\ne0$ |
| $(A+uv^T)^{-1}=A^{-1}-\dfrac{A^{-1}uv^TA^{-1}}{1+v^TA^{-1}u}$ | Sherman–Morrison |
| $(A+UCV)^{-1}=A^{-1}-A^{-1}U(C^{-1}+VA^{-1}U)^{-1}VA^{-1}$ | Woodbury |
| $M^{-1}=\begin{pmatrix}A^{-1}+A^{-1}BS^{-1}CA^{-1}&-A^{-1}BS^{-1}\\-S^{-1}CA^{-1}&S^{-1}\end{pmatrix}$, $S=D-CA^{-1}B$ | block inversion via Schur complement |

### Matrix Calculus (brief)
| Derivative | Result |
|---|---|
| $\dfrac{\partial (a^Tx)}{\partial x}$ | $a$ |
| $\dfrac{\partial (x^TAx)}{\partial x}$ | $(A+A^T)x$; $=2Ax$ if $A$ symmetric |
| $\dfrac{\partial (x^TAx)}{\partial x \partial x^T}$ (Hessian) | $A+A^T$; $=2A$ if $A$ symmetric |
| $\dfrac{\partial \|Ax-b\|_2^2}{\partial x}$ | $2A^T(Ax-b)$ — setting this to $0$ *is* the normal equations $A^TAx=A^Tb$ |
| $\dfrac{\partial \,\text{tr}(AX)}{\partial X}$ | $A^T$ |
| $\dfrac{\partial \,\text{tr}(X^TAX)}{\partial X}$ | $(A+A^T)X$ |
| $\dfrac{\partial \log\det(X)}{\partial X}$ | $(X^{-1})^T$; $=X^{-1}$ if $X$ symmetric |
| $\dfrac{\partial \det(X)}{\partial X}$ | $\det(X)(X^{-1})^T$ |

---

# Closing Remark: The Unifying Theme

Strip away the exam-paper packaging and this treatise has told one story from five angles: **linear algebra is the geometry that makes multivariate statistics legible.**

A random vector $X$ has a covariance matrix $\Sigma = \text{Cov}(X)$, and the very first thing you learn to check about $\Sigma$ — that it is symmetric and $\succeq 0$ — is not an incidental algebraic nicety but a theorem (§5.3, Theorem 5.3.2) in disguise: $a^T\Sigma a = \text{Var}(a^TX) \ge 0$ for every direction $a$ is *exactly* the defining inequality of positive semi-definiteness. When $\Sigma \succ 0$, the Spectral Theorem (§5.2) hands you an orthogonal basis of *principal axes* — eigenvectors of $\Sigma$ — along which the components of $X$ decorrelate, and the multivariate normal density $\propto \exp(-\tfrac12(x-\mu)^T\Sigma^{-1}(x-\mu))$ is literally the equation of an ellipsoid whose principal axes are $\Sigma$'s eigenvectors and whose semi-axis lengths are proportional to the square roots of $\Sigma$'s eigenvalues — equivalently, inversely proportional to the square roots of $\Sigma^{-1}$'s eigenvalues, so that directions of large variance become the *long* axes of the density's contours, exactly as intuition demands. Positive-definiteness is not a technical side-condition on this picture; it *is* the condition that the ellipsoid is a genuine, non-degenerate bowl rather than a flattened, singular one — and Challenge Problem 4 of §5.5 is the statement that *shrinking* this ellipsoid (in the Loewner order) is the same thing as *growing* its inverse, the precise sense in which more precise estimation means a tighter concentration ellipsoid.

And the idempotent matrices of §5.1 are the other half of the same coin. In ordinary least squares, $\hat\beta = (X^TX)^{-1}X^Ty$ (an instance of the pseudoinverse of §3.4, since $X^+ = (X^TX)^{-1}X^T$ when $X$ has full column rank) produces fitted values $\hat y = X\hat\beta = \underbrace{X(X^TX)^{-1}X^T}_{H,\text{ the hat matrix}}y$. The hat matrix $H$ is symmetric *and* idempotent — $H^2 = X(X^TX)^{-1}X^TX(X^TX)^{-1}X^T = X(X^TX)^{-1}X^T = H$ — which is precisely the algebraic signature of an **orthogonal projection** (Challenge Problem 2 of §1.5: $\mathbb{R}^n = \ker H\oplus\text{im}(H)$, and here that decomposition *is* the decomposition of $\mathbb{R}^n$ into the column space of $X$ and its orthogonal complement, the residual space — the very orthogonality proved abstractly in Theorem 1.4.4). Theorem 5.1.3 — $\text{tr}(H) = \text{rank}(H)$ — combined with the fact that $\text{im}(H)=\mathcal C(X)$ (so $\text{rank}(H)=\text{rank}(X)=p$ when $X$ has full column rank $p$) tells you the trace of the hat matrix equals $p$, the number of estimated regression coefficients — exactly the "degrees of freedom used up" that appears in every $F$-test and every unbiasedness calculation for $\hat\sigma^2$ in a linear model.

So when you next diagonalize a symmetric matrix, or check that a Schur complement is positive, or compute $\text{tr}(H)$ for a hat matrix — you are not doing algebra *and then* applying it to statistics. You are doing the same piece of mathematics twice, once in the language of vector spaces and once in the language of random variables, and linear algebra is simply the more honest of the two languages about what is actually going on.
