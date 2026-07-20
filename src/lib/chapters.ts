/**
 * Rendered Pages : for converting to static html docs
 * used in `generateStaticParams`
 */

export const renderedPages = [
    { slug: "wanna-learn-web-dev" },
    // { slug: "ttl-cache" },
    // { slug: "why-redis" },

    { slug: "1993-to-17007-rps-mern-single-thread" },
    { slug: "computable-poetry" },
    { slug: "grepvf" },

    { slug: "heap-vs-sorted-array" },
    // { slug: "stable-and-unstable-sort" },
    { slug: "minima-extraction" },

    { slug: "gemma" },
    { slug: "transformer" },

    { slug: "markdown" },
    { slug: "interview" },

    { slug: "pnc" },
    { slug: "integration" },
    { slug: "series-and-transformations" },
    { slug: "number-theory" },
    { slug: "linear-algebra" },
    { slug: "probablity-theory" },
    // theory of eqn
    // co ordinate geo
] satisfies { slug: string }[];

// * ============================= * ============================= * //
// Table of contents for Index Page
// * ============================= * ============================= * //

export interface Chapter {
    slug: string;
    title: string;
}

export interface Section {
    title: string;
    chapters: Chapter[];
}

/*
 * articles will mostly not have sub-articles.
 */
export const chapters: Section[] = [
    {
        title: "Maths",
        chapters: [
            { slug: "pnc", title: "Permutations and Combinations" },
            { slug: "number-theory", title: "Number Theory" },
            {
                slug: "integration",
                title: "A Treatise on Integral and Vector Calculus",
            },
            {
                slug: "series-and-transformations",
                title: "Series and Transforms: Taylor, Fourier, and Laplace Methods",
            },
            { slug: "linear-algebra", title: "Linear Algebra" },
            { slug: "probablity-theory", title: "Probability Theory" },
            // { slug: "sss", title: "ttt" },
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

    {
        title: "ML & DL",
        chapters: [
            { slug: "gemma", title: "Gemma" },
            {
                slug: "transformer",
                title: "Transformer Architecture: Encoder–Decoder Mechanisms",
            },
        ],
    },

    {
        title: "Dev & Backend Systems",
        chapters: [
            {
                slug: "wanna-learn-web-dev",
                title: "Wanna Learn Web Development?",
            },
            {
                slug: "ttl-cache",
                title: "Understanding TTL Caching",
            },
            {
                slug: "why-redis",
                title: "Why Do I Need Redis?",
            },
        ],
    },

    {
        title: "My Projects",
        chapters: [
            {
                slug: "1993-to-17007-rps-mern-single-thread",
                title: "From 1,993 To 17,007 Requests Per Second: Optimising a MERN webapp",
            },
            {
                slug: "computable-poetry",
                title: "Computable Poetry",
            },
            { slug: "grepvf", title: "A CVE Checker that can Hack" },
        ],
    },

    {
        title: "For Me",
        chapters: [{ slug: "interview", title: "OA Analysis" }],
    },
];

// * ============================= * ============================= * //
//  Next & Prev articles
// * ============================= * ============================= * //

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

// * ============================= * ============================= * //

/*
 *
 *
 * Keeping this file, as its easy to give names & titles instead lots of dirs
 *
 *
 */

// * ============================= * ============================= * //
