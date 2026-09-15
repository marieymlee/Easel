import { Image } from "expo-image";

interface CompletePuzzleIconProps {
  size?: number;
  color?: string;
}

const completeIcon = require("../../../assets/icon-complete.png");

export function CompletePuzzleIcon({ size = 26, color = "#000000" }: CompletePuzzleIconProps) {
  return (
    <Image source={completeIcon} style={{ width: size, height: size }} contentFit="contain" tintColor={color} />
  );
}
