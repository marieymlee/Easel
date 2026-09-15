import { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { EdgeSigns, getPieceEdges, piecePath } from "../puzzle/pieceShapes";
import { GRID_SIZE, PieceState, PuzzleLayout } from "../puzzle/useJigsaw";
import { PuzzlePiece } from "./PuzzlePiece";
import { theme } from "../theme/tokens";

const topImage = require("../../assets/easel-top.png");
const bottomImage = require("../../assets/easel-bottom.png");
const TOP_RATIO = 672 / 223;
const BOTTOM_RATIO = 672 / 485;

interface PuzzleCanvasProps {
  imageUrl: string;
  layout: PuzzleLayout;
  pieces: PieceState[];
  edges: EdgeSigns;
  onDrop: (id: number, x: number, y: number) => boolean;
}

export function PuzzleCanvas({ imageUrl, layout, pieces, edges, onDrop }: PuzzleCanvasProps) {
  const { pieceSize, frameSize, frameX, frameY, playW, playH } = layout;
  const pieceCount = pieces.length;

  const pieceShapes = useMemo(
    () =>
      Array.from({ length: pieceCount }, (_, id) => {
        const r = Math.floor(id / GRID_SIZE);
        const c = id % GRID_SIZE;
        return piecePath(getPieceEdges(r, c, GRID_SIZE, edges), pieceSize);
      }),
    [edges, pieceSize, pieceCount],
  );
  const hintBleed = pieceShapes[0]?.bleed ?? 0;

  return (
    <View style={{ width: playW, height: playH, position: "relative", overflow: "visible" }}>
      <LinearGradient colors={theme.canvasGradient} style={StyleSheet.absoluteFill} />

      <Image
        source={topImage}
        resizeMode="stretch"
        style={{
          position: "absolute",
          left: frameX,
          top: frameY - frameSize / TOP_RATIO,
          width: frameSize,
          height: frameSize / TOP_RATIO,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: frameX,
          top: frameY,
          width: frameSize,
          height: frameSize,
          borderWidth: 3,
          borderColor: theme.border,
          backgroundColor: theme.surfaceSunken,
        }}
      />
      <Svg
        width={frameSize + hintBleed * 2}
        height={frameSize + hintBleed * 2}
        style={{
          position: "absolute",
          left: frameX - hintBleed,
          top: frameY - hintBleed,
        }}
        pointerEvents="none"
      >
        {pieceShapes.map((shape, id) => {
          const r = Math.floor(id / GRID_SIZE);
          const c = id % GRID_SIZE;
          return (
            <Path
              key={id}
              d={shape.d}
              transform={`translate(${c * pieceSize}, ${r * pieceSize})`}
              fill="none"
              stroke={theme.border}
              strokeOpacity={0.35}
              strokeWidth={1.25}
            />
          );
        })}
      </Svg>
      <Image
        source={bottomImage}
        resizeMode="stretch"
        style={{
          position: "absolute",
          left: frameX,
          top: frameY + frameSize - 2,
          width: frameSize,
          height: frameSize / BOTTOM_RATIO,
        }}
      />

      {pieces.map((piece) => (
        <PuzzlePiece
          key={piece.id}
          piece={piece}
          shape={pieceShapes[piece.id]}
          imageUrl={imageUrl}
          frameSize={frameSize}
          pieceSize={pieceSize}
          homeRow={Math.floor(piece.id / GRID_SIZE)}
          homeCol={piece.id % GRID_SIZE}
          onDrop={onDrop}
        />
      ))}
    </View>
  );
}
