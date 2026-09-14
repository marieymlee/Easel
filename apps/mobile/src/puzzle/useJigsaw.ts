import { useCallback, useMemo, useState } from "react";

export const GRID_SIZE = 10;
const PIECE_COUNT = GRID_SIZE * GRID_SIZE;

function shuffledBoard(): number[] {
  const board = Array.from({ length: PIECE_COUNT }, (_, i) => i);
  do {
    for (let i = board.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [board[i], board[j]] = [board[j], board[i]];
    }
  } while (board.every((pieceId, position) => pieceId === position));
  return board;
}

export function useJigsaw() {
  const [board, setBoard] = useState<number[]>(() => shuffledBoard());
  const [selected, setSelected] = useState<number | null>(null);

  const solvedCount = useMemo(
    () => board.reduce((count, pieceId, position) => count + (pieceId === position ? 1 : 0), 0),
    [board],
  );
  const isSolved = solvedCount === PIECE_COUNT;

  const tapCell = useCallback(
    (position: number) => {
      if (isSolved) return;
      setSelected((current) => {
        if (current === null) return position;
        if (current === position) return null;
        setBoard((prev) => {
          const next = [...prev];
          [next[current], next[position]] = [next[position], next[current]];
          return next;
        });
        return null;
      });
    },
    [isSolved],
  );

  const reset = useCallback(() => {
    setBoard(shuffledBoard());
    setSelected(null);
  }, []);

  return { board, selected, tapCell, reset, solvedCount, pieceCount: PIECE_COUNT, isSolved };
}
