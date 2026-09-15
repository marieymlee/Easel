import { Image } from "expo-image";

interface MusicNoteIconProps {
  size?: number;
  color?: string;
}

const musicIcon = require("../../../assets/icon-music.png");

export function MusicNoteIcon({ size = 22, color = "#000000" }: MusicNoteIconProps) {
  return <Image source={musicIcon} style={{ width: size, height: size }} contentFit="contain" tintColor={color} />;
}
