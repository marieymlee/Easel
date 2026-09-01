# Easel

A small React design system for art gallery and collection interfaces — warm
paper neutrals, a serif display face, and a museum-label vermilion accent, with
light and dark themes driven entirely by CSS custom properties.

```
@easel/design-system
├── Foundations   tokens (color / type / space / radius / elevation), ThemeProvider
├── Primitives    Text · Stack · Button · Badge · Card
└── Easel         ArtistByline · PaintingCard · GalleryGrid · ArtworkDetail
```

## Install

```bash
npm install @easel/design-system react react-dom
```

## Usage

Import the stylesheet once at your app root and wrap the tree in `ThemeProvider`:

```tsx
import "@easel/design-system/styles.css";
import { ThemeProvider, GalleryGrid, PaintingCard, samplePaintings } from "@easel/design-system";

export function App() {
  return (
    <ThemeProvider defaultMode="system">
      <GalleryGrid minColumnWidth="240px">
        {samplePaintings.map((p) => (
          <PaintingCard
            key={p.id}
            title={p.title}
            artist={p.artist}
            year={p.year}
            imageUrl={p.imageUrl}
            source={p.source}
            href={`/works/${p.id}`}
          />
        ))}
      </GalleryGrid>
    </ThemeProvider>
  );
}
```

`ThemeProvider` renders a `.ds-root` wrapper carrying `data-ds-theme="light|dark"`.
Pass `asChild={false}` to put those on `<html>` instead. `useTheme()` exposes
`{ mode, resolvedTheme, setMode }`; `useThemeToggle()` cycles light → dark → system.

## Theming

All design decisions live as `--ds-*` custom properties in
[`src/styles/tokens.css`](src/styles/tokens.css). Override any of them under your
own scope to re-skin the system:

```css
.ds-root {
  --ds-color-accent: #2f6fb0;
  --ds-font-serif: "Spectral", Georgia, serif;
  --ds-radius-lg: 4px;
}
```

Dark mode resolves from `prefers-color-scheme` unless `data-ds-theme` is set
explicitly.

## Components

| Component | Purpose |
| --- | --- |
| `Text` | The only type primitive. `variant` picks the scale step; `weight` / `color` / `align` / `truncate` / `lineClamp` are overrides. |
| `Stack` | Flex layout. `direction`, `gap` (0–9 on the space scale), `align`, `justify`, `wrap`. |
| `Button` | `variant` (`primary` / `secondary` / `ghost` / `link`), `size`, `fullWidth`, `iconStart` / `iconEnd`. Renders `<a>` when `href` is set. |
| `Badge` | Metadata label. `tone` × `variant` (`soft` / `solid` / `outline`), optional status `dot`. |
| `Card` | Surface container. `padding` (0/3/4/5/6), `elevation`, `interactive`, polymorphic `as`. |
| `ArtistByline` | Artist attribution — `stacked` (initials avatar + name/meta) or `inline` ("by …"). |
| `PaintingCard` | Gallery tile: image, title, artist, year, optional `source` badge. `href` / `onSelect` make it interactive; `framed` mats the work. |
| `GalleryGrid` | Auto-fitting responsive grid. `minColumnWidth`, `gap`. No breakpoints to manage. |
| `ArtworkDetail` | Full single-artwork view: image panel + metadata column + prose + source link. Collapses below ~720px. |

The `Painting` type and a 10-item `samplePaintings` fixture (mirroring
`easel_paintings.json`) ship from the package entry for prototyping.

## Develop

```bash
npm install
npm run dev        # Vite playground at http://localhost:5173
npm run build      # → dist/ (ESM + CJS + easel.css + index.d.ts)
npm run typecheck
```

## License

MIT
