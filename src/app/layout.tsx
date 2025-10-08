/** @format */

import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import { ErrorResetBoundary } from "./components/error/ErrorBoundary";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Tory's Journey",
    template: "%s | Tory's Journey",
  },
  description: "This is Tory's Journey.",
  openGraph: {
    title: "Tory's Journey",
    description: "This is Tory's Journey.",
    url: baseUrl,
    siteName: "Tory's Journey",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

// todo: class 에 dark 에 있으면 자동으로 다크모드로 변경되는데, html 에 표함되지 않음.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-3xl mt-8 mx-auto px-2">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 h-[95vh]">
          <Navbar />
          <ErrorResetBoundary>{children}</ErrorResetBoundary>
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
