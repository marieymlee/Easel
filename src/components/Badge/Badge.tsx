import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeTone = "neutral" | "accent" | "info" | "success" | "warning";
export type BadgeVariant = "soft" | "solid" | "outline";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  children: ReactNode;
  /** Semantic color. Defaults to `"neutral"`. */
  tone?: BadgeTone;
  /** Fill treatment. Defaults to `"soft"`. */
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Show a leading status dot. */
  dot?: boolean;
}

/**
 * A compact label for metadata — museum source, collection status, art
 * movement, licensing.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, tone = "neutral", variant = "soft", size = "md", dot, className, ...rest },
  ref,
) {
  const classes = [styles.badge, styles[variant], styles[tone], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span ref={ref} className={classes} {...rest}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
});
