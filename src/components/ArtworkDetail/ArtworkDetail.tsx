import { forwardRef, type CSSProperties, type ReactNode } from "react";
import { ArtistByline } from "../ArtistByline";
import { Button } from "../Button";
import styles from "./ArtworkDetail.module.css";

export interface ArtworkDetailProps {
  title: string;
  artist: string;
  year?: string;
  imageUrl: string;
  imageAlt?: string;
  /** Holding institution name. Shown as an overline above the title. */
  source?: string;
  /** Link to the work at the holding institution. Renders a "View at source" button. */
  sourceUrl?: string;
  /** Longer-form prose about the work. */
  meaning?: ReactNode;
  /** Optional close affordance for use in a modal or overlay route. */
  onClose?: () => void;
  /** Extra content rendered at the bottom of the info column. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * The full single-artwork view: large image panel beside a metadata column
 * (source, title, artist, year, prose, and a link out). Collapses to a single
 * column below ~720px of available width.
 */
export const ArtworkDetail = forwardRef<HTMLDivElement, ArtworkDetailProps>(
  function ArtworkDetail(
    { title, artist, year, imageUrl, imageAlt, source, sourceUrl, meaning, onClose, children, className, style },
    ref,
  ) {
    return (
      <div ref={ref} className={[styles.detail, className].filter(Boolean).join(" ")} style={style}>
        <div className={styles.mediaPanel}>
          {onClose && (
            <button type="button" className={styles.close} onClick={() => onClose()} aria-label="Close">
              ×
            </button>
          )}
          <img
            className={styles.image}
            src={imageUrl}
            alt={imageAlt ?? `${title} by ${artist}`}
          />
        </div>

        <div className={styles.info}>
          {source && <span className={styles.overline}>{source}</span>}
          <h2 className={styles.title}>{title}</h2>
          <ArtistByline artist={artist} meta={year} layout="inline" />
          {meaning && (
            <>
              <hr className={styles.divider} />
              <p className={styles.meaning}>{meaning}</p>
            </>
          )}
          {sourceUrl && (
            <div>
              <Button
                variant="secondary"
                size="sm"
                href={sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                View at source
              </Button>
            </div>
          )}
          {children}
        </div>
      </div>
    );
  },
);
