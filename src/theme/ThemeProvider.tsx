import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import "../styles/tokens.css";
import "../styles/global.css";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  /** The mode the consumer asked for. */
  mode: ThemeMode;
  /** The theme actually in effect after resolving "system". */
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme mode. Defaults to `"system"`. */
  defaultMode?: ThemeMode;
  /**
   * Render an extra wrapping element that carries the `.ds-root` class and the
   * `data-ds-theme` attribute. Set to `false` to apply them to
   * `document.documentElement` instead (useful when the whole app is themed).
   */
  asChild?: boolean;
}

/**
 * Establishes the design-system theming context. Every Easel component expects
 * to render inside a `ThemeProvider` (or under an element carrying the
 * `.ds-root` class and a `data-ds-theme` attribute).
 */
export function ThemeProvider({
  children,
  defaultMode = "system",
  asChild = true,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(mql.matches ? "dark" : "light");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme: ResolvedTheme = mode === "system" ? systemTheme : mode;

  useEffect(() => {
    if (asChild || typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.add("ds-root");
    root.setAttribute("data-ds-theme", resolvedTheme);
    return () => {
      root.removeAttribute("data-ds-theme");
    };
  }, [asChild, resolvedTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolvedTheme, setMode }),
    [mode, resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {asChild ? (
        <div className="ds-root" data-ds-theme={resolvedTheme}>
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
}

/** Read and control the current theme. Must be used within a `ThemeProvider`. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}

/** A ready-made control that cycles light → dark → system. */
export function useThemeToggle() {
  const { mode, setMode } = useTheme();
  return useCallback(() => {
    setMode(mode === "light" ? "dark" : mode === "dark" ? "system" : "light");
  }, [mode, setMode]);
}
