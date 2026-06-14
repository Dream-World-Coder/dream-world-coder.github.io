export interface Chapter {
    slug: string;
    title: string;
}

export interface Section {
    title: string;
    chapters: Chapter[];
}

// will keep this file. Easy to give names instead directory

export const chapters: Section[] = [
    {
        title: "Web Dev",
        chapters: [
            {
                // too basic for here
                slug: "wanna-learn-web-dev",
                title: "Wanna Learn Web Development?",
            },
            // {
            //     slug: "ttl-cache",
            //     title: "Understanding TTL Caching",
            // },
            // {
            //     slug: "why-redis",
            //     title: "Why Do I Need Redis?",
            // },
        ],
    },
    {
        title: "Project Engineering",
        chapters: [
            {
                slug: "1993-to-17007-rps-mern-single-thread",
                title: "From 1,993 To 17,007 Requests Per Second: How I Optimised A Node.js + MongoDB Backend At Scale",
            },
            {
                slug: "computable-poetry",
                title: "Computable Poetry",
            },
        ],
    },
    {
        title: "Algorithms",
        chapters: [
            {
                slug: "heap-vs-sorted-array",
                title: "Heap vs. Sorted Array, Why Building a Heap is Linear?",
            },
            {
                slug: "minima-extraction",
                title: "Minima Extraction as Sorting Technique",
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
