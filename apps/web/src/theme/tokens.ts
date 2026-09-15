import { Platform } from "react-native";

/**
 * RN mirror of the Easel web design tokens (src/styles/tokens.css),
 * light theme only — the palette this app renders in.
 */
export const colors = {
  paper50: "#ffffff",
  paper100: "#fafafa",
  paper200: "#f0f0f0",
  paper300: "#d9d9d9",
  ink400: "#9a9a9a",
  ink500: "#6b6b6b",
  ink600: "#454545",
  ink700: "#2a2a2a",
  ink800: "#161616",
  ink900: "#000000",
};

export const theme = {
  bg: colors.paper50,
  surface: "#ffffff",
  surfaceSunken: colors.paper100,
  border: colors.ink900,
  borderStrong: colors.ink900,
  text: colors.ink900,
  textMuted: colors.ink600,
  textSubtle: colors.ink400,
  onAccent: "#ffffff",
  accent: colors.ink900,
  accentHover: colors.ink700,
  accentSubtleBg: colors.paper200,
  success: colors.ink900,
  canvasGradient: [colors.paper50, colors.paper50, colors.paper100] as const,
};

export const fonts = {
  serif: Platform.select({
    ios: "Times New Roman",
    android: "serif",
    default: "'Shadows Into Light', cursive",
  }),
  sans: Platform.select({
    ios: "System",
    android: "sans-serif",
    default: "'Shadows Into Light', cursive",
  }),
};

export const space = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64 };

export const radius = { sm: 3, md: 6, lg: 12, pill: 999 };
