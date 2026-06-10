export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "My Blog",
        short_name: "Blog",
        description: "Blog by me",
        start_url: "/",
        display: "standalone",
        background_color: "#f8f8f8",
        theme_color: "#f8f8f8",
        icons: [
            {
                src: "/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/icons/icon-512-maskable.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
