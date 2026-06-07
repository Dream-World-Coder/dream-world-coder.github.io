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

export interface TitleItem {
    text: string;
    id: string;
    headings: Heading[];
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
    if (
        children &&
        typeof children === "object" &&
        "props" in children &&
        (children as React.ReactElement).props
    ) {
        return extractTextFromReactChildren(children as React.ReactElement);
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

export const parseTableOfContents = (content: string): TitleItem[] => {
    content = content?.replace(/```[\s\S]*?```/g, "");
    if (!content) return [];

    const lines = content.split("\n");
    const tableOfContents: TitleItem[] = [];
    let currentTitle: TitleItem | null = null;
    let currentHeading: Heading | null = null;
    let currentSubheading: Subheading | null = null;

    const cleanText = (str: string) => str.trim().replace(/<\/?u>/g, "");

    for (const line of lines) {
        if (line.startsWith("# ")) {
            const text = cleanText(line.substring(2).trim());
            const id = generateId(text);
            currentTitle = { text, id, headings: [] };
            tableOfContents.push(currentTitle);
            currentHeading = null;
            currentSubheading = null;
        } else if (line.startsWith("## ")) {
            const text = cleanText(line.substring(3).trim());
            const id = generateId(text);
            currentHeading = { text, id, subheadings: [] };
            if (!currentTitle) {
                currentTitle = { text: "", id: "", headings: [] };
                tableOfContents.push(currentTitle);
            }
            currentTitle.headings.push(currentHeading);
            currentSubheading = null;
        } else if (line.startsWith("### ")) {
            const text = cleanText(line.substring(4).trim());
            const id = generateId(text);
            currentSubheading = { text, id, h4s: [] };
            if (!currentHeading && currentTitle) {
                currentHeading = { text: "", id: "", subheadings: [] };
                currentTitle.headings.push(currentHeading);
            } else if (!currentHeading && !currentTitle) {
                currentTitle = { text: "", id: "", headings: [] };
                currentHeading = { text: "", id: "", subheadings: [] };
                tableOfContents.push(currentTitle);
                currentTitle.headings.push(currentHeading);
            }
            currentHeading!.subheadings.push(currentSubheading);
        } else if (line.startsWith("#### ")) {
            const text = cleanText(line.substring(5).trim());
            const id = generateId(text);
            const h4: H4Item = { text, id };
            if (!currentSubheading && currentHeading) {
                currentSubheading = { text: "", id: "", h4s: [] };
                currentHeading.subheadings.push(currentSubheading);
            } else if (!currentSubheading && !currentHeading && currentTitle) {
                currentHeading = { text: "", id: "", subheadings: [] };
                currentSubheading = { text: "", id: "", h4s: [] };
                currentTitle.headings.push(currentHeading);
                currentHeading.subheadings.push(currentSubheading);
            } else if (!currentSubheading && !currentHeading && !currentTitle) {
                currentTitle = { text: "", id: "", headings: [] };
                currentHeading = { text: "", id: "", subheadings: [] };
                currentSubheading = { text: "", id: "", h4s: [] };
                tableOfContents.push(currentTitle);
                currentTitle.headings.push(currentHeading);
                currentHeading.subheadings.push(currentSubheading);
            }
            currentSubheading!.h4s.push(h4);
        }
    }

    return tableOfContents;
};

interface TableOfContentsProps {
    tableOfContents: TitleItem[];
}

export const TableOfContents = ({ tableOfContents }: TableOfContentsProps) => {
    return (
        <aside className="w-full h-full lg:w-72 relative">
            <div className="fixed top-20 lg:top-24 right-4 lg:right-16 2xl:right-16 w-52 lg:w-72 2xl:w-[400px] px-0 no-scrollbar">
                <div className="font-serif text-xl px-2 py-2 bg-lime-200 dark:bg-neutral-700 rounded text-black dark:text-[#f8f8f8] hidden lg:block">
                    Table of Contents
                </div>

                <div
                    data-lenis-prevent
                    className="max-h-[600px] overflow-y-auto pb-4 bg-lime-100 dark:bg-neutral-700
            rounded lg:bg-transparent lg:dark:bg-transparent shadow-md md:shadow-none no-scrollbar mt-2"
                >
                    <ul className="pl-1 pt-2 space-y-3">
                        {tableOfContents.map((title, titleIndex) => (
                            <li key={`title-${titleIndex}`}>
                                {title.text && (
                                    <a
                                        href={`#${title.id}`}
                                        className="flex items-start gap-2 font-bold text-base text-neutral-800 dark:text-neutral-200 hover:underline leading-snug group"
                                    >
                                        <span className="shrink-0 mt-0.5 text-xs font-mono font-semibold text-lime-600 dark:text-lime-400 bg-lime-100 dark:bg-lime-900/40 rounded px-1 py-0.5 group-hover:bg-lime-200 dark:group-hover:bg-lime-800/50 transition-colors">
                                            {titleIndex + 1}
                                        </span>
                                        <span>{title.text}</span>
                                    </a>
                                )}

                                {title.headings.length > 0 && (
                                    <ul className="pl-4 mt-2 space-y-2 border-l-2 border-lime-200 dark:border-neutral-600 ml-2">
                                        {title.headings.map(
                                            (heading, headingIndex) => (
                                                <li
                                                    key={`heading-${titleIndex}-${headingIndex}`}
                                                >
                                                    {heading.text && (
                                                        <a
                                                            href={`#${heading.id}`}
                                                            className="flex items-start gap-2 font-medium text-sm text-neutral-700 dark:text-neutral-300 hover:underline leading-snug group"
                                                        >
                                                            <span className="shrink-0 mt-0.5 text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                                                                {titleIndex + 1}
                                                                .
                                                                {headingIndex +
                                                                    1}
                                                            </span>
                                                            <span>
                                                                {heading.text}
                                                            </span>
                                                        </a>
                                                    )}

                                                    {heading.subheadings
                                                        .length > 0 && (
                                                        <ul className="pl-4 mt-1.5 space-y-1.5 border-l border-neutral-300 dark:border-neutral-600 ml-1">
                                                            {heading.subheadings.map(
                                                                (
                                                                    subheading,
                                                                    subheadingIndex,
                                                                ) => (
                                                                    <li
                                                                        key={`subheading-${titleIndex}-${headingIndex}-${subheadingIndex}`}
                                                                    >
                                                                        {subheading.text && (
                                                                            <a
                                                                                href={`#${subheading.id}`}
                                                                                className="flex items-start gap-2 text-neutral-600 dark:text-neutral-300 text-xs hover:underline leading-snug"
                                                                            >
                                                                                <span className="shrink-0 mt-0.5 text-neutral-400 dark:text-neutral-500 font-mono">
                                                                                    {titleIndex +
                                                                                        1}

                                                                                    .
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

                                                                        {subheading
                                                                            .h4s
                                                                            .length >
                                                                            0 && (
                                                                            <ul className="pl-4 mt-1 space-y-1 border-l border-neutral-200 dark:border-neutral-700 ml-1">
                                                                                {subheading.h4s.map(
                                                                                    (
                                                                                        h4,
                                                                                        h4Index,
                                                                                    ) => (
                                                                                        <li
                                                                                            key={`h4-${titleIndex}-${headingIndex}-${subheadingIndex}-${h4Index}`}
                                                                                        >
                                                                                            <a
                                                                                                href={`#${h4.id}`}
                                                                                                className="flex items-start gap-2 text-neutral-500 dark:text-neutral-400 hover:underline text-xs leading-snug"
                                                                                            >
                                                                                                <span className="shrink-0 mt-0.5 text-neutral-400 dark:text-neutral-500 font-mono">
                                                                                                    {titleIndex +
                                                                                                        1}

                                                                                                    .
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
