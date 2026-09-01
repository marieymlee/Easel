/**
 * JS mirror of the most commonly referenced design tokens. The CSS custom
 * properties in `styles/tokens.css` remain the source of truth for rendering;
 * this map is a convenience for logic that needs token values (charts, canvas,
 * inline styles) without reading from `getComputedStyle`.
 */
export const tokens = {
  space: {
    0: "var(--ds-space-0)",
    1: "var(--ds-space-1)",
    2: "var(--ds-space-2)",
    3: "var(--ds-space-3)",
    4: "var(--ds-space-4)",
    5: "var(--ds-space-5)",
    6: "var(--ds-space-6)",
    7: "var(--ds-space-7)",
    8: "var(--ds-space-8)",
    9: "var(--ds-space-9)",
  },
  radius: {
    none: "var(--ds-radius-none)",
    sm: "var(--ds-radius-sm)",
    md: "var(--ds-radius-md)",
    lg: "var(--ds-radius-lg)",
    pill: "var(--ds-radius-pill)",
  },
  color: {
    bg: "var(--ds-color-bg)",
    surface: "var(--ds-color-surface)",
    surfaceSunken: "var(--ds-color-surface-sunken)",
    border: "var(--ds-color-border)",
    borderStrong: "var(--ds-color-border-strong)",
    text: "var(--ds-color-text)",
    textMuted: "var(--ds-color-text-muted)",
    textSubtle: "var(--ds-color-text-subtle)",
    accent: "var(--ds-color-accent)",
    link: "var(--ds-color-link)",
  },
  font: {
    serif: "var(--ds-font-serif)",
    sans: "var(--ds-font-sans)",
    mono: "var(--ds-font-mono)",
  },
  shadow: {
    sm: "var(--ds-shadow-sm)",
    md: "var(--ds-shadow-md)",
    lg: "var(--ds-shadow-lg)",
  },
} as const;

/** Breakpoints in px — reference values for container queries / JS layout. */
export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type SpaceToken = keyof typeof tokens.space;
export type RadiusToken = keyof typeof tokens.radius;
