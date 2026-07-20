<!--metadata
  title: "Number Theory"
  authors: ["Subhajit Gorai"]
  dateCreated: "19/07/2026"
  dateEdited: "20/07/2026"
  description: "From First Principles to Olympiad and Research-Level Technique"
  tags: ["number theory", "mathematics", "olympiad", "jee", "isi", "iit", "gate", "ml"]
-->

# A Treatise on Number Theory

## Preface

Number theory begins with the simplest object in mathematics — the integer — and from it builds a subject of extraordinary depth. This treatise is written for a reader who already trusts their own logical machinery: someone preparing for JEE Advanced, the ISI/CMI entrance examinations (B.Stat, B.Math, M.Stat), INMO/IMO-level olympiad work, or the number-theoretic corners of competitive programming. Consequently we do not linger on motivation for its own sake; we state axioms, prove theorems in full wherever the proof teaches a reusable technique, and reserve extended commentary for the moments where a trick, once seen, becomes part of the reader's permanent toolkit.

Where a fully self-contained proof would require machinery well outside elementary number theory — the analytic apparatus behind the Prime Number Theorem, the structure theory of units in rings of integers behind Pell's equation, or the classical (if elementary) but lengthy lattice-point argument behind Quadratic Reciprocity — we say so explicitly, state the result precisely, name the method by which it is proved, and then *use the result freely*. A working mathematician relies on facts they have not personally re-derived; competition mathematics rewards the same discipline.

Each Part closes with one or two **Challenge Problems**: genuinely hard problems, worked in full, chosen because a single idea in that Part *completely dissolves* them. The aim is not merely to display a solution but to show the moment a technique becomes decisive.

---

## Table of Contents

- **Preface**
- **Conventions and Notation**
- **Part I. Divisibility, Primes, and the Euclidean Algorithm**
  - 1.1 The Division Algorithm
  - 1.2 Divisibility: Basic Properties
  - 1.3 GCD, LCM, and the Euclidean Algorithm
  - 1.4 Bézout's Identity and the Extended Euclidean Algorithm
  - 1.5 The Fundamental Theorem of Arithmetic
  - 1.6 The Distribution of Primes
  - 1.7 Challenge Problems
- **Part II. Modular Arithmetic and Classical Theorems**
  - 2.1 Congruences and Residue Systems
  - 2.2 Linear Congruences
  - 2.3 The Chinese Remainder Theorem
  - 2.4 Fermat's Little Theorem and Euler's Theorem
  - 2.5 Wilson's Theorem
  - 2.6 Modular Exponentiation: Tricks and Traps
  - 2.7 Challenge Problems
- **Part III. Multiplicative Functions and Möbius Inversion**
  - 3.1 Multiplicative Functions
  - 3.2 The Classical Functions: $\tau, \sigma, \varphi$
  - 3.3 Dirichlet Convolution
  - 3.4 The Möbius Function
  - 3.5 Möbius Inversion
  - 3.6 Challenge Problems
- **Part IV. Diophantine Equations**
  - 4.1 Linear Diophantine Equations
  - 4.2 Pythagorean Triples
  - 4.3 Pell's Equation
  - 4.4 The Method of Infinite Descent
  - 4.5 Interlude: Gaussian Integers and Sums of Two Squares
  - 4.6 Challenge Problem
- **Part V. Advanced Tools: LTE, Primitive Roots, and Quadratic Residues**
  - 5.1 The Lifting the Exponent Lemma
  - 5.2 Orders, Primitive Roots, and Indices
  - 5.3 Quadratic Residues and Euler's Criterion
  - 5.4 The Law of Quadratic Reciprocity
  - 5.5 Challenge Problems
- **Appendix A. Master Formula Sheet**
- **Closing Remark: A Unifying Theme**

---

## Conventions and Notation

Throughout, unless otherwise stated, lowercase Latin letters $a,b,c,d,m,n,k$ denote integers, and $p,q$ denote **primes**.

| Symbol | Meaning |
|---|---|
| $\mathbb{Z}, \mathbb{N}, \mathbb{Z}^+$ | integers; non-negative integers; positive integers |
| $a \mid b$ | $a$ divides $b$, i.e. $b = ak$ for some $k \in \mathbb{Z}$ |
| $a \nmid b$ | $a$ does not divide $b$ |
| $\gcd(a,b)$, $\operatorname{lcm}(a,b)$ | greatest common divisor, least common multiple |
| $a \equiv b \pmod{m}$ | $m \mid (a-b)$ |
| $v_p(n)$ | the **$p$-adic valuation** of $n$: the exponent of $p$ in the prime factorization of $n$ |
| $\lfloor x \rfloor, \lceil x \rceil$ | floor and ceiling of a real number $x$ |
| $\varphi(n)$ | Euler's totient function |
| $\tau(n)$ or $d(n)$ | number of positive divisors of $n$ |
| $\sigma(n)$ | sum of positive divisors of $n$ |
| $\mu(n)$ | the Möbius function |
| $\omega(n)$ | number of **distinct** prime divisors of $n$ |
| $\Omega(n)$ | number of prime divisors of $n$ **counted with multiplicity** |
| $\left(\dfrac{a}{p}\right)$ | the Legendre symbol |
| $\operatorname{ord}_m(a)$ | the multiplicative order of $a$ modulo $m$ |
| $[P]$ | Iverson bracket: $1$ if statement $P$ is true, $0$ otherwise |
| $f * g$ | Dirichlet convolution of arithmetic functions $f,g$ |
| $\varepsilon(n)$ | the Dirichlet-convolution identity: $\varepsilon(1)=1$, $\varepsilon(n) = 0$ for $n>1$ |
| $\prod_{p \mid n}$, $\sum_{d \mid n}$ | product/sum over primes dividing $n$ / over positive divisors of $n$ |
| $\blacksquare$ | end of proof |

We take for granted the **Well-Ordering Principle** (every non-empty subset of $\mathbb{Z}^+$ has a least element) and the principle of mathematical induction (in fact these are logically equivalent, together with the Peano axioms, and we treat them as our starting axioms for $\mathbb{Z}$). All rings encountered are commutative with unity unless stated otherwise.

---

## Part I — Divisibility, Primes, and the Euclidean Algorithm

### 1.1 The Division Algorithm

**Theorem 1.1 (Division Algorithm).** *Let $a \in \mathbb{Z}$ and $b \in \mathbb{Z}^+$. There exist unique integers $q$ (the quotient) and $r$ (the remainder) such that*
$$a = bq + r, \qquad 0 \le r < b.$$

**Proof.** *Existence.* Consider the set $S = \{a - bq : q \in \mathbb{Z}\} \cap \mathbb{N}$. This set is non-empty: taking $q$ sufficiently negative (e.g. $q = -|a|$) makes $a-bq$ arbitrarily large and positive. By the Well-Ordering Principle, $S$ has a least element $r = a - bq_0$ for some $q_0$. We claim $r < b$. If not, $r \ge b$, so $r - b = a - b(q_0+1) \ge 0$ is a *smaller* element of $S$, contradicting minimality of $r$. Hence $0 \le r < b$.

*Uniqueness.* Suppose $a = bq_1+r_1 = bq_2+r_2$ with $0 \le r_1,r_2 < b$. Then $b(q_1-q_2) = r_2 - r_1$, so $b \mid (r_2-r_1)$. But $|r_2-r_1| < b$, so the only multiple of $b$ in this range is $0$; hence $r_1=r_2$ and consequently $q_1=q_2$. $\blacksquare$

**Remark.** This single theorem is the seed of everything that follows: the Euclidean Algorithm, modular arithmetic, and unique factorization are all downstream consequences of the ability to divide with remainder.

### 1.2 Divisibility: Basic Properties

**Definition.** For integers $a,b$, we say $a \mid b$ ("$a$ divides $b$") if there exists $k \in \mathbb{Z}$ with $b = ak$.

**Proposition 1.2.** *For integers $a,b,c,x,y$:*
1. *(Reflexivity)* $a \mid a$.
2. *(Transitivity)* If $a\mid b$ and $b \mid c$, then $a \mid c$.
3. *(Linearity)* If $a \mid b$ and $a \mid c$, then $a \mid (bx+cy)$ for all integers $x,y$.
4. If $a \mid b$ and $b \neq 0$, then $|a| \le |b|$.
5. If $a\mid b$ and $b \mid a$, then $a = \pm b$.

**Proof.** All are immediate from the definition. For (2): $b=ak_1, c=bk_2 \Rightarrow c = ak_1k_2$. For (3): $b=ak_1,c=ak_2 \Rightarrow bx+cy = a(k_1x+k_2y)$. For (4): if $b=ak$ with $k\neq 0$ then $|b|=|a||k|\ge|a|$. For (5): combine (4) both ways. $\blacksquare$

**Trick.** Property (3) — *linearity* — is the single most used divisibility fact in olympiad problem-solving. Whenever you know $d$ divides two quantities, you instantly know $d$ divides **any** integer linear combination of them. This is the seed from which Bézout's identity and the entire Euclidean algorithm grow.

### 1.3 GCD, LCM, and the Euclidean Algorithm

**Definition.** For integers $a,b$, not both zero, $\gcd(a,b)$ is the largest positive integer dividing both $a$ and $b$. We set $\gcd(0,0)=0$ by convention. The least common multiple $\operatorname{lcm}(a,b)$ is the smallest positive integer divisible by both $a$ and $b$.

**Theorem 1.3 (Euclidean Algorithm).** *For $a,b \in \mathbb{Z}^+$,*
$$\gcd(a,b) = \gcd(b, a \bmod b),$$
*with $\gcd(a,0) = a$. Repeated application terminates and computes $\gcd(a,b)$.*

**Proof.** Write $a = bq+r$ with $0\le r<b$ (Division Algorithm). Any common divisor $d$ of $a,b$ divides $r = a-bq$ (linearity), so $d$ is a common divisor of $b,r$; conversely any common divisor of $b,r$ divides $a = bq+r$, so is a common divisor of $a,b$. Hence $a,b$ and $b,r$ have *exactly the same set* of common divisors, so in particular the same greatest one: $\gcd(a,b)=\gcd(b,r)$. Since remainders strictly decrease and are non-negative integers, the process terminates (Well-Ordering) at $\gcd(d,0)=d$. $\blacksquare$

**Theorem 1.4.** *For positive integers $a,b$: $\gcd(a,b)\cdot\operatorname{lcm}(a,b) = ab$.*

**Proof.** Let $d = \gcd(a,b)$ and write $a=da'$, $b=db'$ with $\gcd(a',b')=1$ (if a common factor $g>1$ divided both $a',b'$, then $dg$ would be a larger common divisor of $a,b$ than $d$, contradiction). We claim $\operatorname{lcm}(a,b) = da'b'$. Indeed $da'b' = ab' = a'b$ is a common multiple of $a,b$. If $M$ is any common multiple, write $M = at = da't$. Also $b \mid M \Rightarrow db' \mid da't \Rightarrow b' \mid a't$; since $\gcd(a',b')=1$, $b' \mid t$, so $t \ge b'$, giving $M \ge da'b'$. Hence $da'b'$ is the *least* common multiple. Therefore $\gcd(a,b)\operatorname{lcm}(a,b) = d\cdot da'b' = (da')(db') = ab$. $\blacksquare$

**Remark (Complexity).** The Euclidean Algorithm on inputs $a>b$ terminates in $O(\log b)$ steps. This is sharp: **Lamé's Theorem** shows the worst case occurs precisely on consecutive Fibonacci numbers $F_{n+1}, F_n$, since each step reduces the pair by the *smallest possible* factor.

### 1.4 Bézout's Identity and the Extended Euclidean Algorithm

**Theorem 1.5 (Bézout's Identity).** *For integers $a,b$ not both zero, there exist integers $x,y$ such that*
$$ax+by = \gcd(a,b).$$
*Moreover $\gcd(a,b)$ is the smallest positive integer expressible as $ax+by$.*

**Proof.** Let $S = \{ax+by : x,y\in\mathbb{Z}\}\cap \mathbb{Z}^+$. Since $a^2+b^2 \in S$ (not both zero), $S\neq\varnothing$, so by Well-Ordering it has a least element $d=ax_0+by_0$. We show $d = \gcd(a,b)$.

*($d\mid a$ and $d \mid b$):* By the Division Algorithm, $a = dq+r$, $0\le r<d$. Then
$$r = a-dq = a - q(ax_0+by_0) = a(1-qx_0) + b(-qy_0),$$
so $r$ is itself of the form $ax+by$. If $r>0$, then $r\in S$ and $r<d$, contradicting minimality of $d$. So $r=0$, i.e. $d\mid a$. Symmetrically $d \mid b$.

*(Maximality):* If $c$ is any common divisor of $a,b$, then $c \mid (ax_0+by_0) = d$ by linearity, so $c \le d$. Hence $d$ is the *greatest* common divisor. $\blacksquare$

**Corollary 1.6.** $\gcd(a,b)=1$ *if and only if there exist integers $x,y$ with $ax+by=1$.*

**The Extended Euclidean Algorithm.** This is simply the Euclidean Algorithm run forward, then **unwound by back-substitution** to express $\gcd(a,b)$ as an explicit combination $ax+by$.

**Worked Example 1.1.** Compute $\gcd(240,46)$ and find $x,y$ with $240x+46y=\gcd(240,46)$.

$$240 = 5\cdot 46 + 10,\quad 46 = 4\cdot 10 + 6,\quad 10 = 1\cdot 6+4,\quad 6=1\cdot4+2,\quad 4=2\cdot2+0.$$

So $\gcd(240,46)=2$. Back-substitute:
$$2 = 6-1\cdot4$$
$$= 6 - 1\cdot(10-1\cdot6) = 2\cdot6 - 10$$
$$= 2(46-4\cdot10) - 10 = 2\cdot46 - 9\cdot10$$
$$= 2\cdot46 - 9(240-5\cdot46) = 47\cdot46 - 9\cdot240.$$

Check: $47\cdot46 = 2162$, $9\cdot240=2160$, difference $=2$. So $(x,y)=(-9,47)$. $\blacksquare$

**Application: Modular Inverses.** If $\gcd(a,m)=1$, the extended Euclidean algorithm produces $x,y$ with $ax+my=1$, i.e. $ax\equiv 1\pmod m$ — so $x$ is the **modular inverse** $a^{-1}\bmod m$. This runs in $O(\log m)$ time and, unlike Fermat-based inversion (Section 2.4), works for **any** modulus, prime or not, as long as $\gcd(a,m)=1$.

### 1.5 The Fundamental Theorem of Arithmetic

**Lemma 1.7 (Euclid's Lemma).** *If $p$ is prime and $p \mid ab$, then $p\mid a$ or $p \mid b$.*

**Proof.** Suppose $p \nmid a$. Since the only positive divisors of $p$ are $1$ and $p$, and $p\nmid a$, we get $\gcd(p,a)=1$. By Bézout, there exist $x,y$ with $px+ay=1$. Multiplying by $b$:
$$pbx + aby = b.$$
Now $p \mid pbx$ trivially, and $p \mid ab \Rightarrow p \mid aby$. So $p$ divides the left side, hence $p \mid b$. $\blacksquare$

**Corollary 1.8.** *If prime $p \mid a_1a_2\cdots a_k$, then $p \mid a_i$ for some $i$.* (Immediate induction on $k$.)

**Theorem 1.9 (Fundamental Theorem of Arithmetic).** *Every integer $n>1$ can be written as a product of primes, and this factorization is unique up to the order of the factors.*

**Proof.** *Existence*, by strong induction on $n$. If $n$ is prime, done. Otherwise $n=ab$ with $1<a,b<n$; by the inductive hypothesis $a$ and $b$ are each products of primes, hence so is $n$.

*Uniqueness.* Suppose $n = p_1p_2\cdots p_r = q_1q_2\cdots q_s$ are two prime factorizations. Since $p_1 \mid q_1\cdots q_s$, Corollary 1.8 gives $p_1 \mid q_j$ for some $j$; as $q_j$ is prime, $p_1=q_j$. Cancel $p_1$ from both sides and induct on the (smaller) product $n/p_1$. By induction the remaining multisets of primes agree, so $r=s$ and the $p_i$ are a rearrangement of the $q_j$. $\blacksquare$

**Theorem 1.10 (Euclid — Infinitude of Primes).** *There are infinitely many primes.*

**Proof.** Suppose not: let $p_1,\dots,p_n$ be *all* the primes. Let $N = p_1p_2\cdots p_n + 1$. Since $N>1$, it has some prime factor $p$ (Theorem 1.9). But $N \equiv 1 \pmod{p_i}$ for every $i$, so $p \notin \{p_1,\dots,p_n\}$ — a new prime, contradiction. $\blacksquare$

**Trick.** The Fundamental Theorem of Arithmetic converts multiplicative statements about integers into additive statements about *exponent vectors* $n = \prod p_i^{a_i} \leftrightarrow (a_1,a_2,\dots)$. In particular:
$$\gcd(a,b) = \prod_p p^{\min(v_p(a),v_p(b))}, \qquad \operatorname{lcm}(a,b) = \prod_p p^{\max(v_p(a),v_p(b))},$$
which immediately re-proves Theorem 1.4, since $\min(x,y)+\max(x,y)=x+y$ for all reals $x,y$.

### 1.6 The Distribution of Primes

Beyond mere infinitude, one asks: *how dense* are the primes? Let $\pi(x)$ denote the number of primes $\le x$.

**Theorem 1.11 (Prime Number Theorem, statement only).**
$$\pi(x) \sim \frac{x}{\ln x} \quad \text{as } x \to \infty,$$
*meaning $\lim_{x\to\infty} \pi(x)\ln x / x = 1$.*

This was proved independently by Hadamard and de la Vallée Poussin in 1896, via the complex-analytic theory of the Riemann zeta function $\zeta(s) = \sum n^{-s}$ and the fact that $\zeta(s) \neq 0$ on the line $\operatorname{Re}(s)=1$. The proof requires complex analysis well beyond our scope here; we state the result and use it only for orientation.

**Theorem 1.12 (Bertrand's Postulate).** *For every integer $n>1$, there is a prime $p$ with $n < p < 2n$.*

This has a genuinely elementary (if intricate) proof due to Erdős, using careful estimates on binomial coefficients $\binom{2n}{n}$; we omit the details but note it is a frequently-cited existence tool in olympiad combinatorics–number-theory hybrids.

### 1.7 Challenge Problems

**Challenge Problem 1.1.** *For integer $a>1$ and positive integers $m,n$, prove that*
$$\gcd(a^m-1,\, a^n-1) = a^{\gcd(m,n)}-1.$$

**Solution.** Let $d=\gcd(m,n)$.

*Step 1: $a^d-1$ is a common divisor.* Since $d \mid m$, write $m=dk$. Then $a^m - 1 = (a^d)^k - 1$ is divisible by $a^d-1$, using the factorization $x^k-1=(x-1)(x^{k-1}+\cdots+1)$ with $x=a^d$. Similarly $a^d-1 \mid a^n-1$.

*Step 2: the "Euclidean algorithm" for exponents.* Suppose $m > n$ and write $m = qn+r$ ($0\le r<n$, Division Algorithm). Then
$$a^m - 1 = a^{qn+r}-1 = a^r(a^{qn}-1) + (a^r - 1).$$
Since $a^n - 1 \mid a^{qn}-1$ (by Step 1's argument applied to exponent $qn$, a multiple of $n$), we get
$$a^m - 1 \equiv a^r - 1 \pmod{a^n-1}.$$
Hence $\gcd(a^m-1, a^n-1) = \gcd(a^r-1, a^n-1) = \gcd(a^n-1,a^r-1)$.

*Step 3: induction mirroring Theorem 1.3.* The pair of exponents $(m,n)$ has stepped to $(n,r)$ — **exactly** the update rule of the Euclidean Algorithm applied to $m,n$ themselves. Iterating, the sequence of exponent pairs terminates at $(\gcd(m,n),0)$ after finitely many steps, and correspondingly
$$\gcd(a^m-1,a^n-1) = \cdots = \gcd(a^{\gcd(m,n)}-1, a^0-1) = \gcd(a^{d}-1, 0) = a^d - 1.$$
$\blacksquare$

**Remark.** This is the prototype for a whole family of "exponential GCD" identities (e.g. for Fibonacci numbers, $\gcd(F_m,F_n)=F_{\gcd(m,n)}$, provable by an entirely analogous descent).

**Challenge Problem 1.2 (IMO 1959, Problem 1).** *Prove that the fraction $\dfrac{21n+4}{14n+3}$ is irreducible for every natural number $n$.*

**Solution.** It suffices to show $\gcd(21n+4,\,14n+3)=1$. Consider
$$3(14n+3) - 2(21n+4) = 42n+9-42n-8 = 1.$$
This exhibits $1$ as an integer combination of $21n+4$ and $14n+3$; by Corollary 1.6, $\gcd(21n+4,14n+3)=1$ for every integer $n$. $\blacksquare$

**Trick.** This is the archetypal "GCD by inspection" move: to prove $\gcd(A,B)=1$, it is often faster to *guess* a small integer combination $xA+yB=1$ than to run the full Euclidean algorithm.

---

## Part II — Modular Arithmetic and Classical Theorems

### 2.1 Congruences and Residue Systems

**Definition.** For $m \in \mathbb{Z}^+$, $a \equiv b \pmod m$ means $m \mid (a-b)$.

**Proposition 2.1.** *Congruence modulo $m$ is an equivalence relation on $\mathbb{Z}$, and it is compatible with addition and multiplication:*
$$a\equiv b, \ c\equiv d \pmod m \implies a+c\equiv b+d, \quad ac \equiv bd \pmod m.$$

**Proof.** Reflexivity, symmetry, transitivity are immediate from properties of divisibility. For compatibility: $m \mid (a-b)$ and $m\mid(c-d)$ give $m \mid (a-b)+(c-d) = (a+c)-(b+d)$. For products: $ac-bd = ac-bc+bc-bd = c(a-b)+b(c-d)$, and $m$ divides both terms. $\blacksquare$

**Definition.** A **complete residue system (CRS)** modulo $m$ is a set of $m$ integers, pairwise incongruent mod $m$ (e.g. $\{0,1,\dots,m-1\}$). A **reduced residue system (RRS)** modulo $m$ is a set of $\varphi(m)$ integers, each coprime to $m$, pairwise incongruent mod $m$ (e.g. the integers in $\{1,\dots,m\}$ coprime to $m$).

**Proposition 2.2.** *If $\{r_1,\dots,r_m\}$ is a CRS mod $m$ and $\gcd(a,m)=1$, then $\{ar_1,\dots,ar_m\}$ is also a CRS mod $m$; similarly a RRS maps to a RRS under multiplication by a unit.* This is because $x\mapsto ax \pmod m$ is a bijection on $\mathbb{Z}/m\mathbb{Z}$ precisely when $\gcd(a,m)=1$ (it has inverse $x \mapsto a^{-1}x$).

### 2.2 Linear Congruences

**Theorem 2.3.** *The congruence $ax\equiv b\pmod m$ has a solution if and only if $d=\gcd(a,m)$ divides $b$. When solvable, it has exactly $d$ pairwise incongruent solutions modulo $m$.*

**Proof.** If $ax\equiv b\pmod m$ has a solution, then $m \mid (ax-b)$, i.e. $ax-my = b$ for some $y$ — a linear Diophantine equation, solvable in integers $x,y$ iff $d\mid b$ (Section 4.1; equivalently, since $d\mid a,m$, we need $d \mid b$). Conversely if $d \mid b$, divide through: $\gcd(a/d,\,m/d)=1$, so $a/d$ has an inverse mod $m/d$ (Corollary 1.6), giving a unique solution $x \equiv x_0 \pmod{m/d}$. This single residue class mod $m/d$ splits into exactly $d$ residue classes mod $m$:
$$x \equiv x_0,\ x_0+\tfrac{m}{d},\ x_0+2\tfrac{m}{d},\ \dots,\ x_0+(d-1)\tfrac{m}{d} \pmod m.$$
$\blacksquare$

### 2.3 The Chinese Remainder Theorem

**Theorem 2.4 (CRT).** *Let $m_1,\dots,m_k$ be pairwise coprime positive integers and $M=m_1m_2\cdots m_k$. For any integers $a_1,\dots,a_k$, the system*
$$x\equiv a_i \pmod{m_i}, \quad i=1,\dots,k$$
*has a solution $x$, unique modulo $M$.*

**Proof (constructive).** For each $i$, let $M_i = M/m_i$. Since $m_1,\dots,m_k$ are pairwise coprime, $\gcd(M_i,m_i)=1$, so by the Extended Euclidean Algorithm there is $y_i$ with $M_iy_i \equiv 1\pmod{m_i}$. Define
$$x_0 = \sum_{i=1}^k a_i M_i y_i.$$
*Verification:* fix $j$. For $i\neq j$, $m_j \mid M_i$ (since $M_i$ contains $m_j$ as a factor), so the $i$-th term vanishes mod $m_j$. The $j$-th term gives $a_jM_jy_j \equiv a_j \cdot 1 = a_j \pmod{m_j}$. So $x_0 \equiv a_j\pmod{m_j}$ for every $j$ — existence.

*Uniqueness mod $M$:* if $x,x'$ both solve the system, then $m_i \mid (x-x')$ for every $i$; since the $m_i$ are pairwise coprime, their product $M$ divides $x-x'$ (an easy induction using Euclid's Lemma repeatedly), so $x\equiv x' \pmod M$. $\blacksquare$

**Worked Example 2.1.** Solve $x\equiv2\pmod3,\ x\equiv3\pmod5,\ x\equiv2\pmod7$.

Here $M=105$. $M_1=35\equiv2\pmod3$, and $2^{-1}\equiv2\pmod3$ (since $2\cdot2=4\equiv1$), so $y_1=2$: term $=2\cdot35\cdot2=140$.
$M_2=21\equiv1\pmod5$, $y_2=1$: term $=3\cdot21\cdot1=63$.
$M_3=15\equiv1\pmod7$, $y_3=1$: term $=2\cdot15\cdot1=30$.

Sum $=140+63+30=233\equiv233-210=23\pmod{105}$.

Check: $23=3\cdot7+2\equiv2\pmod3$; $23=4\cdot5+3\equiv3\pmod5$; $23=3\cdot7+2\equiv2\pmod7$. $\checkmark$ So $x\equiv23\pmod{105}$. $\blacksquare$

### 2.4 Fermat's Little Theorem and Euler's Theorem

**Theorem 2.5 (Fermat's Little Theorem).** *If $p$ is prime and $p\nmid a$, then $a^{p-1}\equiv1\pmod p$. Equivalently, $a^p\equiv a\pmod p$ for every integer $a$.*

**Proof.** Consider the $p-1$ numbers $a\cdot1, a\cdot2,\dots,a\cdot(p-1) \pmod p$. Since $\gcd(a,p)=1$, multiplication by $a$ is a bijection on the nonzero residues mod $p$ (Proposition 2.2), so this list is simply a permutation of $1,2,\dots,p-1 \pmod p$. Multiplying all $p-1$ terms in each list:
$$a^{p-1}\cdot(p-1)! \equiv (p-1)! \pmod p.$$
Since $p$ is prime and none of $1,\dots,p-1$ is divisible by $p$, $\gcd((p-1)!,p)=1$; cancel $(p-1)!$ from both sides (multiply by its inverse) to get $a^{p-1}\equiv1\pmod p$. $\blacksquare$

**Theorem 2.6 (Euler's Theorem).** *If $\gcd(a,n)=1$, then $a^{\varphi(n)}\equiv1\pmod n$.*

**Proof.** Identical strategy, using a reduced residue system $\{r_1,\dots,r_{\varphi(n)}\}$ instead of $\{1,\dots,p-1\}$. Since $\gcd(a,n)=1$, multiplication by $a$ permutes this RRS (Proposition 2.2), so
$$a^{\varphi(n)}\prod_{i} r_i \equiv \prod_i r_i \pmod n.$$
Each $r_i$ is coprime to $n$, so $\prod r_i$ is coprime to $n$ and cancellable, yielding $a^{\varphi(n)}\equiv1\pmod n$. $\blacksquare$

**Remark.** Fermat's Little Theorem is the special case $n=p$ (prime), since $\varphi(p)=p-1$.

### 2.5 Wilson's Theorem

**Theorem 2.7 (Wilson's Theorem).** *For prime $p$: $(p-1)!\equiv-1\pmod p$.*

**Proof.** For $p=2$: $1!=1\equiv-1\pmod2$. For $p=3$: $2!=2\equiv-1\pmod3$. Now let $p>3$. Every $a\in\{1,\dots,p-1\}$ has a unique inverse $a^{-1}$ in the same set (since $\gcd(a,p)=1$). We ask: when is $a$ its own inverse, i.e. $a^2\equiv1\pmod p$? This factors as $(a-1)(a+1)\equiv0\pmod p$, so (Euclid's Lemma) $a\equiv1$ or $a\equiv-1\equiv p-1\pmod p$. So among $\{2,3,\dots,p-2\}$, every element is paired with a *distinct* partner whose product is $1\pmod p$ — these $p-3$ elements split into $\frac{p-3}{2}$ pairs, each multiplying to $1$. Hence
$$(p-1)! = 1\cdot(p-1)\cdot\prod_{\text{pairs}} (a\cdot a^{-1}) \equiv 1\cdot(p-1)\cdot1 \equiv -1\pmod p.$$
$\blacksquare$

**Remark (Converse).** If $n>1$ is composite, then $(n-1)!\equiv0\pmod n$ (for $n>4$; check $n=4$ separately: $3!=6\equiv2\pmod4$). Hence Wilson's theorem, together with its converse, gives a (computationally useless, but theoretically clean) primality *characterization*: $n$ is prime iff $(n-1)!\equiv-1\pmod n$.

### 2.6 Modular Exponentiation: Tricks and Traps

**Trick (Fast/Binary Exponentiation).** To compute $a^e \bmod m$, write $e$ in binary and repeatedly square:
$$a^e = \prod_{i:\,\text{bit}_i(e)=1} a^{2^i} \pmod m,$$
computable in $O(\log e)$ modular multiplications, each keeping intermediate values reduced mod $m$.

**Trick (Reducing huge exponents).** If $\gcd(a,m)=1$, Euler's theorem lets us reduce the *exponent* modulo $\varphi(m)$:
$$a^e \equiv a^{e \bmod \varphi(m)} \pmod m.$$

**Trap.** This reduction is **only valid when $\gcd(a,m)=1$.** If $\gcd(a,m)>1$, na\"ively reducing the exponent mod $\varphi(m)$ can give a wrong answer (e.g. $2^{\varphi(4)} = 2^2=4\equiv0\pmod4$, but $2^0=1\not\equiv0$). The correct general statement, useful for towers of exponents, is:

**Lemma 2.8 (Generalized Euler / "lifting the exponent bound").** *For any integers $a,m$ and $e \ge \log_2 m$,*
$$a^e \equiv a^{\varphi(m) + (e \bmod \varphi(m))} \pmod m.$$

This holds regardless of $\gcd(a,m)$, and is typically proved via the Chinese Remainder Theorem by splitting $m$ into prime-power factors and analyzing each factor separately (on each prime power $p^k \mid m$, once the exponent exceeds $k$, all higher powers of $a$ divisible by $p$ collapse predictably). We state it and use it freely.

**Worked Example 2.2 (Tower exponentiation).** Compute $7^{7^{7^{\cdots}}} \pmod{100}$ (a tower of height $\ge 3$).

Here $\varphi(100)=40$. Since the exponent (itself a tower of $7$'s) vastly exceeds $\log_2 100 \approx 6.6$, Lemma 2.8 lets us reduce: we need $7^{7^{\cdots}} \bmod 40$ (one level down). Now $\varphi(40)=16$, and again the remaining tower exceeds $\log_2 40$, so reduce further: need $7^{7^{\cdots}}\bmod16$. Now $\varphi(16)=8$; $7\equiv-1\pmod8$, so $7^{\text{odd}}\equiv-1\equiv7\pmod8$ (the remaining tower height is odd), giving exponent $\equiv7\pmod{16}$ hence effectively $7^7 \bmod 16$: $7^2=49\equiv1\pmod{16}$, so $7^7=7^{6}\cdot7\equiv1\cdot7=7\pmod{16}$. Climbing back up: $7^{7}\bmod40$: since $7^2=49\equiv9,\ 7^4\equiv81\equiv1\pmod{40}$, so $7^7=7^4\cdot7^2\cdot7\equiv1\cdot9\cdot7=63\equiv23\pmod{40}$. Finally $7^{23}\bmod100$: using repeated squaring, $7^2=49,\ 7^4=49^2=2401\equiv1,\ 7^8\equiv1,\ 7^{16}\equiv1\pmod{100}$ (since $7^4\equiv1\pmod{100}$ — check: $2401 = 24\cdot100+1$, yes). So $7^{23}=7^{20}\cdot7^3 \equiv 1\cdot343\equiv43\pmod{100}$. The tower converges to $\equiv43\pmod{100}$. $\blacksquare$

### 2.7 Challenge Problems

**Challenge Problem 2.1 (IMO 2005, Problem 4).** *Determine all positive integers relatively prime to every term of the infinite sequence*
$$a_n = 2^n+3^n+6^n-1, \qquad n\ge1.$$

**Solution.** We claim the answer is **$n=1$ only** (i.e. only $1$ is coprime to every term). We show every prime $p$ divides *some* term $a_n$; this forces any integer $>1$ (having some prime factor $p$) to share a factor with $a_n$ for that $p$, leaving only $1$.

- $p=2$: $a_1 = 2+3+6-1=10$, and $2\mid10$.
- $p=3$: $a_2 = 4+9+36-1=48$, and $3\mid48$.
- $p>3$: Take $n=p-2$. Since $p\nmid2,3,6$, Fermat's Little Theorem gives $x^{p-1}\equiv1\pmod p$ for $x\in\{2,3,6\}$, so $x^{p-2}\equiv x^{-1}\pmod p$. Hence
$$a_{p-2} \equiv 2^{-1}+3^{-1}+6^{-1} - 1 \pmod p.$$
Since $2^{-1}+3^{-1}+6^{-1} = \dfrac{3+2+1}{6} = 1$ as a rational identity that persists mod $p$ (as $p\nmid6$, so $6$ is invertible and the identity $6\cdot(2^{-1}+3^{-1}+6^{-1}) \equiv 3+2+1=6 \pmod p$ forces $2^{-1}+3^{-1}+6^{-1}\equiv1$), we get
$$a_{p-2} \equiv 1 - 1 = 0\pmod p.$$

So every prime divides some $a_n$, and the answer is $\boxed{n=1}$. $\blacksquare$

**Remark.** This is a beautiful demonstration that Fermat's Little Theorem is not just about *computing* powers, but about *inverting* elements when the exponent is exactly $p-2$ — a trick worth memorizing: $x^{p-2}\equiv x^{-1}\pmod p$.

**Challenge Problem 2.2.** *Show that for a prime $p\equiv1\pmod4$, the congruence $x^2\equiv-1\pmod p$ has a solution, namely $x=\left(\dfrac{p-1}{2}\right)!$.*

**Solution.** Split $(p-1)!$ into two halves and pair $k \leftrightarrow p-k$:
$$(p-1)! = \left[\prod_{k=1}^{(p-1)/2} k\right]\cdot\left[\prod_{k=(p+1)/2}^{p-1} k\right] = \left[\left(\tfrac{p-1}{2}\right)!\right]\cdot\prod_{j=1}^{(p-1)/2}(p-j),$$
relabeling the second product via $k = p-j$ for $j=1,\dots,\frac{p-1}{2}$. Since $p-j\equiv-j\pmod p$,
$$\prod_{j=1}^{(p-1)/2}(p-j) \equiv \prod_{j=1}^{(p-1)/2}(-j) = (-1)^{(p-1)/2}\left(\tfrac{p-1}{2}\right)! \pmod p.$$
Therefore
$$(p-1)! \equiv (-1)^{(p-1)/2}\left[\left(\tfrac{p-1}{2}\right)!\right]^2 \pmod p.$$
By Wilson's Theorem, the left side is $\equiv-1\pmod p$. Since $p\equiv1\pmod4$, $\frac{p-1}{2}$ is **even**, so $(-1)^{(p-1)/2}=1$, giving
$$\left[\left(\tfrac{p-1}{2}\right)!\right]^2 \equiv -1\pmod p.$$
So $x=\left(\frac{p-1}{2}\right)!$ satisfies $x^2\equiv-1\pmod p$. $\blacksquare$

**Remark (forward reference).** If instead $p\equiv3\pmod4$, the same computation gives $\left[\left(\tfrac{p-1}{2}\right)!\right]^2\equiv1\pmod p$, and in fact $x^2\equiv-1\pmod p$ has **no** solution at all: if it did, any solution $x$ would satisfy $x^4\equiv1$ but $x^2\equiv-1\not\equiv1$, so $x$ has multiplicative order exactly $4$; but every order divides $p-1$ (Section 5.2), and $4\nmid(p-1)$ when $p\equiv3\pmod4$ — contradiction. This dichotomy ("$-1$ is a QR mod $p$ iff $p\equiv1\pmod4$") will reappear as the *first supplementary law of Quadratic Reciprocity* in Part V, proved there more slickly via Euler's Criterion — and again in Part IV, where it determines exactly which primes are sums of two squares.

---

## Part III — Multiplicative Functions and Möbius Inversion

### 3.1 Multiplicative Functions

**Definition.** An arithmetic function is any $f:\mathbb{Z}^+\to\mathbb{C}$. We say $f$ is:
- **multiplicative** if $f(1)=1$ and $f(mn)=f(m)f(n)$ whenever $\gcd(m,n)=1$;
- **completely multiplicative** if $f(1)=1$ and $f(mn)=f(m)f(n)$ for *all* $m,n$ (no coprimality needed).

**Proposition 3.1.** *A multiplicative function is completely determined by its values on prime powers: if $n=\prod p_i^{a_i}$, then $f(n)=\prod f(p_i^{a_i})$.*

**Proof.** Immediate induction using multiplicativity, since distinct prime powers $p_i^{a_i}$ are pairwise coprime. $\blacksquare$

**Examples.**
- $\operatorname{id}(n)=n$ and $\mathbf{1}(n)=1$ (the constant function) are **completely** multiplicative.
- The Liouville function $\lambda(n)=(-1)^{\Omega(n)}$ is **completely** multiplicative.
- $\varphi,\tau,\sigma,\mu$ (below) are multiplicative but **not** completely multiplicative — e.g. $\mu(p^2)=0\neq\mu(p)^2=1$.

### 3.2 The Classical Functions: $\tau,\sigma,\varphi$

Let $n=p_1^{a_1}p_2^{a_2}\cdots p_k^{a_k}$.

**Theorem 3.2.**
$$\tau(n) = \prod_{i=1}^k (a_i+1), \qquad \sigma(n) = \prod_{i=1}^k \frac{p_i^{a_i+1}-1}{p_i-1}, \qquad \varphi(n) = n\prod_{i=1}^k\left(1-\frac1{p_i}\right).$$

**Proof.** *For $\tau$*: since $\tau$ is multiplicative (divisors of coprime numbers correspond bijectively to pairs of divisors, one of each factor), it suffices to compute $\tau(p^a)$: the divisors of $p^a$ are $1,p,\dots,p^a$, giving $a+1$ of them.

*For $\sigma$*: similarly multiplicative; $\sigma(p^a) = 1+p+\cdots+p^a = \dfrac{p^{a+1}-1}{p-1}$ (geometric series).

*For $\varphi$*: multiplicative (proved via CRT in the exercises, or directly: the map $\mathbb{Z}/mn\mathbb{Z} \to \mathbb{Z}/m\mathbb{Z}\times\mathbb{Z}/n\mathbb{Z}$ for coprime $m,n$ is a ring isomorphism, restricting to a bijection between units, so $\varphi(mn)=\varphi(m)\varphi(n)$). We compute $\varphi(p^a)$: among $1,\dots,p^a$, exactly the multiples of $p$ (there are $p^{a-1}$ of them) fail to be coprime to $p^a$, so $\varphi(p^a) = p^a - p^{a-1} = p^a(1-1/p)$. Multiplying over prime power factors gives the stated product formula. $\blacksquare$

### 3.3 Dirichlet Convolution

**Definition.** For arithmetic functions $f,g$, their **Dirichlet convolution** is
$$(f*g)(n) = \sum_{d\mid n} f(d)\,g(n/d).$$

**Proposition 3.3.** *Dirichlet convolution is commutative and associative, with identity element*
$$\varepsilon(n) = \begin{cases}1 & n=1\\0&n>1\end{cases}, \qquad f*\varepsilon = f \text{ for all } f.$$

**Proof.** Commutativity: reindex $d\mapsto n/d$ in the sum. Associativity: both $(f*g)*h$ and $f*(g*h)$ evaluated at $n$ equal $\sum_{abc=n} f(a)g(b)h(c)$, a symmetric triple sum. The identity property is immediate since the only divisor pair contributing when $g=\varepsilon$ is $(d,n/d)=(n,1)$. $\blacksquare$

**Theorem 3.4.** *If $f,g$ are multiplicative, so is $f*g$.*

**Proof.** Let $h=f*g$ and $\gcd(m,n)=1$. Every divisor $e$ of $mn$ factors *uniquely* as $e=d_1d_2$ with $d_1\mid m$, $d_2\mid n$ (and then $\gcd(d_1,d_2)=1$, $\gcd(m/d_1,n/d_2)=1$ too). Hence
$$h(mn) = \sum_{d_1\mid m}\sum_{d_2\mid n} f(d_1d_2)\,g\!\left(\tfrac{m}{d_1}\cdot\tfrac{n}{d_2}\right) = \sum_{d_1\mid m}\sum_{d_2\mid n} f(d_1)f(d_2)\,g\!\left(\tfrac{m}{d_1}\right)g\!\left(\tfrac{n}{d_2}\right)$$
(using multiplicativity of $f,g$ on the coprime factors) $= \left[\sum_{d_1\mid m} f(d_1)g(m/d_1)\right]\left[\sum_{d_2\mid n}f(d_2)g(n/d_2)\right] = h(m)h(n)$. $\blacksquare$

**Key identities.** Since $\tau(n)=\sum_{d\mid n}1$, $\sigma(n)=\sum_{d\mid n}d$, we have
$$\tau = \mathbf{1}*\mathbf{1}, \qquad \sigma = \operatorname{id}*\mathbf{1}.$$

**Theorem 3.5.** $\varphi * \mathbf{1} = \operatorname{id}$, *i.e.* $\displaystyle\sum_{d\mid n}\varphi(d) = n$.

**Proof.** Consider the $n$ fractions $\frac1n,\frac2n,\dots,\frac{n}{n}$. Reduce each to lowest terms $\frac{k}{d}$, where necessarily $d\mid n$. For a fixed divisor $d\mid n$, the fractions reducing to have denominator *exactly* $d$ correspond to numerators $k\in\{1,\dots,d\}$ with $\gcd(k,d)=1$ — there are $\varphi(d)$ of these. Since every one of the original $n$ fractions falls into exactly one such class,
$$\sum_{d\mid n}\varphi(d) = n. \qquad \blacksquare$$

**Dirichlet inverses.** Every $f$ with $f(1)\neq0$ has a unique Dirichlet inverse $f^{-1}$ satisfying $f*f^{-1}=\varepsilon$, computable recursively:
$$f^{-1}(1) = \frac{1}{f(1)}, \qquad f^{-1}(n) = \frac{-1}{f(1)}\sum_{\substack{d\mid n\\ d>1}} f(d)\,f^{-1}(n/d) \quad (n>1).$$
(Derived directly by demanding $(f*f^{-1})(n) = 0$ for $n>1$ and isolating the $d=1$ term.)

### 3.4 The Möbius Function

**Definition.** $\mu(1)=1$; if $n$ is squarefree with $k$ distinct prime factors, $\mu(n)=(-1)^k$; if $n$ has a repeated prime factor, $\mu(n)=0$.

**Proposition 3.6.** $\mu$ *is multiplicative* (immediate from the definition, since squarefreeness and the prime-factor count both behave multiplicatively over coprime arguments).

**Theorem 3.7 (Fundamental Möbius Identity).**
$$\sum_{d\mid n} \mu(d) = \begin{cases} 1 & n=1 \\ 0 & n>1\end{cases}, \qquad\text{i.e.}\qquad \mu * \mathbf{1} = \varepsilon.$$

**Proof.** The case $n=1$ is trivial. For $n>1$, the function $g(n) := \sum_{d\mid n}\mu(d) = (\mu*\mathbf 1)(n)$ is multiplicative by Theorem 3.4, so by Proposition 3.1 it suffices to check $g(p^a)=0$ for every prime power $p^a$, $a\ge1$:
$$g(p^a) = \mu(1)+\mu(p)+\mu(p^2)+\cdots+\mu(p^a) = 1 + (-1) + 0+\cdots+0 = 0.$$
Since $n>1$ has at least one prime-power factor $p^a$ in its factorization, and $g$ is multiplicative with $g(p^a)=0$ there, $g(n)=0$. $\blacksquare$

**Corollary.** $\mu$ *is the Dirichlet inverse of $\mathbf 1$.*

### 3.5 Möbius Inversion

**Theorem 3.8 (Möbius Inversion Formula).** *If $g(n) = \sum_{d\mid n} f(d)$ for all $n$ (i.e. $g=f*\mathbf1$), then*
$$f(n) = \sum_{d\mid n} \mu(d)\,g(n/d) \qquad \text{for all } n.$$

**Proof.** Convolve both sides of $g=f*\mathbf1$ with $\mu$ on the right:
$$g*\mu = (f*\mathbf1)*\mu = f*(\mathbf1*\mu) = f*\varepsilon = f,$$
using associativity/commutativity of Dirichlet convolution (Proposition 3.3) and $\mathbf1*\mu=\varepsilon$ (Theorem 3.7). $\blacksquare$

**Worked Example 3.1.** Since $\operatorname{id}=\varphi*\mathbf1$ (Theorem 3.5), Möbius inversion gives
$$\varphi(n) = \sum_{d\mid n}\mu(d)\cdot\frac{n}{d},$$
recovering Theorem 3.2's product formula upon expansion — a second, purely combinatorial derivation of $\varphi$.

**Trick (a clean corollary).** For all $N\ge1$,
$$\sum_{d=1}^{N}\mu(d)\left\lfloor\frac{N}{d}\right\rfloor = 1.$$
Indeed, $\sum_{d=1}^N \mu(d)\lfloor N/d\rfloor = \sum_{d=1}^N \mu(d)\sum_{\substack{m\le N\\ d\mid m}} 1 = \sum_{m=1}^N \sum_{d\mid m}\mu(d) = \sum_{m=1}^N \varepsilon(m) = \varepsilon(1)=1$, using Theorem 3.7. This identity underlies fast ($O(N^{2/3})$ or better) computations of Mertens-function-type sums in competitive programming.

### 3.6 Challenge Problems

**Challenge Problem 3.1.** *Evaluate in closed form:*
$$S(n) = \sum_{i=1}^n\sum_{j=1}^n \gcd(i,j).$$

**Solution.** The key is the identity $\operatorname{id}=\varphi*\mathbf1$ from Theorem 3.5, applied **to $\gcd(i,j)$ itself**: for any positive integer $m=\gcd(i,j)$,
$$m = \sum_{d\mid m} \varphi(d).$$
Hence
$$S(n) = \sum_{i=1}^n\sum_{j=1}^n\ \sum_{d\mid\gcd(i,j)} \varphi(d) = \sum_{d=1}^n \varphi(d)\cdot\#\{(i,j): 1\le i,j\le n,\ d\mid i,\ d\mid j\},$$
having swapped the order of summation (for each $d$, we count all pairs $(i,j)$ for which $d$ divides *both*, since such pairs are exactly those contributing a $\varphi(d)$ term). The count of multiples of $d$ in $\{1,\dots,n\}$ is $\lfloor n/d\rfloor$, so the count of valid pairs is $\lfloor n/d\rfloor^2$. Therefore:
$$\boxed{S(n) = \sum_{d=1}^n \varphi(d)\left\lfloor\frac{n}{d}\right\rfloor^2.}$$

**Verification for $n=2$:** direct computation gives $\gcd(1,1)+\gcd(1,2)+\gcd(2,1)+\gcd(2,2)=1+1+1+2=5$. The formula: $\varphi(1)\lfloor2/1\rfloor^2+\varphi(2)\lfloor2/2\rfloor^2 = 1\cdot4+1\cdot1=5$. $\checkmark$ $\blacksquare$

**Remark.** This closed form is the standard tool for computing such sums for large $n$ in $O(\sqrt n)$ time in competitive programming, by grouping equal values of $\lfloor n/d\rfloor$ into $O(\sqrt n)$ blocks (the "divisor block" or "$\lfloor n/d\rfloor$ has only $O(\sqrt n)$ distinct values" trick) combined with a precomputed prefix sum of $\varphi$.

**Challenge Problem 3.2.** *Prove that for every $n\ge1$,*
$$\frac{n}{\varphi(n)} = \sum_{d\mid n} \frac{\mu(d)^2}{\varphi(d)}.$$

**Solution.** Both sides are multiplicative functions of $n$ (the left side because $n/\varphi(n)=\prod_{p\mid n} p/(p-1)$ depends only on the *set* of distinct primes dividing $n$, which is a multiplicative-type quantity across coprime factors; the right side is a sum over squarefree divisors — nonzero only when $d$ is squarefree, since $\mu(d)^2=0$ otherwise — and is a Dirichlet convolution $\mu^2 * (\mathbf1/\varphi)$... more directly, it is multiplicative as a divisor-sum of the multiplicative function $d \mapsto \mu(d)^2/\varphi(d)$, by the same style of argument as Theorem 3.4 applied to functions valued in $\mathbb{Q}$). By Proposition 3.1 it suffices to check equality on prime powers $p^a$, $a\ge1$.

*Left side at $p^a$*: $\dfrac{p^a}{\varphi(p^a)} = \dfrac{p^a}{p^a-p^{a-1}} = \dfrac{p}{p-1}$.

*Right side at $p^a$*: the squarefree divisors of $p^a$ are only $1$ and $p$ (any $p^2\mid d$ makes $\mu(d)=0$), so
$$\sum_{d\mid p^a}\frac{\mu(d)^2}{\varphi(d)} = \frac{\mu(1)^2}{\varphi(1)} + \frac{\mu(p)^2}{\varphi(p)} = 1 + \frac{1}{p-1} = \frac{p}{p-1}.$$

The two sides agree on every prime power, hence (both being multiplicative) they agree for all $n$. $\blacksquare$

---

## Part IV — Diophantine Equations

### 4.1 Linear Diophantine Equations

**Theorem 4.1.** *The equation $ax+by=c$ (in integers $x,y$, with $a,b$ not both zero) has a solution if and only if $\gcd(a,b)\mid c$. When solvable, writing $d=\gcd(a,b)$ and $(x_0,y_0)$ for any one solution, the complete solution set is*
$$x = x_0 + \frac{b}{d}t, \qquad y = y_0 - \frac{a}{d}t, \qquad t\in\mathbb{Z}.$$

**Proof.** *Necessity*: $d\mid a,b \Rightarrow d \mid (ax+by)=c$. *Sufficiency*: Bézout (Theorem 1.5) gives $x_1,y_1$ with $ax_1+by_1=d$; if $d\mid c$, write $c=d k$ and scale: $x_0=kx_1,y_0=ky_1$ solves $ax+by=c$.

*General solution*: if $(x,y)$ is any other solution, subtracting gives $a(x-x_0)=-b(y-y_0)$, so $\frac{a}{d}(x-x_0) = -\frac{b}{d}(y-y_0)$. Since $\gcd(a/d,b/d)=1$, Euclid's Lemma gives $\frac{b}{d} \mid (x-x_0)$, say $x-x_0 = \frac{b}{d}t$; substituting back gives $y-y_0=-\frac{a}{d}t$. Conversely every such pair is easily checked to solve the equation. $\blacksquare$

### 4.2 Pythagorean Triples

**Definition.** A triple of positive integers $(x,y,z)$ with $x^2+y^2=z^2$ is a **Pythagorean triple**; it is **primitive** if $\gcd(x,y,z)=1$ (equivalently, $x,y,z$ are pairwise coprime).

**Theorem 4.2.** *Every primitive Pythagorean triple with $y$ even is given by*
$$x = m^2-n^2, \qquad y=2mn, \qquad z=m^2+n^2$$
*for coprime integers $m>n>0$ of opposite parity, and every such choice of $m,n$ yields a primitive triple.*

**Proof.** *(Necessity.)* First, $x,y$ cannot both be even (else $\gcd(x,y,z)\ge2$). They cannot both be odd either: odd squares are $\equiv1\pmod4$, so $x^2+y^2\equiv2\pmod4$ would force $z^2\equiv2\pmod4$, impossible since squares are $\equiv0,1\pmod4$. So exactly one of $x,y$ is even; by hypothesis it's $y$, and $x,z$ are both odd (since $z^2=x^2+y^2$ with $x$ odd, $y$ even forces $z$ odd).

Since $z,x$ are odd, $z-x$ and $z+x$ are both even; write $z-x=2a$, $z+x=2b$. From $y^2=z^2-x^2=(z-x)(z+x)=4ab$, we get $(y/2)^2=ab$. Any common divisor of $a,b$ divides both $a+b=z$ and $b-a=x$, hence divides $\gcd(x,z)=1$ (primitivity), so $\gcd(a,b)=1$. Since $ab$ is a perfect square and $a,b$ are coprime, unique factorization forces **each of $a,b$ to be a perfect square** individually: $a=n^2$, $b=m^2$ for positive integers $m>n$ (as $b>a$ since $x=b-a>0$). Then:
$$z=a+b=m^2+n^2, \qquad x=b-a=m^2-n^2, \qquad y=2\sqrt{ab}=2mn.$$
Since $\gcd(a,b)=1 \Rightarrow \gcd(m,n)=1$. And since $x=m^2-n^2$ is odd, $m,n$ must have opposite parity (same parity would make $m^2-n^2$ even).

*(Sufficiency.)* Direct substitution: $(m^2-n^2)^2+(2mn)^2 = m^4-2m^2n^2+n^4+4m^2n^2 = (m^2+n^2)^2$. Primitivity: any common prime $p$ of $x,y,z$ would (since $z\pm x \in \{2m^2,2n^2\}$ and $z,x$ odd, $p$ odd) divide both $m^2$ and $n^2$, contradicting $\gcd(m,n)=1$. $\blacksquare$

**Worked Example 4.1.** $(m,n)=(2,1)$: $(x,y,z)=(3,4,5)$. $(m,n)=(3,2)$: $(x,y,z)=(5,12,13)$. $(m,n)=(4,1)$: $(15,8,17)$.

### 4.3 Pell's Equation

**Definition.** For a non-square positive integer $d$, **Pell's equation** is $x^2-dy^2=1$, sought in positive integers $x,y$.

**Motivation (continued fractions).** The continued fraction expansion of $\sqrt d$ is eventually periodic, say $\sqrt d = [a_0;\overline{a_1,a_2,\dots,a_\ell}]$. Its convergents $p_k/q_k$ satisfy $p_k^2-dq_k^2 = (-1)^{k+1}\cdot(\text{something bounded})$, and in fact one always finds among the convergents a **fundamental solution** $(x_1,y_1)$ — the smallest positive solution. We state this existence result (a consequence of Dirichlet's Approximation Theorem and the periodicity of the continued fraction of a quadratic irrational) and use it freely, rather than re-deriving the theory of continued fractions here.

**Theorem 4.3.** *Let $(x_1,y_1)$ be the fundamental solution of $x^2-dy^2=1$. Then every positive-integer solution $(x_k,y_k)$ is given by*
$$x_k + y_k\sqrt d = (x_1+y_1\sqrt d)^k, \qquad k=1,2,3,\dots$$

**Proof idea.** Solutions to $x^2-dy^2=1$ correspond exactly to elements $\alpha=x+y\sqrt d$ of the ring $\mathbb{Z}[\sqrt d]$ of **norm** $N(\alpha) := \alpha\bar\alpha = x^2-dy^2$ equal to $1$, i.e. to **units** of norm $1$. The norm is multiplicative, $N(\alpha\beta)=N(\alpha)N(\beta)$, so products and powers of norm-$1$ elements again have norm $1$ — this shows every power $(x_1+y_1\sqrt d)^k$ gives a solution. That these exhaust *all* positive solutions (i.e. that $x_1+y_1\sqrt d$ **generates** the full group of norm-$1$ units greater than $1$) is a consequence of the general structure theorem for units in real quadratic orders (a special case of **Dirichlet's Unit Theorem**); we cite this rather than re-derive it. $\blacksquare$

**Worked Example 4.2 ($d=2$).** The fundamental solution of $x^2-2y^2=1$ is $(x_1,y_1)=(3,2)$ (check: $9-8=1$). Since $(3+2\sqrt2)^2 = 17+12\sqrt2$, the next solution is $(17,12)$: $17^2-2\cdot12^2=289-288=1$. $\checkmark$ Equivalently, one has the linear recurrence
$$x_{k+1}=3x_k+4y_k, \qquad y_{k+1}=2x_k+3y_k.$$

### 4.4 The Method of Infinite Descent

**Example 4.1 (warm-up descent).** *The equation $x^2+y^2=3z^2$ has no solution in positive integers.*

**Proof.** Squares mod $3$ are $0$ or $1$. If $x^2+y^2\equiv0\pmod3$, checking all combinations from $\{0,1\}$ shows this forces $x^2\equiv y^2\equiv0\pmod3$, i.e. $3\mid x$ and $3\mid y$. Write $x=3x_1,y=3y_1$: then $9x_1^2+9y_1^2=3z^2 \Rightarrow 3(x_1^2+y_1^2)=z^2 \Rightarrow 3\mid z^2 \Rightarrow 3\mid z$, say $z=3z_1$. Substituting: $3(x_1^2+y_1^2)=9z_1^2 \Rightarrow x_1^2+y_1^2=3z_1^2$ — the **same equation**, with strictly smaller positive integers (assuming $(x,y,z)$ was a minimal positive solution, e.g. minimizing $z$). This contradicts minimality unless no positive solution exists at all. $\blacksquare$

**Theorem 4.4 (Fermat).** *The equation $x^4+y^4=z^2$ has no solution in positive integers.*

**Proof.** Suppose a solution exists; choose one with **$z$ minimal**. First, $\gcd(x,y)=1$: if a prime $p$ divided both, then $p^4 \mid z^2$, so $p^2\mid z$, and $(x/p)^4+(y/p)^4=(z/p^2)^2$ would be a smaller solution, contradicting minimality of $z$.

So $(x^2,y^2,z)$ is a **primitive** Pythagorean triple: $(x^2)^2+(y^2)^2=z^2$, and $\gcd(x^2,y^2)=1$. WLOG (by symmetry of the equation in $x,y$) $y^2$ is even. By Theorem 4.2,
$$x^2 = m^2-n^2, \qquad y^2=2mn, \qquad z=m^2+n^2,$$
for coprime $m>n>0$ of opposite parity.

From $x^2=m^2-n^2$, i.e. $x^2+n^2=m^2$: this is **another** primitive Pythagorean triple (as $\gcd(m,n)=1$). Since $x$ is odd (it is the "odd leg" of the first triple, as established in Theorem 4.2's proof) and exactly one of $x,n$ must be even, $n$ is even. Apply Theorem 4.2 again:
$$x = p^2-q^2, \qquad n=2pq, \qquad m=p^2+q^2,$$
for coprime $p>q>0$ of opposite parity.

Now recall $y^2=2mn = 2m(2pq) = 4mpq$, so $(y/2)^2 = mpq$. We check $m,p,q$ are **pairwise coprime**: $\gcd(p,q)=1$ by construction; and since $m=p^2+q^2$, any common prime factor of $m$ and $p$ would (as $p^2\equiv-q^2$) divide $q^2$ too, contradicting $\gcd(p,q)=1$ — similarly for $m,q$. Since $mpq$ is a perfect square and $m,p,q$ are pairwise coprime, unique factorization forces **each to be a perfect square individually**:
$$m=r^2, \qquad p=s^2, \qquad q=t^2$$
for positive integers $r,s,t$. Substituting into $m=p^2+q^2$:
$$r^2 = s^4+t^4.$$

This is a **new solution** of the original equation $X^4+Y^4=Z^2$, with $Z=r$. We now check $r<z$, completing the descent: since $n\ge1$, $z=m^2+n^2 > m^2 \ge m$ (as $m\ge1$), and since $r^2=m$, if $r\ge1$ then $r\le r^2=m<z$. So $r<z$ — a strictly smaller solution, contradicting the minimality of $z$. $\blacksquare$

**Corollary 4.5 (Fermat's Last Theorem, exponent 4).** *$x^4+y^4=z^4$ has no solution in positive integers* (since such a solution would give $x^4+y^4=(z^2)^2$, contradicting Theorem 4.4).

### 4.5 Interlude: Gaussian Integers and Sums of Two Squares

The ring of **Gaussian integers** $\mathbb{Z}[i] = \{a+bi : a,b\in\mathbb{Z}\}$ carries a multiplicative norm $N(a+bi)=a^2+b^2$. One shows (via an explicit division algorithm using nearest-lattice-point rounding) that $\mathbb{Z}[i]$ is a **Euclidean domain**, hence a UFD — we state this structural fact and name the method (norm-Euclidean division) rather than re-derive it.

**Theorem 4.6 (Fermat, sum of two squares).** *An odd prime $p$ can be written as $p=a^2+b^2$ (for integers $a,b$) if and only if $p\equiv1\pmod4$.*

**Proof sketch.** *($p\equiv3\pmod4$ is impossible.)* Squares mod $4$ are $0,1$, so $a^2+b^2\pmod4 \in\{0,1,2\}$, never $3$.

*($p\equiv1\pmod4 \Rightarrow$ possible.)* By Challenge Problem 2.2, there exists $x$ with $x^2\equiv-1\pmod p$, i.e. $p \mid x^2+1 = (x+i)(x-i)$ in $\mathbb{Z}[i]$. If $p$ were **prime** in $\mathbb{Z}[i]$, it would (by the UFD property) divide $x+i$ or $x-i$ — but then $p$ would divide both the real and imaginary parts of $x\pm i$, in particular $p\mid1$, absurd. So $p$ is **not** prime in $\mathbb{Z}[i]$: it factors as $p=\pi\bar\pi$ for some non-unit $\pi=a+bi$ (a genuine factorization, since $\mathbb{Z}[i]$ is a UFD and $p$ is reducible). Taking norms: $p^2 = N(p) = N(\pi)N(\bar\pi) = N(\pi)^2$, so $N(\pi)=p$, i.e.
$$p = a^2+b^2. \qquad \blacksquare$$

**Remark.** This is a striking instance of the treatise's recurring theme: the modular-arithmetic fact "$-1$ is a QR mod $p$" (Part II) becomes, via the arithmetic of $\mathbb{Z}[i]$, a statement about *which primes split* in a larger ring — a first glimpse of algebraic number theory, to which we return in the Closing Remark.

### 4.6 Challenge Problem

**Challenge Problem 4.1.** *Find all integer solutions of $y^2+2=x^3$.*

**Solution.** We work in $\mathbb{Z}[\sqrt{-2}] = \{a+b\sqrt{-2} : a,b\in\mathbb{Z}\}$, with norm $N(a+b\sqrt{-2})=a^2+2b^2$. As with $\mathbb{Z}[i]$, one shows via an explicit division algorithm that $\mathbb{Z}[\sqrt{-2}]$ is a **Euclidean domain** (hence a UFD) with respect to this norm; we state and use this fact, naming the method (norm-Euclidean division), without re-deriving it. The only units are $\pm1$ (the only elements of norm $1$).

*Step 1: parity of $y$.* If $y$ were even, $y^2+2\equiv2\pmod4$, but $x^3\pmod4$ is always $0,1,$ or $3$ (never $2$, checking $x$ even or odd) — contradiction. So $y$ is odd, and hence $x^3=y^2+2$ is odd, so $x$ is odd too.

*Step 2: factor.* $y^2+2 = (y+\sqrt{-2})(y-\sqrt{-2}) = x^3$.

*Step 3: the two factors are coprime.* Suppose a non-unit $\pi$ divides both $y+\sqrt{-2}$ and $y-\sqrt{-2}$. Then $\pi$ divides their difference $2\sqrt{-2} = -(\sqrt{-2})^3$ (since $(\sqrt{-2})^2=-2$, so $(\sqrt{-2})^3 = -2\sqrt{-2}$). The prime $2$ **ramifies** in this ring: $2 = -(\sqrt{-2})^2$, so the only prime (up to units) dividing $2\sqrt{-2}$ is $\sqrt{-2}$ itself. Hence $\pi$ is an associate of $\sqrt{-2}$, meaning $\sqrt{-2} \mid y+\sqrt{-2}$, which forces $\sqrt{-2}\mid y$ — impossible in $\mathbb{Z}$ unless $2\mid y$, contradicting Step 1 ($y$ odd). So the two factors are coprime.

*Step 4: extract a cube.* In a UFD, if a product of two coprime elements is a perfect cube, each factor is (up to a unit) itself a cube. Since the only units are $\pm1=(\pm1)^3$, we may absorb any sign and write
$$y+\sqrt{-2} = (a+b\sqrt{-2})^3$$
for some integers $a,b$. Expanding, using $(\sqrt{-2})^2=-2,\ (\sqrt{-2})^3=-2\sqrt{-2}$:
$$(a+b\sqrt{-2})^3 = a^3+3a^2b\sqrt{-2}+3ab^2(-2)+b^3(-2\sqrt{-2}) = (a^3-6ab^2) + (3a^2b-2b^3)\sqrt{-2}.$$
Matching real and $\sqrt{-2}$-coefficients:
$$y = a(a^2-6b^2), \qquad 1 = b(3a^2-2b^2).$$

*Step 5: solve the Diophantine constraint.* Since $b(3a^2-2b^2)=1$ with $a,b\in\mathbb{Z}$, we need $b=\pm1$.
- If $b=1$: $3a^2-2=1 \Rightarrow a^2=1 \Rightarrow a=\pm1$.
- If $b=-1$: $-(3a^2-2)=1 \Rightarrow 3a^2=1$, no integer solution.

So $b=1$, $a=\pm1$. Then $y=a(a^2-6)=a(1-6)=-5a = \mp5$, i.e. $y=\pm5$, and
$$x^3 = y^2+2 = 25+2=27 \implies x=3.$$

**Conclusion:** the only integer solutions are $(x,y)=(3,\pm5)$. $\blacksquare$

**Remark.** This is the classical showcase (due originally to Euler, made rigorous once unique factorization in $\mathbb{Z}[\sqrt{-2}]$ is established) of solving a Mordell-type equation $y^2+k=x^3$ by factoring over a quadratic ring of algebraic integers — the direct generalization of the Gaussian-integer technique of Section 4.5, and the natural cousin of Fermat's infinite-descent method in Theorem 4.4: both replace an intractable equation over $\mathbb{Z}$ with a tractable factorization in a larger UFD.

---

## Part V — Advanced Tools: LTE, Primitive Roots, and Quadratic Residues

### 5.1 The Lifting the Exponent Lemma

**Theorem 5.1 (LTE, odd prime case).** *Let $p$ be an odd prime and let $x,y$ be integers with $p\nmid x$, $p\nmid y$, and $p\mid(x-y)$. Then for every positive integer $n$,*
$$v_p(x^n-y^n) = v_p(x-y) + v_p(n).$$

**Proof.** *Step 1 (the case $n=p$).* Write $a=v_p(x-y)\ge1$, so $x=y+p^am$ with $p\nmid m$. Factor
$$x^p-y^p = (x-y)\underbrace{(x^{p-1}+x^{p-2}y+\cdots+y^{p-1})}_{S}.$$
We must show $v_p(S)=1$ exactly. Modulo $p^{a+1}$, using $x\equiv y+p^am$:
$$x^iy^{p-1-i} \equiv y^{p-1} + i\,y^{p-2}\,p^am \pmod{p^{a+1}}$$
(expanding $x^i = (y+p^am)^i \equiv y^i + iy^{i-1}p^am \pmod {p^{2a}}$, and since $a\ge1$, certainly mod $p^{a+1}$ too). Summing over $i=0,\dots,p-1$:
$$S \equiv p\,y^{p-1} + p^am\,y^{p-2}\cdot\frac{p(p-1)}{2} \pmod{p^{a+1}}.$$
Since $p$ is odd, $\frac{p(p-1)}{2} = p\cdot\frac{p-1}{2}$ is itself a multiple of $p$, so the second term is a multiple of $p^{a+1}$ and vanishes mod $p^{a+1}$. Hence $S\equiv p\,y^{p-1}\pmod{p^{a+1}}$; since $p\nmid y$, $v_p(py^{p-1})=1$, and as $a+1\ge2>1$, this pins down $v_p(S)=1$ exactly. Therefore $v_p(x^p-y^p) = a+1 = v_p(x-y)+1$, confirming the theorem for $n=p$.

*Step 2 ($p\nmid n$).* If $p\nmid n$, factor $x^n-y^n=(x-y)(x^{n-1}+\cdots+y^{n-1})$; the second factor is $\equiv n\,y^{n-1}\pmod p$ (since $x\equiv y$), and $p\nmid ny^{n-1}$, so this factor contributes $v_p=0$. Hence $v_p(x^n-y^n)=v_p(x-y)$ whenever $p\nmid n$.

*Step 3 (general $n$).* Write $n=p^bn'$ with $p\nmid n'$. By Step 2, $v_p(x^{n'}-y^{n'})=v_p(x-y)$, and $x^{n'}\equiv y^{n'}\pmod p$ still holds (in fact mod $p^a$). Applying Step 1 exactly $b$ times to the pair $(x^{n'},y^{n'})$, each application raising the valuation by exactly $1$:
$$v_p(x^{p^bn'}-y^{p^bn'}) = v_p(x^{n'}-y^{n'}) + b = v_p(x-y) + v_p(n). \qquad \blacksquare$$

**Corollary 5.2 (odd-power sum case).** *If additionally $p\mid(x+y)$ (with $p\nmid x,y$), then for every* **odd** *positive integer $n$,*
$$v_p(x^n+y^n) = v_p(x+y)+v_p(n).$$

*(Apply Theorem 5.1 to $x$ and $-y$: $p\mid x-(-y)=x+y$, and $(-y)^n=-y^n$ for odd $n$, so $x^n-(-y)^n=x^n+y^n$.)*

**Theorem 5.3 (LTE, $p=2$ case — statement).** *Let $x,y$ be odd integers.*
- *If $n$ is odd:* $v_2(x^n-y^n)=v_2(x-y)$.
- *If $n$ is even:* $v_2(x^n-y^n) = v_2(x-y)+v_2(x+y)+v_2(n)-1$.

The proof follows the same binomial-expansion strategy as Theorem 5.1 but requires extra casework specific to the prime $2$ (since, e.g., $x-y$ and $x+y$ are *both* even when $x,y$ are odd, unlike the odd-prime case where only one factor need be divisible by $p$). We state the result and use it freely.

**Worked Example 5.1.** Find $v_3(2^{100}+1)$. Since $2\equiv-1\pmod3$, we have $3\mid(2+1)$; and $100$ is even so we cannot directly apply the odd-sum corollary (which needs $n$ odd). Instead write $2^{100}+1$... actually since $100$ is even, use $x^n-y^n$ form: note $2^{100}-1^{100}$ doesn't involve $+1$. Let's instead compute $v_3(2^{100}-1)$: since $3\mid(2-1)=1$? No — $3\nmid1$. Reconsider: apply LTE with $x=4,y=1$ (since $2^{100}=4^{50}$): $3\mid(4-1)=3$. So $v_3(4^{50}-1^{50}) = v_3(3)+v_3(50) = 1+0=1$. But we want $2^{100}+1$, not $2^{100}-1$. Since $2^2\equiv1\pmod3$ (order $2$), and $100$ is even, $2^{100}\equiv1\pmod3$, so $2^{100}+1\equiv2\pmod3$, i.e. $3\nmid(2^{100}+1)$ at all — $v_3(2^{100}+1)=0$. This example is a useful caution: **always check the hypotheses of LTE ($p\mid x\pm y$) before applying it** — here they simply fail, and direct modular reasoning settles the question immediately.

### 5.2 Orders, Primitive Roots, and Indices

**Definition.** For $\gcd(a,n)=1$, the **order** of $a$ modulo $n$, written $\operatorname{ord}_n(a)$, is the smallest positive integer $k$ with $a^k\equiv1\pmod n$.

**Proposition 5.4.** $\operatorname{ord}_n(a) \mid \varphi(n)$, *and more generally $\operatorname{ord}_n(a) \mid e$ for any $e$ with $a^e\equiv1\pmod n$.*

**Proof.** Let $d=\operatorname{ord}_n(a)$ and suppose $a^e\equiv1$. By the Division Algorithm, $e=dq+r$, $0\le r<d$. Then $1\equiv a^e = (a^d)^qa^r\equiv a^r\pmod n$. If $r>0$, this contradicts minimality of $d$; so $r=0$, i.e. $d\mid e$. Taking $e=\varphi(n)$ (valid by Euler's Theorem) gives $d\mid\varphi(n)$. $\blacksquare$

**Definition.** $g$ is a **primitive root** modulo $n$ if $\operatorname{ord}_n(g)=\varphi(n)$, i.e. the powers of $g$ generate every residue coprime to $n$.

**Theorem 5.5 (Existence of primitive roots mod a prime).** *For every prime $p$, a primitive root modulo $p$ exists.*

**Proof.** For each divisor $d\mid(p-1)$, let $\psi(d)$ be the number of elements of $\{1,\dots,p-1\}$ with order exactly $d$. We show $\psi(d)\in\{0,\varphi(d)\}$ for each $d$, and $\sum_{d\mid p-1}\psi(d)=p-1$; since also $\sum_{d\mid p-1}\varphi(d)=p-1$ (Theorem 3.5), equality $\psi(d)=\varphi(d)$ for **every** $d$ is forced — in particular $\psi(p-1)=\varphi(p-1)\ge1$, so a primitive root exists.

*Why $\psi(d)\in\{0,\varphi(d)\}$:* Suppose $\psi(d)>0$, i.e. some $a$ has order exactly $d$. Then $a,a^2,\dots,a^d$ are $d$ distinct solutions (mod $p$) of $x^d\equiv1\pmod p$ — and a polynomial of degree $d$ has **at most $d$ roots** over the field $\mathbb{Z}/p\mathbb{Z}$ (a standard fact: if $x^d-1$ had more than $d$ roots, polynomial division by $(x-r)$ for each root would eventually force the zero polynomial to have positive degree, a contradiction — valid since $\mathbb{Z}/p\mathbb{Z}$ is an integral domain, having no zero divisors, so $(x-r)$ divides out cleanly at each root). So $\{a,a^2,\dots,a^d\}$ is the *complete* solution set of $x^d\equiv1$, and every element of order $d$ must be among these powers $a^k$; a direct check shows $a^k$ has order exactly $d$ iff $\gcd(k,d)=1$, of which there are $\varphi(d)$ values. So $\psi(d)=\varphi(d)$ whenever it is positive, confirming $\psi(d)\in\{0,\varphi(d)\}$.

Finally $\sum_{d\mid p-1}\psi(d)=p-1$ since every one of $1,\dots,p-1$ has *some* order dividing $p-1$ (Proposition 5.4). $\blacksquare$

**Theorem 5.6 (Existence, general case — statement).** *A primitive root modulo $n$ exists if and only if*
$$n \in \{1,2,4,\ p^k,\ 2p^k\} \quad \text{for an odd prime } p \text{ and } k\ge1.$$

The forward extension (from prime $p$ to prime power $p^k$) is proved by an explicit *lifting* argument: if $g$ is a primitive root mod $p$, then either $g$ or $g+p$ is a primitive root mod $p^2$, and once one has a primitive root mod $p^2$ it automatically remains one mod $p^k$ for all $k$ (a computation using the Binomial Theorem, in the same spirit as the LTE proof above). The obstruction for $2^k$, $k\ge3$: the group $(\mathbb{Z}/2^k\mathbb{Z})^\times$ is **not cyclic** for $k\ge3$ but splits as $\mathbb{Z}/2\times\mathbb{Z}/2^{k-2}$ (a classical structure theorem of Gauss). We state these without full proof.

**Indices (discrete logarithm).** If $g$ is a primitive root mod $n$, every $a$ coprime to $n$ is $a\equiv g^{\operatorname{ind}(a)}\pmod n$ for a unique $\operatorname{ind}(a)\in\{0,\dots,\varphi(n)-1\}$, and $\operatorname{ind}(ab)\equiv\operatorname{ind}(a)+\operatorname{ind}(b)\pmod{\varphi(n)}$ — indices behave exactly like logarithms, converting multiplicative congruence problems into additive (linear congruence) ones.

### 5.3 Quadratic Residues and Euler's Criterion

**Definition.** For odd prime $p$ and $p\nmid a$, $a$ is a **quadratic residue (QR)** mod $p$ if $x^2\equiv a\pmod p$ has a solution, and a **non-residue (NQR)** otherwise. The **Legendre symbol** is
$$\left(\frac ap\right) = \begin{cases}1 & a \text{ is a QR mod } p\\ -1 & a \text{ is a NQR mod } p\\ 0 & p\mid a.\end{cases}$$

**Theorem 5.7 (Euler's Criterion).** *For $p\nmid a$,*
$$a^{(p-1)/2} \equiv \left(\frac ap\right) \pmod p.$$

**Proof.** Let $g$ be a primitive root mod $p$ (Theorem 5.5), and write $a\equiv g^k\pmod p$. The quadratic residues are exactly the **even** powers of $g$ (since $g^{2j}=(g^j)^2$ is manifestly a square, and these $\frac{p-1}{2}$ distinct even powers must be *all* the QRs, as $x\mapsto x^2$ is exactly $2$-to-$1$ on the $p-1$ nonzero residues). So $a$ is a QR iff $k$ is even.

Now, $a^{(p-1)/2} = g^{k(p-1)/2}$. If $k$ is even, $k(p-1)/2$ is a multiple of $p-1$, so $g^{k(p-1)/2}\equiv1\pmod p$. If $k$ is odd, note $g^{(p-1)/2}$ has order exactly $2$ (its square is $g^{p-1}\equiv1$, and it is not itself $\equiv1$ since $g$ has order $p-1$, not a divisor $\le(p-1)/2$), so $g^{(p-1)/2}\equiv-1\pmod p$ (the only order-$2$ element in $(\mathbb{Z}/p\mathbb{Z})^\times$). Then $a^{(p-1)/2}=(g^{(p-1)/2})^k \equiv(-1)^k=-1\pmod p$ since $k$ is odd. Both cases match $\left(\frac ap\right)$. $\blacksquare$

**Corollary 5.8 (Multiplicativity).** $\left(\dfrac{ab}p\right) = \left(\dfrac ap\right)\left(\dfrac bp\right)$, *immediate from Euler's Criterion since $(ab)^{(p-1)/2}=a^{(p-1)/2}b^{(p-1)/2}$.*

**Corollary 5.9 (First Supplementary Law).** $\left(\dfrac{-1}p\right) = (-1)^{(p-1)/2}$, *i.e. $-1$ is a QR mod $p$ iff $p\equiv1\pmod4$* — recovering Challenge Problem 2.2 by a one-line argument.

### 5.4 The Law of Quadratic Reciprocity

**Theorem 5.10 (Quadratic Reciprocity).** *For distinct odd primes $p,q$:*
$$\left(\frac pq\right)\left(\frac qp\right) = (-1)^{\frac{p-1}2\cdot\frac{q-1}2}.$$
*Equivalently, $\left(\frac pq\right)=\left(\frac qp\right)$ unless both $p\equiv q\equiv3\pmod4$, in which case $\left(\frac pq\right)=-\left(\frac qp\right)$.*

**Supplementary Laws.**
$$\left(\frac{-1}p\right)=(-1)^{(p-1)/2}, \qquad \left(\frac2p\right) = (-1)^{(p^2-1)/8},$$
*i.e. $2$ is a QR mod $p$ iff $p\equiv\pm1\pmod8$.*

**On the proof.** Gauss gave (over his lifetime) eight distinct proofs. The classical elementary route uses **Gauss's Lemma** — counting how many of the least-magnitude residues of $a,2a,\dots,\frac{p-1}2 a\pmod p$ are negative — combined with a lattice-point-counting argument (Eisenstein's version) comparing the two primes' contributions. This proof, while fully elementary, is long; we state the theorem, name the method (Gauss's Lemma + lattice-point counting), and turn to its use, which is where the real computational power lies.

**Worked Example 5.2.** Is $219$ a QR mod $383$ ($383$ is prime)? Factor $219=3\times73$, so $\left(\frac{219}{383}\right)=\left(\frac3{383}\right)\left(\frac{73}{383}\right)$.

*For $\left(\frac3{383}\right)$:* since $383\equiv3\pmod4$ and $3\equiv3\pmod4$, reciprocity flips sign: $\left(\frac3{383}\right)=-\left(\frac{383}3\right)=-\left(\frac23\right)$ (as $383\equiv2\pmod3$). Since $3\equiv3\pmod8$, $2$ is a NQR mod $3$ (directly: squares mod 3 are $\{0,1\}$), so $\left(\frac23\right)=-1$, giving $\left(\frac3{383}\right)=-(-1)=1$.

*For $\left(\frac{73}{383}\right)$:* $73\equiv1\pmod4$, so reciprocity does **not** flip sign: $\left(\frac{73}{383}\right)=\left(\frac{383}{73}\right)$. Now $383 = 5\cdot73+18$, so $\left(\frac{383}{73}\right)=\left(\frac{18}{73}\right)=\left(\frac2{73}\right)\left(\frac9{73}\right)=\left(\frac2{73}\right)\cdot1$ (as $9=3^2$ is a perfect square). Since $73\equiv1\pmod8$, $\left(\frac2{73}\right)=1$. So $\left(\frac{73}{383}\right)=1$.

Combining: $\left(\frac{219}{383}\right)=1\times1=1$ — **$219$ is a QR mod $383$.** $\blacksquare$

**Trick.** This example illustrates the standard computational algorithm: factor out squares and small primes, apply reciprocity to flip each odd-prime symbol into a smaller modulus, and recurse — precisely mirroring the Euclidean Algorithm in structure and speed ($O(\log p)$ reciprocity/reduction steps).

### 5.5 Challenge Problems

**Challenge Problem 5.1 (IMO 1990, Problem 3).** *Find all positive integers $n$ such that $n^2 \mid 2^n+1$.*

**Solution.** We claim the answers are $n=1$ and $n=3$.

*Step 0.* $2^n+1$ is always odd, so $n^2$ must be odd, hence $n$ is odd. $n=1$ works trivially ($1\mid3$). Assume now $n>1$.

*Step 1 (the smallest prime factor of $n$ is $3$).* Let $p$ be the smallest prime dividing $n$; $p$ is odd. Since $p\mid n \mid 2^n+1$, we have $2^n\equiv-1\pmod p$, so $2^{2n}\equiv1\pmod p$. Let $d=\operatorname{ord}_p(2)$. Then $d\mid2n$ but $d\nmid n$ (else $2^n\equiv1$, contradicting $2^n\equiv-1\not\equiv1$ as $p>2$); also $d\mid p-1$ (Proposition 5.4 with $\varphi(p)=p-1$). Every prime factor of $d$ is $\le d\le p-1<p$, so — since $p$ is the **smallest** prime factor of $n$ — $d$ shares no prime factor with $n$, i.e. $\gcd(d,n)=1$. Combined with $d\mid2n$, this forces $d\mid2$. Since $d\neq1$ ($2\not\equiv1\pmod p$), $d=2$, so $p\mid2^2-1=3$: $p=3$.

*Step 2 (exact power of $3$ dividing $n$).* Let $a=v_3(n)\ge1$. By LTE (Corollary 5.2, since $3\mid(2+1)$ and $n$ is odd),
$$v_3(2^n+1) = v_3(2+1)+v_3(n) = 1+a.$$
Since $n^2\mid2^n+1$ requires $v_3(n^2)=2a \le 1+a$, we get $a\le1$, so $a=1$: write $n=3m$ with $3\nmid m$.

*Step 3 ($m=1$).* Suppose $m>1$ and let $q$ be the smallest prime factor of $m$; then $q\neq3$, and every prime factor of $n$ is either $3$ or $\ge q$ (since $q$ is the smallest prime factor of $m$). Let $d'=\operatorname{ord}_q(2)$; as in Step 1, $d'\mid2n$, $d'\nmid n$, $d'\mid q-1$, and every prime factor of $d'$ is $<q$. So $d'$ can only share the prime $3$ with $n$ (all other prime factors of $n$ being $\ge q>d'$'s factors). Write $d'=3^st$ with $3\nmid t$; since $d'\mid2n=6m$ and $v_3(6m)=1$, we get $s\le1$.

- If $s=0$: $\gcd(d',n)=1$, so as in Step 1, $d'\mid2$, giving $d'=2$, so $q\mid2^2-1=3$ — contradicting $q\neq3$.
- If $s=1$: $d'=3t$ with $t\mid2m$ and $\gcd(t,m)=1$ (its prime factors being $<q\le$ all prime factors of $m$), so $t\mid2$, giving $t\in\{1,2\}$, i.e. $d'\in\{3,6\}$.
  - $d'=3$: then $q\mid2^3-1=7$, so $q=7$. But $\operatorname{ord}_7(2)=3$ (since $2^3=8\equiv1\pmod7$) is **odd**, so the cyclic subgroup generated by $2$ mod $7$ has odd order and cannot contain $-1$ (which has order $2$) — so $2^n\equiv-1\pmod7$ is never solvable. Contradiction.
  - $d'=6$: then $q\mid2^6-1=63=3^2\cdot7$, so $q=7$ again; but we just computed $\operatorname{ord}_7(2)=3\neq6$. Contradiction.

Both sub-cases fail, so $m=1$ is forced: $n=3$.

**Conclusion:** the solutions are $\boxed{n=1 \text{ and } n=3}$ (check: $2^3+1=9=3^2$ $\checkmark$). $\blacksquare$

**Challenge Problem 5.2.** *For an odd prime $p$, evaluate*
$$T = \sum_{k=0}^{p-1} \left(\frac{k^2+k}{p}\right).$$

**Solution.** The terms $k=0$ and $k=p-1$ both contribute $0$ (since $k^2+k=k(k+1)\equiv0\pmod p$ there), so
$$T = \sum_{k=1}^{p-2} \left(\frac{k(k+1)}p\right).$$
For $k\in\{1,\dots,p-2\}$, $k$ is invertible mod $p$, so we may write $k(k+1) = k^2(1+k^{-1})$, giving (using multiplicativity, Corollary 5.8, and $\left(\frac{k^2}p\right)=1$):
$$\left(\frac{k(k+1)}p\right) = \left(\frac{1+k^{-1}}p\right).$$
As $k$ ranges over $\{1,\dots,p-2\}$ (i.e. all nonzero residues **except** $p-1$), its inverse $k^{-1}$ also ranges over all nonzero residues except the inverse of $p-1$ — and $(p-1)^{-1}\equiv p-1\pmod p$ (since $(p-1)^2\equiv1$), so $k^{-1}$ ranges over exactly the same set $\{1,\dots,p-2\}$, just relabeled. Substituting $j=k^{-1}$:
$$T = \sum_{j=1}^{p-2}\left(\frac{1+j}p\right) = \sum_{i=2}^{p-1}\left(\frac ip\right) = \left[\sum_{i=1}^{p-1}\left(\frac ip\right)\right] - \left(\frac1p\right) = 0 - 1 = -1,$$
using the standard fact that $\sum_{i=1}^{p-1}\left(\frac ip\right)=0$ (there are exactly $\frac{p-1}2$ QRs and $\frac{p-1}2$ NQRs, contributing equal numbers of $+1$'s and $-1$'s).

**Conclusion:** $T=-1$ for every odd prime $p$. $\blacksquare$

**Verification ($p=5$):** QRs mod $5$ are $\{1,4\}$. Terms $k=0,\dots,4$: $k(k+1)=0,2,6\equiv1,12\equiv2,20\equiv0$, giving Legendre symbols $0,-1,1,-1,0$, summing to $-1$. $\checkmark$

---

## Appendix A — Master Formula Sheet

**Divisibility and the Euclidean Algorithm**
$$a=bq+r,\ 0\le r<b \qquad \gcd(a,b)=\gcd(b,a\bmod b) \qquad \gcd(a,b)\cdot\operatorname{lcm}(a,b)=ab$$
$$ax+by=\gcd(a,b) \text{ has an integer solution (Bézout)} \qquad \gcd(a,b)=1 \iff \exists\, x,y:\ ax+by=1$$

**Prime Factorization**
$$n = \prod_i p_i^{a_i} \quad\text{(unique)} \qquad \gcd(a,b)=\prod p^{\min(v_p a,v_p b)} \qquad \operatorname{lcm}(a,b)=\prod p^{\max(v_p a,v_p b)}$$

**Congruences**
$$a\equiv b\pmod m \iff m\mid(a-b) \qquad ax\equiv b\pmod m \text{ solvable} \iff \gcd(a,m)\mid b\ (\text{then } \gcd(a,m) \text{ solutions})$$

**Chinese Remainder Theorem**
$$x\equiv a_i\pmod{m_i}\ (\text{pairwise coprime } m_i) \implies x\equiv \sum a_iM_iy_i \pmod{M},\ \ M_i=\tfrac{M}{m_i},\ M_iy_i\equiv1\pmod{m_i}$$

**Classical Theorems**
$$a^{p-1}\equiv1\pmod p\ (\text{Fermat}) \qquad a^{\varphi(n)}\equiv1\pmod n\ (\text{Euler}) \qquad (p-1)!\equiv-1\pmod p\ (\text{Wilson})$$
$$a^e\equiv a^{e\bmod\varphi(m)}\pmod m \text{ if } \gcd(a,m)=1;\quad a^e\equiv a^{\varphi(m)+(e\bmod\varphi(m))}\pmod m \text{ if } e\ge\log_2 m \text{ (any } a)$$

**Multiplicative Functions** ($n=\prod p_i^{a_i}$)
$$\tau(n)=\prod(a_i+1) \qquad \sigma(n)=\prod\frac{p_i^{a_i+1}-1}{p_i-1} \qquad \varphi(n)=n\prod_{p\mid n}\left(1-\frac1p\right) \qquad \sum_{d\mid n}\varphi(d)=n$$
$$\tau=\mathbf1*\mathbf1 \qquad \sigma=\operatorname{id}*\mathbf1 \qquad \varphi*\mathbf1=\operatorname{id} \qquad \mu*\mathbf1=\varepsilon$$
$$g=f*\mathbf1 \implies f = g*\mu \quad\text{(Möbius Inversion)} \qquad \sum_{d=1}^N \mu(d)\left\lfloor\frac Nd\right\rfloor = 1$$
$$\sum_{i=1}^n\sum_{j=1}^n\gcd(i,j) = \sum_{d=1}^n \varphi(d)\left\lfloor\frac nd\right\rfloor^2$$

**Diophantine Equations**
$$ax+by=c \text{ solvable} \iff \gcd(a,b)\mid c;\quad x=x_0+\tfrac bd t,\ y=y_0-\tfrac ad t$$
$$\text{Primitive Pythagorean triples: } x=m^2-n^2,\ y=2mn,\ z=m^2+n^2\ \ (\gcd(m,n)=1,\ m\not\equiv n\!\!\pmod2)$$
$$\text{Pell: } x_k+y_k\sqrt d = (x_1+y_1\sqrt d)^k \qquad x^4+y^4=z^2 \text{ has no positive solution}$$
$$p\equiv1\!\!\pmod4 \iff p=a^2+b^2 \qquad y^2+2=x^3 \implies (x,y)=(3,\pm5) \text{ only}$$

**LTE (odd prime $p$, $p\mid x-y$, $p\nmid x,y$)**
$$v_p(x^n-y^n)=v_p(x-y)+v_p(n) \qquad v_p(x^n+y^n)=v_p(x+y)+v_p(n)\ \ (n \text{ odd}, p\mid x+y)$$
$$p=2:\quad v_2(x^n-y^n)=v_2(x-y)\ (n \text{ odd}); \quad v_2(x-y)+v_2(x+y)+v_2(n)-1\ (n \text{ even})$$

**Orders, Primitive Roots, Quadratic Residues**
$$\operatorname{ord}_n(a)\mid\varphi(n) \qquad \text{primitive roots exist for } n\in\{1,2,4,p^k,2p^k\}$$
$$a^{(p-1)/2}\equiv\left(\frac ap\right)\pmod p\ \text{(Euler)} \qquad \left(\frac{ab}p\right)=\left(\frac ap\right)\left(\frac bp\right) \qquad \left(\frac{-1}p\right)=(-1)^{(p-1)/2}\qquad \left(\frac2p\right)=(-1)^{(p^2-1)/8}$$
$$\left(\frac pq\right)\left(\frac qp\right)=(-1)^{\frac{p-1}2\frac{q-1}2}\ \text{(Quadratic Reciprocity)}$$

---

## Closing Remark: A Unifying Theme

Every construction in this treatise is a shadow of a single algebraic fact: **$\mathbb{Z}$ is a Euclidean domain.** The Division Algorithm (Theorem 1.1) is precisely the defining property of a Euclidean domain; Bézout's Identity and unique factorization (Theorems 1.5, 1.9) are its immediate structural consequences, and every Euclidean domain is automatically a **principal ideal domain (PID)** and hence a **unique factorization domain (UFD)**. When we write $\gcd(a,b)=ax+by$, we are really exhibiting the ideal $(a,b)\subseteq\mathbb{Z}$ as the principal ideal $(\gcd(a,b))$ — Bézout's Identity *is* the statement that ideals in $\mathbb{Z}$ are principal.

Modular arithmetic is the passage to **quotient rings**: $\mathbb{Z}/n\mathbb{Z}$. A prime $p$ is precisely a value of $n$ for which the ideal $(p)$ is **maximal** (equivalently *prime*), and correspondingly $\mathbb{Z}/p\mathbb{Z}$ is not merely a ring but a **field** — this is exactly why polynomials over $\mathbb{Z}/p\mathbb{Z}$ have at most as many roots as their degree (used decisively in Theorem 5.5), a property that can fail over $\mathbb{Z}/n\mathbb{Z}$ for composite $n$. The group of units $(\mathbb{Z}/n\mathbb{Z})^\times$ has order $\varphi(n)$, and **Euler's Theorem is nothing but Lagrange's Theorem** from group theory ("the order of an element divides the order of the group") applied to this group — the same abstract fact that, applied to the cyclic group generated by a primitive root, structures all of Part V.

Diophantine equations, in turn, push this machinery *outward*: when $\mathbb{Z}$ itself is too small to factor an expression like $x^2+y^2$ or $y^2+2$, we pass to a larger ring of algebraic integers — $\mathbb{Z}[i]$, $\mathbb{Z}[\sqrt{-2}]$ — and ask whether unique factorization still holds there. When it does (as in both our examples, each a Euclidean domain in its own right), the same Bézout/UFD machinery that solved everything in Part I solves equations invisible to elementary methods. When it does *not* — as happens already for rings like $\mathbb{Z}[\sqrt{-5}]$ — mathematicians in the 19th century were forced to invent **ideals** in the modern sense (Kummer's "ideal numbers," formalized by Dedekind) precisely to *restore* unique factorization, this time at the level of ideals rather than elements. This is the birth of algebraic number theory.

Finally, Quadratic Reciprocity — stated but not fully proved here — is now understood as the first, and simplest, instance of a vast unification called **class field theory** and, more generally, the **Artin Reciprocity Law**, which describes how primes split in abelian extensions of number fields in terms of data purely internal to the base field. Seen this way, the question "is $a$ a square mod $p$?" and the question "how does $p$ factor in $\mathbb{Z}[\sqrt a]$?" are the same question — the theme first glimpsed in Section 4.5, where "$-1$ is a QR mod $p$" and "$p$ splits in $\mathbb{Z}[i]$" turned out to be identical statements in different languages.

In short: *discrete* number theory — divisibility, congruences, quadratic residues — is the visible surface of *continuous* algebraic structure: rings, ideals, and groups. Every theorem in this treatise can be re-read, without changing a single line of logic, as a theorem about the ring $\mathbb{Z}$; and every generalization worth pursuing next asks the same question of a larger ring.

$\blacksquare$
