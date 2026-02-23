import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair-display' });

export const metadata: Metadata = {
    title: "Mehfil Hotels | Luxury Redefined",
    description: "Experience the royal heritage and timeless luxury of Mehfil Hotels.",
    icons: {
        icon: "/favicon.png",
        shortcut: "/favicon.png",
        apple: "/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preload" as="image" href="/sequence/frame_000.jpg" fetchPriority="high" />
            </head>
            <body className={`${inter.variable} ${playfair.variable} font-sans`}>
                <SmoothScroll />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
