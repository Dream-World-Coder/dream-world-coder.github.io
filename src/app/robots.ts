export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: "https://dream-world-coder.vercel.app/sitemap.xml",
        host: "https://dream-world-coder.vercel.app",
    };
}
