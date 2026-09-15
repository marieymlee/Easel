import { Image } from "expo-image";

interface ArrowLeftIconProps {
  size?: number;
  color?: string;
}

const backIcon = require("../../../assets/icon-back.png");
const ARROW_RATIO = 108 / 104;

export function ArrowLeftIcon({ size = 26, color = "#000000" }: ArrowLeftIconProps) {
  return (
    <Image
      source={backIcon}
      style={{ width: size * ARROW_RATIO, height: size }}
      contentFit="contain"
      tintColor={color}
    />
  );
}
