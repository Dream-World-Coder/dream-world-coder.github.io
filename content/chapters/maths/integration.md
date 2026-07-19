<!--metadata
  title: "A Treatise on Integral and Vector Calculus"
  authors: ["Subhajit Gorai", "claude.ai"]
  dateCreated: "19/07/2026"
  dateEdited: "19/07/2026"
  description: "Rules, Theorems, Proofs, and Problem-Solving Tactics for JEE Advanced, the Mathematical Olympiads, and the ISI/CMI Entrance Examinations"
  tags: [""]
-->

# A Treatise on Integral and Vector Calculus

## Preface

This treatise is written for the student who has already mastered the mechanics of elementary integration and now wishes to acquire the deeper structural understanding demanded by JEE Advanced, the Indian and international Mathematical Olympiads, and the entrance examinations of the Indian Statistical Institute and Chennai Mathematical Institute. Such examinations rarely reward the candidate who merely knows *how* to integrate; they reward the candidate who recognises, within seconds, *which* of a dozen possible manoeuvres will collapse an intractable-looking expression into a line or two of algebra.

Accordingly, this guide is organised not as a catalogue of formulas to be memorised in isolation, but as a progression of ideas. Each Part develops a family of related techniques, proves the central results in full wherever the proof illuminates the technique itself, and closes with a **Challenge Problem** substantial enough to reward careful study. The reader is assumed to be comfortable with differential calculus, elementary trigonometric identities, and the language of limits; nothing beyond this is presupposed.

A word on the proofs included here. Some — the Fundamental Theorem of Calculus, the reflection property of definite integrals, the Beta–Gamma bridge, Green's Theorem, the Legendre Duplication Formula — are given in full, because the argument is short and the insight gained is worth far more than the few lines it costs. One result, Euler's Reflection Formula for the Gamma function, is stated and used freely, with only the *method* of proof (contour integration) indicated; a complete derivation requires complex analysis lying outside the scope of a calculus treatise. The reader should regard this as an honest signpost rather than an evasion.

---

## Contents

- **Part I.** The Foundations of Integration
- **Part II.** Symmetry in Definite Integration
- **Part III.** Tactical Substitutions for JEE Advanced
- **Part IV.** Feynman's Trick — Differentiation Under the Integral Sign
- **Part V.** The Weierstrass Substitution
- **Part VI.** The Gamma and Beta Functions
- **Part VII.** Multiple Integrals — Double, Triple, and Beyond
- **Part VIII.** Vector Calculus — Green, Stokes, and Gauss
- **Appendix A.** Master Formula Sheet
- **Closing Remarks** — A Problem-Solver's Philosophy

---

## Conventions

Throughout, $C$ denotes an arbitrary constant of integration. All functions are assumed sufficiently well-behaved — continuous, differentiable, or integrable, as the manipulation demands — for the stated step to be legitimate; this is remarked upon explicitly only where the distinction is itself the point, as in Part IV. The symbol $\blacksquare$ closes a proof.

---

## Part I. The Foundations of Integration

### 1.1 The Fundamental Theorem of Calculus

Before any technique of integration can be justified, one must know *why* integration and differentiation are inverse operations at all. This is the content of the Fundamental Theorem of Calculus, in two parts.

**Theorem (FTC, Part 1).** Let $f$ be continuous on $[a,b]$, and define $F(x)=\int_a^xf(t)\,dt$. Then $F$ is differentiable on $(a,b)$ and $F'(x)=f(x)$.

**Proof.** For $h\neq0$ small enough that $x+h\in(a,b)$,
$$\frac{F(x+h)-F(x)}{h}=\frac1h\int_x^{x+h}f(t)\,dt.$$
By the Mean Value Theorem for Integrals, there exists a point $c$ between $x$ and $x+h$ such that $\int_x^{x+h}f(t)\,dt=f(c)\cdot h$, so the difference quotient equals $f(c)$ exactly. As $h\to0$, $c\to x$, and since $f$ is continuous, $f(c)\to f(x)$. Hence $F'(x)=\lim_{h\to0}f(c)=f(x)$. $\blacksquare$

**Theorem (FTC, Part 2 — Evaluation).** If $f$ is continuous on $[a,b]$ and $G$ is *any* antiderivative of $f$, then
$$\int_a^bf(x)\,dx=G(b)-G(a).$$

**Proof.** Let $F(x)=\int_a^xf(t)\,dt$ as above; by Part 1, $F'=f=G'$, so $F-G$ has zero derivative and is therefore constant on $[a,b]$: $F(x)=G(x)+k$. Since $F(a)=0$, $k=-G(a)$. Setting $x=b$ gives $F(b)=\int_a^bf(t)\,dt=G(b)-G(a)$. $\blacksquare$

This second statement is used in every evaluation of a definite integral; the first is what justifies calling an antiderivative an antiderivative at all. Nearly every result in this treatise — from the reflection property of Part II to the Divergence Theorem of Part VIII — is, at bottom, some avatar of a single idea: *the behaviour of a function on the interior of a region is captured entirely by what happens on its boundary.*

### 1.2 The Table of Elementary Primitives

| $f(x)$ | $\displaystyle\int f(x)\,dx$ |
|---|---|
| $x^n\ (n\neq-1)$ | $\dfrac{x^{n+1}}{n+1}+C$ |
| $x^{-1}$ | $\ln\lvert x\rvert+C$ |
| $e^x$ | $e^x+C$ |
| $a^x$ | $\dfrac{a^x}{\ln a}+C$ |
| $\sin x$ | $-\cos x+C$ |
| $\cos x$ | $\sin x+C$ |
| $\sec^2x$ | $\tan x+C$ |
| $\tan x$ | $\ln\lvert\sec x\rvert+C$ |
| $\sec x$ | $\ln\lvert\sec x+\tan x\rvert+C$ |
| $\dfrac1{\sqrt{a^2-x^2}}$ | $\arcsin\!\left(\dfrac xa\right)+C$ |
| $\dfrac1{a^2+x^2}$ | $\dfrac1a\arctan\!\left(\dfrac xa\right)+C$ |
| $\dfrac1{x\sqrt{x^2-a^2}}$ | $\dfrac1a\,\operatorname{arcsec}\left\lvert\dfrac xa\right\rvert+C$ |
| $\dfrac1{\sqrt{x^2\pm a^2}}$ | $\ln\left\lvert x+\sqrt{x^2\pm a^2}\right\rvert+C$ |

These entries, together with the two rules below, generate essentially every "routine" indefinite integral a student meets before specialised technique becomes necessary.

### 1.3 Integration by Substitution

**Rule.** If $u=g(x)$ is differentiable and $f$ is continuous on the range of $g$, then
$$\int f(g(x))\,g'(x)\,dx=\int f(u)\,du.$$

**Proof.** Let $F$ be an antiderivative of $f$. By the Chain Rule, $\dfrac{d}{dx}\big[F(g(x))\big]=F'(g(x))\,g'(x)=f(g(x))\,g'(x)$. Hence $F(g(x))$ is an antiderivative of $f(g(x))g'(x)$, which is the assertion. $\blacksquare$

Substitution is nothing more than the Chain Rule read from right to left. Its entire difficulty in practice lies in *seeing* the pairing $f(g(x))g'(x)$ inside a given integrand — exactly the skill Parts III and V are devoted to sharpening.

### 1.4 Integration by Parts

**Rule.** $\displaystyle\int u\,dv=uv-\int v\,du.$

**Proof.** By the Product Rule, $(uv)'=u'v+uv'$. Integrating both sides, $uv=\int u'v\,dx+\int uv'\,dx$, and rearranging gives the rule. $\blacksquare$

The traditional mnemonic **ILATE** (Inverse trigonometric, Logarithmic, Algebraic, Trigonometric, Exponential, in decreasing priority) remains a reliable first guess for which factor to differentiate.

**Example.** $\displaystyle\int x\ln x\,dx$. Take $u=\ln x,\ dv=x\,dx$, so $du=\frac1x\,dx,\ v=\frac{x^2}2$:
$$\int x\ln x\,dx=\frac{x^2}2\ln x-\int\frac{x^2}2\cdot\frac1x\,dx=\frac{x^2}2\ln x-\frac{x^2}4+C.$$

### 1.5 A Named Trick: The Exponential Derivative-Sum Rule

A pattern recurs often enough in JEE Advanced integrals to deserve its own statement.

**Rule.** $\displaystyle\int e^x\big[f(x)+f'(x)\big]\,dx=e^xf(x)+C.$

**Proof.** Immediate from the Product Rule: $\dfrac{d}{dx}\big[e^xf(x)\big]=e^xf(x)+e^xf'(x)$. $\blacksquare$

The entire difficulty of applying this rule lies in massaging a given integrand into the form $e^x[f+f']$ — precisely what makes the following problem a genuine test of algebraic fluency rather than of the rule itself.

**Challenge Problem.** Evaluate $\displaystyle I=\int e^x\left(\frac{1+\sin x}{1+\cos x}\right)dx.$

**Solution.** Using the half-angle identities $1+\cos x=2\cos^2\frac x2$ and $\sin x=2\sin\frac x2\cos\frac x2$,
$$\frac{1+\sin x}{1+\cos x}=\frac1{1+\cos x}+\frac{\sin x}{1+\cos x}=\frac1{2\cos^2\frac x2}+\frac{2\sin\frac x2\cos\frac x2}{2\cos^2\frac x2}=\frac12\sec^2\frac x2+\tan\frac x2.$$
Set $f(x)=\tan\frac x2$; then $f'(x)=\frac12\sec^2\frac x2$, so the bracketed expression is exactly $f(x)+f'(x)$. Therefore
$$I=e^x\tan\frac x2+C.$$
The entire difficulty of this problem — routinely rated among the harder single-variable integrals set at this level — was hidden in recognising the disguised form $f+f'$ underneath a quotient of trigonometric functions; once seen, the calculus is a single line.

---

## Part II. Symmetry in Definite Integration

Where Part I concerned *finding* an antiderivative, this Part concerns *evaluating* a definite integral without ever finding one, by exploiting the symmetry of the interval of integration. Problem for problem, this is probably the single most heavily tested idea in the definite-integral portion of JEE Advanced.

### 2.1 King's Rule (The Reflection Property)

**Theorem.** $\displaystyle\int_a^bf(x)\,dx=\int_a^bf(a+b-x)\,dx.$

**Proof.** Substitute $u=a+b-x$, so $du=-dx$; when $x=a$, $u=b$, and when $x=b$, $u=a$. Then
$$\int_a^bf(x)\,dx=\int_b^af(a+b-u)(-du)=\int_a^bf(a+b-u)\,du,$$
and relabelling $u\to x$ completes the proof. $\blacksquare$

The power of this innocuous identity is that it lets one *add* an integral to itself in a transformed guise, often producing a quantity that collapses completely.

**Example.** Evaluate $\displaystyle I=\int_0^{\pi/2}\frac{\sin x}{\sin x+\cos x}\,dx$.

Apply King's Rule with $x\to\frac\pi2-x$:
$$I=\int_0^{\pi/2}\frac{\sin\left(\frac\pi2-x\right)}{\sin\left(\frac\pi2-x\right)+\cos\left(\frac\pi2-x\right)}\,dx=\int_0^{\pi/2}\frac{\cos x}{\cos x+\sin x}\,dx.$$
Adding this to the original expression for $I$:
$$2I=\int_0^{\pi/2}\frac{\sin x+\cos x}{\sin x+\cos x}\,dx=\int_0^{\pi/2}1\,dx=\frac\pi2,\qquad\text{so }I=\frac\pi4.$$

### 2.2 Odd and Even Functions; Periodicity

- **Odd integrand:** if $f(-x)=-f(x)$, then $\displaystyle\int_{-a}^af(x)\,dx=0$.
- **Even integrand:** if $f(-x)=f(x)$, then $\displaystyle\int_{-a}^af(x)\,dx=2\int_0^af(x)\,dx$.
- **Periodicity:** if $f(x+T)=f(x)$ for all $x$, then $\displaystyle\int_a^{a+T}f(x)\,dx$ is *independent of $a$*, and $\displaystyle\int_0^{nT}f(x)\,dx=n\int_0^Tf(x)\,dx$ for every positive integer $n$.

These follow from the same substitution technique as King's Rule and are left as routine exercises; their value lies entirely in *recognising* the relevant symmetry, since a full computation is then never necessary.

**Challenge Problem.** Evaluate $\displaystyle I=\int_0^\pi\frac{x\sin x}{1+\cos^2x}\,dx$.

**Solution.** Apply King's Rule with $x\to\pi-x$. Since $\sin(\pi-x)=\sin x$ and $\cos^2(\pi-x)=\cos^2x$,
$$I=\int_0^\pi\frac{(\pi-x)\sin x}{1+\cos^2x}\,dx=\pi\int_0^\pi\frac{\sin x}{1+\cos^2x}\,dx\ -\ I,$$
so
$$2I=\pi\int_0^\pi\frac{\sin x}{1+\cos^2x}\,dx.$$
For the remaining integral, substitute $u=\cos x,\ du=-\sin x\,dx$; as $x$ runs from $0$ to $\pi$, $u$ runs from $1$ to $-1$:
$$\int_0^\pi\frac{\sin x}{1+\cos^2x}\,dx=\int_{-1}^1\frac{du}{1+u^2}=\big[\arctan u\big]_{-1}^1=\frac\pi4-\left(-\frac\pi4\right)=\frac\pi2.$$
Therefore $2I=\pi\cdot\frac\pi2=\frac{\pi^2}2$, and
$$I=\frac{\pi^2}4.$$
This problem is a superb illustration of *stacking* two techniques — King's Rule to fold the integral onto itself, followed by an elementary substitution — and is a very frequently recurring archetype at Olympiad and JEE Advanced level.

## Part III. Tactical Substitutions for JEE Advanced

The techniques of this Part share a common spirit: each is a specific, engineered substitution designed to defeat a *specific* algebraic shape that resists the general methods of Part I. Recognising the shape is nine-tenths of the battle.

### 3.1 Extracting the Highest Power

**Target form.** $\displaystyle\int\frac{dx}{x^m(a+bx^n)^{p/q}}.$

**Method.** Factor the highest power of $x$ out of the bracketed term, converting the awkward sum $a+bx^n$ into $x^n(ax^{-n}+b)$; this manufactures a negative power of $x$ whose derivative is available in the rest of the integrand.

**Example.** Evaluate $\displaystyle I=\int\frac{dx}{x^2(x^4+1)^{3/4}}$.

Write $(x^4+1)^{3/4}=\big(x^4(1+x^{-4})\big)^{3/4}=x^3(1+x^{-4})^{3/4}$, so
$$I=\int\frac{dx}{x^5(1+x^{-4})^{3/4}}=\int x^{-5}(1+x^{-4})^{-3/4}\,dx.$$
Let $t=1+x^{-4}$, so $dt=-4x^{-5}\,dx$:
$$I=-\frac14\int t^{-3/4}\,dt=-t^{1/4}+C=-\big(1+x^{-4}\big)^{1/4}+C.$$

### 3.2 Algebraic Twins: the $x\pm\dfrac1x$ Substitution

**Target form.** $\displaystyle\int\frac{x^2\pm1}{x^4+kx^2+1}\,dx$, a symmetric bi-quadratic denominator.

**Method.** Divide numerator and denominator by $x^2$.
- If the numerator becomes $1+\frac1{x^2}$, set $t=x-\frac1x$ (so $dt=\left(1+\frac1{x^2}\right)dx$, and $t^2=x^2+\frac1{x^2}-2$).
- If the numerator becomes $1-\frac1{x^2}$, set $t=x+\frac1x$ (so $dt=\left(1-\frac1{x^2}\right)dx$, and $t^2=x^2+\frac1{x^2}+2$).

**Example.** Evaluate $\displaystyle I=\int\frac{x^2+1}{x^4+1}\,dx$.

Dividing by $x^2$: $I=\displaystyle\int\frac{1+1/x^2}{x^2+1/x^2}\,dx=\int\frac{1+1/x^2}{(x-1/x)^2+2}\,dx$. With $t=x-\frac1x$,
$$I=\int\frac{dt}{t^2+(\sqrt2)^2}=\frac1{\sqrt2}\arctan\!\left(\frac t{\sqrt2}\right)+C=\frac1{\sqrt2}\arctan\!\left(\frac{x-1/x}{\sqrt2}\right)+C.$$

### 3.3 The Reciprocal Substitution $x=1/t$

Effective whenever the leading and trailing powers of $x$ in an irrational integrand pair more naturally after inversion.

**Example.** Evaluate $\displaystyle I=\int\frac{dx}{x^2\sqrt{x^2+1}}$ for $x>0$.

Put $x=\dfrac1t$, so $dx=-\dfrac{dt}{t^2}$, and $\sqrt{x^2+1}=\sqrt{\dfrac{1+t^2}{t^2}}=\dfrac{\sqrt{1+t^2}}t$ (for $t>0$). Then
$$I=\int\frac1{(1/t^2)\cdot\frac{\sqrt{1+t^2}}t}\left(-\frac{dt}{t^2}\right)=-\int\frac{t\,dt}{\sqrt{1+t^2}}=-\sqrt{1+t^2}+C=-\frac{\sqrt{x^2+1}}x+C.$$
Observe how inversion converted an integral that "looked like" it needed a hyperbolic substitution into an elementary one.

### 3.4 Euler's Substitutions for $\int R\big(x,\sqrt{ax^2+bx+c}\big)\,dx$

When the standard trigonometric substitution becomes unwieldy, Euler's three substitutions convert the *entire* integrand into a rational function of a new variable $t$, after which partial fractions finish the job.

- **Case 1** ($a>0$): put $\sqrt{ax^2+bx+c}=\pm x\sqrt a+t$.
- **Case 2** ($c>0$): put $\sqrt{ax^2+bx+c}=xt\pm\sqrt c$.
- **Case 3** (real roots $r_1,r_2$): put $\sqrt{a(x-r_1)(x-r_2)}=t(x-r_1)$.

**Challenge Problem.** Evaluate $\displaystyle I=\int\frac{dx}{x+\sqrt{x^2+x+1}}$.

**Solution.** Here $a=1>0$, so Case 1 applies. Set
$$\sqrt{x^2+x+1}=t-x\qquad\big(\text{i.e. } t=x+\sqrt{x^2+x+1}\big).$$
Squaring, $x^2+x+1=t^2-2tx+x^2$, so $x+1=t^2-2tx$, giving
$$x=\frac{t^2-1}{2t+1}.$$
Note immediately that the *entire denominator* of the original integrand is, by construction, just $t$ itself — that is the point of the substitution. It remains only to express $dx$ in terms of $dt$:
$$dx=\frac{2t(2t+1)-2(t^2-1)}{(2t+1)^2}\,dt=\frac{2(t^2+t+1)}{(2t+1)^2}\,dt.$$
Hence
$$I=\int\frac1t\cdot\frac{2(t^2+t+1)}{(2t+1)^2}\,dt=2\int\frac{t^2+t+1}{t(2t+1)^2}\,dt.$$
Partial fractions give $\dfrac{t^2+t+1}{t(2t+1)^2}=\dfrac1t-\dfrac{3/2}{2t+1}-\dfrac{3/2}{(2t+1)^2}$ (the reader may verify this by clearing denominators), so
$$I=2\ln|t|-\frac32\ln|2t+1|+\frac3{2(2t+1)}+C,$$
where $t=x+\sqrt{x^2+x+1}$. This problem is representative of the genre: the substitution itself is a single line, but the partial-fraction reduction that follows is where marks are actually won or lost.

---

## Part IV. Feynman's Trick — Differentiation Under the Integral Sign

### 4.1 The Leibniz Integral Rule

**Rule (constant limits).** If $f(x,\alpha)$ and $\dfrac{\partial f}{\partial\alpha}$ are continuous, then
$$\frac{d}{d\alpha}\int_a^bf(x,\alpha)\,dx=\int_a^b\frac{\partial f}{\partial\alpha}(x,\alpha)\,dx.$$

**Rule (variable limits).** More generally,
$$\frac{d}{d\alpha}\int_{p(\alpha)}^{q(\alpha)}f(x,\alpha)\,dx=f\big(q(\alpha),\alpha\big)q'(\alpha)-f\big(p(\alpha),\alpha\big)p'(\alpha)+\int_{p(\alpha)}^{q(\alpha)}\frac{\partial f}{\partial\alpha}(x,\alpha)\,dx.$$

*Remark on rigour.* The interchange of $\dfrac d{d\alpha}$ and $\displaystyle\int$ is not free: it requires, at minimum, that $\dfrac{\partial f}{\partial\alpha}$ be continuous jointly in $x$ and $\alpha$, and — when the interval of integration is infinite or the integrand unbounded — some form of uniform convergence (in a rigorous course, typically supplied by the Dominated Convergence Theorem). At JEE Advanced and Olympiad level, one may apply the rule freely; a careful writer will simply note in passing that the interchange is justified.

**Named strategy: Feynman's Trick.** Introduce a parameter $\alpha$ into a difficult integral $I$ — often multiplicatively, as an exponent, or as a limit of integration — so that (i) $I(\alpha)$ is *easy* for some particular value of $\alpha$, and (ii) $I'(\alpha)$, obtained by differentiating under the integral sign, is *elementary*. Integrate $I'(\alpha)$ back up and fix the constant using the easy value from (i).

**Example.** Evaluate $\displaystyle I(\alpha)=\int_0^1\frac{x^\alpha-1}{\ln x}\,dx$.

Differentiate under the integral sign:
$$I'(\alpha)=\int_0^1\frac{\partial}{\partial\alpha}\left[\frac{x^\alpha-1}{\ln x}\right]dx=\int_0^1\frac{x^\alpha\ln x}{\ln x}\,dx=\int_0^1x^\alpha\,dx=\frac1{\alpha+1}.$$
Integrating, $I(\alpha)=\ln(\alpha+1)+C$. Since $I(0)=\int_0^1\frac{x^0-1}{\ln x}\,dx=\int_0^10\,dx=0$, we get $C=0$, so
$$I(\alpha)=\ln(\alpha+1).$$

### 4.2 A Useful Lemma

The Challenge Problem below requires the following standard result, worth recording separately.

**Lemma.** For $p,q>0$ with $p\neq q$,
$$\int_0^\infty\frac{du}{(u^2+p^2)(u^2+q^2)}=\frac\pi{2pq(p+q)}.$$

**Proof.** Partial fractions in $u^2$ give $\dfrac1{(u^2+p^2)(u^2+q^2)}=\dfrac1{q^2-p^2}\left[\dfrac1{u^2+p^2}-\dfrac1{u^2+q^2}\right]$, and since $\displaystyle\int_0^\infty\frac{du}{u^2+p^2}=\frac\pi{2p}$,
$$\int_0^\infty\frac{du}{(u^2+p^2)(u^2+q^2)}=\frac1{q^2-p^2}\left[\frac\pi{2p}-\frac\pi{2q}\right]=\frac{\pi(q-p)}{2pq(q^2-p^2)}=\frac\pi{2pq(p+q)}.\ \blacksquare$$

**Challenge Problem.** Evaluate $\displaystyle I(a,b)=\int_0^{\pi/2}\ln\!\big(a^2\cos^2\theta+b^2\sin^2\theta\big)\,d\theta$ for $a,b>0$.

**Solution.** Differentiate with respect to $a$, holding $b$ fixed:
$$\frac{\partial I}{\partial a}=\int_0^{\pi/2}\frac{2a\cos^2\theta}{a^2\cos^2\theta+b^2\sin^2\theta}\,d\theta.$$
Divide numerator and denominator by $\cos^2\theta$ and substitute $u=\tan\theta$ (so $d\theta=\frac{du}{1+u^2}$, and $\theta:0\to\frac\pi2$ corresponds to $u:0\to\infty$):
$$\frac{\partial I}{\partial a}=\int_0^\infty\frac{2a}{a^2+b^2u^2}\cdot\frac{du}{1+u^2}=\frac{2a}{b^2}\int_0^\infty\frac{du}{\left(u^2+\left(\frac ab\right)^2\right)(u^2+1)}.$$
Applying the Lemma with $p=a/b,\ q=1$:
$$\frac{\partial I}{\partial a}=\frac{2a}{b^2}\cdot\frac\pi{2\cdot\frac ab\cdot1\cdot\left(\frac ab+1\right)}=\frac{2a}{b^2}\cdot\frac{\pi b^2}{2a(a+b)}=\frac\pi{a+b}.$$
Integrating with respect to $a$: $I(a,b)=\pi\ln(a+b)+C(b)$. To pin down $C(b)$, evaluate the *original* integral at $a=b$, where it is trivial:
$$I(b,b)=\int_0^{\pi/2}\ln(b^2)\,d\theta=\frac\pi2\cdot2\ln b=\pi\ln b.$$
Comparing with $I(b,b)=\pi\ln(2b)+C(b)=\pi\ln2+\pi\ln b+C(b)$ forces $C(b)=-\pi\ln2$. Therefore
$$I(a,b)=\pi\ln(a+b)-\pi\ln2=\pi\ln\!\left(\frac{a+b}2\right).$$
This is a celebrated result: the integral of the logarithm of an ellipse-shaped weight, evaluated in closed form, is simply $\pi$ times the log of the *arithmetic mean* of the semi-axes. Direct computation — expanding the logarithm, or attempting a trigonometric substitution — offers no visible way in; the parameter $a$ exists only in our imagination, and yet introducing it is exactly what solves the problem.

## Part V. The Weierstrass Substitution

### 5.1 Derivation

**Substitution.** Let $t=\tan\dfrac x2$.

**Derivation of the conversion formulas.** Since $\sin x=2\sin\frac x2\cos\frac x2$, divide and multiply by $\cos^2\frac x2$:
$$\sin x=\frac{2\sin\frac x2\cos\frac x2}{\sin^2\frac x2+\cos^2\frac x2}=\frac{2\tan\frac x2}{1+\tan^2\frac x2}=\frac{2t}{1+t^2}.$$
Similarly, $\cos x=\cos^2\frac x2-\sin^2\frac x2$, and dividing through by $\sin^2\frac x2+\cos^2\frac x2=1$ in the same way,
$$\cos x=\frac{1-\tan^2\frac x2}{1+\tan^2\frac x2}=\frac{1-t^2}{1+t^2}.$$
Finally, from $x=2\arctan t$, $dx=\dfrac2{1+t^2}\,dt$.

This substitution converts *any* rational function of $\sin x$ and $\cos x$ into a rational function of $t$ — after which the entire machinery of partial fractions becomes available.

**Example.** Evaluate $\displaystyle I=\int\frac{dx}{1+\sin x}$.

With the substitutions above,
$$1+\sin x=1+\frac{2t}{1+t^2}=\frac{(1+t)^2}{1+t^2},$$
so
$$I=\int\frac{1+t^2}{(1+t)^2}\cdot\frac{2\,dt}{1+t^2}=\int\frac{2\,dt}{(1+t)^2}=-\frac2{1+t}+C=-\frac2{1+\tan\frac x2}+C.$$

### 5.2 A Structural Remark: the Perfect-Square Phenomenon

**Challenge Problem.** Evaluate $\displaystyle I=\int\frac{dx}{3\sin x-4\cos x+5}$.

**Solution.** Substituting,
$$3\sin x-4\cos x+5=\frac{6t-4(1-t^2)+5(1+t^2)}{1+t^2}=\frac{9t^2+6t+1}{1+t^2}=\frac{(3t+1)^2}{1+t^2}.$$
The quadratic in the numerator is a *perfect square*, so
$$I=\int\frac{1+t^2}{(3t+1)^2}\cdot\frac{2\,dt}{1+t^2}=\int\frac{2\,dt}{(3t+1)^2}=-\frac2{3(3t+1)}+C=-\frac2{3\!\left(3\tan\frac x2+1\right)}+C.$$

**Remark.** The perfect square was no accident. For a general integral $\displaystyle\int\frac{dx}{a\sin x+b\cos x+c}$, the Weierstrass substitution produces a numerator quadratic in $t$ equal to $(c-b)t^2+2at+(c+b)$, whose discriminant is
$$4a^2-4(c-b)(c+b)=4\big(a^2-c^2+b^2\big).$$
This vanishes — guaranteeing a perfect square, and hence an arctan-free antiderivative — precisely when $a^2+b^2=c^2$: that is, whenever $(a,b,c)$ is a **Pythagorean triple**. Here $(3,4,5)$ is the most famous triple of all, which is no coincidence of the problem-setter's choosing; recognising this pattern instantly tells the solver, before any algebra, that the answer will involve no inverse trigonometric function at all.

---

## Part VI. The Gamma and Beta Functions

### 6.1 Definitions and the Bridge

$$\Gamma(n)=\int_0^\infty x^{n-1}e^{-x}\,dx\ \ (n>0),\qquad B(m,n)=\int_0^1x^{m-1}(1-x)^{n-1}\,dx\ \ (m,n>0).$$

Integration by parts gives $\Gamma(n+1)=n\Gamma(n)$, so $\Gamma(n)=(n-1)!$ for positive integers $n$, and $\Gamma(1)=1$.

### 6.2 Proof that $\Gamma(1/2)=\sqrt\pi$

**Theorem.** $\Gamma\!\left(\frac12\right)=\sqrt\pi$.

**Proof.** By definition, $\Gamma\!\left(\frac12\right)=\int_0^\infty x^{-1/2}e^{-x}\,dx$. Substitute $x=u^2$ ($dx=2u\,du$):
$$\Gamma\!\left(\frac12\right)=\int_0^\infty u^{-1}e^{-u^2}\cdot2u\,du=2\int_0^\infty e^{-u^2}\,du.$$
Let $K=\int_0^\infty e^{-u^2}\,du$. Then
$$K^2=\int_0^\infty\!\!\int_0^\infty e^{-(u^2+v^2)}\,du\,dv,$$
a double integral over the first quadrant. Converting to polar coordinates ($u=r\cos\theta,\ v=r\sin\theta,\ du\,dv=r\,dr\,d\theta$; the first quadrant becomes $r\in[0,\infty),\ \theta\in[0,\pi/2]$):
$$K^2=\int_0^{\pi/2}\!\!\int_0^\infty e^{-r^2}r\,dr\,d\theta=\int_0^{\pi/2}\left[-\frac12e^{-r^2}\right]_0^\infty d\theta=\int_0^{\pi/2}\frac12\,d\theta=\frac\pi4.$$
Since $K>0$, $K=\dfrac{\sqrt\pi}2$, so $\Gamma\!\left(\frac12\right)=2K=\sqrt\pi$. $\blacksquare$

*(This is the same polar-coordinate device developed formally in Part VII; here it appears in embryo.)*

### 6.3 Proof of the Beta–Gamma Bridge

**Theorem.** $\displaystyle B(m,n)=\frac{\Gamma(m)\Gamma(n)}{\Gamma(m+n)}$.

**Proof.** Write $\Gamma(m)\Gamma(n)$ as a double integral over the first quadrant:
$$\Gamma(m)\Gamma(n)=\int_0^\infty\!\!\int_0^\infty x^{m-1}y^{n-1}e^{-(x+y)}\,dx\,dy.$$
Change variables to $u=x+y\in(0,\infty)$ and $v=\dfrac x{x+y}\in(0,1)$, i.e. $x=uv,\ y=u(1-v)$. The Jacobian is
$$\frac{\partial(x,y)}{\partial(u,v)}=\det\begin{pmatrix}v&u\\1-v&-u\end{pmatrix}=-uv-u(1-v)=-u,\qquad\left\lvert\frac{\partial(x,y)}{\partial(u,v)}\right\rvert=u.$$
Since $x^{m-1}y^{n-1}=u^{m+n-2}v^{m-1}(1-v)^{n-1}$ and $x+y=u$,
$$\Gamma(m)\Gamma(n)=\int_0^\infty\!\!\int_0^1u^{m+n-2}v^{m-1}(1-v)^{n-1}e^{-u}\cdot u\,dv\,du=\left(\int_0^\infty u^{m+n-1}e^{-u}\,du\right)\!\left(\int_0^1v^{m-1}(1-v)^{n-1}\,dv\right),$$
which is exactly $\Gamma(m+n)\cdot B(m,n)$. Dividing through gives the theorem. $\blacksquare$

### 6.4 Three Disguises of the Beta Function

**Tactic 1 (trigonometric form).**
$$\int_0^{\pi/2}\sin^px\cos^qx\,dx=\frac12B\!\left(\frac{p+1}2,\frac{q+1}2\right)=\frac{\Gamma\!\left(\frac{p+1}2\right)\Gamma\!\left(\frac{q+1}2\right)}{2\,\Gamma\!\left(\frac{p+q+2}2\right)}.$$
*(Obtained by substituting $x=\arcsin\sqrt w$ into $B\!\left(\frac{p+1}2,\frac{q+1}2\right)=\int_0^1w^{(p-1)/2}(1-w)^{(q-1)/2}\,dw$; the reader is encouraged to verify this independently.)*

**Tactic 2 (infinite rational form).**
$$\int_0^\infty\frac{x^{m-1}}{(1+x)^{m+n}}\,dx=B(m,n).$$
**Proof.** Substitute $x=\dfrac t{1-t}$, $t\in(0,1)$, so $1+x=\dfrac1{1-t}$ and $dx=\dfrac{dt}{(1-t)^2}$:
$$\int_0^\infty\frac{x^{m-1}}{(1+x)^{m+n}}\,dx=\int_0^1t^{m-1}(1-t)^{-(m-1)}\cdot(1-t)^{m+n}\cdot\frac{dt}{(1-t)^2}=\int_0^1t^{m-1}(1-t)^{n-1}\,dt=B(m,n).\ \blacksquare$$

> **A Common Pitfall.** Students frequently misapply Tactic 2 to integrals such as $\displaystyle\int_0^\infty\frac{dx}{1+x^3}$ by writing it directly as $B(1/3,2/3)$ — but Tactic 2 requires the denominator to be a power of $(1+x)$ *alone*; here the denominator is $1+x^3$. The correct route substitutes $u=x^3$ first: with $x=u^{1/3}$, $dx=\frac13u^{1/3-1}\,du$,
> $$\int_0^\infty\frac{dx}{1+x^3}=\frac13\int_0^\infty\frac{u^{1/3-1}}{1+u}\,du=\frac13B\!\left(\frac13,\frac23\right)=\frac13\Gamma\!\left(\frac13\right)\Gamma\!\left(\frac23\right).$$
> More generally, the substitution $u=x^n$ shows that
> $$\int_0^\infty\frac{dx}{1+x^n}=\frac1n\,\Gamma\!\left(\frac1n\right)\Gamma\!\left(1-\frac1n\right)=\frac\pi{n\sin(\pi/n)}\qquad(n>1),$$
> using the Reflection Formula of §6.5. For $n=3$ this gives $\dfrac\pi{3\sin(\pi/3)}=\dfrac{2\pi}{3\sqrt3}$ — note the crucial factor of $\frac13$, which is exactly the Jacobian of the substitution $u=x^3$, and exactly what is lost if the Beta form is written down without performing that substitution first.

**Tactic 3 (logarithmic–exponential bridge).**
$$\int_0^1x^m\left(\ln\frac1x\right)^ndx=\frac{\Gamma(n+1)}{(m+1)^{n+1}}.$$
**Proof.** Substitute $t=\ln(1/x)$, i.e. $x=e^{-t}$, $dx=-e^{-t}\,dt$; as $x:0\to1$, $t:\infty\to0$:
$$\int_0^1x^m\left(\ln\frac1x\right)^ndx=\int_0^\infty e^{-mt}\,t^n\,e^{-t}\,dt=\int_0^\infty t^ne^{-(m+1)t}\,dt.$$
Substituting $s=(m+1)t$,
$$=\frac1{(m+1)^{n+1}}\int_0^\infty s^ne^{-s}\,ds=\frac{\Gamma(n+1)}{(m+1)^{n+1}}.\ \blacksquare$$

### 6.5 The Reflection and Duplication Formulas

**Euler's Reflection Formula.** For $0<z<1$,
$$\Gamma(z)\Gamma(1-z)=\frac\pi{\sin(\pi z)}.$$
By Tactic 2 (with $m=z,\ n=1-z$), this is equivalent to $\displaystyle\int_0^\infty\frac{u^{z-1}}{1+u}\,du=\frac\pi{\sin\pi z}$, whose rigorous proof proceeds by contour integration around a keyhole contour avoiding the branch cut of $u^{z-1}$ — a technique from complex analysis lying outside our present scope. We record and use the result, as is standard practice at this level.

**Legendre's Duplication Formula.** For $z>0$,
$$\Gamma(z)\,\Gamma\!\left(z+\frac12\right)=2^{1-2z}\sqrt\pi\,\Gamma(2z).$$
**Proof.** Consider $B(z,z)=\int_0^1[t(1-t)]^{z-1}\,dt$. Substitute $t=\dfrac{1+s}2$, so $t(1-t)=\dfrac{1-s^2}4$ and $dt=\dfrac{ds}2$, with $s$ running over $(-1,1)$:
$$B(z,z)=\frac1{2\cdot4^{z-1}}\int_{-1}^1(1-s^2)^{z-1}\,ds=\frac1{4^{z-1}}\int_0^1(1-s^2)^{z-1}\,ds$$
(the integrand being even). Substitute $w=s^2$ ($ds=\frac1{2\sqrt w}dw$):
$$\int_0^1(1-s^2)^{z-1}\,ds=\frac12\int_0^1w^{-1/2}(1-w)^{z-1}\,dw=\frac12B\!\left(\frac12,z\right).$$
So $B(z,z)=\dfrac1{2\cdot4^{z-1}}B\!\left(\frac12,z\right)$. Writing both Beta functions in terms of Gamma functions,
$$\frac{\Gamma(z)^2}{\Gamma(2z)}=\frac1{2\cdot4^{z-1}}\cdot\frac{\Gamma\!\left(\frac12\right)\Gamma(z)}{\Gamma\!\left(z+\frac12\right)}=\frac{\sqrt\pi}{2\cdot4^{z-1}}\cdot\frac{\Gamma(z)}{\Gamma\!\left(z+\frac12\right)}.$$
Cancelling one factor of $\Gamma(z)$ and rearranging,
$$\Gamma(z)\,\Gamma\!\left(z+\frac12\right)=\frac{2\sqrt\pi}{4^{z-1}}\,\Gamma(2z)=2^{1-2z}\sqrt\pi\,\Gamma(2z).\ \blacksquare$$

Unlike the Reflection Formula, this proof uses nothing beyond the Beta function's own definition — a satisfying instance of a "deep-looking" identity yielding to entirely elementary means.

**Challenge Problem.** Evaluate $\displaystyle I=\int_0^{\pi/2}\sqrt{\tan x}\,dx$.

**Solution.** Write $\sqrt{\tan x}=\sin^{1/2}x\cos^{-1/2}x$ and apply Tactic 1 with $p=\frac12,\ q=-\frac12$:
$$I=\frac12B\!\left(\frac{\frac12+1}2,\frac{-\frac12+1}2\right)=\frac12B\!\left(\frac34,\frac14\right)=\frac12\cdot\frac{\Gamma\!\left(\frac34\right)\Gamma\!\left(\frac14\right)}{\Gamma(1)}=\frac12\,\Gamma\!\left(\frac14\right)\Gamma\!\left(\frac34\right).$$
By the Reflection Formula with $z=\frac14$:
$$\Gamma\!\left(\frac14\right)\Gamma\!\left(\frac34\right)=\frac\pi{\sin\frac\pi4}=\frac\pi{\frac{\sqrt2}2}=\pi\sqrt2.$$
Therefore
$$I=\frac12\cdot\pi\sqrt2=\frac\pi{\sqrt2}.$$
This is among the most celebrated "impossible-looking" integrals at this level: no elementary antiderivative of $\sqrt{\tan x}$ exists as a finite combination of familiar functions along the *indefinite* route, and yet the *definite* integral over a quarter-period falls out in two lines once its Beta-function disguise is recognised.

## Part VII. Multiple Integrals — Double, Triple, and Beyond

### 7.1 Fubini's Theorem and the Order of Integration

**Theorem (Fubini).** If $f$ is continuous on a region $D$, the double integral $\iint_Df\,dA$ may be computed as an iterated integral in either order, the bounds being adjusted to describe $D$ correctly in each:
$$\iint_Df(x,y)\,dA=\int_a^b\int_{g_1(x)}^{g_2(x)}f(x,y)\,dy\,dx=\int_c^d\int_{h_1(y)}^{h_2(y)}f(x,y)\,dx\,dy.$$

**Tactic.** When the *inner* integral has no elementary antiderivative (classic offenders: $e^{-x^2}$, $\frac{\sin x}x$, $e^x/x$), never attempt to force it. Sketch the two-dimensional region $D$, re-describe it by slicing in the *other* direction, and swap the order — the previously impossible inner integral will typically resolve immediately once the order is reversed.

### 7.2 Change of Variables and the Jacobian

When $D$ is not naturally rectangular, map it to a simpler region via $x=x(u,v),\ y=y(u,v)$:
$$\iint_Df(x,y)\,dx\,dy=\iint_{D'}f\big(x(u,v),y(u,v)\big)\,|J|\,du\,dv,\qquad J=\det\begin{pmatrix}\partial x/\partial u&\partial x/\partial v\\\partial y/\partial u&\partial y/\partial v\end{pmatrix}.$$

**Illustration (polar coordinates).** For $x=r\cos\theta,\ y=r\sin\theta$:
$$J=\det\begin{pmatrix}\cos\theta&-r\sin\theta\\\sin\theta&r\cos\theta\end{pmatrix}=r\cos^2\theta+r\sin^2\theta=r,$$
recovering the familiar $dA=r\,dr\,d\theta$ already used, in embryonic form, in the proof of $\Gamma(1/2)=\sqrt\pi$ in Part VI.

| System | Substitution | Volume/Area Element | Typical Use |
|---|---|---|---|
| Polar (2D) | $x=r\cos\theta,\ y=r\sin\theta$ | $r\,dr\,d\theta$ | circles, $x^2+y^2$ |
| Cylindrical (3D) | $x=r\cos\theta,\ y=r\sin\theta,\ z=z$ | $r\,dr\,d\theta\,dz$ | axial symmetry |
| Spherical (3D) | $x=\rho\sin\phi\cos\theta,\ y=\rho\sin\phi\sin\theta,\ z=\rho\cos\phi$ | $\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$ | spheres, distance from origin |

### 7.3 Dirichlet's Integral

**Theorem.** If $V$ is the simplex $x,y,z\geq0,\ x+y+z\leq1$, then for $p,q,r>0$,
$$\iiint_Vx^{p-1}y^{q-1}z^{r-1}\,dx\,dy\,dz=\frac{\Gamma(p)\Gamma(q)\Gamma(r)}{\Gamma(p+q+r+1)}.$$

**Proof.** Integrate first over $z$, from $0$ to $1-x-y$:
$$\int_0^{1-x-y}z^{r-1}\,dz=\frac{(1-x-y)^r}r,$$
reducing the triple integral to $\dfrac1r\displaystyle\iint_{x,y\geq0,\,x+y\leq1}x^{p-1}y^{q-1}(1-x-y)^r\,dx\,dy$. Fix $x\in[0,1]$ and substitute $y=(1-x)s,\ s\in[0,1]$, in the inner integral over $y$:
$$\int_0^{1-x}y^{q-1}(1-x-y)^r\,dy=(1-x)^{q+r}\int_0^1s^{q-1}(1-s)^r\,ds=(1-x)^{q+r}B(q,r+1).$$
So the double integral becomes $B(q,r+1)\displaystyle\int_0^1x^{p-1}(1-x)^{q+r}\,dx=B(q,r+1)\,B(p,q+r+1)$. Assembling,
$$\iiint_Vx^{p-1}y^{q-1}z^{r-1}\,dV=\frac1r\,B(q,r+1)\,B(p,q+r+1).$$
Writing these as Gamma functions and using $\Gamma(r+1)=r\Gamma(r)$,
$$B(q,r+1)=\frac{\Gamma(q)\cdot r\Gamma(r)}{\Gamma(q+r+1)},\qquad B(p,q+r+1)=\frac{\Gamma(p)\Gamma(q+r+1)}{\Gamma(p+q+r+1)},$$
and the product $\dfrac1r\cdot B(q,r+1)\cdot B(p,q+r+1)$ collapses — the factor of $r$ and the factor $\Gamma(q+r+1)$ both cancel — to exactly $\dfrac{\Gamma(p)\Gamma(q)\Gamma(r)}{\Gamma(p+q+r+1)}$. $\blacksquare$

### 7.4 Liouville's Extension

For an ellipsoidal region $\left(\dfrac xa\right)^\alpha+\left(\dfrac yb\right)^\beta+\left(\dfrac zc\right)^\gamma\leq1$ (with $x,y,z\geq0$), substituting $X=(x/a)^\alpha$ (and similarly for $Y,Z$) reduces the region to Dirichlet's simplex. Carrying the Jacobian of this substitution through gives the general formula
$$\iiint x^{p-1}y^{q-1}z^{r-1}\,dV=\frac{a^pb^qc^r}{\alpha\beta\gamma}\cdot\frac{\Gamma\!\left(\frac p\alpha\right)\Gamma\!\left(\frac q\beta\right)\Gamma\!\left(\frac r\gamma\right)}{\Gamma\!\left(\frac p\alpha+\frac q\beta+\frac r\gamma+1\right)}.$$

### 7.5 Symmetry in Higher Dimensions

Exactly as in Part II: if the domain $D$ is symmetric under $x\to-x$ and $f(-x,y,z)=-f(x,y,z)$, the integral vanishes identically — worth checking *before* any computation is attempted, since it frequently disposes of most terms in a polynomial integrand over a sphere or ball.

**Challenge Problem.** Evaluate $\displaystyle\iiint_Vxyz\,dV$, where $V$ is the portion of the unit ball $x^2+y^2+z^2\leq1$ lying in the positive octant ($x,y,z\geq0$).

**Solution.** The boundary is $\left(\frac x1\right)^2+\left(\frac y1\right)^2+\left(\frac z1\right)^2\leq1$, so in the notation of §7.4, $a=b=c=1$ and $\alpha=\beta=\gamma=2$. The integrand $xyz=x^{2-1}y^{2-1}z^{2-1}$ gives $p=q=r=2$. Substituting into Liouville's formula:
$$\iiint_Vxyz\,dV=\frac1{2\cdot2\cdot2}\cdot\frac{\Gamma(1)\,\Gamma(1)\,\Gamma(1)}{\Gamma(1+1+1+1)}=\frac18\cdot\frac1{\Gamma(4)}=\frac18\cdot\frac16=\frac1{48}.$$
*(This may be checked independently in spherical coordinates: the integral factors as $\int_0^1\rho^5\,d\rho\cdot\int_0^{\pi/2}\sin^3\phi\cos\phi\,d\phi\cdot\int_0^{\pi/2}\sin\theta\cos\theta\,d\theta=\frac16\cdot\frac14\cdot\frac12=\frac1{48}$, in exact agreement.)*

What would otherwise require setting up and evaluating an iterated triple integral in spherical coordinates was reduced, by recognising the Liouville pattern, to substituting three numbers into a formula.

---

## Part VIII. Vector Calculus — Green, Stokes, and Gauss

### 8.1 A Unifying Theme

Every theorem in this final Part is a higher-dimensional descendant of the Fundamental Theorem of Calculus proved in §1.1. FTC relates the values of $F$ at the *boundary* of an interval ($\{a,b\}$) to the *interior* behaviour of $F'$; Green's, Stokes', and the Divergence Theorem relate the values of a vector field on the *boundary* of a region (a curve or a surface) to the *interior* behaviour of its derivatives (curl or divergence). It is this family resemblance, more than any surface similarity of formula, that is worth carrying into an examination hall: whenever a problem asks for a boundary integral, ask whether the interior is easier — and vice versa.

### 8.2 Green's Theorem

**Theorem.** Let $C$ be a positively oriented (counterclockwise), piecewise-smooth, simple closed curve bounding a region $D$. If $P,Q$ have continuous partial derivatives on an open region containing $D$,
$$\oint_C(P\,dx+Q\,dy)=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA.$$

**Proof (for a region that is simultaneously "type I" and "type II").** Suppose $D=\{(x,y):a\leq x\leq b,\ g_1(x)\leq y\leq g_2(x)\}$. Then, by the Fundamental Theorem of Calculus applied to the inner integral,
$$\iint_D\frac{\partial P}{\partial y}\,dA=\int_a^b\Big[P(x,g_2(x))-P(x,g_1(x))\Big]\,dx.$$
On the other hand, $C$ consists of the lower boundary $y=g_1(x)$ traversed with increasing $x$, and the upper boundary $y=g_2(x)$ traversed with *decreasing* $x$ (plus vertical segments, contributing nothing to $\oint P\,dx$ since $dx=0$ there):
$$\oint_CP\,dx=\int_a^bP(x,g_1(x))\,dx-\int_a^bP(x,g_2(x))\,dx=-\iint_D\frac{\partial P}{\partial y}\,dA.$$
An identical argument, describing $D$ as a type-II region, shows $\displaystyle\oint_CQ\,dy=\iint_D\frac{\partial Q}{\partial x}\,dA$. Adding the two establishes the theorem for such $D$; general regions are handled by cutting into finitely many pieces of this type, on which shared internal boundaries cancel in pairs. $\blacksquare$

**Tactic: the Area Cheat Code.** Setting $P=-y,\ Q=x$ gives $\dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y}=2$, so
$$\text{Area}(D)=\frac12\oint_C(x\,dy-y\,dx).$$

**Example.** Find the area enclosed by the astroid $x=a\cos^3t,\ y=a\sin^3t,\ t\in[0,2\pi]$.

Here $dx=-3a\cos^2t\sin t\,dt,\ dy=3a\sin^2t\cos t\,dt$, so
$$x\,dy-y\,dx=3a^2\cos^4t\sin^2t\,dt+3a^2\sin^4t\cos^2t\,dt=3a^2\sin^2t\cos^2t\,dt=\frac{3a^2}4\sin^2(2t)\,dt.$$
Hence
$$\text{Area}=\frac12\int_0^{2\pi}\frac{3a^2}4\sin^2(2t)\,dt=\frac{3a^2}8\int_0^{2\pi}\sin^2(2t)\,dt=\frac{3a^2}8\cdot\pi=\frac{3\pi a^2}8,$$
using $\int_0^{2\pi}\sin^2(2t)\,dt=\pi$ (the mean value of $\sin^2$ over a whole number of periods is $\frac12$).

### 8.3 Stokes' Theorem

**Theorem.** For a piecewise-smooth oriented surface $S$ with boundary curve $C$ (oriented consistently via the right-hand rule),
$$\oint_C\mathbf F\cdot d\mathbf r=\iint_S(\nabla\times\mathbf F)\cdot d\mathbf S.$$

This is the three-dimensional generalisation of Green's Theorem — indeed, when $S$ is flat and lies in the $xy$-plane, Stokes' Theorem *is* Green's Theorem, since $(\nabla\times\mathbf F)\cdot\mathbf k=\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}$. The proof for a general surface proceeds by parametrising $S$, pulling the surface integral of the curl back to a planar double integral over the parameter domain, and invoking Green's Theorem there; we omit the notationally heavy details.

**Tactic: Surface-Swapping.** Since the right-hand side depends on $S$ only through its boundary $C$, *any* two surfaces sharing the same boundary curve give the same value. If $S$ is awkward (a twisted, curved cap), replace it with the flattest possible surface sharing $\partial S=C$ — typically a plane — and integrate the curl over that instead. (Compare the "closing the lid" tactic below, which is the same idea applied to closed surfaces instead of open ones.)

### 8.4 The Divergence Theorem

**Theorem.** For a solid region $V$ with piecewise-smooth boundary surface $S=\partial V$, oriented outward,
$$\iint_S\mathbf F\cdot d\mathbf S=\iiint_V(\nabla\cdot\mathbf F)\,dV.$$

**Proof (for a "vertically simple" solid).** Let $V=\{(x,y,z):(x,y)\in D,\ z_1(x,y)\leq z\leq z_2(x,y)\}$, with vertical side walls (so the outward normal on the sides is horizontal). Consider just the $z$-component of the flux, taking $\mathbf F=(0,0,F_3)$. By FTC,
$$\iiint_V\frac{\partial F_3}{\partial z}\,dV=\iint_D\Big[F_3(x,y,z_2(x,y))-F_3(x,y,z_1(x,y))\Big]\,dA.$$
On the top surface $z=z_2(x,y)$ (outward normal pointing up), the standard formula for a graph gives $\mathbf k\cdot d\mathbf S=dA$, so its contribution to $\iint_SF_3\,\mathbf k\cdot d\mathbf S$ is $\iint_DF_3(x,y,z_2)\,dA$. On the bottom surface $z=z_1(x,y)$ (outward normal pointing *down*), the contribution is $-\iint_DF_3(x,y,z_1)\,dA$. The vertical sides contribute nothing, since their outward normal is horizontal ($\mathbf k\cdot\mathbf n=0$ there). Summing exactly reproduces the volume integral above. The same argument, with $x,y,z$ permuted, handles the $F_1$ and $F_2$ components for a solid simple in all three directions; summing all three establishes the full theorem. $\blacksquare$

**Tactic: "Closing the Lid."** If a problem gives an *open* surface (a hemisphere without its base, say) and asks for a flux, the Divergence Theorem cannot be applied directly. Instead, close the surface with a simple "lid," apply the Divergence Theorem to the resulting closed solid, and subtract the (usually much easier) flux through the lid.

### 8.5 Conservative Fields and Path Independence

Before attempting $\int_A^B\mathbf F\cdot d\mathbf r$ along a complicated path, always check the curl. If $\nabla\times\mathbf F=\mathbf0$ (equivalently $\frac{\partial Q}{\partial x}=\frac{\partial P}{\partial y}$ in the plane) on a simply connected domain, $\mathbf F$ is conservative: the integral around any closed loop is zero, and for an open path, $\int_A^B\mathbf F\cdot d\mathbf r=f(B)-f(A)$ for the scalar potential $f$ with $\nabla f=\mathbf F$ — utterly independent of the path taken.

**Challenge Problem.** Let $S$ be the open upper hemisphere $x^2+y^2+z^2=a^2,\ z\geq0$ (excluding the equatorial disk), oriented outward, and let
$$\mathbf F=\big(x+e^{yz}\big)\,\mathbf i+\big(y-e^{xz}\big)\,\mathbf j+z\,\mathbf k.$$
Evaluate $\displaystyle\iint_S\mathbf F\cdot d\mathbf S$.

**Solution.** A direct computation is hopeless: parametrising the hemisphere and substituting leaves integrals of $e^{yz}$ and $e^{xz}$ over a curved surface, admitting no elementary closed form. This is the signal to close the lid.

First, the divergence:
$$\nabla\cdot\mathbf F=\frac{\partial}{\partial x}\big(x+e^{yz}\big)+\frac{\partial}{\partial y}\big(y-e^{xz}\big)+\frac{\partial}{\partial z}(z)=1+1+1=3$$
— the exponential terms vanish under differentiation because each depends only on the *other two* variables, never the one being differentiated. (This is not an accident of this particular problem; it is exactly how such "decoy" terms are engineered by problem-setters.)

Let $V$ be the solid upper half-ball and close $S$ with the equatorial disk $D:\ x^2+y^2\leq a^2,\ z=0$, whose outward normal (pointing out of $V$) is $-\mathbf k$. On $D$,
$$\mathbf F\cdot(-\mathbf k)=-z=0,$$
so the flux through the lid is *exactly zero*, regardless of the exponential terms — because those terms never even enter a computation that dots only with $-\mathbf k$.

By the Divergence Theorem applied to the closed surface $S\cup D=\partial V$:
$$\iint_S\mathbf F\cdot d\mathbf S+\underbrace{\iint_D\mathbf F\cdot d\mathbf S}_{=0}=\iiint_V3\,dV=3\cdot\text{Vol}(V)=3\cdot\frac23\pi a^3=2\pi a^3.$$
Therefore
$$\iint_S\mathbf F\cdot d\mathbf S=2\pi a^3.$$
Just as with Stokes' surface-swapping tactic above, the closed hemisphere's cap could equally well have been replaced by *any* surface sharing its boundary circle; the flat disk is simply the cheapest one available.

---

## Appendix A. Master Formula Sheet

**Part I — Foundations**
$$\int_a^bf(x)\,dx=G(b)-G(a);\qquad\int u\,dv=uv-\int v\,du;\qquad\int e^x[f(x)+f'(x)]\,dx=e^xf(x)+C.$$

**Part II — Symmetry**
$$\int_a^bf(x)\,dx=\int_a^bf(a+b-x)\,dx;\qquad\int_0^{nT}f=n\int_0^Tf\ \text{ if } f \text{ has period } T.$$

**Part III — Tactical Substitutions**
Extract $x^n$ from $(a+bx^n)^{p/q}$; twins $t=x\pm\frac1x$ for $\frac{x^2\pm1}{x^4+kx^2+1}$; invert with $x=\frac1t$; Euler's three substitutions for $\sqrt{ax^2+bx+c}$.

**Part IV — Feynman's Trick**
$$\frac{d}{d\alpha}\int_a^bf(x,\alpha)\,dx=\int_a^b\frac{\partial f}{\partial\alpha}\,dx;\qquad\int_0^\infty\frac{du}{(u^2+p^2)(u^2+q^2)}=\frac\pi{2pq(p+q)}.$$

**Part V — Weierstrass**
$$t=\tan\frac x2:\quad\sin x=\frac{2t}{1+t^2},\ \ \cos x=\frac{1-t^2}{1+t^2},\ \ dx=\frac{2\,dt}{1+t^2}.$$
$a\sin x+b\cos x+c$ Weierstrass-simplifies to a perfect square exactly when $a^2+b^2=c^2$.

**Part VI — Gamma and Beta**
$$\Gamma(n)=(n-1)!;\quad\Gamma\!\left(\tfrac12\right)=\sqrt\pi;\quad B(m,n)=\frac{\Gamma(m)\Gamma(n)}{\Gamma(m+n)};\quad\int_0^{\pi/2}\sin^p\!x\cos^q\!x\,dx=\frac12B\!\left(\tfrac{p+1}2,\tfrac{q+1}2\right);$$
$$\int_0^\infty\frac{x^{m-1}}{(1+x)^{m+n}}\,dx=B(m,n);\quad\int_0^1x^m\!\left(\ln\tfrac1x\right)^ndx=\frac{\Gamma(n+1)}{(m+1)^{n+1}};$$
$$\Gamma(z)\Gamma(1-z)=\frac\pi{\sin\pi z};\qquad\Gamma(z)\Gamma\!\left(z+\tfrac12\right)=2^{1-2z}\sqrt\pi\,\Gamma(2z);\qquad\int_0^\infty\frac{dx}{1+x^n}=\frac\pi{n\sin(\pi/n)}.$$

**Part VII — Multiple Integrals**
$$dA_{\text{polar}}=r\,dr\,d\theta;\quad dV_{\text{cyl}}=r\,dr\,d\theta\,dz;\quad dV_{\text{sph}}=\rho^2\sin\phi\,d\rho\,d\phi\,d\theta;$$
$$\iiint_{\text{simplex}}x^{p-1}y^{q-1}z^{r-1}\,dV=\frac{\Gamma(p)\Gamma(q)\Gamma(r)}{\Gamma(p+q+r+1)}\quad\text{(Dirichlet)};$$
$$\iiint x^{p-1}y^{q-1}z^{r-1}\,dV=\frac{a^pb^qc^r}{\alpha\beta\gamma}\cdot\frac{\Gamma(p/\alpha)\Gamma(q/\beta)\Gamma(r/\gamma)}{\Gamma(p/\alpha+q/\beta+r/\gamma+1)}\quad\text{(Liouville, ellipsoid).}$$

**Part VIII — Vector Calculus**
$$\oint_C(P\,dx+Q\,dy)=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA;\qquad\text{Area}=\frac12\oint_C(x\,dy-y\,dx);$$
$$\oint_C\mathbf F\cdot d\mathbf r=\iint_S(\nabla\times\mathbf F)\cdot d\mathbf S\quad\text{(Stokes)};\qquad\iint_S\mathbf F\cdot d\mathbf S=\iiint_V(\nabla\cdot\mathbf F)\,dV\quad\text{(Gauss)};$$
$\nabla\times\mathbf F=\mathbf 0$ on a simply connected domain $\iff$ $\mathbf F$ conservative $\iff$ path-independent, value $=f(B)-f(A)$.

---

## Closing Remarks — A Problem-Solver's Philosophy

Three habits separate the candidate who merely *knows* these results from the one who *deploys* them under time pressure.

**First, look before you compute.** Every technique in this treatise exists because someone recognised a pattern — a Pythagorean triple hiding in three coefficients, a factor of $f+f'$ disguised inside a quotient, a bi-quadratic denominator signalling $x\pm\frac1x$ — before writing a single line of algebra. The recognition is the hard part; the calculus that follows is almost always mechanical.

**Second, symmetry outranks brute force.** An integral that surrenders in two lines to King's Rule, to a parity argument, or to the Dirichlet/Liouville formulas will resist an hour of direct computation along the "obvious" route. Whenever an interval, a domain, or an integrand looks even faintly symmetric, test the symmetry before doing anything else.

**Third, the boundary is often easier than the interior, and vice versa.** This single idea, present already in the Fundamental Theorem of Calculus of §1.1, is the entire content of Green's Theorem, Stokes' Theorem, and the Divergence Theorem. It is worth asking of every such problem — *would the other side of this theorem be easier?* — before committing to a method. The hemisphere-flux problem of Part VIII exists precisely to make the cost of ignoring this question vivid: computed directly, it is all but impossible; computed via its boundary's boundary, it is three lines.

The techniques collected here will not, by themselves, solve every hard integral a JEE Advanced paper or an Olympiad shortlist can produce — no finite list could. What they will do is furnish the first move for the overwhelming majority of problems these examinations actually set, which is very often the only move that matters.
