import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Metadata } from "next";
import { ChevronLeft, ChevronRight, List } from "lucide-react";

import { getChapterContent } from "@/lib/content";
import { getPrevArticle, getNextArticle } from "@/lib/chapters";
import { MarkdownRenderer } from "@/components/MDRenderer";
import metaDataParser, { ParsedMetaData } from "@/components/MetaParser";
import { getSchemaData } from "@/components/seo";
import DarkModeBtn from "@/components/dark-mode-btn";
import { CornerPlusIcons } from "@/components/Decorum";
import {
    parseTableOfContents,
    TableOfContents,
} from "@/components/TablesOfContent"; // Adjust path if needed

// -------------------
const getPageMetadata = (content: string): ParsedMetaData => {
    let metaData: ParsedMetaData = {
        title: "The Invariant;",
        authors: ["none"],
        dateCreated: "15/11/2025",
        dateEdited: "15/11/2025",
        description: "none",
        tags: ["none", "none"],
        slug: "none",
    };

    try {
        metaData = metaDataParser(content);
    } catch (err) {
        console.error(err);
    }

    return metaData;
};

// Cached data-fetching
const getCachedChapter = cache((slug: string) => {
    const content = getChapterContent(slug);
    const metaData = getPageMetadata(content);
    return { content, metaData };
});
// -------------------

// meta tags
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { metaData } = getCachedChapter(slug);

    return {
        title: metaData.title,
        description: metaData.description,
        keywords: metaData.tags,
        authors: metaData.authors.map((name) => ({ name })),
        openGraph: {
            title: metaData.title,
            description: metaData.description,
            type: "article",
            publishedTime: metaData.dateCreated,
            modifiedTime: metaData.dateEdited,
            authors: metaData.authors,
            tags: metaData.tags,
        },
    };
}

// page
export default async function ChapterPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { content, metaData } = getCachedChapter(slug);

    if (!metaData || !content) return <>Loading...</>;

    const schemaData = getSchemaData(metaData);
    const nextSlug = getNextArticle(slug);
    const prevSlug = getPrevArticle(slug);

    // Parse the content for the Table of Contents
    const tocData = parseTableOfContents(content);

    return (
        <div className="size-full min-h-screen">
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <section className="max-w-dvw md:max-w-[1368px] mx-auto overflow-x-hidden size-full flex justify-center items-start gap-4 relative pb-10 px-4 md:px-2 py-4 md:py-6">
                {/* nav for desktops */}
                <nav className="hidden sm:flex fixed -translate-x-1/2 top-6 left-1/2 w-full max-w-[1368px] px-6 py-2 z-40 items-center justify-end gap-2">
                    <DarkModeBtn />
                    <Link
                        href="/chapters"
                        className="flex items-center justify-center gap-2 px-2 py-0.5 rounded-2xl opacity-75 hover:opacity-100
                        bg-stone-200 dark:bg-stone-800 border-r border-b border-stone-300 dark:border-stone-700 text-black dark:text-white"
                    >
                        <List size={16} /> Index
                    </Link>
                </nav>

                {/* nav for mobiles */}
                <nav className="flex sm:hidden fixed top-8 left-8 px-2 py-1.5 z-40 items-center justify-center gap-3 bg-stone-200 dark:bg-stone-800 border-r border-b border-stone-300 dark:border-stone-700 rounded-xl">
                    <Link
                        href="/chapters"
                        className="opacity-75 hover:opacity-100 text-black dark:text-white"
                    >
                        <List size={20} />
                    </Link>
                    <DarkModeBtn />
                </nav>

                {/* Table of Contents replacing the old sidebar */}
                <TableOfContents tableOfContents={tocData} />

                {/* main content */}
                <main className="bg-[#f8f8f8] dark:bg-neutral-900 text-black dark:text-[#f8f8f8] border border-dashed border-neutral-300/80 dark:border-neutral-700/80 flex-1 px-0 md:px-6 py-2 md:py-10 relative lg:ml-72">
                    <article className="p-6 max-w-[85ch] mx-auto">
                        <header className="flex justify-end items-center transform -translate-y-4 md:translate-y-0">
                            <div className="AUTHOR-AND-DATE flex justify-center items-center w-fit p-2 bg-[#f2f2f2] dark:bg-neutral-800/25 border border-dashed border-neutral-200 dark:border-neutral-700/40 relative">
                                <span className="text-sm">
                                    by,{" "}
                                    {metaData?.authors?.length === 1
                                        ? metaData.authors[0]
                                        : metaData.authors[0] +
                                          metaData?.authors
                                              ?.slice(1)
                                              .map((i) => ` & ${i}`)}
                                    <br />
                                    <span className="text-sm opacity-80">
                                        {metaData?.dateEdited}
                                    </span>
                                </span>
                            </div>
                        </header>

                        <MarkdownRenderer content={content} />

                        {/* prev / next article */}
                        {prevSlug && nextSlug && (
                            <div className="w-full capitalize flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-3">
                                {prevSlug.slug !== "first" && (
                                    <Link
                                        href={`/chapters/${prevSlug?.slug}`}
                                        className="flex items-center border border-black dark:border-white bg-sky-50 dark:bg-transparent py-1 px-4"
                                    >
                                        <ChevronLeft size={20} />
                                        Previous: {prevSlug?.title}
                                    </Link>
                                )}

                                {nextSlug.slug !== "last" && (
                                    <Link
                                        href={`/chapters/${nextSlug?.slug}`}
                                        className="flex items-center border border-black dark:border-white bg-sky-50 dark:bg-transparent py-1 px-4"
                                    >
                                        Next: {nextSlug?.title}
                                        <ChevronRight size={20} />
                                    </Link>
                                )}
                            </div>
                        )}

                        {prevSlug && nextSlug && nextSlug.slug === "last" && (
                            <div className="w-full mt-6 italic">
                                I hope these articles helped you even by a
                                little, <br />
                                <span className="underline decoration-dotted">
                                    Thank you!
                                </span>{" "}
                                for continuing till the end!
                            </div>
                        )}
                    </article>

                    <CornerPlusIcons />
                </main>
            </section>

            <footer className="w-full py-16 text-black dark:text-white">
                <div className="mx-auto max-w-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-center">
                    <div className="image size-[132px] relative block overflow-hidden">
                        <Image
                            src="/cross.png"
                            alt="footer image"
                            width={132}
                            height={132}
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 pt-6 md:pt-0 md:pl-6">
                        Was anything unclear, difficult to follow, or outdated?{" "}
                        <br />
                        Then don&apos;t hesitate to mail me at{" "}
                        <a
                            href="mailto:blog.opencanvas@gmail.com"
                            className="underline cursor-pointer"
                        >
                            blog.opencanvas@gmail.com
                        </a>
                        . I&apos;d love to hear your thoughts, and improve it.
                        <br />
                        Github:{" "}
                        <a
                            href="https://github.com/Dream-World-Coder/dream-world-coder.github.io/"
                            target="_blank"
                            rel="noreferrer"
                            className="underline cursor-pointer"
                        >
                            Github Repo Page
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export const dynamic = "force-static";

export async function generateStaticParams() {
    return [
        { slug: "wanna-learn-web-dev" },
        // { slug: "ttl-cache" },
        // { slug: "why-redis" },

        { slug: "1993-to-17007-rps-mern-single-thread" },
        { slug: "computable-poetry" },

        { slug: "heap-vs-sorted-array" },
        // { slug: "stable-and-unstable-sort" },
        { slug: "minima-extraction" },
    ];
}
