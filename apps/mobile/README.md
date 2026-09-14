# Easel Puzzle

A mobile puzzle game: reassemble a 10×10 scrambled jigsaw of a painting, then
read the artist, title, and backstory behind it. Free play through 10
paintings, no move limit, progress saved on-device.

Built with [Expo](https://expo.dev) / React Native, styled to loosely mirror
the [Easel design system](../..) (warm paper neutrals, serif display, vermilion
accent).

## How to play

1. Pick a painting from the gallery.
2. Tap two pieces to swap them — reassemble the full image.
3. Once every piece is in place, the painting's story is revealed.

## Develop

```bash
npm install
npm start        # opens Expo dev tools — scan the QR code with Expo Go
npm run ios       # requires Xcode + iOS Simulator
npm run android   # requires Android Studio + emulator
npm run web       # runs in the browser via react-native-web
```

## Structure

```
src/
├── data/paintings.ts     10 paintings (title, artist, year, source, backstory)
├── theme/tokens.ts        RN mirror of the Easel design tokens
├── puzzle/useJigsaw.ts     shuffle / swap / solved-state logic
├── components/PuzzleBoard.tsx   10×10 tile-swap grid (image-slice per cell)
├── screens/                Gallery, Puzzle, Reveal
└── storage/progress.ts     persists solved painting ids (AsyncStorage)
```
