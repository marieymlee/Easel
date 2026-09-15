import { Image } from "expo-image";

interface ShuffleIconProps {
  size?: number;
  color?: string;
}

const puzzleIcon = require("../../../assets/icon-puzzle.png");

export function ShuffleIcon({ size = 26, color = "#000000" }: ShuffleIconProps) {
  return (
    <Image source={puzzleIcon} style={{ width: size, height: size }} contentFit="contain" tintColor={color} />
  );
}
