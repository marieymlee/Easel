import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Painting } from "../data/paintings";
import { PuzzleCanvas } from "../components/PuzzleCanvas";
import { MusicControls } from "../components/MusicControls";
import { ShakeIcon } from "../components/ShakeIcon";
import { ArrowLeftIcon } from "../components/icons/ArrowLeftIcon";
import { ShuffleIcon } from "../components/icons/ShuffleIcon";
import { CompletePuzzleIcon } from "../components/icons/CompletePuzzleIcon";
import { GRID_SIZE, PuzzleLayout, useJigsaw } from "../puzzle/useJigsaw";
import { space, theme } from "../theme/tokens";

const MARGIN = 24;
const ICON_SIZE = 44;
const CHROME_HEIGHT = 84; // icon header row, roughly (safety buffer for frame sizing)
const HEADER_HEIGHT = 68; // actual rendered header row height: ICON_SIZE(44) + paddingVertical(12*2)

interface PuzzleScreenProps {
  painting: Painting;
  index: number;
  total: number;
  onSolved: (elapsedMs: number) => void;
  onBack: () => void;
}

// The play area fills the full browser viewport (minus header chrome) so
// dragged pieces never get clipped by a small canvas div. The frame is centered on the
// full window height (not just the space below the header), so it sits at true screen center.
function buildLayout(windowWidth: number, windowHeight: number): PuzzleLayout {
  const playW = windowWidth;
  const playH = Math.max(windowHeight - CHROME_HEIGHT, 320);
  const frameSize = Math.max(Math.min(Math.min(playW, playH) * 0.6, 520), 220);
  const pieceSize = frameSize / GRID_SIZE;
  const idealFrameY = windowHeight / 2 - HEADER_HEIGHT - frameSize / 2;
  return {
    pieceSize,
    frameSize,
    frameX: (playW - frameSize) / 2,
    frameY: Math.max(idealFrameY, 24),
    playW,
    playH,
  };
}

export function PuzzleScreen({ painting, onSolved, onBack }: PuzzleScreenProps) {
  const { width, height } = useWindowDimensions();
  // Recomputed on every resize; useJigsaw rescales existing piece positions to match
  // instead of rescattering, so the layout stays responsive without jumbling progress.
  const layout = useMemo(() => buildLayout(width, height), [width, height]);
  const { pieces, edges, dropPiece, reset, isSolved, correctPosition } = useJigsaw(layout);

  const startTimeRef = useRef(Date.now());
  const handleReset = () => {
    startTimeRef.current = Date.now();
    reset();
  };
  const handleComplete = () => {
    pieces.forEach((piece) => {
      const target = correctPosition(piece.id);
      dropPiece(piece.id, target.x, target.y);
    });
  };

  useEffect(() => {
    if (!isSolved) return;
    const elapsedMs = Date.now() - startTimeRef.current;
    const timer = setTimeout(() => onSolved(elapsedMs), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSolved, onSolved]);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <ShakeIcon onPress={onBack}>
          <ArrowLeftIcon size={ICON_SIZE} color={theme.text} />
        </ShakeIcon>
        <MusicControls />
        <View style={styles.headerRight}>
          <ShakeIcon onPress={handleReset}>
            <ShuffleIcon size={ICON_SIZE} color={theme.text} />
          </ShakeIcon>
          <ShakeIcon onPress={handleComplete}>
            <CompletePuzzleIcon size={ICON_SIZE} color={theme.text} />
          </ShakeIcon>
        </View>
      </View>

      <View style={styles.canvasWrap}>
        <PuzzleCanvas
          imageUrl={painting.imageUrl}
          layout={layout}
          pieces={pieces}
          edges={edges}
          onDrop={dropPiece}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[4],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: MARGIN,
    paddingVertical: space[3],
  },
  canvasWrap: { flex: 1 },
});
