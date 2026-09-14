import { useWindowDimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { Painting } from "../data/paintings";
import { PuzzleBoard } from "../components/PuzzleBoard";
import { useJigsaw } from "../puzzle/useJigsaw";
import { fonts, radius, space, theme } from "../theme/tokens";

interface PuzzleScreenProps {
  painting: Painting;
  index: number;
  total: number;
  onSolved: () => void;
  onBack: () => void;
}

export function PuzzleScreen({ painting, index, total, onSolved, onBack }: PuzzleScreenProps) {
  const { width } = useWindowDimensions();
  const boardSize = Math.min(width - space[4] * 2, 380);
  const { board, selected, tapCell, reset, solvedCount, pieceCount, isSolved } = useJigsaw();

  useEffect(() => {
    if (isSolved) onSolved();
  }, [isSolved, onSolved]);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={12}>
          <Text style={styles.back}>← Gallery</Text>
        </Pressable>
        <Text style={styles.count}>
          Puzzle {index + 1} of {total}
        </Text>
      </View>

      <Text style={styles.hint}>Tap two pieces to swap them.</Text>

      <View style={styles.boardWrap}>
        <PuzzleBoard
          imageUrl={painting.imageUrl}
          boardSize={boardSize}
          board={board}
          selected={selected}
          onTapCell={tapCell}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.progressText}>
          {solvedCount} / {pieceCount} pieces placed
        </Text>
        <Pressable style={styles.resetButton} onPress={reset}>
          <Text style={styles.resetText}>Shuffle again</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: space[4],
    paddingTop: space[2],
  },
  back: { fontFamily: fonts.sans, fontSize: 15, color: theme.accent, fontWeight: "600" },
  count: { fontFamily: fonts.sans, fontSize: 13, color: theme.textMuted },
  hint: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: theme.textMuted,
    textAlign: "center",
    marginTop: space[3],
  },
  boardWrap: { alignItems: "center", marginTop: space[4] },
  footer: {
    marginTop: "auto",
    paddingHorizontal: space[4],
    paddingBottom: space[4],
    alignItems: "center",
    gap: space[3],
  },
  progressText: { fontFamily: fonts.sans, fontSize: 14, color: theme.text, fontWeight: "600" },
  resetButton: {
    paddingHorizontal: space[4],
    paddingVertical: space[2],
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: theme.border,
  },
  resetText: { fontFamily: fonts.sans, fontSize: 13, color: theme.textMuted, fontWeight: "600" },
});
