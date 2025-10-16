import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI恋愛診断 | あなたの恋愛タイプを20問で診断",
  description: "AIがあなたの恋愛の本質を解き明かす。20問の質問で6つのタイプから診断。無料で今すぐ始められる恋愛傾向分析サービス。",
  keywords: "恋愛診断,AI診断,恋愛タイプ,性格診断,恋愛心理,無料診断",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "AI恋愛診断 | あなたの恋愛タイプを20問で診断",
    description: "AIがあなたの恋愛の本質を解き明かす。20問の質問で6つのタイプから診断。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI恋愛診断 | あなたの恋愛タイプを20問で診断",
    description: "AIがあなたの恋愛の本質を解き明かす。20問の質問で6つのタイプから診断。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
