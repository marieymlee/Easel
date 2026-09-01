import { forwardRef, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import styles from "./GalleryGrid.module.css";

export interface GalleryGridProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Minimum column width before the grid drops to fewer columns. Defaults to `"260px"`. */
  minColumnWidth?: string;
  /** Gap between tiles, in space-scale steps. Defaults to `5`. */
  gap?: 3 | 4 | 5 | 6 | 7;
  as?: ElementType;
}

/**
 * Responsive auto-fitting grid for `PaintingCard`s (or any equal-priority
 * tiles). Column count follows the container width — no breakpoints to manage.
 */
export const GalleryGrid = forwardRef<HTMLElement, GalleryGridProps>(function GalleryGrid(
  { children, minColumnWidth = "260px", gap = 5, as, className, style, ...rest },
  ref,
) {
  const Tag = (as ?? "div") as ElementType;
  const classes = [styles.grid, styles[`gap-${gap}`], className].filter(Boolean).join(" ");
  const mergedStyle: CSSProperties = { ...style, ["--gg-min" as string]: minColumnWidth };

  return (
    <Tag ref={ref} className={classes} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
});
