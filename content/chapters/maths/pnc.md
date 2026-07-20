<!--metadata
  title: "Permutations and Combinations"
  authors: ["Subhajit Gorai", "claude.ai"]
  dateCreated: "20/07/2026"
  dateEdited: "20/07/2026"
  description: "From First Principles to Generating Functions — For the JEE Advanced, ISI/CMI Entrance, and Olympiad Aspirant"
  tags: [""]
-->

<!--
@uses drafts/pnc-better-prompt.md
-->

# Permutations and Combinations: A Rigorous Treatise on Combinatorics


## Preface

Combinatorics has a curious reputation: it is thought of as the branch of mathematics with the fewest prerequisites and the highest difficulty ceiling. Anyone who can count on their fingers can state a combinatorics problem; almost no one can solve the hard ones on sight. There is no vast machinery to hide behind, no theorem so powerful that it renders the problem trivial — every configuration must be understood on its own terms, usually by finding the *right way to look at it*.

This treatise is written for the reader who has outgrown the "select the correct formula" stage of combinatorics and is ready for the "construct the correct argument" stage — the level demanded by JEE Advanced, the ISI (B.Stat/B.Math) and CMI entrance examinations, and the Olympiad circuit (INMO, IMO). We assume comfort with sets, functions, basic algebra, and mathematical induction. We do **not** re-derive the factorial or explain what a "permutation" is in the elementary sense; instead we build outward from these atoms toward the tools — Inclusion-Exclusion, the Pigeonhole Principle, double counting, and generating functions — that separate contestants who *know* combinatorics from those who *compute* it.

Every major section follows the same discipline: **Definitions** fix vocabulary, **Theorems** are stated with precision, **Proofs** are given in full wherever they illuminate a counting technique (and are named and cited, rather than silently omitted, when they require machinery — such as Burnside's Lemma — that lies formally outside our scope), **Remarks** and **Tricks** collect the folklore that experienced problem-solvers carry in their heads, **Examples** are fully worked, and each Part closes with one or two **Challenge Problems** — genuinely hard, fully solved, at competition level.

Combinatorics rewards patience and punishes haste. Read the proofs; do not skip to the formulas.

---

## Table of Contents

- **Conventions and Notation**
- **Part I — Fundamental Counting Principles & Basic Configurations**
  - 1.1 The Rule of Sum and the Rule of Product
  - 1.2 Permutations and Combinations
  - 1.3 Permutations of a Multiset
  - 1.4 Circular Permutations
  - 1.5 Problem-Solving Tricks: Bundling, Gaps, and Lexicographic Rank
  - 1.6 Challenge Problems
- **Part II — Distributions, Partitions, and Stars & Bars**
  - 2.1 The Stars and Bars Theorem
  - 2.2 Constrained Distributions: Bounds and PIE
  - 2.3 The Twelvefold Way (Basics)
  - 2.4 The Multinomial Theorem
  - 2.5 Challenge Problems
- **Part III — The Principle of Inclusion–Exclusion & Derangements**
  - 3.1 PIE: Statement and Proof
  - 3.2 Derangements
  - 3.3 Surjections
  - 3.4 Hidden PIE in Number Theory
  - 3.5 Challenge Problem: The Problème des Ménages
- **Part IV — Pigeonhole Principle & Combinatorial Proofs**
  - 4.1 The Pigeonhole Principle, Basic and Generalized
  - 4.2 Applications in Number Theory and Geometry
  - 4.3 Double Counting
  - 4.4 Key Identities via Combinatorial Proof
  - 4.5 Challenge Problems
- **Part V — Generating Functions & Recurrence Relations**
  - 5.1 Motivation
  - 5.2 Ordinary Generating Functions: A Working Table
  - 5.3 Coefficient Extraction
  - 5.4 Catalan Numbers
  - 5.5 Challenge Problems
- **Appendix — Master Formula Sheet**
- **Closing Remark — The Unifying Theme**

---

## Conventions and Notation

| Symbol | Meaning |
|---|---|
| $[n]$ | The set $\{1, 2, \ldots, n\}$ |
| $\lvert S \rvert$ or $\#S$ | Cardinality of the finite set $S$ |
| $n!$ | $n$ factorial, with $0! = 1$ |
| $n^{\underline{r}}$ | Falling factorial $n(n-1)\cdots(n-r+1)$, $r$ terms |
| $^nP_r$, $P(n,r)$ | Number of $r$-permutations of $n$ distinct objects; $P(n,r) = n^{\underline{r}}$ |
| $^nC_r$, $\binom{n}{r}$ | Number of $r$-combinations of $n$ distinct objects |
| $\binom{n}{n_1, n_2, \ldots, n_k}$ | Multinomial coefficient $\dfrac{n!}{n_1! n_2! \cdots n_k!}$ |
| $S_n$ | The symmetric group: all permutations (bijections) of $[n]$ |
| $D_n$ | The number of derangements of $[n]$ |
| $S(n,k)$ | Stirling number of the second kind: ways to partition an $n$-set into $k$ nonempty unlabeled blocks |
| $C_n$ | The $n$-th Catalan number |
| $\phi(N)$ | Euler's totient function |
| $\mathbb{Z}_{\ge 0}$ | Non-negative integers |
| $[x^n]\,f(x)$ | The coefficient of $x^n$ in the power series $f(x)$ |
| $\blacksquare$ | End of proof |

Throughout, "arrangement" means an ordered sequence and "selection" or "collection" means an unordered set (or multiset, when explicitly noted). Unless stated otherwise, all objects within a single problem are assumed *distinguishable* — the moment objects become identical, we say so explicitly, because this is precisely where most counting errors are born.

---

## Part I — Fundamental Counting Principles & Basic Configurations

### 1.1 The Rule of Sum and the Rule of Product

Everything in enumerative combinatorics is ultimately built from two axioms about finite sets.

> **Axiom 1.1 (Rule of Sum).** If a finite set $A$ is partitioned into disjoint subsets $A_1, A_2, \ldots, A_k$ (that is, $A = A_1 \cup \cdots \cup A_k$ and $A_i \cap A_j = \emptyset$ for $i \ne j$), then
> $$|A| = |A_1| + |A_2| + \cdots + |A_k|.$$
> Combinatorially: if a task can be accomplished in exactly one of $k$ *mutually exclusive* ways, and the $i$-th way can be done in $n_i$ ways, the task can be done in $n_1 + n_2 + \cdots + n_k$ ways.

> **Axiom 1.2 (Rule of Product).** Suppose a procedure consists of $k$ successive stages, and no matter which choices are made at stages $1, \ldots, i-1$, stage $i$ always offers exactly $n_i$ choices. Then the total number of ways to complete the whole procedure is
> $$n_1 \times n_2 \times \cdots \times n_k.$$

**Remark (Independent vs. dependent choices).** The Rule of Product does *not* require that the choices be "independent" in the sense of being unaffected by earlier stages — it only requires that the *number* of available choices at each stage be constant, regardless of what was chosen earlier. For instance, "choose a letter, then choose a different letter from the same alphabet of 26" has $26 \times 25$ outcomes: the second stage's *count* (25) is fixed even though the specific available letters depend on the first choice. When even the count of choices varies with earlier decisions, the product rule fails outright and one must fall back on casework (repeated application of the Sum Rule) or a cleverer bijection.

**Example 1.1.** A password consists of 4 characters: the first two must be distinct uppercase letters, the last two must be distinct digits (0–9), and additionally the password must not start with the letter 'Q'. Count the passwords.

*Solution.* Stage 1 (first letter, $\ne Q$): 25 choices. Stage 2 (second letter, distinct from the first): 25 choices (26 minus the one already used — note 'Q' is now available again unless it was excluded only from stage 1). Stage 3 (first digit): 10 choices. Stage 4 (second digit, distinct): 9 choices. By the Product Rule: $25 \times 25 \times 10 \times 9 = 56{,}250$. $\blacksquare$

---

### 1.2 Permutations and Combinations

> **Definition 1.1.** An **$r$-permutation** of a set of $n$ distinct objects is an ordered sequence of $r$ of those objects, no repetitions. We write $^nP_r$ or $P(n,r)$ for the count.

> **Theorem 1.1.** $\displaystyle P(n,r) = n^{\underline{r}} = n(n-1)(n-2)\cdots(n-r+1) = \frac{n!}{(n-r)!}, \qquad 0 \le r \le n.$

*Proof.* Fill the $r$ positions in sequence. Position 1 may be filled in $n$ ways; having used one object, position 2 has $n-1$ remaining choices; and so on, until position $r$, which has $n-r+1$ choices. The Rule of Product gives the product of these $r$ terms. $\blacksquare$

> **Definition 1.2.** An **$r$-combination** of a set of $n$ distinct objects is an *unordered* selection of $r$ of them. We write $^nC_r$ or $\binom{n}{r}$ for the count.

> **Theorem 1.2.** $\displaystyle \binom{n}{r} = \frac{n!}{r!\,(n-r)!}.$

*Proof.* Every $r$-combination corresponds to exactly $r!$ distinct $r$-permutations (obtained by ordering its elements in every possible way), and every $r$-permutation arises from exactly one $r$-combination this way. This is a $r!$-to-one correspondence from permutations to combinations, so $P(n,r) = r!\,\binom{n}{r}$, and the result follows by Theorem 1.1. $\blacksquare$

> **Theorem 1.3 (Symmetry).** $\displaystyle \binom{n}{r} = \binom{n}{n-r}.$

*Algebraic proof.* Immediate from $\binom{n}{r} = \dfrac{n!}{r!(n-r)!}$, which is symmetric under $r \leftrightarrow n-r$.

*Combinatorial (bijective) proof.* Choosing $r$ elements **to include** in a subset is the same act as choosing the complementary $n-r$ elements **to exclude**. The map $S \mapsto [n]\setminus S$ is a bijection between $r$-subsets and $(n-r)$-subsets of $[n]$. $\blacksquare$

**Remark.** The two proofs above illustrate the central methodological split in this subject: an *algebraic* proof manipulates a formula; a *combinatorial* (or *bijective*, or *story*) proof exhibits the equality as an obvious restatement of the same counting problem. Competition mathematics prizes the second kind enormously, both because it is more robust (it generalizes without re-deriving algebra) and because it is frequently the only tractable route when the objects involved are not simple integers.

> **Theorem 1.4 (Pascal's Identity).** $\displaystyle \binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}, \qquad 1 \le r \le n-1.$

*Combinatorial proof.* Fix a distinguished element $x$ in the $n$-set. Every $r$-subset either contains $x$ (in which case the other $r-1$ elements are chosen from the remaining $n-1$: $\binom{n-1}{r-1}$ ways) or does not contain $x$ (in which case all $r$ elements come from the remaining $n-1$: $\binom{n-1}{r}$ ways). These two cases are disjoint and exhaustive, so the Rule of Sum gives the identity. $\blacksquare$

---

### 1.3 Permutations of a Multiset

> **Theorem 1.5 (Multiset Permutations).** Given $n$ objects consisting of $k$ distinguishable *types*, with $n_i$ indistinguishable copies of type $i$ (so $n_1 + n_2 + \cdots + n_k = n$), the number of distinguishable linear arrangements of all $n$ objects is
> $$\frac{n!}{n_1!\,n_2! \cdots n_k!}.$$

*Proof.* Temporarily label the $n_i$ copies of type $i$ as distinct (e.g. subscript them $1, 2, \ldots, n_i$), producing $n$ fully distinguishable objects, which admit $n!$ linear arrangements. In this inflated count, every genuine arrangement of the original multiset has been counted once for each way of permuting the labels *within* each type — that is, $n_1! \, n_2! \cdots n_k!$ times, since permuting the fake labels within a type produces the same multiset-arrangement. Hence the number of genuinely distinct arrangements is $n! / (n_1! \cdots n_k!)$. $\blacksquare$

**Example 1.2.** The number of distinct arrangements of the letters of `COMBINATORICS` (13 letters: C×2, O×2, M×1, B×1, I×2, N×1, A×1, T×1, R×1, S×1) is
$$\frac{13!}{2!\,2!\,2!} = \frac{6{,}227{,}020{,}800}{8} = 778{,}377{,}600.$$

---

### 1.4 Circular Permutations

> **Theorem 1.6.** The number of ways to arrange $n$ distinct objects around a circle, where arrangements related by rotation are considered identical, is $(n-1)!$.

*Proof.* Every circular arrangement corresponds to exactly $n$ linear arrangements (start reading at any of the $n$ positions), and every linear arrangement of the $n$ objects gives rise to exactly one circular arrangement. This is an $n$-to-one correspondence from the $n!$ linear arrangements to the circular ones, so the count is $n!/n = (n-1)!$. Equivalently: fix one object's seat arbitrarily to kill the rotational symmetry, then arrange the remaining $n-1$ objects in the remaining $n-1$ seats in $(n-1)!$ ways. $\blacksquare$

> **Remark (Necklaces vs. Garlands — reflection symmetry).** A circular arrangement in which *reflections* (flipping the whole arrangement over, as one physically can with a necklace or a garland of flowers, but not with people seated at a table) are also considered identical is sometimes called a **bracelet** or **necklace** arrangement, as opposed to a **garland**/table arrangement where only rotations are identified. Since reflection is an additional symmetry of order 2 (and is a genuine, non-trivial symmetry whenever $n \ge 3$), the count for $n \ge 3$ distinct objects is
> $$\frac{(n-1)!}{2}.$$
> *Caution:* this simple halving trick works because for $n \ge 3$ *distinct* objects, no arrangement is its own mirror image, so every reflection pairs two genuinely different rotational-arrangements into one bracelet. If the objects repeat (a multiset) or $n$ is small, some arrangements may be symmetric under reflection, and the naive halving overcounts the reduction; the fully general tool for such symmetric counting is **Burnside's Lemma** (equivalently, the Cauchy–Frobenius Orbit-Counting Theorem), which we state without proof here, as its proof requires group-action machinery beyond our scope:
> $$\text{(number of arrangements up to a symmetry group } G\text{)} = \frac{1}{|G|}\sum_{g \in G} |\text{Fix}(g)|.$$
> We will use this freely by name whenever a problem's symmetry group is non-trivial enough to demand it.

**Trick (Restricted circular arrangements).** Circular restriction problems ("$A$ and $B$ must/must not sit together", "men and women must alternate") are almost always solved by combining Theorem 1.6 with the Bundling or Gap tricks of §1.5, applied *after* fixing one object to linearize the circle. We will do exactly this in Challenge Problem 1.2 below and again with the Problème des Ménages in Part III.

---

### 1.5 Problem-Solving Tricks

#### The Tie/Bundle Method (objects always together)

**Trick.** To count arrangements of $n$ distinct objects in which a specified subset of $k$ of them must all be *mutually adjacent* (in some order, forming an unbroken block), glue them into a single "super-object." This leaves $n - k + 1$ units to arrange (the block, plus the $n-k$ remaining individual objects), and the block's internal order can be permuted in $k!$ ways independently. Hence:
$$\text{(linear case)} \quad (n-k+1)! \times k!, \qquad \text{(circular case)} \quad (n-k)! \times k!.$$
(The circular count uses $((n-k+1)-1)! = (n-k)!$ by Theorem 1.6 applied to the $n-k+1$ units.)

#### The Gap Method (objects never together)

**Trick.** To count arrangements of $n$ distinct objects in which $k$ specified objects are pairwise **non-adjacent** (no two of the $k$ special objects stand next to each other), first arrange the remaining $n-k$ objects: $(n-k)!$ ways. This creates $n-k+1$ "gaps" — one before, one after, and one between each pair of consecutive objects — into which the $k$ special objects must be inserted, at most one per gap (to guarantee no two specials are adjacent), and in order:
$$(n-k)! \times P(n-k+1,\, k).$$

**Example 1.3.** In how many ways can 5 boys and 3 girls be arranged in a row so that no two girls are adjacent?

*Solution.* Arrange the 5 boys: $5! = 120$ ways, creating 6 gaps. Place the 3 girls into 3 of these 6 gaps, in order: $P(6,3) = 6 \times 5 \times 4 = 120$. Total: $120 \times 120 = 14{,}400$. $\blacksquare$

#### Lexicographic (Dictionary) Rank

**Trick.** To find the rank of a word $w$ among all *distinct* permutations of its letters, arranged in dictionary order: process $w$ left to right. At each position $i$, for every letter *strictly smaller* (alphabetically) than $w_i$ still available in the remaining multiset, count how many arrangements of the *remaining* letters (after placing that smaller letter at position $i$) are possible — this is a multiset-permutation count via Theorem 1.5 — and add this to a running total. After placing $w_i$ itself (not counted, since we want words *before* $w$) and consuming it from the multiset, proceed to position $i+1$. After all positions are processed, the rank of $w$ is
$$\text{rank}(w) = 1 + \sum_{i=1}^{n} (\text{count of smaller-first words matching } w_1 \cdots w_{i-1}\text{ at position } i).$$

We defer a complete worked instance of this trick — with repeated letters, which is where the bookkeeping becomes genuinely delicate — to Challenge Problem 1.1 below.

---

### 1.6 Challenge Problems

> **Challenge Problem 1.1.** Find the rank of the word **MISSISSIPPI** among all of its distinct letter-permutations, arranged in dictionary order.

*Solution.* The letters are $\{M{:}1,\ I{:}4,\ S{:}4,\ P{:}2\}$, total length $11$, and the alphabetical order of the letters present is $I < M < P < S$. We apply the lexicographic-rank algorithm of §1.5, tracking the *remaining* multiset at each step.

| Pos. | Letter | Remaining multiset *before* this position | Smaller letters available, and arrangements of the rest | Contribution |
|---|---|---|---|---|
| 1 | M | $I{:}4,M{:}1,P{:}2,S{:}4$ | $I$: remaining $I{:}3,M{:}1,P{:}2,S{:}4$ (10 letters); arrangements $=\dfrac{10!}{3!1!2!4!}=12600$ | $12600$ |
| 2 | I | $I{:}4,P{:}2,S{:}4$ | none smaller than $I$ | $0$ |
| 3 | S | $I{:}3,P{:}2,S{:}4$ | $I$: $\dfrac{8!}{2!2!4!}=420$; $\quad P$: $\dfrac{8!}{3!1!4!}=280$ | $700$ |
| 4 | S | $I{:}3,P{:}2,S{:}3$ | $I$: $\dfrac{7!}{2!2!3!}=210$; $\quad P$: $\dfrac{7!}{3!1!3!}=140$ | $350$ |
| 5 | I | $I{:}3,P{:}2,S{:}2$ | none smaller than $I$ | $0$ |
| 6 | S | $I{:}2,P{:}2,S{:}2$ | $I$: $\dfrac{5!}{1!2!2!}=30$; $\quad P$: $\dfrac{5!}{2!1!2!}=30$ | $60$ |
| 7 | S | $I{:}2,P{:}2,S{:}1$ | $I$: $\dfrac{4!}{1!2!1!}=12$; $\quad P$: $\dfrac{4!}{2!1!1!}=12$ | $24$ |
| 8 | I | $I{:}2,P{:}2$ | none smaller than $I$ | $0$ |
| 9 | P | $I{:}1,P{:}2$ | $I$: $\dfrac{2!}{2!}=1$ | $1$ |
| 10 | P | $I{:}1,P{:}1$ | $I$: $\dfrac{1!}{1!}=1$ | $1$ |
| 11 | I | $I{:}1$ | none smaller than $I$ | $0$ |

Summing the contributions: $12600+0+700+350+0+60+24+0+1+1+0 = 13736$.

$$\text{rank(MISSISSIPPI)} = 13736 + 1 = \boxed{13737}. \qquad \blacksquare$$

**Remark.** The pattern of zero contributions at every position where the actual letter placed is the *smallest remaining* letter ($I$, at positions 2, 5, 8, 11) is not a coincidence — it is the reason MISSISSIPPI is comparatively "early" in the dictionary relative to its length; each such position forces the running sum to pause. Recognizing this in advance is a useful sanity check against arithmetic slips.

> **Challenge Problem 1.2.** Nine people, including a group of $3$ siblings and (separately) a pair of rivals, are to be seated around a circular table (rotations identified, reflections distinct). The siblings insist on sitting together as an unbroken block; the two rivals refuse to sit next to each other. How many seating arrangements are possible?

*Solution.* We compute (arrangements with siblings together) $-$ (arrangements with siblings together *and* rivals also together), by inclusion–exclusion on the single "bad" event.

**Step 1 — Siblings together, no other restriction.** Bundle the 3 siblings into one block (Tie Method). This leaves $9 - 3 + 1 = 7$ units to seat circularly: $(7-1)! = 6! = 720$ ways, times $3! = 6$ internal orderings of the block:
$$720 \times 6 = 4320.$$

**Step 2 — Siblings together AND the two rivals also adjacent (to be subtracted).** Now bundle the rivals into a second block as well. We have the siblings-block, the rivals-block, and $9 - 3 - 2 = 4$ remaining individuals: $4 + 2 = 6$ units total, arranged circularly in $(6-1)! = 5! = 120$ ways, times $3!=6$ (siblings' internal order) times $2! = 2$ (rivals' internal order):
$$120 \times 6 \times 2 = 1440.$$

**Step 3 — Subtract.**
$$4320 - 1440 = \boxed{2880}.$$
$\blacksquare$

---

## Part II — Distributions, Partitions, and Stars & Bars

### 2.1 The Stars and Bars Theorem

> **Theorem 2.1 (Stars and Bars — non-negative case).** The number of solutions in non-negative integers to
> $$x_1 + x_2 + \cdots + x_k = n$$
> is $\displaystyle \binom{n+k-1}{k-1}$.

*Proof.* Represent a solution as a row of $n$ identical stars ($\star$) separated into $k$ groups by $k-1$ bars ($|$): the number of stars in the $i$-th group is $x_i$. Conversely, every arrangement of $n$ stars and $k-1$ bars in a row corresponds to exactly one solution. So we are counting arrangements of a multiset of $n+k-1$ symbols, of which $n$ are stars and $k-1$ are bars — by Theorem 1.5, this is
$$\frac{(n+k-1)!}{n!\,(k-1)!} = \binom{n+k-1}{k-1}. \qquad \blacksquare$$

This device is affectionately called the **Beggars' Method**: $n$ identical coins ("stars") are to be distributed among $k$ beggars, separated by $k-1$ dividers.

> **Theorem 2.2 (Stars and Bars — positive case).** The number of solutions in *positive* integers to $x_1 + \cdots + x_k = n$ (assuming $n \ge k$) is $\displaystyle \binom{n-1}{k-1}$.

*Proof.* Substitute $y_i = x_i - 1 \ge 0$. The equation becomes $y_1 + \cdots + y_k = n - k$, with $y_i \ge 0$. By Theorem 2.1, this has $\binom{(n-k)+k-1}{k-1} = \binom{n-1}{k-1}$ solutions, and the substitution is a bijection. $\blacksquare$

---

### 2.2 Constrained Distributions: Bounds and PIE

**Lower bounds ($x_i \ge a_i$).** Substitute $y_i = x_i - a_i \ge 0$; the equation $\sum x_i = n$ becomes $\sum y_i = n - \sum a_i$, reducing to Theorem 2.1 (provided $n \ge \sum a_i$, else there are $0$ solutions).

**Upper bounds ($x_i \le b_i$) — requires PIE.** Let $U$ be the set of all non-negative-integer solutions to $\sum_{i=1}^{k} x_i = n$ (ignoring upper bounds), counted by Theorem 2.1. Let $A_i \subseteq U$ be the "bad" event that $x_i \ge b_i + 1$ (violates its upper bound). We want $|U| - |A_1 \cup \cdots \cup A_k|$, computed via the Principle of Inclusion–Exclusion (proved formally in §3.1): for a subset $S \subseteq [k]$, the intersection $\bigcap_{i \in S} A_i$ forces $x_i \ge b_i + 1$ for each $i \in S$, which (after the shift $x_i \mapsto x_i - (b_i+1)$ for $i \in S$) is itself a Stars-and-Bars count with total $n - \sum_{i \in S}(b_i + 1)$, namely $\binom{n - \sum_{i\in S}(b_i+1) + k - 1}{k-1}$ (interpreted as $0$ if the top is negative). Hence:
$$\left|\bigcup_i A_i\right| = \sum_{\emptyset \ne S \subseteq [k]} (-1)^{|S|+1} \binom{n - \sum_{i \in S}(b_i+1) + k - 1}{k-1},$$
giving the number of valid (bounded) solutions as
$$N = \sum_{S \subseteq [k]} (-1)^{|S|} \binom{n - \sum_{i \in S}(b_i+1) + k - 1}{k-1}.$$

**Inequality constraints ($x_1 + \cdots + x_k \le n$).** Introduce a non-negative *slack variable* $x_{k+1} \ge 0$ so that $x_1 + \cdots + x_k + x_{k+1} = n$ exactly; this converts the inequality into an equality in $k+1$ variables, reducing again to Theorem 2.1.

**Trick (Complementary/Conjugate Substitution).** When the target sum $n$ is *close to* the sum of the upper bounds $B = \sum b_i$ — specifically when the "deficit" $B - n$ is small — it is often far faster to substitute $y_i = b_i - x_i \ge 0$. The constraint becomes $\sum y_i = B - n$ with $y_i \le b_i$, and if $B-n$ is small enough that no single $y_i$ could exceed its own bound $b_i$ except in one or two easily-enumerated edge cases, the PIE collapses to a tiny calculation. We use exactly this shortcut in Challenge Problem 2.1.

---

### 2.3 The Twelvefold Way (Basics)

Distributing $n$ objects into $k$ boxes is, formally, choosing a function $f$ from an $n$-set to a $k$-set. The count depends on three binary choices: whether the $n$ objects are **distinguishable**, whether the $k$ boxes are **distinguishable**, and whether $f$ is required to be **arbitrary**, **injective** (at most one object per box — needs $n \le k$), or **surjective** (every box non-empty — needs $n \ge k$). This gives Rota's **Twelvefold Way**:

| Objects (rows) / Boxes (columns) | Any function | Injective ($n\le k$) | Surjective ($n \ge k$) |
|---|---|---|---|
| **Distinct objects, distinct boxes** | $k^n$ | $k^{\underline{n}}$ | $k!\,S(n,k)$ |
| **Distinct objects, identical boxes** | $\displaystyle\sum_{j=0}^{k} S(n,j)$ | $[n \le k]$ | $S(n,k)$ |
| **Identical objects, distinct boxes** | $\dbinom{n+k-1}{k-1}$ | $\dbinom{k}{n}$ | $\dbinom{n-1}{k-1}$ |
| **Identical objects, identical boxes** | $p_{\le k}(n)$ | $[n \le k]$ | $p_k(n)$ |

Here $S(n,k)$ is the **Stirling number of the second kind** — the number of ways to partition an $n$-set into $k$ non-empty, unlabeled blocks — and $p_k(n)$ is the number of ways to partition the integer $n$ into exactly $k$ positive parts (with $p_{\le k}(n) = \sum_{j=0}^k p_j(n)$ counting partitions into *at most* $k$ parts). The bracket $[n \le k]$ is the Iverson bracket, equal to $1$ if true and $0$ otherwise.

The Stirling numbers satisfy the recurrence
$$S(n,k) = k\,S(n-1,k) + S(n-1,k-1),$$
by considering whether element $n$ joins one of the $k$ existing blocks of a partition of $[n-1]$ into $k$ blocks (that block can be chosen in $k$ ways), or forms a new singleton block on top of a partition of $[n-1]$ into $k-1$ blocks. Dividing the surjection count (Theorem 3.3, ahead) by $k!$ (to un-label the boxes) gives the closed form
$$S(n,k) = \frac{1}{k!}\sum_{j=0}^{k} (-1)^j \binom{k}{j} (k-j)^n,$$
which we will derive as a Principle of Inclusion–Exclusion consequence in §3.3.

**Row 3 of the table is precisely the connective tissue between Part II and Part III** — the count of ways to distribute distinct objects into distinct non-empty boxes *is* the count of surjective functions, our next major topic.

---

### 2.4 The Multinomial Theorem

> **Theorem 2.3 (Multinomial Theorem).** For a positive integer $n$,
> $$(x_1 + x_2 + \cdots + x_k)^n = \sum_{\substack{n_1 + n_2 + \cdots + n_k = n \\ n_i \ge 0}} \binom{n}{n_1, n_2, \ldots, n_k} x_1^{n_1} x_2^{n_2} \cdots x_k^{n_k}, \qquad \binom{n}{n_1,\ldots,n_k} := \frac{n!}{n_1! n_2! \cdots n_k!}.$$

*Proof.* Expanding the product $(x_1 + \cdots + x_k)^n = \underbrace{(x_1+\cdots+x_k)(x_1+\cdots+x_k)\cdots(x_1+\cdots+x_k)}_{n \text{ factors}}$ by full distributivity produces one term for every way of choosing, from *each* of the $n$ factors, one of the $k$ variables — i.e. one term for every function from an $n$-set (the factors) to a $k$-set (the variables). Collecting terms with the same monomial $x_1^{n_1}\cdots x_k^{n_k}$ means counting the functions in which exactly $n_i$ of the $n$ factors chose variable $x_i$ — by Theorem 1.5 (equivalently, row 1 of the Twelvefold Way with distinguishable factors and a fixed "type profile"), this is $\dfrac{n!}{n_1!\cdots n_k!}$. $\blacksquare$

**Corollary (Number of terms).** The number of *distinct monomials* appearing in the expansion equals the number of non-negative integer solutions to $n_1 + \cdots + n_k = n$, which by Theorem 2.1 is $\displaystyle \binom{n+k-1}{k-1}$ — the Multinomial Theorem and Stars-and-Bars are two faces of the same coin.

**Example 2.1.** Find the coefficient of $x^2y^3z^4$ in the expansion of $(x+y+z)^9$.

*Solution.* Since $2+3+4=9$, the coefficient is $\dbinom{9}{2,3,4} = \dfrac{9!}{2!\,3!\,4!} = \dfrac{362880}{2\cdot 6\cdot 24} = \dfrac{362880}{288} = 1260$. $\blacksquare$

---

### 2.5 Challenge Problems

> **Challenge Problem 2.1.** Find the number of non-negative integer solutions to
> $$x_1 + x_2 + x_3 + x_4 = 15, \qquad x_1 \le 3,\ x_2 \le 5,\ x_3 \le 4,\ x_4 \le 7.$$

*Solution via direct PIE.* By §2.2, with $b_1{+}1, b_2{+}1, b_3{+}1, b_4{+}1 = 4,6,5,8$:

$$N = \sum_{S \subseteq \{1,2,3,4\}} (-1)^{|S|} \binom{15 - \sum_{i \in S}(b_i+1) + 3}{3}.$$

- $|S|=0$: $\binom{18}{3} = 816$.
- $|S|=1$: subtract $4,6,5,8$ respectively $\to$ remainders $11,9,10,7$, giving $\binom{14}{3}+\binom{12}{3}+\binom{13}{3}+\binom{10}{3} = 364+220+286+120 = 990$.
- $|S|=2$: the six pairwise sums are $10,9,12,11,14,13$, giving remainders $5,6,3,4,1,2$: $\binom{8}{3}+\binom{9}{3}+\binom{6}{3}+\binom{7}{3}+\binom{4}{3}+\binom{5}{3} = 56+84+20+35+4+10 = 209$.
- $|S|=3$: sums $15,18,17,19$ for $\{1,2,3\},\{1,2,4\},\{1,3,4\},\{2,3,4\}$; only $\{1,2,3\}$ gives a non-negative remainder ($0$), contributing $\binom{3}{3}=1$; the rest vanish.
- $|S|=4$: sum $=23 > 15$, contributes $0$.

$$N = 816 - 990 + 209 - 1 + 0 = 34.$$

**Cross-check via the Complementary Substitution trick.** Set $y_i = b_i - x_i \ge 0$. Then $\sum y_i = \sum b_i - 15 = 19 - 15 = 4$, with $y_i \le b_i$. Since the total deficit is only $4$, and the smallest bound is $b_1 = 3$, the *only* way any $y_i$'s own bound could be violated is $y_1 \ge 4$ (impossible for $y_2,y_3,y_4$ since their bounds $5,4,7$ all exceed $4$, except $y_3\le 4$ is exactly tight and cannot be exceeded by a total of only $4$ either). Unconstrained solutions to $\sum y_i = 4$ in 4 non-negative variables: $\binom{4+3}{3} = \binom{7}{3} = 35$. Subtract the single bad case $y_1 \ge 4$ (forcing $y_1 = 4, y_2=y_3=y_4=0$, exactly $1$ solution): $35 - 1 = 34$. $\blacksquare$

Both methods agree: $\boxed{N = 34}$.

> **Challenge Problem 2.2.** Find the coefficient of $x^{25}$ in $(1 + x + x^2 + \cdots + x^7)^6$.

*Solution.* Write $1+x+\cdots+x^7 = \dfrac{1-x^8}{1-x}$, so we want $[x^{25}]\,(1-x^8)^6 (1-x)^{-6}$. Expand each factor:
$$(1-x^8)^6 = \sum_{j=0}^{6} \binom{6}{j}(-1)^j x^{8j}, \qquad (1-x)^{-6} = \sum_{m \ge 0} \binom{m+5}{5} x^m$$
(the second expansion is Theorem 2.1 in generating-function clothing — see §5.2). The coefficient of $x^{25}$ in the product is
$$\sum_{j=0}^{3} (-1)^j \binom{6}{j} \binom{25-8j+5}{5} \qquad (\text{only } j=0,1,2,3 \text{ keep } 25-8j \ge 0).$$

- $j=0$: $\binom{6}{0}\binom{30}{5} = 1 \times 142506$.
- $j=1$: $-\binom{6}{1}\binom{22}{5} = -6 \times 26334 = -158004$.
- $j=2$: $\binom{6}{2}\binom{14}{5} = 15 \times 2002 = 30030$.
- $j=3$: $-\binom{6}{3}\binom{6}{5} = -20 \times 6 = -120$.

$$142506 - 158004 + 30030 - 120 = \boxed{14412}. \qquad \blacksquare$$

---

## Part III — The Principle of Inclusion–Exclusion & Derangements

### 3.1 PIE: Statement and Proof

> **Theorem 3.1 (Principle of Inclusion–Exclusion).** For finite sets $A_1, \ldots, A_n$ inside a universe,
> $$\left| \bigcup_{i=1}^n A_i \right| = \sum_{i} |A_i| - \sum_{i<j} |A_i \cap A_j| + \sum_{i<j<l}|A_i \cap A_j \cap A_l| - \cdots + (-1)^{n+1} |A_1 \cap \cdots \cap A_n|,$$
> i.e. $\displaystyle \left|\bigcup_{i=1}^n A_i\right| = \sum_{\emptyset \ne S \subseteq [n]} (-1)^{|S|+1} \left| \bigcap_{i \in S} A_i \right|.$

*Proof (via the Binomial Theorem).* We show every element of the universe contributes equally to both sides. An element $x$ that lies in *none* of the $A_i$ contributes $0$ to the left side and $0$ to every intersection term on the right, so both sides agree ($0=0$) for such $x$.

Now suppose $x$ lies in exactly $k \ge 1$ of the sets $A_1, \ldots, A_n$. On the left side, $x$ is counted exactly once (union membership is Boolean). On the right side, for a given size $j$ ($1 \le j \le k$), $x$ belongs to $\bigcap_{i \in S} A_i$ precisely for those $S$ of size $j$ that are subsets of the $k$-element index set on which $x$ lies — there are $\binom{k}{j}$ such $S$. So $x$'s total contribution to the right side is
$$\sum_{j=1}^{k} (-1)^{j+1} \binom{k}{j}.$$
By the Binomial Theorem, $\displaystyle\sum_{j=0}^{k} (-1)^j \binom{k}{j} = (1-1)^k = 0$ for $k \ge 1$, so $\displaystyle\sum_{j=1}^k (-1)^j \binom{k}{j} = -\binom{k}{0} = -1$, hence $\displaystyle\sum_{j=1}^{k}(-1)^{j+1}\binom{k}{j} = 1$. Thus $x$ contributes exactly $1$ to the right side as well, matching the left side. Since both sides agree term-by-term for every element of the universe, the two sets have equal cardinality. $\blacksquare$

---

### 3.2 Derangements

> **Definition 3.1.** A **derangement** of $[n]$ is a permutation $\sigma \in S_n$ with no fixed point: $\sigma(i) \ne i$ for all $i$. Write $D_n$ for the number of derangements of $[n]$.

> **Theorem 3.2 (Closed form).** $\displaystyle D_n = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!}.$

*Proof.* Let $A_i \subseteq S_n$ be the set of permutations *fixing* point $i$: $A_i = \{\sigma : \sigma(i)=i\}$. Then $D_n = n! - |A_1 \cup \cdots \cup A_n|$. For any $k$-subset $\{i_1,\ldots,i_k\} \subseteq [n]$, $|A_{i_1} \cap \cdots \cap A_{i_k}| = (n-k)!$ (the $k$ points are fixed; the other $n-k$ are freely permuted). By Theorem 3.1,
$$\left|\bigcup_i A_i\right| = \sum_{k=1}^{n} (-1)^{k+1} \binom{n}{k} (n-k)!.$$
So
$$D_n = n! - \sum_{k=1}^{n}(-1)^{k+1}\binom{n}{k}(n-k)! = \sum_{k=0}^{n} (-1)^k \binom{n}{k}(n-k)!$$
(the $k=0$ term of this last sum is exactly $n!$). Now $\binom{n}{k}(n-k)! = \dfrac{n!}{k!(n-k)!}(n-k)! = \dfrac{n!}{k!}$, so
$$D_n = \sum_{k=0}^{n} (-1)^k \frac{n!}{k!} = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!}. \qquad \blacksquare$$

**Remark.** As $n \to \infty$, $\sum_{k=0}^n \frac{(-1)^k}{k!} \to e^{-1}$, so $D_n \approx n!/e$; in fact $D_n$ is always the integer nearest to $n!/e$. This is a favourite "surprising constant" result in olympiad folklore.

> **Theorem 3.3 (Recurrence I).** $D_n = n D_{n-1} + (-1)^n$ for $n \ge 1$ (with $D_0 = 1$).

*Proof (from the closed form).*
$$D_n - nD_{n-1} = n!\sum_{k=0}^{n}\frac{(-1)^k}{k!} - n\cdot(n-1)!\sum_{k=0}^{n-1}\frac{(-1)^k}{k!} = n!\left[\sum_{k=0}^{n}\frac{(-1)^k}{k!} - \sum_{k=0}^{n-1}\frac{(-1)^k}{k!}\right] = n! \cdot \frac{(-1)^n}{n!} = (-1)^n. \qquad \blacksquare$$

> **Theorem 3.4 (Recurrence II).** $D_n = (n-1)\bigl(D_{n-1} + D_{n-2}\bigr)$ for $n \ge 2$.

*Combinatorial proof.* Consider a derangement $\sigma$ of $[n]$, and examine $\sigma(1) = k$ for some $k \ne 1$; there are $n-1$ choices for $k$. Split into two cases:

- **Case (a): $\sigma(k) = 1$.** Elements $1$ and $k$ swap. The remaining $n-2$ elements $[n]\setminus\{1,k\}$ must be deranged *among themselves* (none can be a fixed point, and none of them can map to $1$ or $k$ either, but since $1,k$ are already fully accounted for by the swap, this is exactly a derangement of an $(n-2)$-set): $D_{n-2}$ ways.
- **Case (b): $\sigma(k) \ne 1$.** Define a new permutation $\tau$ of the $(n-1)$-set $\{2,3,\ldots,n\}$ by $\tau(k) = \sigma(k)$ (whenever $\sigma(k) \ne 1$, i.e. everywhere except possibly at $k$ itself, and there $\sigma(k)\ne1$ by assumption) and $\tau(j) = \sigma(j)$ for $j \ne 1, k$. One checks this $\tau$ is precisely a derangement of $\{2,\ldots,n\}$: no element maps to itself, because $\sigma$ didn't, and the only subtlety — that $\tau(k)$ might now "want" to equal $1$, which is not in the domain — cannot happen since we assumed $\sigma(k)\ne 1$. This correspondence is a bijection onto derangements of an $(n-1)$-set: $D_{n-1}$ ways.

Since the two cases are disjoint and exhaustive for each fixed value $k=\sigma(1)$, and there are $n-1$ choices of $k$, we obtain $D_n = (n-1)(D_{n-1}+D_{n-2})$. $\blacksquare$

---

### 3.3 Surjections

> **Theorem 3.5.** The number of surjective functions from an $m$-set onto an $n$-set (with $m \ge n$) is
> $$\text{Sur}(m,n) = \sum_{k=0}^{n} (-1)^k \binom{n}{k}(n-k)^m.$$

*Proof.* Let the codomain be $[n]$ and let $A_i$ be the set of functions $f: [m] \to [n]$ that *miss* value $i$ (i.e. $i \notin f([m])$). We want $n^m - |A_1 \cup \cdots \cup A_n|$. For a $k$-subset of indices, $\bigcap_{i \in S} A_i$ is the set of functions avoiding all $k$ values in $S$, i.e. functions into a codomain of size $n-k$: there are $(n-k)^m$ such functions. By PIE,
$$\left|\bigcup A_i\right| = \sum_{k=1}^n (-1)^{k+1}\binom{n}{k}(n-k)^m,$$
so the surjection count is $n^m - \sum_{k=1}^n(-1)^{k+1}\binom nk(n-k)^m = \sum_{k=0}^n (-1)^k\binom nk (n-k)^m$. $\blacksquare$

**Corollary.** $S(m,n) = \dfrac{\text{Sur}(m,n)}{n!}$, since each un-ordered partition of $[m]$ into $n$ non-empty blocks corresponds to exactly $n!$ surjections (assign the $n$ labeled boxes to the $n$ blocks in every order). This recovers the closed form for Stirling numbers cited in §2.3.

---

### 3.4 Hidden PIE in Number Theory

**Trick.** Counting integers coprime to $N$ is a PIE problem in disguise: if $N = p_1^{a_1}\cdots p_r^{a_r}$, let $A_i \subseteq [N]$ be the multiples of $p_i$ in $[1,N]$. An integer is coprime to $N$ iff it lies in none of the $A_i$.

> **Theorem 3.6 (Euler's Totient Formula).** $\displaystyle \phi(N) = N \prod_{i=1}^{r}\left(1 - \frac{1}{p_i}\right).$

*Proof.* $|A_i| = N/p_i$ (the multiples of $p_i$ up to $N$), and more generally $\left|\bigcap_{i \in S} A_i\right| = N/\prod_{i \in S} p_i$ (multiples of $\prod_{i\in S} p_i$, since the $p_i$ are distinct primes). By PIE,
$$\phi(N) = N - \left|\bigcup_i A_i\right| = N + \sum_{\emptyset \ne S \subseteq [r]} (-1)^{|S|} \frac{N}{\prod_{i \in S} p_i} = N\sum_{S \subseteq [r]} \prod_{i \in S}\left(\frac{-1}{p_i}\right) = N\prod_{i=1}^r\left(1 - \frac1{p_i}\right),$$
where the last step is simply expanding the product $\prod_i\left(1 - \frac{1}{p_i}\right)$ via distributivity and recognizing each resulting term as the contribution from one subset $S$. $\blacksquare$

**Remark.** This is a template worth internalizing: *any* "count things avoiding all of several divisibility/adjacency/collision conditions" problem is a candidate for exactly this PIE-on-primes (or PIE-on-forbidden-events) machinery — we will see it again, in a much richer combinatorial disguise, in the Challenge Problem below.

---

### 3.5 Challenge Problem: The Problème des Ménages

> **Challenge Problem 3.1.** In how many ways can $4$ married couples be seated around a circular table with $8$ pre-designated alternating seats (4 "male" seats, 4 "female" seats), such that men and women alternate and **no spouse sits next to their own partner**? (Rotations of the whole table are considered identical seatings; reflections are considered distinct.)

This is the classical **Problème des Ménages**, first posed by Édouard Lucas. For general $n$ couples it is solved by a technique — reducing the adjacency-avoidance condition to counting non-attacking rook placements (equivalently, matchings) on a forbidden board that turns out to be a cycle graph, then applying PIE — that we now carry out in full for $n=4$; the same argument produces the general **Touchard formula** as a by-product.

*Solution.*

**Step 1 — Fix the men.** Using up the rotational symmetry, seat man $M_1$ at seat $1$; the remaining $3$ men are then arranged in the other $3$ male seats in $(4-1)! = 3! = 6$ ways (Theorem 1.6). Fix, for the moment, one such reference arrangement: $M_1, M_2, M_3, M_4$ at seats $1,3,5,7$ respectively (going around the table), with female seats $2,4,6,8$ interleaved.

**Step 2 — Identify the forbidden board.** Seat $2$ lies between $M_1$ and $M_2$, so it is forbidden to $W_1$ and $W_2$ (their respective wives); seat $4$ (between $M_2, M_3$) is forbidden to $W_2, W_3$; seat $6$ (between $M_3,M_4$) is forbidden to $W_3,W_4$; and seat $8$ (between $M_4$ and $M_1$, wrapping around) is forbidden to $W_4, W_1$. Drawing an edge between each wife and each of her two forbidden seats produces exactly an $8$-cycle:
$$W_1 - s_2 - W_2 - s_4 - W_3 - s_6 - W_4 - s_8 - W_1.$$

**Step 3 — PIE over the forbidden board (rook polynomial method).** We must count bijections {wives} $\to$ {female seats} avoiding all $8$ forbidden (wife, seat) pairs. By the general PIE-for-forbidden-positions formula,
$$N = \sum_{k=0}^{4} (-1)^k\, r_k\, (4-k)!,$$
where $r_k$ is the number of ways to choose $k$ forbidden pairs *no two of which share a wife or a seat* — i.e., $r_k$ is the number of matchings of size $k$ in the forbidden graph, here the $8$-cycle $C_8$.

The number of $k$-matchings in a cycle $C_m$ ($m$ vertices) is the classical formula
$$r_k = \frac{m}{m-k}\binom{m-k}{k} \qquad (k \ge 1), \qquad r_0 = 1.$$
For $m = 8$:
$$r_0=1,\quad r_1 = \frac{8}{7}\binom{7}{1}=8, \quad r_2=\frac86\binom62=20,\quad r_3=\frac85\binom53=16,\quad r_4=\frac84\binom44=2.$$

*(Sanity checks: $r_1=8$ correctly counts the $8$ edges of $C_8$ — i.e. the $8$ forbidden pairs themselves. $r_2$: choosing any $2$ of the $8$ edges gives $\binom82=28$ pairs, of which exactly $8$ share a vertex — one "adjacent pair" per vertex of the cycle — leaving $28-8=20$, confirming $r_2=20$. $r_4=2$ correctly counts the two perfect matchings of an $8$-cycle: the "odd" edges and the "even" edges.)*

**Step 4 — Compute.**
$$N = r_0\cdot4! - r_1\cdot3! + r_2\cdot2! - r_3\cdot1! + r_4\cdot0! = 1(24) - 8(6) + 20(2) - 16(1) + 2(1) = 24-48+40-16+2 = 2.$$

So, with the men fixed in the reference arrangement, there are exactly $N=2$ valid ways to seat the wives.

**Step 5 — Assemble the total.** By the symmetry of the construction, this count of $2$ is the same for *every* one of the $3! = 6$ arrangements of the men (relabeling the men merely relabels which wife is forbidden which seat, without changing the combinatorial structure of the cycle). Hence the total number of valid seatings is
$$M_4 = 3! \times N = 6 \times 2 = \boxed{12}. \qquad \blacksquare$$

**Remark (The general formula).** Nothing in Steps 2–4 used $n=4$ specifically; repeating the argument for general $n$ couples (forbidden board $=$ the cycle $C_{2n}$) yields
$$U_n = \sum_{k=0}^{n} (-1)^k \frac{2n}{2n-k}\binom{2n-k}{k}(n-k)!, \qquad M_n = (n-1)!\, U_n,$$
which is precisely **Touchard's formula** (1934) for the ménage numbers. One can check $U_3=1$ (giving $M_3 = 2!\cdot1=2$) and $U_4=2$ as derived above — matching the known ménage sequence $1,2,13,80,579,\ldots$ for $n=3,4,5,6,7$.

---

## Part IV — Pigeonhole Principle & Combinatorial Proofs

### 4.1 The Pigeonhole Principle, Basic and Generalized

> **Theorem 4.1 (Basic Pigeonhole Principle, PHP).** If $n+1$ objects are placed into $n$ boxes, some box contains at least $2$ objects.

*Proof.* If every box contained at most $1$ object, the total number of objects would be at most $n$, contradicting that there are $n+1$. $\blacksquare$

> **Theorem 4.2 (Generalized PHP).** If $N$ objects are placed into $k$ boxes, some box contains at least $\left\lceil N/k \right\rceil$ objects.

*Proof.* Suppose, for contradiction, every box contains at most $\left\lceil N/k\right\rceil - 1$ objects. Then the total is at most $k\left(\left\lceil N/k\right\rceil - 1\right) < k \cdot \frac{N}{k} = N$ (using $\lceil N/k \rceil < N/k + 1$), a contradiction. $\blacksquare$

**Remark.** PHP is trivial to *state* and often extraordinarily hard to *apply* — the entire difficulty of a PHP olympiad problem is almost always in the construction of the right "boxes." This is a recurring meta-skill: a good PHP proof is really a good *partition*.

---

### 4.2 Applications in Number Theory and Geometry

**Example 4.1 (Number theory).** Given any $n$ integers $a_1, \ldots, a_n$ (not necessarily distinct), prove that some non-empty subset of *consecutive* terms $a_i, a_{i+1}, \ldots, a_j$ has sum divisible by $n$.

*Proof.* Consider the $n+1$ partial sums $s_0 = 0,\ s_1 = a_1,\ s_2 = a_1+a_2,\ \ldots,\ s_n = a_1+\cdots+a_n$, and reduce each modulo $n$. There are $n+1$ partial sums but only $n$ residue classes mod $n$, so by PHP two of them are congruent: $s_p \equiv s_q \pmod n$ for some $p < q$. Then $s_q - s_p = a_{p+1} + a_{p+2} + \cdots + a_q \equiv 0 \pmod n$, and this is a sum of consecutive terms. $\blacksquare$

**Example 4.2 (Geometry).** Any $5$ points placed inside (or on the boundary of) a unit square contain two points at distance at most $\dfrac{\sqrt2}{2}$.

*Proof.* Partition the unit square into $4$ congruent sub-squares of side $\frac12$ (a $2\times2$ grid). By PHP, since $5$ points are placed into $4$ regions, some sub-square contains at least $2$ of the points. The diameter (maximum possible distance between two points) of a $\frac12 \times \frac12$ square is its diagonal, $\sqrt{\left(\frac12\right)^2+\left(\frac12\right)^2} = \frac{\sqrt2}{2}$. So those two points are at distance at most $\frac{\sqrt2}2$. $\blacksquare$

---

### 4.3 Double Counting

**Trick (Double Counting / "Counting in Two Ways").** To prove a combinatorial identity $L = R$, invent a *set of objects* (often pairs, or configurations satisfying a property) whose cardinality can be computed in two different ways — one way naturally yielding $L$, the other naturally yielding $R$. Since both computations count the *same* set, $L=R$. This is often called a **story proof**: rather than manipulating symbols, one tells a combinatorial story that is self-evidently counted two ways.

---

### 4.4 Key Identities via Combinatorial Proof

> **Theorem 4.3 (Vandermonde's Identity).** $\displaystyle \sum_{k=0}^{r} \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}.$

*Proof (story).* Consider a group of $m$ men and $n$ women, from which we choose a committee of $r$ people; the right side counts this directly. Alternatively, classify by the number $k$ of men on the committee ($0 \le k \le r$): choose $k$ men ($\binom mk$ ways) and the remaining $r-k$ members from the women ($\binom{n}{r-k}$ ways), then sum over all valid $k$. Both computations count exactly the set of $r$-person committees, so the sums are equal. $\blacksquare$

> **Theorem 4.4 (Hockey Stick Identity).** $\displaystyle \sum_{i=r}^{n} \binom{i}{r} = \binom{n+1}{r+1}.$

*Proof (story).* The right side counts $(r+1)$-element subsets of $[n+1] = \{1, \ldots, n+1\}$. Classify such a subset by its *largest* element, say $i+1$ (so $r \le i \le n$): the remaining $r$ elements are chosen from $\{1,\ldots,i\}$, in $\binom{i}{r}$ ways. Summing over the possible largest elements gives $\sum_{i=r}^{n}\binom ir$, which must equal $\binom{n+1}{r+1}$. $\blacksquare$

> **Theorem 4.5.** $\displaystyle \sum_{k=0}^{n}\binom{n}{k}^2 = \binom{2n}{n}.$

*Proof (story).* Consider a group of $n$ "red" and $n$ "blue" people ($2n$ total), from which we choose a committee of $n$ people; the right side, $\binom{2n}{n}$, counts this directly. Alternatively, classify by the number $k$ of red people on the committee: choose $k$ reds ($\binom nk$ ways) and $n-k$ blues ($\binom{n}{n-k}$ ways). By the symmetry $\binom{n}{n-k}=\binom nk$ (Theorem 1.3), this is $\binom nk^2$; summing over $k$ gives $\sum_k \binom nk^2$. (This is also simply Vandermonde's Identity, Theorem 4.3, with $m=n$ and $r=n$, using the symmetry substitution $k \to n-k$ in one factor.) $\blacksquare$

---

### 4.5 Challenge Problems

> **Challenge Problem 4.1 (Ramsey's Theorem, $R(3,3)=6$).** Prove that among any $6$ people at a party, either $3$ of them are pairwise mutual acquaintances, or $3$ of them are pairwise mutual strangers.

*Solution.* Model the party as the complete graph $K_6$ on $6$ vertices, with each edge colored **red** (acquainted) or **blue** (strangers). We must show some triangle is monochromatic.

Fix any vertex $v$. It has $5$ edges to the other vertices. By the Generalized PHP (Theorem 4.2) with $N=5$ objects (edges) into $k=2$ boxes (colors), some color — say red, without loss of generality — is used on at least $\lceil 5/2 \rceil = 3$ of these edges. Let $a,b,c$ be three vertices joined to $v$ by red edges.

Now examine the triangle on $\{a,b,c\}$:
- If **any** edge among $ab$, $bc$, $ca$ is red — say $ab$ — then $v,a,b$ form an all-red triangle (since $va, vb, ab$ are all red).
- If **none** of $ab,bc,ca$ is red, all three are blue, and $a,b,c$ form an all-blue triangle.

Either way, a monochromatic triangle exists among the $6$ people. $\blacksquare$

**Remark (Sharpness).** The bound $6$ is tight: on $5$ vertices, colour the edges of a pentagon (a $5$-cycle) red and the edges of the complementary pentagram (the other $5$-cycle) blue. Neither the red graph nor the blue graph — each being a $5$-cycle — contains a triangle, since a $5$-cycle has no chords. So $5$ people can avoid a monochromatic triangle entirely, proving $R(3,3) = 6$ exactly, not just $R(3,3) \le 6$.

> **Challenge Problem 4.2 (Subset-of-a-subset identity).** Prove, for $0 \le m \le n$, that
> $$\sum_{k=m}^{n} \binom{n}{k}\binom{k}{m} = \binom{n}{m}\,2^{n-m}.$$

*Solution (double counting).* Consider the set of all pairs $(S,T)$ with $T \subseteq S \subseteq [n]$ and $|T| = m$ — i.e., a "small" $m$-subset $T$ nested inside a "large" subset $S$ of arbitrary size.

**Count 1 (condition on $S$ first).** Choose $S$ to have size $k$ (for $m \le k \le n$): $\binom nk$ ways. Then choose $T \subseteq S$ with $|T|=m$: $\binom km$ ways. Summing over $k$: $\displaystyle\sum_{k=m}^n \binom nk \binom km$.

**Count 2 (condition on $T$ first).** Choose $T$ directly: $\binom nm$ ways. Then $S$ must be any superset of $T$ within $[n]$ — equivalently, freely choose, for each of the remaining $n-m$ elements of $[n]\setminus T$, whether or not it belongs to $S$: $2^{n-m}$ ways. Total: $\binom nm 2^{n-m}$.

Both counts enumerate the same set of pairs $(S,T)$, so they are equal:
$$\sum_{k=m}^{n} \binom nk \binom km = \binom nm 2^{n-m}. \qquad \blacksquare$$

---

## Part V — Generating Functions & Recurrence Relations

### 5.1 Motivation

A **generating function** encodes an entire infinite sequence $(a_0, a_1, a_2, \ldots)$ as the coefficients of a single formal power series
$$A(x) = \sum_{n \ge 0} a_n x^n.$$
"Formal" is the operative word: we manipulate $A(x)$ algebraically without worrying about convergence, treating $x$ as a bookkeeping symbol rather than a number. The power of this idea is that combinatorial *operations* on structures translate into *algebraic* operations on generating functions:

- **Disjoint choice** (either structure of type $A$ or of type $B$, Rule of Sum) $\leftrightarrow$ **addition**: $A(x) + B(x)$.
- **Independent combination** (a structure of type $A$ together with an independent structure of type $B$, sizes adding) $\leftrightarrow$ **multiplication** (convolution): $A(x)B(x)$, since $[x^n](A(x)B(x)) = \sum_{k=0}^n a_k b_{n-k}$.
- **Shifting a sequence** $\leftrightarrow$ multiplying by a power of $x$.
- **Summing a sequence's partial sums** $\leftrightarrow$ multiplying by $\dfrac{1}{1-x}$.
- **Weighted-by-index sums** ($\sum n a_n x^{n-1}$, etc.) $\leftrightarrow$ **differentiation**: $A'(x)$.

A hard counting problem often becomes an easy algebra problem once translated into this language — this is the central promise of the method, and Part V is devoted to cashing in on it.

---

### 5.2 Ordinary Generating Functions: A Working Table

| Sequence $(a_n)$ | OGF $A(x) = \sum a_n x^n$ |
|---|---|
| $1,1,1,1,\ldots$ | $\dfrac{1}{1-x}$ |
| $1,1,\ldots,1$ ($n+1$ terms, then $0$) | $\dfrac{1-x^{n+1}}{1-x}$ |
| $\binom{n+r-1}{r-1}$ (Stars-and-Bars, $r$ fixed) | $\dfrac{1}{(1-x)^r}$ |
| $\binom{n}{k}$, $k=0,\ldots,n$ fixed $n$ | $(1+x)^n$ |
| $1, 0, 1, 0, \ldots$ | $\dfrac{1}{1-x^2}$ |
| Fibonacci $F_n$ ($F_0=0,F_1=1$) | $\dfrac{x}{1-x-x^2}$ |
| Catalan $C_n$ | $\dfrac{1-\sqrt{1-4x}}{2x}$ (derived in §5.4) |

*Derivation of the Stars-and-Bars row.* By the **Generalized Binomial Theorem**, for any real $\alpha$ (not necessarily a positive integer),
$$(1+y)^\alpha = \sum_{n\ge0} \binom{\alpha}{n} y^n, \qquad \binom{\alpha}{n} := \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}.$$
Take $\alpha = -r$, $y=-x$: $\binom{-r}{n}(-1)^n = \dfrac{(-r)(-r-1)\cdots(-r-n+1)}{n!}(-1)^n = \dfrac{r(r+1)\cdots(r+n-1)}{n!} = \binom{n+r-1}{n} = \binom{n+r-1}{r-1}$. Hence $(1-x)^{-r} = \sum_{n\ge0}\binom{n+r-1}{r-1}x^n$ — reproducing Theorem 2.1 purely algebraically, with no combinatorial argument at all. This is the generating-function *proof* of Stars and Bars, complementing the bijective proof of §2.1.

**Remark (OGF vs. EGF).** The table above concerns *ordinary* generating functions, appropriate when we are counting unlabeled or unordered structures (or extracting raw coefficients). When objects being combined are *labeled* and order-sensitive interleavings matter (as in permutations), the natural tool is instead the **exponential generating function** $\hat A(x) = \sum a_n \frac{x^n}{n!}$ — for instance, $\hat{}$-GF of $n! \leftrightarrow \frac{1}{1-x}$ while the derangement numbers satisfy $\hat D(x) = \frac{e^{-x}}{1-x}$. We do not develop EGF machinery further here, but flag it as the natural next tool beyond this treatise.

---

### 5.3 Coefficient Extraction

**Trick.** Once a counting sequence is recognized as $[x^n]$ of some closed-form generating function, the problem reduces to algebraic manipulation: partial fractions (for rational functions, isolating simple poles), the Generalized Binomial Theorem (for $(1\pm x)^\alpha$-type factors), or known series expansions ($e^x$, $\ln(1-x)$, etc.).

**Example 5.1.** Recover the bounded Stars-and-Bars count of §2.2 via generating functions: the number of solutions to $x_1+x_2+x_3=n$ with each $0 \le x_i \le 4$ is $[x^n]\,(1+x+x^2+x^3+x^4)^3 = [x^n]\left(\dfrac{1-x^5}{1-x}\right)^3$. Expanding, $(1-x^5)^3(1-x)^{-3} = \left(\sum_{j=0}^3 \binom3j(-1)^jx^{5j}\right)\left(\sum_{m\ge0}\binom{m+2}{2}x^m\right)$, and for a given $n$ one reads off $[x^n] = \sum_j (-1)^j\binom3j\binom{n-5j+2}{2}$ (terms with $5j>n$ vanish) — precisely the PIE formula of §2.2, now derived as an automatic consequence of multiplying two known series rather than as a fresh combinatorial argument.

---

### 5.4 Catalan Numbers

> **Definition 5.1.** The **Catalan numbers** $C_0, C_1, C_2, \ldots$ are defined by $C_0 = 1$ and the recurrence
> $$C_n = \sum_{i=0}^{n-1} C_i\, C_{n-1-i}, \qquad n \ge 1.$$

The Catalan numbers are the single most ubiquitous integer sequence in enumerative combinatorics after the binomial coefficients themselves; the recurrence above arises, essentially unchanged, from at least the following combinatorial models:

- **Balanced bracket sequences.** $C_n$ counts sequences of $n$ pairs of balanced parentheses, e.g. for $n=2$: `()()`, `(())`. (The recurrence: split at the position where the first bracket closes, after some $i$ balanced pairs nested inside it and $n-1-i$ balanced pairs following it.)
- **Monotone lattice paths.** $C_n$ counts paths from $(0,0)$ to $(n,n)$ using unit right/up steps that never rise strictly above the diagonal $y=x$.
- **Triangulations of a convex polygon.** $C_n$ counts triangulations of a convex $(n+2)$-gon into $n$ triangles using non-crossing diagonals.
- **Binary trees.** $C_n$ counts binary trees with $n$ internal (non-leaf) nodes.

> **Theorem 5.1 (Closed form).** $\displaystyle C_n = \frac{1}{n+1}\binom{2n}{n}.$

We give the full generating-function derivation of this closed form as our first Challenge Problem below, exactly as requested by a purely-analytic route (no combinatorial bijection to the binomial coefficient is used).

---

### 5.5 Challenge Problems

> **Challenge Problem 5.1.** Derive $\displaystyle C_n = \frac{1}{n+1}\binom{2n}{n}$ using only the Catalan recurrence, its generating function, and the Generalized Binomial Theorem.

*Solution.* Let $C(x) = \sum_{n\ge0} C_n x^n$. The recurrence $C_n = \sum_{i=0}^{n-1} C_i C_{n-1-i}$ (for $n\ge1$) says that the sequence $(C_n)_{n\ge1}$ is the convolution of $(C_n)_{n\ge0}$ with itself, shifted up by one index — precisely the statement $\sum_{n\ge1} C_n x^n = x\, C(x)^2$ (multiplying by $x$ implements the "shift by one" and $C(x)^2$ implements the convolution, by the multiplication rule of §5.1). Since $\sum_{n\ge1}C_nx^n = C(x)-C_0 = C(x)-1$, we get the **functional equation**
$$C(x) - 1 = x\,C(x)^2 \quad\Longleftrightarrow\quad x\,C(x)^2 - C(x) + 1 = 0.$$

Solving this quadratic (in the unknown $C(x)$) via the quadratic formula:
$$C(x) = \frac{1 \pm \sqrt{1-4x}}{2x}.$$
We must choose the sign so that $C(x)$ is finite (equal to $C_0=1$) as $x \to 0$. Expanding $\sqrt{1-4x} = 1 - 2x - 2x^2 - \cdots$ near $x=0$: the "$+$" branch gives $\dfrac{1+\sqrt{1-4x}}{2x} \to \dfrac{2}{2x} \to \infty$ — discard it. The "$-$" branch gives a removable singularity:
$$C(x) = \frac{1-\sqrt{1-4x}}{2x}.$$

Now expand $\sqrt{1-4x} = (1-4x)^{1/2}$ via the Generalized Binomial Theorem: $(1-4x)^{1/2} = \sum_{k\ge0}\binom{1/2}{k}(-4x)^k$. For $k \ge 1$,
$$\binom{1/2}{k} = \frac{\frac12\left(-\frac12\right)\left(-\frac32\right)\cdots\left(\frac12-k+1\right)}{k!} = \frac{(-1)^{k-1}}{2^k\,k!}\cdot\bigl[1\cdot 3\cdot5\cdots(2k-3)\bigr],$$
(the first factor $\tfrac12$ is positive; the remaining $k-1$ factors are negative, contributing sign $(-1)^{k-1}$). Using $1\cdot3\cdot5\cdots(2k-3) = \dfrac{(2k-2)!}{2^{k-1}(k-1)!}$ (splitting $(2k-2)!$ into its odd and even factors), we get
$$\binom{1/2}{k} = \frac{(-1)^{k-1}}{2^k\,k!}\cdot\frac{(2k-2)!}{2^{k-1}(k-1)!} = \frac{(-1)^{k-1}(2k-2)!}{2^{2k-1}\,k!\,(k-1)!}.$$
Multiplying by $(-4)^k = (-1)^k 2^{2k}$:
$$\binom{1/2}{k}(-4)^k = \frac{(-1)^{2k-1}\cdot 2^{2k-(2k-1)}(2k-2)!}{k!(k-1)!} = \frac{-2\,(2k-2)!}{k!(k-1)!} = -\frac{2}{k}\binom{2k-2}{k-1}$$
(using $\frac{(2k-2)!}{k!(k-1)!} = \frac1k\cdot\frac{(2k-2)!}{(k-1)!(k-1)!} = \frac1k\binom{2k-2}{k-1}$).

So $(1-4x)^{1/2} = 1 - 2\sum_{k\ge1} \dfrac1k\binom{2k-2}{k-1}x^k$, giving
$$1 - \sqrt{1-4x} = 2\sum_{k\ge1}\frac1k\binom{2k-2}{k-1}x^k \quad\Longrightarrow\quad C(x) = \frac{1-\sqrt{1-4x}}{2x} = \sum_{k\ge1}\frac1k\binom{2k-2}{k-1}x^{k-1}.$$
Re-indexing $n=k-1$:
$$C(x) = \sum_{n\ge0} \frac{1}{n+1}\binom{2n}{n}x^n \quad\Longrightarrow\quad C_n = \frac{1}{n+1}\binom{2n}{n}.$$
*(Check: $C_0=1, C_1=1, C_2=2, C_3=5$, matching the recurrence directly.)* $\blacksquare$

> **Challenge Problem 5.2.** Solve the linear recurrence $a_0=0,\ a_1=1,\ a_n = 4a_{n-1}-4a_{n-2}\ (n\ge2)$ using its ordinary generating function.

*Solution.* Let $A(x)=\sum_{n\ge0}a_nx^n$. Multiply the recurrence $a_n - 4a_{n-1}+4a_{n-2}=0$ (valid for $n\ge2$) by $x^n$ and sum over $n \ge 2$:
$$\sum_{n\ge2}a_nx^n - 4x\sum_{n\ge2}a_{n-1}x^{n-1} + 4x^2\sum_{n\ge2}a_{n-2}x^{n-2} = 0$$
$$\bigl(A(x)-a_0-a_1x\bigr) - 4x\bigl(A(x)-a_0\bigr) + 4x^2 A(x) = 0.$$
Substituting $a_0=0,\ a_1=1$: $\bigl(A(x)-x\bigr) - 4xA(x) + 4x^2A(x) = 0$, i.e. $A(x)\bigl(1-4x+4x^2\bigr) = x$. Since $1-4x+4x^2=(1-2x)^2$,
$$A(x) = \frac{x}{(1-2x)^2}.$$
By the Generalized Binomial Theorem (or by differentiating $\frac{1}{1-y}=\sum y^n$ once, term-by-term, in $y$), $\dfrac{1}{(1-y)^2} = \sum_{n\ge0}(n+1)y^n$; setting $y=2x$:
$$\frac{1}{(1-2x)^2} = \sum_{n\ge0}(n+1)2^n x^n \quad\Longrightarrow\quad A(x) = x\sum_{n\ge0}(n+1)2^nx^n = \sum_{m\ge1} m\,2^{m-1}x^m$$
(re-indexing $m=n+1$). Hence
$$a_n = n\cdot 2^{n-1} \quad (n \ge 0).$$
*(Check: $a_1 = 1\cdot 1=1$ ✓; $a_2=4(1)-4(0)=4$, formula gives $2\cdot2=4$ ✓; $a_3=4(4)-4(1)=12$, formula gives $3\cdot4=12$ ✓.)* $\blacksquare$

---

## Appendix — Master Formula Sheet

**Fundamental Principles**
- Rule of Sum: disjoint cases add. Rule of Product: sequential independent-count stages multiply.

**Part I — Basic Configurations**
$$P(n,r) = \frac{n!}{(n-r)!}, \qquad \binom{n}{r} = \frac{n!}{r!(n-r)!}, \qquad \binom nr = \binom{n}{n-r}, \qquad \binom nr = \binom{n-1}{r-1}+\binom{n-1}{r}$$
$$\text{Multiset permutations: } \frac{n!}{n_1!n_2!\cdots n_k!} \qquad\qquad \text{Circular: } (n-1)! \ \ \left[\text{bracelet: } \tfrac{(n-1)!}{2},\ n\ge3\right]$$
$$\text{Bundle (together): } (n-k+1)!\,k! \qquad\qquad \text{Gap (apart): } (n-k)!\cdot P(n-k+1,k)$$

**Part II — Distributions**
$$\sum x_i = n,\ x_i\ge0:\ \binom{n+k-1}{k-1} \qquad\qquad \sum x_i=n,\ x_i\ge1:\ \binom{n-1}{k-1}$$
$$\text{Upper-bounded PIE: } \sum_{S\subseteq[k]}(-1)^{|S|}\binom{n-\sum_{i\in S}(b_i+1)+k-1}{k-1}$$
$$\text{Multinomial: } (x_1+\cdots+x_k)^n=\sum \binom{n}{n_1,\ldots,n_k}\prod x_i^{n_i}, \qquad \#\text{terms}=\binom{n+k-1}{k-1}$$

*Twelvefold Way* — see table in §2.3 for all twelve cases (distinct/identical objects × distinct/identical boxes × arbitrary/injective/surjective).

**Part III — PIE & Derangements**
$$\left|\bigcup A_i\right| = \sum_{\emptyset\ne S}(-1)^{|S|+1}\left|\bigcap_{i\in S}A_i\right|$$
$$D_n = n!\sum_{k=0}^n\frac{(-1)^k}{k!}, \qquad D_n = nD_{n-1}+(-1)^n, \qquad D_n=(n-1)(D_{n-1}+D_{n-2})$$
$$\text{Surjections}(m,n) = \sum_{k=0}^n(-1)^k\binom nk(n-k)^m, \qquad S(m,n)=\frac{\text{Sur}(m,n)}{n!}$$
$$\phi(N) = N\prod_{p\mid N}\left(1-\frac1p\right) \qquad\qquad \text{Ménage: } U_n=\sum_{k=0}^n(-1)^k\frac{2n}{2n-k}\binom{2n-k}{k}(n-k)!,\ M_n=(n-1)!U_n$$

**Part IV — Pigeonhole & Identities**
$$\text{PHP: } N \text{ objects}, k \text{ boxes} \Rightarrow \text{some box} \ge \lceil N/k\rceil$$
$$\sum_{k=0}^r\binom mk\binom n{r-k}=\binom{m+n}r \ \text{(Vandermonde)}, \qquad \sum_{i=r}^n\binom ir=\binom{n+1}{r+1}\ \text{(Hockey Stick)}, \qquad \sum_{k=0}^n\binom nk^2=\binom{2n}n$$

**Part V — Generating Functions**
$$\frac1{1-x}\leftrightarrow(1,1,1,\ldots), \qquad \frac1{(1-x)^r}\leftrightarrow\binom{n+r-1}{r-1}, \qquad (1+x)^n\leftrightarrow\binom nk$$
$$C_n = \sum_{i=0}^{n-1}C_iC_{n-1-i},\quad C(x)=\frac{1-\sqrt{1-4x}}{2x}, \quad C_n=\frac1{n+1}\binom{2n}n$$

---

## Closing Remark — The Unifying Theme

It is worth pausing, at the very end, on something remarkable that has happened quietly across Part V: a problem about counting — the most *discrete* possible kind of mathematics, where objects are indivisible and answers are integers — has been solved by borrowing the tools of *continuous* mathematics. We built a formal power series, treated it as an algebraic (indeed, analytic) object, applied the quadratic formula to it as though it were an ordinary real number, expanded a square root using a theorem originally about real exponents, and out fell an exact integer sequence, term by term.

This is not a trick unique to the Catalan numbers. It is the governing idea of an entire branch of mathematics — *analytic combinatorics* — in which the coefficients of a generating function are recovered not just by algebraic expansion but by contour integration and the calculus of residues; in which asymptotics of combinatorial sequences (how fast does $D_n$, or $C_n$, or the number of graphs on $n$ vertices, actually grow?) are read off from the location and nature of a generating function's singularities on the complex plane; and in which a discrete symmetry-counting problem (as in Burnside's Lemma, invoked briefly in Part I) is resolved by summing an *analytic* average over a continuous group action.

The lesson is this: the wall between "discrete" and "continuous" mathematics is far thinner than the undergraduate curriculum suggests. A sequence of integers is, secretly, a function; a counting identity is, secretly, an algebraic identity between power series; and the machinery of polynomials, roots, and calculus — built for the continuum — turns out to be exactly the right lens through which to view the finite and the exact. Whenever a combinatorics problem feels intractable by direct bijection or casework, it is always worth asking: *what does this look like as a coefficient?*

$\blacksquare$
