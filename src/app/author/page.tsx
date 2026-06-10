import { CornerPlusIcons } from "@/components/Decorum";
import Link from "next/link";

export default async function Page() {
    return (
        <div className="flex justify-center size-full min-h-screen py-8 md:py-16">
            <section
                className="w-[90dvw] max-w-[780px] bg-[#f8f8f8] dark:bg-neutral-900 text-black dark:text-[#f8f8f8]
                    border border-dashed border-neutral-300/80 dark:border-neutral-700/80
                    p-8 md:p-14 flex flex-col justify-start items-start relative"
            >
                <Link
                    href="/"
                    className="font-mono text-xs text-neutral-400 hover:text-black dark:hover:text-white mb-12 tracking-wide"
                >
                    ← The Invariant;
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-serif text-4xl mb-2">Subhajit Gorai</h1>
                    <p className="font-mono text-xs text-neutral-400 dark:text-neutral-500 tracking-wide">
                        B.Tech Information Technology · IIEST Shibpur ·
                        2023–2027
                    </p>
                </div>

                {/* About */}
                <div className="mb-12 max-w-[60ch]">
                    <p className="font-serif leading-relaxed text-neutral-800 dark:text-neutral-200 text-[0.95rem]">
                        Final year undergraduate interested in the structural
                        underpinnings of computation, where algebra and
                        algorithms coincide, where a segment tree is a monoid,
                        and where the assumptions hiding inside a physical model
                        can be made precise. Competitive programmer. This blog
                        is where those observations go when they are too long
                        for a margin note.
                    </p>
                </div>

                {/* Currently */}
                <div className="mb-12 w-full">
                    <SectionLabel>Currently</SectionLabel>
                    <div className="space-y-3">
                        <Affiliation
                            role="Research Intern"
                            org="Chennai Mathematical Institute"
                            detail="under Prof. Pranabendu Misra — streaming, deep learning, large language models"
                        />
                        <Affiliation
                            role="AEH Intern"
                            org="Accenture"
                            detail="Oracle Cloud Infrastructure"
                        />
                        <Affiliation
                            role="Undergraduate Research Fellow"
                            org="IIT(ISM) Dhanbad, NM-ICPS"
                            detail="CPS architecture for predictive mine safety, INR 1L grant"
                        />
                        <Affiliation
                            role="Web Development Lead"
                            org="CODEIIEST, IIEST Shibpur"
                        />
                    </div>
                </div>

                {/* Projects */}
                <div className="mb-12 w-full">
                    <SectionLabel>Selected Work</SectionLabel>

                    <div className="space-y-10">
                        {/*<Project
                            title="Rusty-RAG"
                            period="systems"
                            links={[]}
                            stack="Rust · WASM · HNSW · SIMD128"
                        >
                            l
                        </Project>*/}

                        <Project
                            title="Computable Poetry"
                            period="Dec 2025 – present"
                            links={[
                                {
                                    label: "live",
                                    href: "https://computable-poetry.vercel.app",
                                },
                                {
                                    label: "github",
                                    href: "https://github.com/Dream-World-Coder/computable_poetry",
                                },
                            ]}
                            stack="Formal Grammars · Graph Theory · Constraint Satisfaction"
                        >
                            The question was whether Bangla prosody — mātrā
                            counts, rhyme classes, semantic coherence across
                            lines — could be expressed as a proper constraint
                            satisfaction problem and solved without any ML.
                            Two-level CFG (semantic grammar over POS grammar),
                            k-hop Dijkstra on a layered semantic graph for
                            cross-line coherence, inverted index over a tagged
                            lexicon scraped from 300+ classical poems. It
                            produces metrically correct verse. Whether what it
                            produces is poetry is a separate question.
                        </Project>

                        <Project
                            title="OpenCanvas"
                            period="Dec 2024 – May 2026"
                            links={[
                                {
                                    label: "live",
                                    href: "https://opencanvas.institute",
                                },
                                {
                                    label: "github",
                                    href: "https://github.com/Dream-World-Coder/opencanvas",
                                },
                            ]}
                            stack="MERN"
                        >
                            ArXiv is too stiff, Medium is too loose, and there
                            is nowhere to publish a half formed research idea to
                            people who will actually understand it. OpenCanvas
                            sits between a preprint and a tweet thread, a place
                            for early stage work that is ideologically valuable
                            but not yet polished. It also aggregates metadata
                            from 22 institutions so you can browse papers
                            without drowning in Google Scholar. Built over 1.5
                            years, 26,000+ lines. Stress-tested to 17,007 RPS on
                            a 1.4M document database.
                        </Project>
                    </div>
                </div>

                {/* CP */}
                <div className="mb-12 w-full">
                    <SectionLabel>Competitive Programming</SectionLabel>
                    <div className="font-serif text-sm text-neutral-700 dark:text-neutral-300 space-y-1.5 leading-relaxed">
                        <p>Codeforces Expert · peak rating 2029.</p>
                        <p>
                            CodeChef 5-star · max rating 2026 · Global Rank 31,
                            Starters 239 (Div. 2).
                        </p>
                    </div>
                </div>

                {/* Links */}
                <div className="w-full">
                    <SectionLabel>Links</SectionLabel>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs tracking-wide">
                        {(
                            [
                                {
                                    label: "GitHub",
                                    href: "https://github.com/dream-world-coder",
                                },
                                {
                                    label: "LinkedIn",
                                    href: "https://linkedin.com/in/subhajitgorai",
                                },
                                {
                                    label: "Portfolio",
                                    href: "https://subhajitgorai.pages.dev",
                                },
                                {
                                    label: "Codeforces",
                                    href: "https://codeforces.com/profile/midnight_dream",
                                },
                                {
                                    label: "CodeChef",
                                    href: "https://www.codechef.com/users/midnight_dream",
                                },
                                {
                                    label: "mail",
                                    href: "mailto:blog.opencanvas@gmail.com",
                                },
                            ] satisfies { label: string; href: string }[]
                        ).map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 dark:text-neutral-500 underline underline-offset-2 hover:text-black dark:hover:text-white transition-colors"
                            >
                                {label} ↗
                            </a>
                        ))}
                    </div>
                </div>

                <CornerPlusIcons />
            </section>
        </div>
    );
}

/* * helpers * */

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 mb-4 pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-700">
            {children}
        </p>
    );
}

interface AffiliationProps {
    role: string;
    org: string;
    detail?: string;
}

function Affiliation({ role, org, detail }: AffiliationProps) {
    return (
        <div className="font-serif text-sm text-neutral-700 dark:text-neutral-300">
            <span className="text-black dark:text-neutral-100">{role}</span>
            {" · "}
            {org}
            {detail && (
                <span className="text-neutral-400 dark:text-neutral-500">
                    {" · "}
                    {detail}
                </span>
            )}
        </div>
    );
}

interface ProjectLink {
    label: string;
    href: string;
}

interface ProjectProps {
    title: string;
    period: string;
    links: ProjectLink[];
    stack: string;
    children: React.ReactNode;
}

function Project({ title, period, links, stack, children }: ProjectProps) {
    return (
        <div className="max-w-[60ch]">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <span className="font-serif font-semibold text-base">
                    {title}
                </span>
                <span className="font-mono text-[0.65rem] text-neutral-400 dark:text-neutral-500">
                    {period}
                </span>
                {links.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[0.65rem] text-neutral-400 dark:text-neutral-500 underline underline-offset-2 hover:text-black dark:hover:text-white transition-colors"
                    >
                        {label} ↗
                    </a>
                ))}
            </div>
            <p className="font-mono text-[0.65rem] text-neutral-400 dark:text-neutral-500 mb-2 tracking-wide">
                {stack}
            </p>
            <p className="font-serif text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {children}
            </p>
        </div>
    );
}
