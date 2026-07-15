import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { defaultMetadata, defaultViewport } from "@/lib/seo/metadata";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import SmoothScroll from "@/components/layout/SmoothScroll";
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
        <SmoothScroll>
          <Header />
          <CartDrawer />
          <SearchOverlay />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

