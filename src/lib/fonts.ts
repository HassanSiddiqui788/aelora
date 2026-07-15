import { Cormorant_Garamond, DM_Sans, Noto_Sans_Arabic, Space_Mono } from "next/font/google";

export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const fontLabel = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-label",
  display: "swap",
  preload: true,
});

export const fontArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontLabel.variable,
  fontArabic.variable,
].join(" ");

export const fontClassNames = {
  display: "font-display",
  body: "font-body",
  label: "font-label",
  arabic: "font-arabic",
} as const;
