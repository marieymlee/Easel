import { forwardRef, type CSSProperties, type ReactNode } from "react";
import { Badge } from "../Badge";
import { Card } from "../Card";
import styles from "./PaintingCard.module.css";

export interface PaintingCardProps {
  title: string;
  artist: string;
  /** Year or year range — displayed after the artist. */
  year?: string;
  imageUrl: string;
  /** Alt text for the image. Defaults to `"<title> by <artist>"`. */
  imageAlt?: string;
  /** Holding institution — rendered as a soft badge in the footer. */
  source?: string;
  /** CSS `aspect-ratio` for the image frame. Defaults to `"4 / 5"`. */
  aspectRatio?: string;
  /** Render the artwork matted inside a frame instead of bleeding to the edge. */
  framed?: boolean;
  /** When set, the whole card becomes a link to this URL. */
  href?: string;
  /** Called on click when the card is interactive (with or without `href`). */
  onSelect?: () => void;
  /** Extra content in the footer (e.g. a favorite toggle). */
  actions?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * A gallery tile for one artwork: image, title, artist, year, and optional
 * source. Compose many inside `GalleryGrid`.
 */
export const PaintingCard = forwardRef<HTMLElement, PaintingCardProps>(
  function PaintingCard(
    {
      title,
      artist,
      year,
      imageUrl,
      imageAlt,
      source,
      aspectRatio,
      framed,
      href,
      onSelect,
      actions,
      className,
      style,
    },
    ref,
  ) {
    const interactive = Boolean(href || onSelect);
    const mergedStyle: CSSProperties = aspectRatio
      ? { ...style, ["--pc-aspect" as string]: aspectRatio }
      : (style ?? {});

    const titleNode = href ? (
      <a
        className={styles.link}
        href={href}
        onClick={onSelect ? () => onSelect() : undefined}
      >
        {title}
      </a>
    ) : onSelect ? (
      <button type="button" className={styles.link} onClick={() => onSelect()}>
        {title}
      </button>
    ) : (
      title
    );

    return (
      <Card
        as="article"
        ref={ref}
        padding={0}
        elevation="sm"
        className={[styles.card, framed && styles.framed, className].filter(Boolean).join(" ")}
        style={mergedStyle}
        data-interactive={interactive ? "true" : undefined}
      >
        <div className={styles.media}>
          <img
            className={styles.image}
            src={imageUrl}
            alt={imageAlt ?? `${title} by ${artist}`}
            loading="lazy"
          />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{titleNode}</h3>
          <span className={styles.meta}>
            {artist}
            {year ? `, ${year}` : ""}
          </span>
          {(source || actions) && (
            <div className={styles.footer}>
              {source && (
                <Badge tone="neutral" variant="soft" size="sm">
                  {source}
                </Badge>
              )}
              {actions}
            </div>
          )}
        </div>
      </Card>
    );
  },
);
