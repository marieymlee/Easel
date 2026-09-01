import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import styles from "./Stack.module.css";

export type SpaceScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface StackProps {
  children: ReactNode;
  /** Main-axis direction. Defaults to `"column"`. */
  direction?: "row" | "column";
  /** Gap between children, in space-scale steps. Defaults to `4` (1rem). */
  gap?: SpaceScale;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * Flexbox layout primitive. Use it instead of ad-hoc `display: flex` so spacing
 * stays on the token scale.
 */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    children,
    direction = "column",
    gap = 4,
    align,
    justify,
    wrap,
    as,
    className,
    style,
  },
  ref,
) {
  const Tag = (as ?? "div") as ElementType;
  const classes = [
    styles.stack,
    styles[direction],
    styles[`gap-${gap}`],
    align && styles[`align-${align}`],
    justify && styles[`justify-${justify}`],
    wrap && styles.wrap,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} style={style}>
      {children}
    </Tag>
  );
});
