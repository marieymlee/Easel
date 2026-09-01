/**
 * Easel design system — public entry point.
 *
 * Styles: import once at your app root —
 *   import "@easel/design-system/styles.css";
 * and wrap your tree in <ThemeProvider>.
 */

// Foundations
export { ThemeProvider, useTheme, useThemeToggle } from "./theme/ThemeProvider";
export type { ThemeMode, ResolvedTheme, ThemeProviderProps } from "./theme/ThemeProvider";
export { tokens, breakpoints } from "./tokens";
export type { SpaceToken, RadiusToken } from "./tokens";

// Primitives
export { Text } from "./components/Text";
export type { TextProps, TextVariant, TextWeight, TextColor, TextAlign } from "./components/Text";
export { Stack } from "./components/Stack";
export type { StackProps, SpaceScale } from "./components/Stack";
export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";
export { Badge } from "./components/Badge";
export type { BadgeProps, BadgeTone, BadgeVariant, BadgeSize } from "./components/Badge";
export { Card } from "./components/Card";
export type { CardProps, CardElevation, CardPadding } from "./components/Card";

// Easel domain components
export { ArtistByline } from "./components/ArtistByline";
export type { ArtistBylineProps, ArtistBylineSize } from "./components/ArtistByline";
export { PaintingCard } from "./components/PaintingCard";
export type { PaintingCardProps } from "./components/PaintingCard";
export { GalleryGrid } from "./components/GalleryGrid";
export type { GalleryGridProps } from "./components/GalleryGrid";
export { ArtworkDetail } from "./components/ArtworkDetail";
export type { ArtworkDetailProps } from "./components/ArtworkDetail";

// Sample data + schema
export { samplePaintings, getPainting } from "./data/paintings";
export type { Painting } from "./data/paintings";
