<!--metadata
  title: "Permutations and Combinations"
  authors: ["Subhajit", "claude.ai"]
  dateCreated: "19/07/2026"
  dateEdited: "19/07/2026"
  description: "A Comprehensive Treatise for JEE Advanced, Mathematical Olympiads, and the ISI–CMI Entrance Examinations"
  tags: [""]
-->

<!-- 
uses @drafts/pnc-simple-prompt.md
-->

# Permutations and Combinations

## Preface

Permutations and Combinations constitute what may justly be called the *calculus of finite arrangements and selections*. Unlike the calculus of the continuum, which studies limits and infinitesimals, this branch of discrete mathematics studies the exact enumeration of possibilities — a task that appears deceptively simple until one is confronted with a genuinely intricate problem. It is precisely this deceptiveness that makes the subject a favourite of examiners: the Joint Entrance Examination (Advanced), the Indian National Mathematical Olympiad, and the Indian Statistical Institute–Chennai Mathematical Institute entrance tests all draw heavily upon it, not merely to test the memorisation of formulae, but to test the *combinatorial imagination* of the candidate.

This treatise is organised in the manner of a classical textbook: definitions precede theorems, theorems are accompanied by rigorous proofs, and each major topic is illustrated by at least one — usually two — problems of genuine difficulty, worked out in complete detail. The reader is assumed to be already acquainted with elementary set theory and the factorial notation; beyond this, the treatise is self-contained.

A word on notation: we shall write $n!$ (read "$n$ factorial") for the product $n(n-1)(n-2)\cdots 2 \cdot 1$, with the convention $0! = 1$. This convention is not arbitrary — it is forced upon us by the requirement that the formulae developed below remain valid in the boundary cases $r = 0$ and $r = n$. We shall use the classical Indian-school notation $^nP_r$ and $^nC_r$ interchangeably with the more modern $\binom{n}{r}$ for combinations, the latter being standard in Olympiad literature.

---

## Table of Contents

1. The Fundamental Principles of Counting
2. Permutations
3. Circular Permutations
4. Combinations
5. Fundamental Identities Involving $\binom{n}{r}$
6. Distribution of Objects — Stars and Bars, and Beyond
7. The Art of Restricted Arrangements
8. The Multinomial Theorem
9. The Principle of Inclusion and Exclusion, and Derangements
10. A Compendium of Tricks and Shortcuts
11. Formula Reference Sheet

---

## 1. The Fundamental Principles of Counting

All of permutations and combinations rests upon two elementary but far-reaching principles.

> **The Rule of Product (Multiplication Principle).** If a first task can be performed in $m$ ways, and, *no matter how the first task is performed*, a second task can subsequently be performed in $n$ ways, then the two tasks in succession can be performed in $m \times n$ ways.

> **The Rule of Sum (Addition Principle).** If a task can be accomplished by exactly one of $k$ mutually exclusive methods, the $i$-th method admitting $n_i$ possibilities, then the total number of ways of accomplishing the task is $n_1 + n_2 + \cdots + n_k$.

These two principles, simple as they appear, generate the entirety of the subject; every formula that follows is, at bottom, a disciplined bookkeeping device built out of them. Their power lies not in their statement but in the *cleverness of the case-analysis* to which they are applied — and it is this cleverness that the following examples are designed to cultivate.

### Example 1.1 (Hard). Non-attacking labelled rooks.

*In how many ways can 8 distinguishable rooks be placed on a standard $8 \times 8$ chessboard so that no two attack each other (i.e. no two share a row or a column)?*

**Solution.** We first count the number of ways to choose the *squares* on which the rooks stand, ignoring for the moment which rook goes where. Since no two rooks may share a row, each of the 8 rows contains exactly one rook; since no two may share a column, the columns occupied by the rooks, read row by row, must all be distinct. Thus the set of occupied squares corresponds *exactly* to a permutation $\sigma$ of $\{1, 2, \ldots, 8\}$, where the rook in row $i$ sits in column $\sigma(i)$. By the Fundamental Theorem of Permutations (proved in the next section), there are $8!$ such permutations, hence $8!$ ways to select the eight squares.

Having chosen the squares, we must now assign the 8 *distinct, labelled* rooks to these 8 squares — a second, independent task, achievable in $8!$ ways.

By the Rule of Product, the total number of arrangements is
$$
8! \times 8! = 40320 \times 40320 = 1{,}625{,}702{,}400.
$$
$\blacksquare$

The moral of this example is a recurring one in combinatorics: a complicated arrangement is profitably split into a *structural* choice (here, the permutation determining which squares are used) followed by a *labelling* choice (here, assigning identities to those squares) — a decomposition made rigorous by the multiplication principle.

### Example 1.2 (Hard). Tiling by dominoes — counting by recursion.

*In how many ways can a $2 \times 10$ rectangular board be completely tiled by $1 \times 2$ dominoes (each domino covering exactly two adjacent unit squares, placed either horizontally or vertically)?*

**Solution.** Let $f(n)$ denote the number of tilings of a $2 \times n$ board. We classify all tilings according to how the *rightmost* column is covered — this is the essential combinatorial idea, an application of the addition principle to mutually exclusive cases:

- **Case A:** The rightmost column is covered by a single vertical domino. The remaining $2 \times (n-1)$ board must then be tiled in one of $f(n-1)$ ways.
- **Case B:** The rightmost column is covered by (the right half of) a horizontal domino. This horizontal domino necessarily occupies both cells of columns $n-1$ and $n$ in one row; for the tiling to be consistent, the *other* row of columns $n-1, n$ must also be covered by a horizontal domino (any vertical domino there would clash). Hence the last two columns are covered by a pair of horizontal dominoes, and the remaining $2\times(n-2)$ board is tiled in $f(n-2)$ ways.

These two cases are exhaustive and mutually exclusive, so by the Rule of Sum,
$$
f(n) = f(n-1) + f(n-2), \qquad f(1) = 1, \; f(2) = 2.
$$
This is precisely the Fibonacci recursion (shifted in index). Computing successively:
$$
f(1)=1,\ f(2)=2,\ f(3)=3,\ f(4)=5,\ f(5)=8,\ f(6)=13,\ f(7)=21,\ f(8)=34,\ f(9)=55,\ f(10)=89.
$$
Hence a $2\times 10$ board can be tiled in $\boxed{89}$ ways. $\blacksquare$

> **Remark.** This example illustrates a technique of great importance at the Olympiad level: when direct enumeration is unwieldy, seek a *recursive* application of the fundamental principles by conditioning on the "last" or "boundary" element of the configuration.

---
## 2. Permutations

**Definition 2.1.** A *permutation* of a set of objects is an arrangement of those objects in a definite order. Given $n$ distinct objects, the number of permutations of $r$ of them ($0 \le r \le n$) taken at a time is denoted $^nP_r$.

### Theorem 2.1 (The Fundamental Theorem of Permutations).

$$
{}^{n}P_r = \frac{n!}{(n-r)!} = n(n-1)(n-2)\cdots(n-r+1).
$$

**Proof.** We fill $r$ positions, labelled $1$ through $r$, in succession. Position $1$ may be filled by any of the $n$ objects: $n$ choices. Once it is filled, position $2$ may be filled by any of the remaining $n-1$ objects, *regardless of which object filled position 1*: $n-1$ choices. Continuing in this manner, position $k$ admits exactly $n-k+1$ choices, independent of the earlier choices. By repeated application of the Rule of Product,
$$
{}^nP_r = n(n-1)(n-2)\cdots(n-r+1) = \frac{n(n-1)\cdots(n-r+1)\,(n-r)(n-r-1)\cdots 1}{(n-r)(n-r-1)\cdots 1} = \frac{n!}{(n-r)!}. \qquad \blacksquare
$$

### 2.1 Permutations with repetition allowed

If repetition of objects is permitted (each of the $r$ positions may independently be filled by any of the $n$ types), the number of arrangements is, by direct repeated application of the Rule of Product,
$$
n^r.
$$

### 2.2 Permutations of objects not all distinct

**Theorem 2.2.** If there are $n$ objects, of which $p_1$ are alike of a first kind, $p_2$ alike of a second kind, $\ldots$, $p_k$ alike of a $k$-th kind (with $p_1 + p_2 + \cdots + p_k = n$), then the number of distinct linear arrangements of all $n$ objects is
$$
\frac{n!}{p_1!\, p_2! \cdots p_k!}.
$$

**Proof.** Suppose, momentarily, that we render all $n$ objects distinguishable — for instance, by attaching subscripts to the identical copies. There are then $n!$ permutations of these artificially distinguished objects. Now, any arrangement of the *original*, indistinguishable objects arises from exactly $p_1! \, p_2! \cdots p_k!$ of these $n!$ permutations, since the $p_i$ copies of the $i$-th kind can be permuted among themselves in $p_i!$ ways without altering the visible arrangement, and these permutations are independent across the $k$ kinds. Hence the $n!$ artificial permutations are partitioned into blocks of size $p_1! \cdots p_k!$, each block corresponding to one genuine arrangement, so the number of genuine arrangements is $n! / (p_1! \cdots p_k!)$. $\blacksquare$

### Example 2.1 (Hard). No two like letters together — MISSISSIPPI.

*In how many ways can the letters of the word MISSISSIPPI be arranged so that no two S's are adjacent?*

**Solution.** The word contains 11 letters: M (once), I (four times), S (four times), P (twice). We proceed by the *gap method*, a technique of central importance for adjacency-restriction problems.

**Step 1.** First arrange the letters *other than* S — namely M, I, I, I, I, P, P — a multiset of 7 letters with I repeated 4 times and P repeated 2 times. By Theorem 2.2, this can be done in
$$
\frac{7!}{4!\,2!} = \frac{5040}{48} = 105 \text{ ways.}
$$

**Step 2.** Any such arrangement of 7 letters creates $7 + 1 = 8$ "gaps" — one before the first letter, one between each pair of consecutive letters, and one after the last letter — into which the four S's may be inserted, at most one per gap, so that no two S's become adjacent. We must choose 4 of these 8 gaps for the S's; since the S's are identical, this is simply
$$
\binom{8}{4} = 70 \text{ ways.}
$$

**Step 3.** By the Rule of Product, the two independent choices combine to give
$$
105 \times 70 = \boxed{7350}
$$
arrangements of MISSISSIPPI in which no two S's are adjacent. $\blacksquare$

### Example 2.2 (Hard). Rank of a word with repeated letters — INDIA.

*If all the letters of the word INDIA are arranged in a dictionary (i.e. alphabetical order), find the rank (position) of the word INDIA itself.*

**Solution.** The letters of INDIA, sorted alphabetically, are $\mathrm{A, D, I, I, N}$. The word is $\mathrm{I\,N\,D\,I\,A}$. We determine the rank by fixing the letters of INDIA one position at a time, from left to right, and at each stage counting how many *words* would precede it by virtue of having an alphabetically smaller letter in that position, the remaining positions being filled by all possible arrangements of the leftover letters.

**Position 1.** The letter used is I. Among the multiset $\{A, D, I, I, N\}$, the letters strictly smaller than I are A and D — that is, 2 choices. For each such choice, the remaining 4 letters (which still include I twice) can be arranged in $\dfrac{4!}{2!} = 12$ ways. Contribution: $2 \times 12 = 24$.

**Position 2** (having fixed position 1 as I). Remaining multiset: $\{A, D, I, N\}$ — all distinct now, since only one I remains. The actual letter is N. Letters smaller than N: A, D, I — that is 3 choices, each leaving 3 distinct letters to arrange in $3! = 6$ ways. Contribution: $3 \times 6 = 18$.

**Position 3** (having fixed I, N). Remaining multiset: $\{A, D, I\}$. Actual letter: D. Letters smaller than D: only A — 1 choice, leaving 2 letters to arrange in $2! = 2$ ways. Contribution: $1 \times 2 = 2$.

**Position 4** (having fixed I, N, D). Remaining multiset: $\{A, I\}$. Actual letter: I. Letters smaller than I: only A — 1 choice, leaving 1 letter, $1! = 1$ arrangement. Contribution: $1 \times 1 = 1$.

**Position 5.** Remaining letter is forced to be A; no letter precedes it. Contribution: $0$.

Summing the contributions and adding $1$ for the word INDIA itself,
$$
\text{Rank} = 24 + 18 + 2 + 1 + 0 + 1 = \boxed{46}.
$$
$\blacksquare$

> **Trick.** This algorithm — fix a prefix, count smaller completions, advance — generalises to arbitrary words, with or without repeated letters, and is one of the most reliably tested tricks in the JEE syllabus. Always remember to divide the completions by the factorial of the multiplicities of any letters *remaining* after the prefix is fixed.

---

## 3. Circular Permutations

**Definition 3.1.** A *circular permutation* is an arrangement of objects around a closed curve (conventionally a circle), in which arrangements that differ only by an overall rotation are considered identical.

### Theorem 3.1. The number of circular permutations of $n$ distinct objects is $(n-1)!$.

**Proof.** Line up the $n$ objects in the $n!$ possible linear orders. Each circular arrangement, when "cut open" at each of its $n$ positions in turn, gives rise to exactly $n$ distinct linear arrangements (rotations of one another). Hence the $n!$ linear arrangements are partitioned into groups of $n$ rotationally-equivalent arrangements, and the number of genuinely distinct circular arrangements is $n!/n = (n-1)!$.

Equivalently, and more usefully in practice: fix one particular object's position arbitrarily (this uses up the rotational degree of freedom); the remaining $n-1$ objects are then arranged in the $n-1$ places relative to the fixed object, in $(n-1)!$ ways. $\blacksquare$

**Corollary 3.1.1.** If clockwise and anticlockwise arrangements are *not* distinguished (as with beads on a necklace, viewable from either side), the count is $\dfrac{(n-1)!}{2}$.

### Example 3.1 (Hard). Alternate seating with a gender restriction.

*In how many ways can 4 married couples (8 people, all distinct) be seated around a circular table so that no two women sit next to each other?*

**Solution.** First seat the 4 men around the circular table. By Theorem 3.1, this can be done in $(4-1)! = 3! = 6$ ways.

Once the men are seated, they create exactly 4 gaps between consecutive men (the rotational symmetry has already been used up in seating the men, so these 4 gaps are now *distinguishable* positions). To ensure no two women are adjacent, each woman must occupy a separate gap — and since there are exactly 4 gaps for exactly 4 women, every gap is used. The 4 distinct women can be placed into these 4 distinguishable gaps in $4! = 24$ ways.

By the Rule of Product, the total number of arrangements is
$$
3! \times 4! = 6 \times 24 = \boxed{144}.
$$
$\blacksquare$

### Example 3.2 (Hard, enrichment). The Problème des Ménages.

*In how many ways can $n$ married couples be seated alternately (men and women in alternating seats) around a circular table of $2n$ labelled seats, such that **no husband sits next to his own wife**?*

This celebrated problem, first posed by Édouard Lucas, is considerably harder than Example 3.1 because the forbidden condition (spouse-adjacency) depends on the *specific pairing* of individuals, not merely on gender. It is solved by the Principle of Inclusion and Exclusion (Section 9), applied to a clever auxiliary counting problem: one shows that the number of ways to seat the $n$ women, *given that the men already occupy the alternate seats in some fixed arrangement*, so that no woman sits beside her husband, equals
$$
U_n = \sum_{k=0}^{n} (-1)^k\, \frac{2n}{2n-k}\binom{2n-k}{k}(n-k)!,
$$
a quantity known as the $n$-th **ménage number**. (The coefficient $\frac{2n}{2n-k}\binom{2n-k}{k}$ itself counts the ways of choosing $k$ mutually non-adjacent seats, for the husbands to be excluded from sitting beside their wives, out of $2n$ seats arranged in a circle — the same "no two adjacent, in a circle" coefficient derived in Theorem 4.4 below.)

Let us verify this formula for small $n$ by direct computation, which also serves as a check on Theorem 4.4:

For $n = 3$ (so $2n = 6$):
$$
U_3 = \binom{6}{0}\cdot\tfrac{6}{6}\cdot 3! - \binom{5}{1}\cdot\tfrac{6}{5}\cdot 2! + \binom{4}{2}\cdot\tfrac{6}{4}\cdot 1! - \binom{3}{3}\cdot\tfrac{6}{3}\cdot 0! = 6 - 12 + 9 - 2 = 1.
$$

For $n = 4$ (so $2n=8$):
$$
U_4 = 1\cdot\tfrac{8}{8}\cdot 4! - \binom{7}{1}\tfrac{8}{7}\cdot 3! + \binom{6}{2}\tfrac{8}{6}\cdot 2! - \binom{5}{3}\tfrac{8}{5}\cdot 1! + \binom{4}{4}\tfrac{8}{4}\cdot 0! = 24 - 48 + 40 - 16 + 2 = 2.
$$

The complete number of seatings (accounting for the $n!$ ways of arranging the men themselves among the alternate seats, and a factor of $2$ for the choice of which alternating set of seats is designated "male") is then $2 \cdot n! \cdot U_n$. For $n=3$: $2 \cdot 6 \cdot 1 = 12$ full seatings; for $n=4$: $2 \cdot 24 \cdot 2 = 96$.

> **Remark.** This problem is included not because it is typically examinable in full at the JEE level, but because it beautifully unites *every* major technique of this treatise — circular permutations, the non-consecutive-selection identity, and inclusion–exclusion — and has genuinely appeared, in restricted special cases, in Olympiad and ISI–CMI entrance papers. A student who can reconstruct the derivation of $U_n$ has essentially mastered the subject.

---
## 4. Combinations

**Definition 4.1.** A *combination* is a selection of objects in which order is immaterial. The number of ways of selecting $r$ objects from $n$ distinct objects is denoted $^nC_r$ or $\binom{n}{r}$.

### Theorem 4.1.

$$
\binom{n}{r} = \frac{n!}{r!\,(n-r)!}.
$$

**Proof.** Consider the process of forming a permutation of $r$ objects chosen from $n$: this may be broken into two stages — first *selecting* the $r$ objects (in $\binom{n}{r}$ ways, by definition), and then *arranging* the chosen $r$ objects in order ($r!$ ways, by Theorem 2.1 applied to the chosen subset). By the Rule of Product,
$$
{}^nP_r = \binom{n}{r} \cdot r!, \qquad \text{so} \qquad \binom{n}{r} = \frac{{}^nP_r}{r!} = \frac{n!}{r!(n-r)!}. \qquad \blacksquare
$$

### 4.1 Non-consecutive selections — a pair of important theorems

These results, though less universally emphasised in school textbooks, appear with great regularity in Olympiad and ISI–CMI papers, and are worth deriving with full rigour.

**Theorem 4.2 (Linear case).** The number of ways to choose $r$ objects from $n$ objects arranged in a row, no two of the chosen objects being adjacent, is $\binom{n-r+1}{r}$.

**Proof.** Suppose $r$ objects are chosen and $n - r$ are not. Arrange the $n-r$ *unchosen* objects in a row; this creates $n - r + 1$ gaps (including the two ends). To ensure no two chosen objects are adjacent, at most one chosen object may be placed in each gap. We therefore choose $r$ of these $n-r+1$ gaps to receive a chosen object: $\binom{n-r+1}{r}$ ways. $\blacksquare$

**Theorem 4.3 (Circular case).** The number of ways to choose $r$ objects from $n$ objects arranged in a circle, no two of the chosen objects being adjacent, is
$$
\frac{n}{n-r}\binom{n-r}{r}.
$$

**Proof.** Label the seats $1, 2, \ldots, n$ around the circle. We split into two exhaustive, mutually exclusive cases according to whether seat $1$ is chosen.

*Case A: seat 1 is not chosen.* Removing seat 1 leaves a *line* of $n - 1$ seats ($2, 3, \ldots, n$) in which we must choose $r$ mutually non-adjacent seats. By Theorem 4.2 (applied to this line of length $n-1$), this can be done in $\binom{(n-1)-r+1}{r} = \binom{n-r}{r}$ ways.

*Case B: seat 1 is chosen.* Then seats $2$ and $n$ (its circular neighbours) cannot be chosen. This leaves a line of $n - 3$ seats ($3, 4, \ldots, n-1$) from which we must choose the remaining $r - 1$ mutually non-adjacent seats: by Theorem 4.2, $\binom{(n-3)-(r-1)+1}{r-1} = \binom{n-r-1}{r-1}$ ways.

Adding the two cases,
$$
\binom{n-r}{r} + \binom{n-r-1}{r-1}.
$$
Now invoke the elementary identity $\binom{m-1}{k-1} = \frac{k}{m}\binom{m}{k}$ (an immediate consequence of the factorial formula) with $m = n-r,\ k=r$, giving $\binom{n-r-1}{r-1} = \frac{r}{n-r}\binom{n-r}{r}$. Hence the total is
$$
\binom{n-r}{r}\left(1 + \frac{r}{n-r}\right) = \binom{n-r}{r}\cdot\frac{n}{n-r} = \frac{n}{n-r}\binom{n-r}{r}. \qquad \blacksquare
$$

### Example 4.1 (Hard). Selecting non-adjacent seats around a round table.

*10 chairs are placed around a circular table and numbered $1$ through $10$. In how many ways can 4 of the chairs be selected so that no two selected chairs are adjacent?*

**Solution.** Directly apply Theorem 4.3 with $n = 10, r = 4$:
$$
\frac{10}{10-4}\binom{10-4}{4} = \frac{10}{6}\binom{6}{4} = \frac{10}{6}\times 15 = \boxed{25}.
$$
$\blacksquare$

### Example 4.2 (Hard). Lattice paths avoiding a forbidden point.

*A particle starts at the lattice point $(0,0)$ and moves to $(6,6)$, at each step moving one unit either to the right or upward. How many such paths avoid passing through the point $(3,3)$?*

**Solution.** Every path from $(0,0)$ to $(6,6)$ consists of a sequence of 12 moves, 6 of them "Right" (R) and 6 of them "Up" (U), in some order; conversely, every such sequence of moves determines a unique path. Hence the total number of paths equals the number of ways to arrange 6 R's and 6 U's in a row of length 12 — a direct application of Theorem 2.2 (or, equivalently, of choosing which 6 of the 12 moves are "Right"):
$$
\binom{12}{6} = 924.
$$

Now we discard the paths that pass through $(3,3)$. Such a path decomposes, by the Rule of Product, into an independent path from $(0,0)$ to $(3,3)$ followed by an independent path from $(3,3)$ to $(6,6)$. Each leg is itself a lattice path with 3 R's and 3 U's, hence counted by $\binom{6}{3} = 20$. So the number of paths through $(3,3)$ is
$$
\binom{6}{3}\times\binom{6}{3} = 20 \times 20 = 400.
$$

By complementary counting, the number of paths *avoiding* $(3,3)$ is
$$
924 - 400 = \boxed{524}.
$$
$\blacksquare$

> **Trick.** The identification of "monotone lattice paths" with "arrangements of R's and U's" is one of the most productive bijections in combinatorics; it converts geometric path-counting problems directly into combination-counting problems, and pairs naturally with complementary counting when obstacles are present.

---
## 5. Fundamental Identities Involving $\binom{n}{r}$

The combinatorial coefficients satisfy a rich lattice of identities. We collect the most important ones, with proofs, before applying them to two genuinely hard problems.

**(i) Symmetry.** $\displaystyle \binom{n}{r} = \binom{n}{n-r}$.
*Proof.* Choosing $r$ objects to include is equivalent to choosing the $n-r$ objects to exclude — a bijection between the two families of subsets. $\blacksquare$

**(ii) Pascal's Identity.** $\displaystyle \binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}$.
*Proof (combinatorial).* Fix a particular object, say $X$, among the $n$. Every $r$-subset either contains $X$ or does not. If it contains $X$, the remaining $r-1$ elements are chosen from the other $n-1$ objects: $\binom{n-1}{r-1}$ ways. If it does not contain $X$, all $r$ elements are chosen from the other $n-1$ objects: $\binom{n-1}{r}$ ways. These cases are exhaustive and mutually exclusive. $\blacksquare$
*Proof (algebraic).* Direct manipulation of the factorial formula, left as a routine exercise for the reader; both proofs are worth internalising, as the combinatorial argument generalises far more readily.

**(iii) The Absorption Identity.** $\displaystyle r\binom{n}{r} = n\binom{n-1}{r-1}$.
*Proof.* Count, in two ways, the number of ways to select a committee of $r$ people from $n$ and then designate one member of the committee as *leader*. Method 1: choose the committee first ($\binom{n}{r}$ ways), then the leader from among its $r$ members ($r$ ways): total $r\binom{n}{r}$. Method 2: choose the leader first ($n$ ways), then the remaining $r-1$ committee members from the other $n-1$ people ($\binom{n-1}{r-1}$ ways): total $n\binom{n-1}{r-1}$. Since both methods count the same objects, the two expressions are equal. $\blacksquare$

**(iv) Sum over all subsets.** $\displaystyle \sum_{r=0}^{n}\binom{n}{r} = 2^n$, since each of the $n$ objects is independently either included or excluded from a subset.

**(v) Alternating sum.** $\displaystyle \sum_{r=0}^{n}(-1)^r\binom{n}{r} = 0$ for $n \ge 1$ (immediate from the Binomial Theorem applied to $(1-1)^n$).

**(vi) Vandermonde's Identity.** $\displaystyle \sum_{k=0}^{r}\binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}$.
*Proof.* Suppose a group of $m+n$ people consists of $m$ men and $n$ women. The right side counts the ways of choosing a committee of $r$ people from the entire group. The left side counts the same thing by conditioning on $k$, the number of men on the committee: choose $k$ men from $m$ (in $\binom{m}{k}$ ways) and $r-k$ women from $n$ (in $\binom{n}{r-k}$ ways), and sum over all admissible $k$. $\blacksquare$

**(vii) Sum of squares.** $\displaystyle \sum_{r=0}^{n}\binom{n}{r}^2 = \binom{2n}{n}$.
*Proof.* Apply Vandermonde's Identity with $m=n$ and total selection size $r=n$: $\sum_{k=0}^n \binom{n}{k}\binom{n}{n-k} = \binom{2n}{n}$. By symmetry (identity (i)), $\binom{n}{n-k} = \binom{n}{k}$, so the left side is $\sum_k \binom{n}{k}^2$. $\blacksquare$

**(viii) The Hockey Stick Identity.** $\displaystyle \sum_{i=r}^{n}\binom{i}{r} = \binom{n+1}{r+1}$.
*Proof.* By induction on $n$, using Pascal's Identity. The base case $n=r$ reads $\binom{r}{r} = \binom{r+1}{r+1} = 1$, true. Assume $\sum_{i=r}^{n-1}\binom{i}{r} = \binom{n}{r+1}$. Then
$$
\sum_{i=r}^{n}\binom{i}{r} = \binom{n}{r+1} + \binom{n}{r} = \binom{n+1}{r+1},
$$
the last step being Pascal's Identity. $\blacksquare$

### Example 5.1 (Hard). A weighted identity.

*Prove that $\displaystyle \sum_{k=1}^{n} k\binom{n}{k}^2 = n\binom{2n-1}{n-1}$.*

**Solution.** By the Absorption Identity, $k\binom{n}{k} = n\binom{n-1}{k-1}$. Substituting into one factor of $\binom{n}{k}^2 = \binom{n}{k}\binom{n}{k}$,
$$
\sum_{k=1}^{n} k\binom{n}{k}^2 = \sum_{k=1}^n n\binom{n-1}{k-1}\binom{n}{k} = n\sum_{k=1}^{n}\binom{n-1}{k-1}\binom{n}{k}.
$$
Put $j = k - 1$, and use symmetry $\binom{n}{k} = \binom{n}{n-k}$:
$$
\sum_{k=1}^n \binom{n-1}{k-1}\binom{n}{k} = \sum_{j=0}^{n-1}\binom{n-1}{j}\binom{n}{n-1-j}.
$$
This is precisely the left side of Vandermonde's Identity with $m = n-1$, second block size $n$, and total selection $r = n-1$:
$$
\sum_{j=0}^{n-1}\binom{n-1}{j}\binom{n}{(n-1)-j} = \binom{(n-1)+n}{n-1} = \binom{2n-1}{n-1}.
$$
Therefore $\sum_{k=1}^n k\binom{n}{k}^2 = n\binom{2n-1}{n-1}$, as required. $\blacksquare$

*(Check, $n=2$: LHS $= 1\cdot\binom{2}{1}^2 + 2\cdot\binom{2}{2}^2 = 4 + 2 = 6$; RHS $= 2\binom{3}{1} = 6$. ✓.)*

### Example 5.2 (Hard). Deriving the sum-of-squares formula combinatorially.

*Using combinatorial identities alone (no induction, no telescoping sums of powers directly), derive the classical formula $\displaystyle \sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$.*

**Solution.** The key observation is that every positive integer $k$ can be written in terms of binomial coefficients:
$$
k^2 = 2\binom{k}{2} + \binom{k}{1},
$$
which is immediate from $2\binom{k}{2} = k(k-1) = k^2 - k$. Summing from $k=1$ to $n$ (noting $\binom{1}{2}=0$, so the sum may harmlessly start at $k=1$):
$$
\sum_{k=1}^n k^2 = 2\sum_{k=1}^{n}\binom{k}{2} + \sum_{k=1}^n \binom{k}{1}.
$$
Both sums on the right are now instances of the Hockey Stick Identity (viii):
$$
\sum_{k=1}^n \binom{k}{2} = \binom{n+1}{3}, \qquad \sum_{k=1}^n \binom{k}{1} = \binom{n+1}{2}.
$$
Hence
$$
\sum_{k=1}^n k^2 = 2\binom{n+1}{3} + \binom{n+1}{2} = \frac{(n+1)n(n-1)}{3} + \frac{n(n+1)}{2} = n(n+1)\left[\frac{n-1}{3} + \frac{1}{2}\right] = \frac{n(n+1)(2n+1)}{6}.
$$
$\blacksquare$

> **Remark.** This technique — expressing a power $k^p$ as a combination of binomial coefficients $\binom{k}{1}, \binom{k}{2}, \ldots$ and then telescoping via the Hockey Stick Identity — generalises to derive the sum of cubes, fourth powers, and so on, and is the combinatorialist's alternative to Faulhaber's formula.

---

## 6. Distribution of Objects — Stars and Bars, and Beyond

We now turn to a class of problems concerning the *distribution* of objects into groups or boxes — problems that require care in distinguishing whether the objects are identical or distinct, and whether the boxes (recipients) are identical or distinct.

### Theorem 6.1 (Stars and Bars). 

The number of ways to distribute $n$ *identical* objects into $r$ *distinct* boxes, empty boxes permitted, is
$$
\binom{n+r-1}{r-1}.
$$

**Proof.** Represent the $n$ identical objects by $n$ stars, and use $r-1$ bars to partition them into $r$ (possibly empty) groups — one group per box. A distribution then corresponds exactly to an arrangement of $n$ stars and $r-1$ bars in a row, and by Theorem 2.2 the number of such arrangements is $\dfrac{(n+r-1)!}{n!\,(r-1)!} = \binom{n+r-1}{r-1}$, since the arrangement is determined entirely by choosing which $r-1$ of the $n+r-1$ positions hold bars. $\blacksquare$

**Corollary 6.1.1.** If no box may be empty, the count is $\binom{n-1}{r-1}$ (place $r-1$ bars strictly *between* stars, into the $n-1$ internal gaps, rather than anywhere in the row).

> **Remark (Beggar's Method).** Theorem 6.1 is often introduced via the following equivalent story: $n$ identical coins (stars and bars problem) are to be distributed among $r$ beggars, each of whom may receive zero or more coins. This gives the technique its popular name in Indian coaching literature.

### Example 6.1 (Hard). Stars and bars combined with an upper bound.

*Find the number of non-negative integer solutions of $x_1 + x_2 + x_3 + x_4 = 20$ subject to the constraints $x_1 \le 5$ and $x_2 \le 6$.*

**Solution.** We use inclusion–exclusion (formally justified in Section 9) on top of Theorem 6.1.

Let $S$ be the total number of non-negative solutions with *no* upper bounds:
$$
S = \binom{20+3}{3} = \binom{23}{3} = 1771.
$$

Let $A$ be the set of solutions violating $x_1 \le 5$, i.e. with $x_1 \ge 6$. Substituting $x_1' = x_1 - 6 \ge 0$, we need $x_1' + x_2+x_3+x_4 = 14$, giving $|A| = \binom{14+3}{3} = \binom{17}{3} = 680$.

Let $B$ be the set of solutions violating $x_2 \le 6$, i.e. $x_2 \ge 7$. Substituting $x_2' = x_2 - 7$, we need sum $= 13$, giving $|B| = \binom{13+3}{3} = \binom{16}{3} = 560$.

Let $A \cap B$ require both $x_1 \ge 6$ and $x_2 \ge 7$ simultaneously. Substituting both, the remaining sum is $20 - 6 - 7 = 7$, giving $|A\cap B| = \binom{7+3}{3} = \binom{10}{3} = 120$.

By the Principle of Inclusion–Exclusion, the number of *valid* solutions (satisfying both upper bounds) is
$$
S - |A| - |B| + |A\cap B| = 1771 - 680 - 560 + 120 = \boxed{651}.
$$
$\blacksquare$

### Example 6.2 (Hard). Distinct objects into identical boxes — Stirling numbers.

*In how many ways can 5 distinct toys be distributed into 3 identical, indistinguishable boxes, so that no box is empty?*

**Solution.** Since the boxes are *identical*, we are really counting the number of ways to partition the set of 5 toys into 3 non-empty, unordered blocks. This count is called a **Stirling number of the second kind**, written $S(5,3)$.

Such numbers may be computed by the inclusion–exclusion formula (derived formally in Section 9):
$$
S(n,k) = \frac{1}{k!}\sum_{i=0}^{k}(-1)^i \binom{k}{i}(k-i)^n.
$$
For $n=5, k=3$:
$$
S(5,3) = \frac{1}{3!}\left[\binom{3}{0}3^5 - \binom{3}{1}2^5 + \binom{3}{2}1^5 - \binom{3}{3}0^5\right] = \frac{1}{6}\left[243 - 96 + 3 - 0\right] = \frac{150}{6} = \boxed{25}.
$$
$\blacksquare$

> **Trick — a taxonomy of four distribution problems.** Students frequently confuse the four basic cases; it is worth fixing them permanently:
>
> | Objects | Boxes | Empty boxes allowed? | Formula |
> |---|---|---|---|
> | Identical | Distinct | Yes | $\binom{n+r-1}{r-1}$ |
> | Identical | Distinct | No | $\binom{n-1}{r-1}$ |
> | Distinct | Distinct | Yes | $r^n$ |
> | Distinct | Distinct | No | $\displaystyle\sum_{i=0}^{r}(-1)^i\binom{r}{i}(r-i)^n$ (inclusion–exclusion; equals $r!\,S(n,r)$) |
> | Distinct | Identical | No | $S(n,r)$ (Stirling number of the second kind) |

---
## 7. The Art of Restricted Arrangements

Many of the hardest examination problems are ordinary permutation or combination problems dressed in a restrictive condition — objects that must (or must not) be adjacent, or must appear in a specified relative order. Three techniques handle the overwhelming majority of such problems.

**The Gap Method.** To keep certain objects mutually non-adjacent, first arrange the *remaining* objects, then insert the restricted objects into the gaps created (as in Example 2.1).

**The Grouping (or "Glueing") Method.** To force certain objects to remain *together*, glue them into a single composite unit, arrange the units, then multiply by the number of internal arrangements of the glued unit.

**The Relative-Order Method.** If $k$ specified objects (possibly repeated) are required to appear in one specific relative order among themselves (though not necessarily adjacent), first count all arrangements ignoring the order restriction, then divide by the number of ways those $k$ objects could have been ordered among themselves — since exactly a $\frac{1}{k!}$ fraction (or, with repeated letters, a $\frac{1}{(\text{number of distinct orderings})}$ fraction) will exhibit the required order, by symmetry.

### Example 7.1 (Hard). Relative order with repeated letters — ARRANGEMENT.

*How many arrangements of the letters of the word ARRANGEMENT have all four vowels appearing in alphabetical order (though not necessarily adjacent to one another)?*

**Solution.** ARRANGEMENT has 11 letters: A(2), R(2), N(2), G(1), E(2), M(1), T(1) — the vowels are A, A, E, E and the consonants are R, R, N, N, G, M, T.

**Step 1.** Choose which 4 of the 11 positions will be occupied by vowels: $\binom{11}{4} = 330$ ways.

**Step 2.** Arrange the 7 consonants (R repeated twice, N repeated twice) in the remaining 7 positions:
$$
\frac{7!}{2!\,2!} = \frac{5040}{4} = 1260 \text{ ways.}
$$

**Step 3.** Fill the 4 chosen vowel-positions with A, A, E, E *in alphabetical order* — since alphabetical order for the multiset $\{A,A,E,E\}$ is uniquely $A,A,E,E$, there is exactly **1** way to do this (not $4!$, since the order is fully prescribed).

By the Rule of Product,
$$
330 \times 1260 \times 1 = \boxed{415{,}800}.
$$

**Verification via the Relative-Order Method.** The total number of arrangements of ARRANGEMENT, ignoring order restrictions, is $\dfrac{11!}{2!\,2!\,2!\,2!} = \dfrac{39916800}{16} = 2{,}494{,}800$. Among the $4!/(2!\,2!) = 6$ distinct relative orderings in which the multiset $\{A,A,E,E\}$ could appear in the four vowel-slots, exactly one is alphabetical; by symmetry, exactly $\frac{1}{6}$ of all arrangements exhibit this order:
$$
\frac{2{,}494{,}800}{6} = 415{,}800. \checkmark
$$
$\blacksquare$

### Example 7.2 (Hard). Combining the gap method with complementary counting.

*In how many ways can 5 distinct boys and 5 distinct girls be seated in a row of 10 chairs so that (a) no two girls are seated next to each other, and (b) two particular boys, $X$ and $Y$, are not seated next to each other?*

**Solution.** We first count the arrangements satisfying condition (a) alone, then subtract those that violate (b).

**Satisfying (a) alone.** Seat the 5 boys first, in $5! = 120$ ways. This creates 6 gaps (before, between, and after the boys). We must place the 5 distinct girls into 5 of these 6 gaps, at most one girl per gap (to keep them mutually non-adjacent), and order matters since the girls are distinct and the gaps are now distinguishable positions:
$$
{}^6P_5 = \frac{6!}{1!} = 720 \text{ ways.}
$$
So the count satisfying (a) is
$$
5! \times {}^6P_5 = 120 \times 720 = 86{,}400.
$$

**Satisfying (a) but violating (b), i.e. $X$ and $Y$ adjacent.** Glue $X$ and $Y$ into a single block (2 internal orders: $XY$ or $YX$). We now have 4 "boy-units" (the $XY$-block plus the other 3 boys) to arrange: $4! = 24$ ways, times 2 for the internal order of the block, giving $4! \times 2 = 48$.

These 4 units create exactly 5 gaps. Since we need all 5 distinct girls placed with no two adjacent, and there are *exactly* 5 gaps available, every gap must receive exactly one girl: $5! = 120$ ways.

So the count satisfying (a) but violating (b) is
$$
48 \times 120 = 5760.
$$

**Final count**, by complementary counting within the arrangements satisfying (a):
$$
86{,}400 - 5{,}760 = \boxed{80{,}640}.
$$
$\blacksquare$

---

## 8. The Multinomial Theorem

### Theorem 8.1 (Multinomial Theorem).

$$
(x_1 + x_2 + \cdots + x_k)^n = \sum_{\substack{n_1+n_2+\cdots+n_k = n \\ n_i \ge 0}} \frac{n!}{n_1!\,n_2!\cdots n_k!}\, x_1^{n_1}x_2^{n_2}\cdots x_k^{n_k}.
$$

**Proof.** Expanding the product $(x_1+\cdots+x_k)^n = (x_1+\cdots+x_k)(x_1+\cdots+x_k)\cdots(x_1+\cdots+x_k)$ ($n$ factors) by repeated distribution, each term of the expansion arises from choosing one $x_i$ from each of the $n$ factors and multiplying the choices together. The coefficient of $x_1^{n_1}x_2^{n_2}\cdots x_k^{n_k}$ (where $\sum n_i = n$) is precisely the number of ways to assign, to each of the $n$ factors, a label from $\{1,\ldots,k\}$ such that label $i$ is used exactly $n_i$ times — which, by Theorem 2.2, is $\dfrac{n!}{n_1!\,n_2!\cdots n_k!}$. $\blacksquare$

The multinomial coefficient $\dfrac{n!}{n_1!\cdots n_k!}$ has the same combinatorial meaning as in Theorem 2.2: it is simultaneously the number of distinguishable arrangements of a multiset, and the number of ways to partition $n$ distinct objects into labelled groups of prescribed sizes $n_1, \ldots, n_k$.

### Example 8.1 (Hard). Extracting a coefficient — a disguised stars-and-bars problem.

*Find the coefficient of $x^{15}$ in the expansion of $(x + x^2 + x^3 + x^4 + x^5 + x^6)^4$.*

**Solution.** This expression models the number of ways to roll four ordinary six-faced dice so that the total shown is $15$ — a classic reformulation. Write
$$
(x+x^2+\cdots+x^6)^4 = x^4(1+x+x^2+x^3+x^4+x^5)^4 = x^4\left(\frac{1-x^6}{1-x}\right)^4.
$$
We require the coefficient of $x^{15}$ in this, which equals the coefficient of $x^{11}$ in $(1-x^6)^4(1-x)^{-4}$.

Expand $(1-x^6)^4 = 1 - 4x^6 + 6x^{12} - 4x^{18} + x^{24}$; only the first two terms can contribute to the coefficient of $x^{11}$ (since $12 > 11$). Recall the standard expansion (from Theorem 6.1, "stars and bars"):
$$
(1-x)^{-4} = \sum_{j\ge 0}\binom{j+3}{3}x^j.
$$
Therefore the coefficient of $x^{11}$ is
$$
\underbrace{\binom{11+3}{3}}_{\text{from the "1" term}} - 4\underbrace{\binom{5+3}{3}}_{\text{from the "}-4x^6\text{" term, needing }x^5} = \binom{14}{3} - 4\binom{8}{3} = 364 - 4(56) = 364 - 224 = \boxed{140}.
$$
$\blacksquare$

> **Trick.** Whenever a problem restricts a variable to a bounded range (here, each die face lies in $\{1,\ldots,6\}$, i.e. each summand $x_i$ satisfies $1 \le x_i \le 6$), the generating-function coefficient extraction and the inclusion–exclusion "stars and bars with upper bounds" technique of Example 6.1 are two faces of the *same* underlying computation. Fluency in translating between them is a significant time-saver.

---
## 9. The Principle of Inclusion and Exclusion, and Derangements

### Theorem 9.1 (Principle of Inclusion and Exclusion).

For finite sets $A_1, A_2, \ldots, A_n$,
$$
\left|\bigcup_{i=1}^n A_i\right| = \sum_i |A_i| - \sum_{i<j}|A_i \cap A_j| + \sum_{i<j<k}|A_i\cap A_j \cap A_k| - \cdots + (-1)^{n+1}|A_1\cap A_2\cap\cdots\cap A_n|.
$$

**Proof.** It suffices to show that every element of $\bigcup A_i$ is counted exactly once by the right-hand side. Suppose an element $x$ lies in exactly $m \ge 1$ of the sets $A_1,\ldots,A_n$. Then $x$ is counted in the term $\sum_{|S|=t} |\bigcap_{i \in S} A_i|$ exactly $\binom{m}{t}$ times (once for each $t$-subset $S$ of the $m$ sets containing $x$). Its net contribution to the right-hand side is therefore
$$
\sum_{t=1}^{m}(-1)^{t+1}\binom{m}{t} = -\sum_{t=1}^m (-1)^t \binom{m}{t} = -\left[(1-1)^m - \binom{m}{0}\right] = -[0 - 1] = 1,
$$
using identity (v) of Section 5. Since $x$ contributes exactly $1$ to the right-hand side, and $x \in \bigcup A_i$ contributes exactly $1$ to the left-hand side, the two sides agree for every element, and hence are equal. $\blacksquare$

### 9.1 Derangements

**Definition 9.1.** A *derangement* of $\{1, 2, \ldots, n\}$ is a permutation $\sigma$ with no fixed point, i.e. $\sigma(i) \ne i$ for every $i$. The number of derangements of $n$ objects is denoted $D_n$ or $!n$.

### Theorem 9.2.

$$
D_n = n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}.
$$

**Proof.** Let $A_i$ ($1 \le i \le n$) be the set of permutations of $\{1,\ldots,n\}$ that fix the point $i$ (i.e. $\sigma(i) = i$); note $|A_i| = (n-1)!$, since the remaining $n-1$ points may be permuted freely. More generally, for any $t$-subset $S = \{i_1,\ldots,i_t\}$, $\left|\bigcap_{i\in S} A_i\right| = (n-t)!$, since fixing $t$ points leaves the remaining $n-t$ points free. By symmetry there are $\binom{n}{t}$ such $t$-subsets. By the Principle of Inclusion–Exclusion (Theorem 9.1), the number of permutations having *at least one* fixed point is
$$
\left|\bigcup_i A_i\right| = \sum_{t=1}^{n}(-1)^{t+1}\binom{n}{t}(n-t)!.
$$
The number of derangements is the complement within all $n!$ permutations:
$$
D_n = n! - \sum_{t=1}^n (-1)^{t+1}\binom{n}{t}(n-t)! = n! + \sum_{t=1}^n (-1)^t \binom{n}{t}(n-t)! = \sum_{t=0}^n (-1)^t\binom{n}{t}(n-t)!.
$$
Since $\binom{n}{t}(n-t)! = \dfrac{n!}{t!}$, this simplifies to
$$
D_n = \sum_{t=0}^n (-1)^t \frac{n!}{t!} = n!\sum_{t=0}^n \frac{(-1)^t}{t!}. \qquad \blacksquare
$$

The first few values, computed directly from this formula, are
$$
D_1 = 0,\quad D_2 = 1,\quad D_3 = 2,\quad D_4 = 9,\quad D_5 = 44,\quad D_6 = 265.
$$

**Corollary 9.2.1.** The number of permutations of $n$ objects with *exactly* $k$ fixed points is $\displaystyle \binom{n}{k}D_{n-k}$ — choose which $k$ points are fixed ($\binom{n}{k}$ ways), and derange the remaining $n-k$ points so that none of *them* is fixed either ($D_{n-k}$ ways).

### Example 9.1 (Hard). Exactly two correct letters.

*Six distinct letters are to be placed into six correspondingly addressed envelopes, one letter per envelope, at random. In how many ways can this be done so that exactly 2 letters go into their correct envelopes?*

**Solution.** By Corollary 9.2.1 with $n=6, k=2$:
$$
\binom{6}{2}D_{4} = 15 \times 9 = \boxed{135}.
$$
$\blacksquare$

### Example 9.2 (Hard). Distinct objects into distinct non-empty boxes.

*In how many ways can 7 distinct balls be placed into 3 distinct boxes so that no box is left empty?*

**Solution.** By inclusion–exclusion, exactly as in the derivation of Theorem 9.2: let $A_i$ be the (unrestricted) set of the $3^7$ total distributions in which box $i$ is empty. Then $|A_i| = 2^7$ (each ball has only 2 remaining box-choices), $|A_i \cap A_j| = 1^7$ (all balls forced into the single remaining box), and $|A_1\cap A_2\cap A_3| = 0$. By Theorem 9.1, the number of distributions leaving *at least one* box empty is
$$
\binom{3}{1}2^7 - \binom{3}{2}1^7 + \binom{3}{3}0^7 = 3(128) - 3(1) + 0 = 384 - 3 = 381.
$$
Hence the number of distributions with **no** box empty is
$$
3^7 - 381 = 2187 - 381 = \boxed{1806}.
$$

*(As a check, this equals $3!\cdot S(7,3)$, since distributing 7 distinct balls into 3 distinct non-empty boxes is the same as first partitioning them into 3 non-empty unlabelled blocks — $S(7,3) = 301$ — and then assigning the 3 distinct box-labels to the 3 blocks in $3!$ ways: $301\times 6 = 1806$. ✓)* $\blacksquare$

---

## 10. A Compendium of Tricks and Shortcuts

The following is a high-density summary, intended for rapid recall in the closing minutes before an examination.

- **Fix, then arrange.** In any circular problem, immediately fix one object's position to eliminate rotational symmetry before counting the rest; this converts a circular problem into a linear one.

- **Gap method for "no two together."** Arrange the unrestricted objects first; insert restricted objects into the gaps created.

- **Glue method for "always together."** Bind the required objects into a single composite block; arrange the blocks; multiply by the internal permutations of the glued block.

- **Divide for fixed relative order.** If $k$ objects must appear in one specific relative order (not necessarily adjacent), compute the unrestricted count and divide by the number of distinct orderings those $k$ objects admit among themselves.

- **Complementary counting.** "At least one," "at most," and "not all" conditions are frequently easier to compute by subtracting the complementary (forbidden) count from the total, rather than attacking the condition head-on.

- **Beggar's method / stars and bars.** Whenever objects are *identical* and being *distributed*, immediately suspect Theorem 6.1 rather than $r^n$ (which is for *distinguishable* placements of *distinct* objects, or ordered sequences).

- **Grouping vs. distributing.** Be careful to distinguish "dividing $n$ distinct objects into groups of specified, distinguishable roles" (a multinomial coefficient, Theorem 8.1) from "dividing $n$ distinct objects into groups of equal, indistinguishable roles" — the latter requires an *additional* division by $k!$ for the $k$ indistinguishable groups, to avoid overcounting group-orderings that lead to the same partition.

- **Bijection first.** Whenever a problem seems to resist direct formula application (lattice paths, ballot-type problems, tiling problems), search for a bijection to a simpler, already-solved combinatorial object — arrangements of R's and U's, sequences of $+1/-1$, or binary strings are common targets.

- **"Exactly $k$" via "choose $k$, then derange/restrict the rest."** As in Corollary 9.2.1, problems asking for exactly $k$ objects satisfying a property are usually $\binom{n}{k}$ times the count of the remaining $n-k$ satisfying the "none" version of the same property.

- **Absorption identity for weighted sums.** Any sum involving a factor of $k$ or $k^2$ multiplying $\binom{n}{k}$ (or its square) should immediately suggest the Absorption Identity $k\binom{n}{k}=n\binom{n-1}{k-1}$, as in Example 5.1.

- **Non-consecutive selection formulas.** Memorise both Theorem 4.2 (linear, $\binom{n-r+1}{r}$) and Theorem 4.3 (circular, $\frac{n}{n-r}\binom{n-r}{r}$) — the circular version in particular is frequently forgotten under time pressure, yet appears repeatedly in seating and scheduling problems.

- **Rank-of-a-word algorithm.** For dictionary-rank problems, fix letters one position at a time from the left, and at each stage count (smaller available letters) $\times$ (arrangements of the remaining multiset); add 1 at the end for the word itself.

- **Watch for hidden generating functions.** Coefficient-extraction problems (Example 8.1) are almost always disguised stars-and-bars-with-bounds problems, and vice versa; either technique should be available on demand.

---

## 11. Formula Reference Sheet

| Concept | Formula |
|---|---|
| Permutations of $n$ taken $r$ | $^nP_r = \dfrac{n!}{(n-r)!}$ |
| Permutations with repetition | $n^r$ |
| Permutations of a multiset | $\dfrac{n!}{p_1!\,p_2!\cdots p_k!}$ |
| Circular permutations | $(n-1)!$ |
| Circular permutations (mirror-equivalent) | $\dfrac{(n-1)!}{2}$ |
| Combinations | $\displaystyle \binom{n}{r} = \frac{n!}{r!(n-r)!}$ |
| Non-consecutive selection (line) | $\displaystyle \binom{n-r+1}{r}$ |
| Non-consecutive selection (circle) | $\displaystyle \frac{n}{n-r}\binom{n-r}{r}$ |
| Pascal's Identity | $\displaystyle \binom{n}{r} = \binom{n-1}{r-1}+\binom{n-1}{r}$ |
| Absorption Identity | $\displaystyle r\binom{n}{r} = n\binom{n-1}{r-1}$ |
| Vandermonde's Identity | $\displaystyle \sum_k \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}$ |
| Sum of squares of $\binom{n}{r}$ | $\displaystyle \sum_r \binom{n}{r}^2 = \binom{2n}{n}$ |
| Hockey Stick Identity | $\displaystyle \sum_{i=r}^n \binom{i}{r} = \binom{n+1}{r+1}$ |
| Identical objects, distinct boxes, empty allowed | $\displaystyle \binom{n+r-1}{r-1}$ |
| Identical objects, distinct boxes, no empty | $\displaystyle \binom{n-1}{r-1}$ |
| Distinct objects, distinct boxes, no empty | $\displaystyle \sum_{i=0}^r (-1)^i\binom{r}{i}(r-i)^n$ |
| Stirling number of the 2nd kind | $\displaystyle S(n,k) = \frac{1}{k!}\sum_{i=0}^k (-1)^i \binom{k}{i}(k-i)^n$ |
| Multinomial Theorem | $\displaystyle (x_1+\cdots+x_k)^n = \sum \frac{n!}{n_1!\cdots n_k!}x_1^{n_1}\cdots x_k^{n_k}$ |
| Inclusion–Exclusion (2 sets) | $|A\cup B| = |A|+|B|-|A\cap B|$ |
| Derangements | $\displaystyle D_n = n!\sum_{k=0}^n \frac{(-1)^k}{k!}$ |
| Exactly $k$ fixed points | $\displaystyle \binom{n}{k}D_{n-k}$ |

---

## Closing Remarks

The reader who has worked through the proofs and hard examples above will have noticed a recurring truth: the entire edifice of permutations and combinations rests on remarkably few load-bearing ideas — the multiplication and addition principles, the gap and glueing techniques, complementary counting, and the principle of inclusion and exclusion. Mastery of the subject at the JEE Advanced, Olympiad, or ISI–CMI level is therefore less a matter of memorising an ever-growing list of formulae, and more a matter of training oneself to recognise *which* of these few ideas, and in what combination, a given problem is silently asking to be solved by. The ménage problem of Section 3, in particular, was included as a reminder that even the most intimidating-looking competition problem is, upon dissection, nothing more than these same elementary principles applied with sufficient patience and care.
