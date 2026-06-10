export const dynamic = "force-static";

import { description } from "@/lib/data";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "The Invariant;",
        short_name: "Invariant",
        description,
        start_url: "/",
        display: "standalone",
        background_color: "#f8f8f8",
        theme_color: "#f8f8f8",
        icons: [
            {
                src: "/favicon.ico",
                type: "image/x-icon",
                sizes: "16x16 32x32",
            },
            {
                src: "/icon-192.png",
                type: "image/png",
                sizes: "192x192",
            },
            {
                src: "/icon-512.png",
                type: "image/png",
                sizes: "512x512",
            },
            {
                src: "/icon-192-maskable.png",
                type: "image/png",
                sizes: "192x192",
                purpose: "maskable",
            },
            {
                src: "/icon-512-maskable.png",
                type: "image/png",
                sizes: "512x512",
                purpose: "maskable",
            },
        ],
    };
}
