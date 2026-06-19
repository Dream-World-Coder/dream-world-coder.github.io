import { CornerPlusIcons } from "@/components/Decorum";
import Link from "next/link";
import {
    SectionLabel,
    Affiliation,
    Project as CurrentActivity,
    LinkBox,
} from "./components";
import { projects as activityData } from "./projects";

export default async function Page() {
    const title = `B.Tech Information Technology | IIEST'27` satisfies string;

    const about =
        `Trying to understand systems, design them, and in search of their limits. Can they adapt? I love Research,
        exploring algorithms and sometimes competitive programming.` satisfies string;

    const exps = [
        {
            role: "Research Intern",
            org: "Chennai Mathematical Institute",
            detail: "Working on LLMs",
            link: "www.cmi.ac.in",
        },
        {
            role: "AEH Intern",
            org: "Accenture",
            detail: "Oracle Stuff",
            link: "accenture.com",
        },
        {
            role: "Research Fellow",
            org: "TEXMiN IIT(ISM) Dhanbad, NM-ICPS",
            detail: "ML & CPS",
            link: "texmin.in",
        },
        {
            role: "Web Development Lead",
            org: "CODEIIEST, IIEST Shibpur",
            detail: "",
            link: "codeiiest.in",
        },
    ] satisfies { role: string; org: string; detail: string; link: string }[];

    const links = [
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
    ] satisfies { label: string; href: string }[];

    return (
        <div className="flex justify-center size-full min-h-screen py-8 md:py-16">
            <section
                className="w-[90dvw] max-w-[780px] bg-[#f8f8f8] text-black
                    border border-dashed border-neutral-300/80
                    p-8 md:p-14 flex flex-col justify-start items-start relative"
            >
                <Link
                    href="/"
                    className="font-mono text-xs text-neutral-600 hover:text-black mb-12 tracking-wide"
                >
                    ← The Invariant;
                </Link>

                <div className="mb-8">
                    <h1 className="font-serif text-4xl mb-2">Subhajit Gorai</h1>
                    <p className="font-mono text-xs text-neutral-600 tracking-wide">
                        {title}
                    </p>
                </div>

                <div className="mb-12 max-w-[100ch]">
                    <p className="font-mono leading-tight text-neutral-800 text-[0.95rem]">
                        {about}
                    </p>
                </div>

                {/* exp */}
                <div className="mb-12 w-full">
                    <SectionLabel>Currently</SectionLabel>
                    <div className="space-y-3">
                        {exps.map((i) => (
                            <Affiliation
                                key={i.role}
                                role={i.role}
                                org={i.org}
                                detail={i.detail}
                                link={i.link}
                            />
                        ))}
                    </div>
                </div>

                {/* projects + publications */}
                <div className="mb-12 w-full">
                    <SectionLabel>Recent Works</SectionLabel>
                    <div className="space-y-10">
                        {activityData.map((act) => (
                            <CurrentActivity
                                key={act.title}
                                title={act.title}
                                period={act.period}
                                links={act.links}
                                stack={act.stack}
                            >
                                {act.description}
                            </CurrentActivity>
                        ))}
                    </div>
                </div>

                {/* CP */}
                <div className="mb-12 w-full">
                    <SectionLabel>Competitive Programming</SectionLabel>
                    <div className="font-mono text-sm text-neutral-700">
                        <p>love solving these problems</p>
                        <p>
                            Codeforces Expert • peak 2029
                            <br />
                            CodeChef 5-star • peak 2026
                        </p>
                    </div>
                </div>

                {/* Links */}
                <div className="w-full">
                    <SectionLabel>Links</SectionLabel>
                    <div className="flex flex-wrap gap-x-3 gap-y-3 font-mono text-sm tracking-wide">
                        {links.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm"
                            >
                                <LinkBox itm={label} />
                            </a>
                        ))}
                    </div>
                </div>

                <CornerPlusIcons />
            </section>
        </div>
    );
}
