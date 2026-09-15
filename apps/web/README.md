# Easel Puzzle

A website: reassemble a scrambled jigsaw of a painting, hung in a hand-drawn
frame on a gallery wall, then read the artist, title, and backstory behind it.
Free play through 10 paintings, no move limit, progress saved in the browser.

Built with [Expo](https://expo.dev)'s web target (React + react-native-web),
styled to loosely mirror the [Easel design system](../..).

## How to play

1. Pick a painting from the gallery wall.
2. Tap two pieces to swap them — reassemble the full image.
3. Once every piece is in place, the painting's story is revealed.

## Develop

```bash
npm install
npm run dev   # starts the dev server and opens it in a browser
```

## Routes

- `/` — the gallery wall
- `/puzzle/:id` — the jigsaw for one painting
- `/reveal/:id` — that painting's story, once solved

## Structure

```
src/
├── data/paintings.ts        10 paintings (title, artist, year, source, backstory)
├── data/frames.ts            aperture rects for each opening in assets/frames-wall.png
├── theme/tokens.ts           RN mirror of the Easel design tokens
├── state/SolvedContext.tsx   shared solved-ids state across routes
├── puzzle/useJigsaw.ts       shuffle / swap / solved-state logic
├── components/
│   ├── PuzzleBoard.tsx        tile-swap grid (image-slice per cell)
│   ├── EaselFrame.tsx         easel photo wrapped around the puzzle canvas
│   └── GalleryWall.tsx        paintings composited behind frames-wall.png
├── screens/                  Gallery, Puzzle, Reveal
└── storage/progress.ts       persists solved painting ids (AsyncStorage/localStorage)
```
