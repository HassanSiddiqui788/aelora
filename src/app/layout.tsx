import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { defaultMetadata, defaultViewport } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontVariables} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-body bg-neutral-100 text-neutral-900 dark:bg-neutral-1000 dark:text-neutral-50 selection:bg-primary-500/20 selection:text-primary-900">
        {children}
      </body>
    </html>
  );
}

