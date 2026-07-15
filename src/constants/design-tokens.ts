/**
 * Design token constants — mirrored in CSS custom properties (globals.css).
 * Use these in TypeScript when programmatic access is required.
 */

export const colors = {
  primary: {
    50: "#FAF7F2",
    100: "#F5F0E8",
    200: "#EDE6DB",
    300: "#D4C5B0",
    400: "#B8A990",
    500: "#B8956A",
    600: "#C9A96E",
    700: "#A8854A",
    800: "#8B6914",
    900: "#6B4F10",
  },
  secondary: {
    50: "#F8F0ED",
    100: "#E8D5CF",
    200: "#D4B8B0",
    300: "#C4A4A4",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAF7",
    100: "#F5F0E8",
    200: "#EDE6DB",
    300: "#D4C5B0",
    400: "#B8A990",
    500: "#9B9590",
    600: "#6B6560",
    700: "#4A4642",
    800: "#2C2C2C",
    900: "#1A1A1A",
    1000: "#0D0D0D",
  },
  semantic: {
    success: "#7A9B7E",
    successBg: "#EDF3EE",
    warning: "#C4A35A",
    warningBg: "#F8F3E8",
    error: "#B87070",
    errorBg: "#F8EDED",
    info: "#8A9BA8",
    infoBg: "#EDF0F3",
  },
} as const;

export const spacing = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.5rem",
  6: "2rem",
  7: "3rem",
  8: "4rem",
  9: "5rem",
  10: "7.5rem",
  11: "10rem",
} as const;

export const typography = {
  display: { size: "4.5rem", lineHeight: "1.05", weight: "300" },
  h1: { size: "3rem", lineHeight: "1.1", weight: "300" },
  h2: { size: "2.25rem", lineHeight: "1.15", weight: "300" },
  h3: { size: "1.5rem", lineHeight: "1.2", weight: "400" },
  bodyLg: { size: "1.125rem", lineHeight: "1.7", weight: "400" },
  body: { size: "1rem", lineHeight: "1.7", weight: "400" },
  bodySm: { size: "0.875rem", lineHeight: "1.6", weight: "400" },
  caption: { size: "0.75rem", lineHeight: "1.5", weight: "400" },
  label: { size: "0.6875rem", lineHeight: "1.4", weight: "400" },
} as const;

export const radius = {
  none: "0",
  sm: "0.125rem",
  DEFAULT: "0",
  md: "0.125rem",
  lg: "0.25rem",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 2px 8px rgba(44, 38, 30, 0.04)",
  DEFAULT: "0 4px 24px rgba(44, 38, 30, 0.04)",
  md: "0 8px 32px rgba(44, 38, 30, 0.08)",
  lg: "0 16px 48px rgba(44, 38, 30, 0.12)",
  none: "none",
} as const;

export const transitions = {
  instant: "150ms",
  fast: "300ms",
  normal: "600ms",
  slow: "800ms",
  cinematic: "1200ms",
} as const;

export const easings = {
  luxury: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  enter: "cubic-bezier(0, 0, 0.2, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
  silk: "cubic-bezier(0.33, 0, 0.15, 1)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  header: 30,
  overlay: 40,
  modal: 50,
  toast: 60,
  cursor: 70,
} as const;

export const layout = {
  maxWidth: "90rem",
  contentWidth: "75rem",
  narrowWidth: "30rem",
  gutterMobile: "1.25rem",
  gutterDesktop: "3rem",
} as const;
