import Svg, { Path } from "react-native-svg";

interface OpenLinkIconProps {
  size?: number;
  color?: string;
}

export function OpenLinkIcon({ size = 18, color = "#000000" }: OpenLinkIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M9 5 H5.5 A1.5 1.5 0 0 0 4 6.5 V18.5 A1.5 1.5 0 0 0 5.5 20 H17.5 A1.5 1.5 0 0 0 19 18.5 V15"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M13 4 H20 V11" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M19.5 4.5 L11 13" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
