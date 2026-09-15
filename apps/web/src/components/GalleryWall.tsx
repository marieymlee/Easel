import { Image, Pressable, View } from "react-native";
import { Painting } from "../data/paintings";
import { frameSlots, FRAMES_WALL_ASPECT } from "../data/frames";

const wallImage = require("../../assets/frames-wall.png");

interface GalleryWallProps {
  paintings: Painting[];
  solvedIds: Set<number>;
  onSelect: (painting: Painting) => void;
  width: number;
}

/** The home screen "gallery wall": one unmodified frame sheet, with a painting composited behind each opening. */
export function GalleryWall({ paintings, onSelect, width }: GalleryWallProps) {
  const height = width / FRAMES_WALL_ASPECT;

  return (
    <View style={{ width, height }}>
      {paintings.slice(0, frameSlots.length).map((painting, i) => {
        const slot = frameSlots[i];
        const left = slot.left * width;
        const top = slot.top * height;
        const w = slot.width * width;
        const h = slot.height * height;
        const hitSlopX = Math.max(0, (44 - w) / 2);
        const hitSlopY = Math.max(0, (44 - h) / 2);

        return (
          <Pressable
            key={painting.id}
            onPress={() => onSelect(painting)}
            hitSlop={{ top: hitSlopY, bottom: hitSlopY, left: hitSlopX, right: hitSlopX }}
            style={{
              position: "absolute",
              left,
              top,
              width: w,
              height: h,
              overflow: "hidden",
              borderRadius: slot.isOval ? Math.min(w, h) / 2 : 0,
            }}
          >
            <Image
              source={{ uri: painting.imageUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </Pressable>
        );
      })}
      <View style={{ position: "absolute", left: 0, top: 0, width, height, pointerEvents: "none" }}>
        <Image source={wallImage} resizeMode="stretch" style={{ width, height }} />
      </View>
    </View>
  );
}
