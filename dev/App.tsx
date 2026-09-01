import { useState } from "react";
import {
  ArtworkDetail,
  Badge,
  Button,
  Card,
  GalleryGrid,
  PaintingCard,
  Stack,
  Text,
  ThemeProvider,
  samplePaintings,
  useThemeToggle,
  type Painting,
} from "../src";
import "../src/styles/tokens.css";
import "../src/styles/global.css";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap={4} as="section">
      <Text variant="overline" color="muted">
        {title}
      </Text>
      {children}
    </Stack>
  );
}

function Toolbar() {
  const toggle = useThemeToggle();
  return (
    <Stack direction="row" gap={3} align="center" justify="between">
      <Text variant="heading">Easel</Text>
      <Button variant="ghost" size="sm" onClick={toggle}>
        Toggle theme
      </Button>
    </Stack>
  );
}

export function App() {
  const [selected, setSelected] = useState<Painting | null>(null);

  return (
    <ThemeProvider defaultMode="system">
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "var(--ds-space-7)" }}>
        <Stack gap={7}>
          <Toolbar />

          <Section title="Primitives">
            <Stack direction="row" gap={3} wrap align="center">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Badge tone="accent">Featured</Badge>
              <Badge tone="neutral" variant="outline">
                Public domain
              </Badge>
              <Badge tone="success" dot>
                In collection
              </Badge>
            </Stack>
          </Section>

          <Section title="Type scale">
            <Card padding={5}>
              <Stack gap={2}>
                <Text variant="display">Display</Text>
                <Text variant="title">Title</Text>
                <Text variant="heading">Heading</Text>
                <Text variant="subheading">Subheading</Text>
                <Text variant="body">
                  Body — the quick brown fox jumps over the lazy dog.
                </Text>
                <Text variant="caption">Caption text</Text>
              </Stack>
            </Card>
          </Section>

          <Section title="Gallery grid">
            <GalleryGrid minColumnWidth="240px">
              {samplePaintings.map((p) => (
                <PaintingCard
                  key={p.id}
                  title={p.title}
                  artist={p.artist}
                  year={p.year}
                  imageUrl={p.imageUrl}
                  source={p.source}
                  onSelect={() => setSelected(p)}
                />
              ))}
            </GalleryGrid>
          </Section>

          <Section title="Artwork detail">
            <Card padding={6}>
              <ArtworkDetail
                title={(selected ?? samplePaintings[0]).title}
                artist={(selected ?? samplePaintings[0]).artist}
                year={(selected ?? samplePaintings[0]).year}
                imageUrl={(selected ?? samplePaintings[0]).imageUrl}
                source={(selected ?? samplePaintings[0]).source}
                sourceUrl={(selected ?? samplePaintings[0]).sourceUrl}
                meaning={(selected ?? samplePaintings[0]).meaning}
              />
            </Card>
          </Section>
        </Stack>
      </div>
    </ThemeProvider>
  );
}
