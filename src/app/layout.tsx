import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrendAlchemy - AI-Powered TikTok Trend Generator",
  description: "Transform your ideas into viral TikTok trends with AI magic. Generate engaging concepts, visuals, and hashtags instantly.",
  openGraph: {
    title: "TrendAlchemy - AI-Powered TikTok Trend Generator",
    description: "Transform your ideas into viral TikTok trends with AI magic",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
