import React from "react";

export interface H4Item {
    text: string;
    id: string;
}

export interface Subheading {
    text: string;
    id: string;
    h4s: H4Item[];
}

export interface Heading {
    text: string;
    id: string;
    subheadings: Subheading[];
}

export const extractTextFromReactChildren = (
    children: React.ReactNode,
): string => {
    if (typeof children === "string" || typeof children === "number") {
        return String(children);
    }

    if (Array.isArray(children)) {
        return children.map(extractTextFromReactChildren).join("");
    }

    // Use React.isValidElement for type-safe checking
    if (React.isValidElement(children)) {
        // Explicitly type the props so TypeScript knows 'children' might exist
        const props = children.props as { children?: React.ReactNode };

        if (props.children) {
            return extractTextFromReactChildren(props.children);
        }
    }

    return "";
};

export function generateId(children: React.ReactNode): string {
    if (!children) return window.crypto.randomUUID();

    const rawText = extractTextFromReactChildren(children);
    if (!rawText) return window.crypto.randomUUID();

    return rawText
        .toLowerCase()
        .replace(/<\/?u>/g, "")
        .replace(/\$\$[\s\S]*?\$\$/g, "")
        .replace(/\$[^$]*?\$/g, "")
        .replace(/\\\[[\s\S]*?\\\]/g, "")
        .replace(/\\\([\s\S]*?\\\)/g, "")
        .replace(/\\[a-zA-Z]+\{[^}]*\}/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export const parseTableOfContents = (content: string): Heading[] => {
    content = content?.replace(/```[\s\S]*?```/g, "");
    if (!content) return [];

    const lines = content.split("\n");
    const tableOfContents: Heading[] = [];

    let currentHeading: Heading | null = null;
    let currentSubheading: Subheading | null = null;

    const cleanText = (str: string) => str.trim().replace(/<\/?u>/g, "");

    for (const line of lines) {
        if (line.startsWith("# ")) {
            // Ignore H1 entirely
            continue;
        } else if (line.startsWith("## ")) {
            const text = cleanText(line.substring(3).trim());
            const id = generateId(text);

            currentHeading = { text, id, subheadings: [] };
            tableOfContents.push(currentHeading);
            currentSubheading = null; // Reset subheading
        } else if (line.startsWith("### ")) {
            const text = cleanText(line.substring(4).trim());
            const id = generateId(text);

            currentSubheading = { text, id, h4s: [] };

            // Failsafe: if h3 appears before any h2
            if (!currentHeading) {
                currentHeading = { text: "", id: "", subheadings: [] };
                tableOfContents.push(currentHeading);
            }
            currentHeading.subheadings.push(currentSubheading);
        } else if (line.startsWith("#### ")) {
            const text = cleanText(line.substring(5).trim());
            const id = generateId(text);
            const h4: H4Item = { text, id };

            // Failsafes: if h4 appears before h2 or h3
            if (!currentHeading) {
                currentHeading = { text: "", id: "", subheadings: [] };
                tableOfContents.push(currentHeading);
            }
            if (!currentSubheading) {
                currentSubheading = { text: "", id: "", h4s: [] };
                currentHeading.subheadings.push(currentSubheading);
            }

            currentSubheading.h4s.push(h4);
        }
    }

    return tableOfContents;
};

interface TableOfContentsProps {
    tableOfContents: Heading[];
}

export const TableOfContents = ({ tableOfContents }: TableOfContentsProps) => {
    return (
        <aside className="hidden lg:block fixed left-1/2 -translate-x-1/2 w-full max-w-[1368px] px-2 z-30 pointer-events-none">
            <div className="pointer-events-auto w-[270px] h-[calc(100vh-3rem)] bg-[#f8f8f8] dark:bg-neutral-900 text-black dark:text-[#f8f8f8] border border-dashed border-neutral-300/80 dark:border-neutral-700/80 p-6 py-10 relative flex flex-col">
                <div className="font-serif text-xl pb-4 font-bold capitalize border-b border-neutral-200 dark:border-neutral-800 mb-4">
                    Table of Contents
                </div>

                <div
                    data-lenis-prevent
                    className="overflow-y-auto no-scrollbar flex-1 pb-10"
                >
                    <ul className="pl-1 pt-2 space-y-3 font-serif">
                        {tableOfContents.map((heading, headingIndex) => (
                            <li key={`heading-${headingIndex}`}>
                                {heading.text && (
                                    <a
                                        href={`#${heading.id}`}
                                        className="flex items-start gap-2 font-bold text-base text-neutral-800 dark:text-neutral-200 hover:underline leading-snug group"
                                    >
                                        <span className="shrink-0 mt-0.5 text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/40 rounded px-1 py-0.5 group-hover:bg-sky-200 dark:group-hover:bg-sky-800/50 transition-colors">
                                            {headingIndex + 1}
                                        </span>
                                        <span>{heading.text}</span>
                                    </a>
                                )}

                                {heading.subheadings.length > 0 && (
                                    <ul className="pl-4 mt-2 space-y-2 border-l-2 border-sky-200 dark:border-neutral-600 ml-2">
                                        {heading.subheadings.map(
                                            (subheading, subheadingIndex) => (
                                                <li
                                                    key={`subheading-${headingIndex}-${subheadingIndex}`}
                                                >
                                                    {subheading.text && (
                                                        <a
                                                            href={`#${subheading.id}`}
                                                            className="flex items-start gap-2 font-medium text-sm text-neutral-700 dark:text-neutral-300 hover:underline leading-snug group"
                                                        >
                                                            <span className="shrink-0 mt-0.5 text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                                                                {headingIndex +
                                                                    1}
                                                                .
                                                                {subheadingIndex +
                                                                    1}
                                                            </span>
                                                            <span>
                                                                {
                                                                    subheading.text
                                                                }
                                                            </span>
                                                        </a>
                                                    )}

                                                    {subheading.h4s.length >
                                                        0 && (
                                                        <ul className="pl-4 mt-1.5 space-y-1.5 border-l border-neutral-300 dark:border-neutral-600 ml-1">
                                                            {subheading.h4s.map(
                                                                (
                                                                    h4,
                                                                    h4Index,
                                                                ) => (
                                                                    <li
                                                                        key={`h4-${headingIndex}-${subheadingIndex}-${h4Index}`}
                                                                    >
                                                                        <a
                                                                            href={`#${h4.id}`}
                                                                            className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400 text-xs hover:underline leading-snug"
                                                                        >
                                                                            <span className="shrink-0 mt-0.5 text-neutral-400 dark:text-neutral-500 font-mono">
                                                                                {headingIndex +
                                                                                    1}

                                                                                .
                                                                                {subheadingIndex +
                                                                                    1}

                                                                                .
                                                                                {h4Index +
                                                                                    1}
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    h4.text
                                                                                }
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    )}
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};
