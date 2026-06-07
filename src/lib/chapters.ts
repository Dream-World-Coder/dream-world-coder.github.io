export interface Chapter {
    slug: string;
    title: string;
}

export interface Section {
    title: string;
    chapters: Chapter[];
}

export const chapters: Section[] = [
    {
        title: "Guides",
        chapters: [
            {
                slug: "wanna-learn-web-dev",
                title: "Wanna Learn Web Development?",
            },
        ],
    },

    {
        title: "Project Explanations",
        chapters: [
            {
                slug: "wanna-learn-web-dev",
                title: "Wanna Learn Web Development?",
            },
        ],
    },
];

export function getNextArticle(
    currentSlug: string,
): { slug: string; title?: string } | null {
    // all chapters -> a list of objects with slug + title
    const allChapters = chapters.flatMap((section) =>
        section.chapters.map((ch) => ({ slug: ch.slug, title: ch.title })),
    );

    const index = allChapters.findIndex((ch) => ch.slug === currentSlug);

    if (index === -1) return null; // slug not found
    if (index === allChapters.length - 1) return { slug: "last" }; // last article

    return allChapters[index + 1]; // return { slug, title }
}

export function getPrevArticle(
    currentSlug: string,
): { slug: string; title?: string } | null {
    // all chapters -> a list of objects with slug + title
    const allChapters = chapters.flatMap((section) =>
        section.chapters.map((ch) => ({ slug: ch.slug, title: ch.title })),
    );

    const index = allChapters.findIndex((ch) => ch.slug === currentSlug);

    if (index === -1) return null; // slug not found
    if (index === 0) return { slug: "first" }; // first article

    return allChapters[index - 1]; // return { slug, title }
}
