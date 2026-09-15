import { useCallback, useEffect, useRef, useState } from "react";
import { EdgeSigns, generateEdgeSigns } from "./pieceShapes";

export const GRID_SIZE = 5;
const PIECE_COUNT = GRID_SIZE * GRID_SIZE;

export interface PuzzleLayout {
  pieceSize: number;
  frameSize: number;
  frameX: number;
  frameY: number;
  playW: number;
  playH: number;
}

export interface PieceState {
  id: number;
  x: number;
  y: number;
  placed: boolean;
}

function scatterPieces(layout: PuzzleLayout): PieceState[] {
  const { pieceSize, frameX, frameY, frameSize, playW, playH } = layout;
  const pad = pieceSize * 0.5;
  const pieces: PieceState[] = [];
  for (let id = 0; id < PIECE_COUNT; id++) {
    let x = 0;
    let y = 0;
    let tries = 0;
    do {
      x = Math.random() * Math.max(playW - pieceSize, 1);
      y = Math.random() * Math.max(playH - pieceSize, 1);
      tries++;
    } while (
      tries < 40 &&
      x + pieceSize > frameX - pad &&
      x < frameX + frameSize + pad &&
      y + pieceSize > frameY - pad &&
      y < frameY + frameSize + pad
    );
    pieces.push({ id, x, y, placed: false });
  }
  return pieces;
}

export function useJigsaw(layout: PuzzleLayout) {
  const [edges] = useState<EdgeSigns>(() => generateEdgeSigns(GRID_SIZE));
  const [pieces, setPieces] = useState<PieceState[]>(() => scatterPieces(layout));
  const prevLayoutRef = useRef(layout);

  // Rescale (rather than rescatter) piece positions when the play area resizes, so
  // the layout stays responsive to the browser window without losing progress.
  useEffect(() => {
    const prev = prevLayoutRef.current;
    prevLayoutRef.current = layout;
    if (prev === layout || (prev.playW === layout.playW && prev.playH === layout.playH)) return;

    const scaleX = layout.playW / prev.playW;
    const scaleY = layout.playH / prev.playH;
    setPieces((current) =>
      current.map((p) => {
        if (p.placed) {
          const r = Math.floor(p.id / GRID_SIZE);
          const c = p.id % GRID_SIZE;
          return { ...p, x: layout.frameX + c * layout.pieceSize, y: layout.frameY + r * layout.pieceSize };
        }
        return { ...p, x: p.x * scaleX, y: p.y * scaleY };
      }),
    );
  }, [layout]);

  const placedCount = pieces.reduce((count, p) => count + (p.placed ? 1 : 0), 0);
  const isSolved = placedCount === PIECE_COUNT;

  const correctPosition = useCallback(
    (id: number) => {
      const r = Math.floor(id / GRID_SIZE);
      const c = id % GRID_SIZE;
      return { x: layout.frameX + c * layout.pieceSize, y: layout.frameY + r * layout.pieceSize };
    },
    [layout],
  );

  const dropPiece = useCallback(
    (id: number, x: number, y: number) => {
      const correct = correctPosition(id);
      const dist = Math.hypot(x - correct.x, y - correct.y);
      const snapped = dist < layout.pieceSize * 0.35;
      const clampedX = Math.min(Math.max(x, 0), layout.playW - layout.pieceSize);
      const clampedY = Math.min(Math.max(y, 0), layout.playH - layout.pieceSize);
      setPieces((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                x: snapped ? correct.x : clampedX,
                y: snapped ? correct.y : clampedY,
                placed: p.placed || snapped,
              }
            : p,
        ),
      );
      return snapped;
    },
    [correctPosition, layout.pieceSize, layout.playW, layout.playH],
  );

  const reset = useCallback(() => {
    setPieces(scatterPieces(layout));
  }, [layout]);

  return { pieces, edges, dropPiece, reset, placedCount, pieceCount: PIECE_COUNT, isSolved, correctPosition };
}
