import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WanderLens AI — AI-Powered Travel Discovery | Discover Amazing, Travel Smarter",
  description: "Revolutionary AI-powered travel discovery platform. Get personalized recommendations for hotels, restaurants, activities, and routes. Discover amazing places and travel smarter with WanderLens AI.",
  keywords: "travel planning, AI travel, vacation planner, trip organizer, travel recommendations, smart travel, WanderLens AI, travel discovery",
  authors: [{ name: "Rushan Haque" }],
  creator: "Rushan Haque",
  publisher: "WanderLens AI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wanderlens-ai.vercel.app",
    siteName: "WanderLens AI",
    title: "WanderLens AI — AI-Powered Travel Discovery",
    description: "Revolutionary AI-powered travel discovery platform. Get personalized recommendations for hotels, restaurants, activities, and routes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WanderLens AI - AI-Powered Travel Discovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WanderLens AI — AI-Powered Travel Discovery",
    description: "Revolutionary AI-powered travel discovery platform. Discover amazing, travel smarter.",
    creator: "@rushanhaque",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-night-900`}
      >
        {children}
      </body>
    </html>
  );
}
