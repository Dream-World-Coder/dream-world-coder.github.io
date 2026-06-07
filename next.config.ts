import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
        remotePatterns: [
            new URL("https://picsum.photos/**"),
            new URL("https://i.imgur.com/**"),
            new URL("https://unsplash.com/**"),
        ],
    },
};

export default nextConfig;
