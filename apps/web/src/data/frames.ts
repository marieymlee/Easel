export interface FrameSlot {
  /** Aperture position/size as a fraction of the full frames-wall.png, so it scales responsively. */
  left: number;
  top: number;
  width: number;
  height: number;
  isOval: boolean;
}

export const FRAMES_WALL_ASPECT = 550 / 771;

/**
 * Each opening in assets/frames-wall.png (the single, unmodified sheet of hand-drawn
 * frames), as a percentage rect — one painting is composited behind each opening.
 */
export const frameSlots: FrameSlot[] = [
  { left: 0.3836, top: 0.1102, width: 0.1127, height: 0.048, isOval: false },
  { left: 0.5764, top: 0.1193, width: 0.1964, height: 0.1478, isOval: false },
  { left: 0.1, top: 0.2334, width: 0.1418, height: 0.1491, isOval: true },
  { left: 0.2891, top: 0.201, width: 0.2018, height: 0.0687, isOval: false },
  { left: 0.0673, top: 0.4345, width: 0.1745, height: 0.0817, isOval: false },
  { left: 0.3345, top: 0.3359, width: 0.3, height: 0.2685, isOval: false },
  { left: 0.7291, top: 0.5201, width: 0.1745, height: 0.1012, isOval: false },
  { left: 0.5673, top: 0.6771, width: 0.1745, height: 0.0947, isOval: false },
  { left: 0.6018, top: 0.8443, width: 0.0764, height: 0.096, isOval: true },
  { left: 0.4273, top: 0.908, width: 0.0655, height: 0.0584, isOval: false },
  { left: 0.1436, top: 0.5642, width: 0.1364, height: 0.2304, isOval: false },
  { left: 0.3206, top: 0.6567, width: 0.1885, height: 0.2136, isOval: false },
  { left: 0.703, top: 0.3221, width: 0.1273, height: 0.16, isOval: true },
];
