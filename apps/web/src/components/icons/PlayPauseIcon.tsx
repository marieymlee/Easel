import Svg, { Path, Rect } from "react-native-svg";

interface PlayPauseIconProps {
  playing: boolean;
  size?: number;
  color?: string;
}

export function PlayPauseIcon({ playing, size = 22, color = "#000000" }: PlayPauseIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {playing ? (
        <>
          <Rect x={6} y={5} width={4} height={14} rx={1.5} fill="none" stroke={color} strokeWidth={2} />
          <Rect x={14} y={5} width={4} height={14} rx={1.5} fill="none" stroke={color} strokeWidth={2} />
        </>
      ) : (
        <Path
          d="M7 4.5 L19 12 L7 19.5 Z"
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
}
