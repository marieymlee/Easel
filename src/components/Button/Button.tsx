import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

interface CommonProps {
  children: ReactNode;
  /** Visual style. Defaults to `"primary"`. */
  variant?: ButtonVariant;
  /** Control height / padding. Defaults to `"md"`. Ignored for `variant="link"`. */
  size?: ButtonSize;
  /** Stretch to the width of the container. */
  fullWidth?: boolean;
  /** Element rendered before the label (e.g. an icon). */
  iconStart?: ReactNode;
  /** Element rendered after the label. */
  iconEnd?: ReactNode;
}

export type ButtonProps = CommonProps &
  (
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>)
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>)
  );

/**
 * The primary action control. Renders a `<button>` by default, or an `<a>` when
 * `href` is set (styling is identical).
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { children, variant = "primary", size = "md", fullWidth, iconStart, iconEnd, className, ...rest },
    ref,
  ) {
    const classes = [
      styles.button,
      styles[variant],
      variant !== "link" && styles[size],
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {iconStart && <span className={styles.icon} aria-hidden="true">{iconStart}</span>}
        {children}
        {iconEnd && <span className={styles.icon} aria-hidden="true">{iconEnd}</span>}
      </>
    );

    if ("href" in rest && rest.href !== undefined) {
      const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      };
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    const { disabled, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled}
        data-disabled={disabled ? "true" : undefined}
        {...buttonRest}
      >
        {content}
      </button>
    );
  },
);
