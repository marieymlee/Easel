import { Image, Pressable, StyleSheet, View } from "react-native";
import { colors } from "../theme/tokens";
import { GRID_SIZE } from "../puzzle/useJigsaw";

interface PuzzleBoardProps {
  imageUrl: string;
  boardSize: number;
  board: number[];
  selected: number | null;
  onTapCell: (position: number) => void;
}

export function PuzzleBoard({ imageUrl, boardSize, board, selected, onTapCell }: PuzzleBoardProps) {
  const pieceSize = boardSize / GRID_SIZE;

  return (
    <View style={[styles.board, { width: boardSize, height: boardSize }]}>
      {board.map((pieceId, position) => {
        const row = Math.floor(pieceId / GRID_SIZE);
        const col = pieceId % GRID_SIZE;
        const isSelected = selected === position;
        const isHome = pieceId === position;

        return (
          <Pressable
            key={position}
            onPress={() => onTapCell(position)}
            style={[
              styles.cell,
              {
                width: pieceSize,
                height: pieceSize,
                borderColor: isSelected ? colors.accent500 : "rgba(255,255,255,0.35)",
                borderWidth: isSelected ? 2 : StyleSheet.hairlineWidth,
                opacity: isHome ? 1 : 0.97,
              },
            ]}
          >
            <View style={{ width: pieceSize, height: pieceSize, overflow: "hidden" }}>
              <Image
                source={{ uri: imageUrl }}
                resizeMode="stretch"
                style={{
                  width: boardSize,
                  height: boardSize,
                  position: "absolute",
                  left: -col * pieceSize,
                  top: -row * pieceSize,
                }}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.ink900,
  },
  cell: {},
});
