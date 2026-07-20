import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/theme-context";
import { title, description, keywords, url } from "@/lib/data";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title,
    description,
    keywords,

    alternates: {
        canonical: url,
    },

    icons: {
        icon: [
            {
                url: "/favicon.ico",
                sizes: "any",
            },
        ],
        apple: [
            {
                url: "/apple-touch-icon.png",
            },
        ],
    },

    robots: { index: true, follow: true },

    openGraph: {
        title,
        description,
        url,
        images: [`${url}/preview.png`],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isDeveloping: boolean = !true;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url,
        description,
        keywords,
        image: `${url}/preview.png`,
        author: {
            "@type": "Person",
            name: "Subhajit Gorai",
            url: `${url}/author`,
        },
    };

    return (
        <html lang="en">
            <Script
                id="schema-sortalgo"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <ThemeProvider>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}
                >
                    <div
                        className="min-h-screen w-full antialiased dark:hidden fixed -z-10"
                        style={{
                            background:
                                "repeating-linear-gradient(135deg, #f0f0f0 0px, #f0f0f0 3px, #e8e8e8 5px, #e8e8e8 4px)",
                        }}
                    />
                    <div
                        className="min-h-screen w-full antialiased hidden dark:block fixed -z-10"
                        style={{
                            background:
                                "repeating-linear-gradient(135deg, #1c1c1c 0px, #1c1c1c 3px, #252525 5px, #252525 4px)",
                        }}
                    />
                    {isDeveloping ? (
                        <h1 className="text-4xl text-black">Coming Soon...</h1>
                    ) : (
                        children
                    )}
                </body>
            </ThemeProvider>
            <GoogleAnalytics gaId="G-B2KXQRNVK1" />
        </html>
    );
}
