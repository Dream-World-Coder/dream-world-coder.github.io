import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    output: "export",
    images: {
        images: { unoptimized: true },
        remotePatterns: [
            new URL("https://picsum.photos/**"),
            new URL("https://i.imgur.com/**"),
            new URL("https://unsplash.com/**"),
        ],
    },
};

export default nextConfig;
