// sitemap.ts
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import fs from "fs";
import { url as baseUrl } from "@/lib/data";
import { getFileMap } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/chapters`,
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
    ];

    const fileMap = getFileMap();

    const chapterRoutes: MetadataRoute.Sitemap = Array.from(
        fileMap.entries(),
    ).map(([slug, filePath]) => {
        const stats = fs.statSync(filePath);

        return {
            url: `${baseUrl}/chapters/${slug}`,
            lastModified: stats.mtime.toISOString(),
            changeFrequency: "weekly",
            priority: 1.0,
        };
    });

    return [...staticRoutes, ...chapterRoutes];
}
