export const BRAND = {
  name: "AELORA",
  tagline: "Luminous by nature.",
  description:
    "Premium modest luxury fashion — crafted scarves, hijabs, and timeless pieces for the modern woman.",
  locale: "en_US",
  defaultLanguage: "en",
  supportedLanguages: ["en", "ar"] as const,
  contactEmail: "hello@aelora.com",
  social: {
    instagram: "https://instagram.com/aelora",
    pinterest: "https://pinterest.com/aelora",
  },
} as const;

export type SupportedLanguage = (typeof BRAND.supportedLanguages)[number];
