import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Card.module.css";

export type CardElevation = "none" | "sm" | "md" | "lg";
export type CardPadding = 0 | 3 | 4 | 5 | 6;

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  /** Inner padding in space-scale steps. Defaults to `4`. Use `0` for media-first cards. */
  padding?: CardPadding;
  /** Resting shadow. Defaults to `"sm"`. */
  elevation?: CardElevation;
  /** Add hover lift + focus ring. Pair with a real interactive element (`as="button"` / `as="a"`). */
  interactive?: boolean;
}

/** A surface container. The base building block for anything that sits on the page as a panel. */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { children, as, padding = 4, elevation = "sm", interactive, className, ...rest },
  ref,
) {
  const Tag = (as ?? "div") as ElementType;
  const classes = [
    styles.card,
    styles[`pad-${padding}`],
    styles[`elevation-${elevation}`],
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
});
