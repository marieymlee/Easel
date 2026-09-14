import { Platform } from "react-native";

/**
 * RN mirror of the Easel web design tokens (src/styles/tokens.css),
 * light theme only — the palette this app renders in.
 */
export const colors = {
  paper50: "#fcfbf7",
  paper100: "#f6f3ea",
  paper200: "#ece7d9",
  paper300: "#dcd5c2",
  ink400: "#9b9384",
  ink500: "#6f6656",
  ink600: "#4b4335",
  ink700: "#322c21",
  ink800: "#201c15",
  ink900: "#14110c",
  accent100: "#fce8e1",
  accent300: "#f0a892",
  accent500: "#c8502f",
  accent600: "#a83f22",
  accent700: "#82301a",
  moss500: "#4f7a4a",
};

export const theme = {
  bg: colors.paper50,
  surface: "#ffffff",
  surfaceSunken: colors.paper100,
  border: colors.paper300,
  borderStrong: colors.ink400,
  text: colors.ink800,
  textMuted: colors.ink500,
  textSubtle: colors.ink400,
  onAccent: "#ffffff",
  accent: colors.accent500,
  accentHover: colors.accent600,
  accentSubtleBg: colors.accent100,
  success: colors.moss500,
};

export const fonts = {
  serif: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" }),
  sans: Platform.select({ ios: "System", android: "sans-serif", default: "System" }),
};

export const space = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64 };

export const radius = { sm: 3, md: 6, lg: 12, pill: 999 };
