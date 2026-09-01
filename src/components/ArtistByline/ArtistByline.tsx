import { forwardRef, type HTMLAttributes } from "react";
import styles from "./ArtistByline.module.css";

export type ArtistBylineSize = "sm" | "md" | "lg";

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] ?? "") + (parts[parts.length - 1][0] ?? "");
}

export interface ArtistBylineProps extends HTMLAttributes<HTMLDivElement> {
  /** Artist's name. */
  artist: string;
  /** Optional secondary line — a date, nationality, or "1853–1890". */
  meta?: string;
  size?: ArtistBylineSize;
  /**
   * `"stacked"` (default) shows an initials avatar with name over meta.
   * `"inline"` renders a single run of text: "by <name>, <meta>".
   */
  layout?: "stacked" | "inline";
  /** Hide the avatar in stacked layout. */
  hideAvatar?: boolean;
}

/** Artist attribution. Used inside `PaintingCard`, `ArtworkDetail`, and lists. */
export const ArtistByline = forwardRef<HTMLDivElement, ArtistBylineProps>(
  function ArtistByline(
    { artist, meta, size = "md", layout = "stacked", hideAvatar, className, ...rest },
    ref,
  ) {
    if (layout === "inline") {
      return (
        <div ref={ref} className={[styles.byline, styles.inline, className].filter(Boolean).join(" ")} {...rest}>
          <span>
            by <span className={styles.name}>{artist}</span>
            {meta ? `, ${meta}` : null}
          </span>
        </div>
      );
    }

    return (
      <div ref={ref} className={[styles.byline, className].filter(Boolean).join(" ")} {...rest}>
        {!hideAvatar && (
          <span className={[styles.avatar, styles[size]].join(" ")} aria-hidden="true">
            {initialsOf(artist)}
          </span>
        )}
        <span className={styles.text}>
          <span className={[styles.name, styles[size]].join(" ")}>{artist}</span>
          {meta && <span className={styles.meta}>{meta}</span>}
        </span>
      </div>
    );
  },
);
