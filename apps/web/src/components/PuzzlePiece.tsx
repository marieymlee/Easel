import { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { PieceState } from "../puzzle/useJigsaw";
import { PieceShape } from "../puzzle/pieceShapes";

interface PuzzlePieceProps {
  piece: PieceState;
  shape: PieceShape;
  imageUrl: string;
  frameSize: number;
  pieceSize: number;
  homeRow: number;
  homeCol: number;
  onDrop: (id: number, x: number, y: number) => void;
}

/**
 * Drag is implemented with plain DOM mouse/touch listeners rather than RN's
 * PanResponder, which never receives events through react-native-web in this setup.
 */
export function PuzzlePiece({
  piece,
  shape,
  imageUrl,
  frameSize,
  pieceSize,
  homeRow,
  homeCol,
  onDrop,
}: PuzzlePieceProps) {
  const nodeRef = useRef<View>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const pieceRef = useRef(piece);
  pieceRef.current = piece;
  const onDropRef = useRef(onDrop);
  onDropRef.current = onDrop;

  useEffect(() => {
    const node = nodeRef.current as unknown as HTMLElement | null;
    if (!node) return;

    function startDrag(clientX: number, clientY: number) {
      if (pieceRef.current.placed) return;
      setDragging(true);
      const startX = clientX;
      const startY = clientY;

      const move = (cx: number, cy: number) => setOffset({ x: cx - startX, y: cy - startY });
      const end = (cx: number, cy: number) => {
        setDragging(false);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        const base = pieceRef.current;
        onDropRef.current(base.id, base.x + (cx - startX), base.y + (cy - startY));
        setOffset({ x: 0, y: 0 });
      };
      const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
      const onMouseUp = (e: MouseEvent) => end(e.clientX, e.clientY);
      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        if (t) move(t.clientX, t.clientY);
        e.preventDefault();
      };
      const onTouchEnd = (e: TouchEvent) => {
        const t = e.changedTouches[0];
        if (t) end(t.clientX, t.clientY);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
    }

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) startDrag(t.clientX, t.clientY);
    };

    node.addEventListener("mousedown", onMouseDown);
    node.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      node.removeEventListener("mousedown", onMouseDown);
      node.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  const clipStyle = {
    clipPath: `path('${shape.d}')`,
    WebkitClipPath: `path('${shape.d}')`,
  } as Record<string, string>;

  return (
    <View
      ref={nodeRef}
      style={[
        {
          position: "absolute",
          left: piece.x - shape.bleed + offset.x,
          top: piece.y - shape.bleed + offset.y,
          width: shape.boxSize,
          height: shape.boxSize,
          zIndex: dragging ? 100 : piece.placed ? 1 : 5,
        },
        {
          cursor: piece.placed ? "default" : "grab",
          filter: dragging
            ? "drop-shadow(0px 8px 12px rgba(0,0,0,0.5))"
            : "drop-shadow(0px 1px 2px rgba(0,0,0,0.35))",
        } as Record<string, string>,
      ]}
    >
      <View style={[{ width: shape.boxSize, height: shape.boxSize }, clipStyle]}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={{
            width: frameSize,
            height: frameSize,
            position: "absolute",
            left: shape.bleed - homeCol * pieceSize,
            top: shape.bleed - homeRow * pieceSize,
          }}
        />
      </View>
    </View>
  );
}
