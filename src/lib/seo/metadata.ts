import type { Metadata, Viewport } from "next";
import { BRAND } from "@/constants/brand";
import { env } from "@/lib/env";

const siteUrl = env.NEXT_PUBLIC_SITE_URL;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name, url: siteUrl }],
  creator: BRAND.name,
  publisher: BRAND.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "luxury scarves",
    "modest fashion",
    "premium hijabs",
    "silk scarves",
    "AELORA",
    "luxury modest wear",
  ],
  openGraph: {
    type: "website",
    locale: BRAND.locale,
    url: siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    creator: "@aelora",
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
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      ar: `${siteUrl}/ar`,
    },
  },
  category: "fashion",
};

export const defaultViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F0E8" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export function createPageMetadata({
  title,
  description = BRAND.description,
  path = "",
  noIndex = false,
  ogImage,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path}`;
  const imageUrl = ogImage ?? `${siteUrl}/og/default.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${BRAND.name}`,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title: `${title} | ${BRAND.name}`,
      description,
      images: [imageUrl],
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  };
}
