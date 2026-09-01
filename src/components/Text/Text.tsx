import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import styles from "./Text.module.css";

export type TextVariant =
  | "display"
  | "title"
  | "heading"
  | "subheading"
  | "body"
  | "caption"
  | "overline";

export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextColor = "default" | "muted" | "subtle" | "accent";
export type TextAlign = "start" | "center" | "end";

const defaultTag: Record<TextVariant, ElementType> = {
  display: "h1",
  title: "h1",
  heading: "h2",
  subheading: "h3",
  body: "p",
  caption: "p",
  overline: "p",
};

export interface TextProps {
  children: ReactNode;
  /** Type scale step. Defaults to `"body"`. */
  variant?: TextVariant;
  /** Element to render. Defaults to a sensible tag for the variant. */
  as?: ElementType;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  /** Truncate to a single line with an ellipsis. */
  truncate?: boolean;
  /** Clamp to N lines with an ellipsis. Overrides `truncate`. */
  lineClamp?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * The single primitive for rendering type. Pick a `variant` for the scale step;
 * everything else (element, weight, color, alignment, truncation) is an
 * override on top of it.
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    children,
    variant = "body",
    as,
    weight,
    color = "default",
    align,
    truncate,
    lineClamp,
    className,
    style,
  },
  ref,
) {
  const Tag = (as ?? defaultTag[variant]) as ElementType;

  const classes = [
    styles.text,
    styles[variant],
    weight && styles[`weight-${weight}`],
    styles[`color-${color}`],
    align && styles[`align-${align}`],
    lineClamp ? styles.clamp : truncate && styles.truncate,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle = lineClamp
    ? ({ ...style, WebkitLineClamp: lineClamp } as CSSProperties)
    : style;

  return (
    <Tag ref={ref} className={classes} style={mergedStyle}>
      {children}
    </Tag>
  );
});
