import { ActivityData } from "./activities";

export function LinkBox({ itm }: { itm: string }) {
    return <span className="border bg-sky-200/40">{itm}</span>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-neutral-600 mb-4 pb-2 border-b border-dashed border-neutral-400">
            {children}
        </p>
    );
}

interface AffiliationProps {
    role: string;
    org: string;
    detail?: string;
    link: string;
}

export function Affiliation({ role, org, detail, link }: AffiliationProps) {
    return (
        <div className="font-mono text-sm text-neutral-700">
            <span className="text-black">{role}</span>
            {" • "}
            <a target="_blank" href={"https://" + link}>
                <LinkBox itm={org} />
            </a>
            {detail && (
                <span className="text-neutral-600">
                    {" • "}
                    {detail}
                </span>
            )}
        </div>
    );
}

export function Activity({
    title,
    period,
    stack,
    links,
    description,
}: ActivityData) {
    return (
        <div className="max-w-[100ch]">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <span className="font-serif font-semibold text-base">
                    {title}
                </span>
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
            {/*<p className="font-sans text-[0.85rem] text-neutral-600 mb-2 _tracking-wide">
                {stack}
            </p>*/}
            <p
                className="font-mono text-sm text-neutral-700 leading-tight"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
}
