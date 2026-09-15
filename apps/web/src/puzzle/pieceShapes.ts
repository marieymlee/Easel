/** Random ±1 sign per internal edge of the grid — shared between the two pieces on either side. */
export interface EdgeSigns {
  /** vEdges[r][c]: sign of the vertical edge between column c and c+1 in row r (piece (r,c)'s right tab direction). */
  vEdges: number[][];
  /** hEdges[r][c]: sign of the horizontal edge between row r and r+1 in column c (piece (r,c)'s bottom tab direction). */
  hEdges: number[][];
}

export function generateEdgeSigns(gridSize: number): EdgeSigns {
  const randSign = () => (Math.random() < 0.5 ? -1 : 1);
  const vEdges = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize - 1 }, randSign),
  );
  const hEdges = Array.from({ length: gridSize - 1 }, () => Array.from({ length: gridSize }, randSign));
  return { vEdges, hEdges };
}

export interface PieceEdges {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/** A piece's own tab/blank signs, derived from its home (r, c) — intrinsic to the piece, not its current slot. */
export function getPieceEdges(r: number, c: number, gridSize: number, edges: EdgeSigns): PieceEdges {
  return {
    top: r === 0 ? 0 : -edges.hEdges[r - 1][c],
    right: c === gridSize - 1 ? 0 : edges.vEdges[r][c],
    bottom: r === gridSize - 1 ? 0 : edges.hEdges[r][c],
    left: c === 0 ? 0 : -edges.vEdges[r][c - 1],
  };
}

export interface PieceShape {
  /** SVG path 'd', in local coordinates where (bleed, bleed) is the piece's nominal top-left corner. */
  d: string;
  /** Extra margin beyond the nominal square needed for outward tabs, in the same units as `size`. */
  bleed: number;
  /** Full side length of the local coordinate box (size + 2 * bleed). */
  boxSize: number;
}

const KAPPA = 0.5523;

/**
 * One tabbed edge as a sequence of draw ops in LOCAL edge space: x runs 0→len along the
 * edge, y is the perpendicular offset (already signed — positive means "outward"). A classic
 * jigsaw knob: straight neck, a slight inward pinch, then a round head made of two true
 * circular arcs (via cubic bezier), mirrored back in.
 */
function knobOps(len: number, sign: number, radius: number) {
  const mid = len / 2;
  const headHalf = radius; // half-width of the round head's base
  const neckHalf = radius * 1.35; // half-width out to the pinch — must exceed headHalf
  const pinchDepth = radius * 0.28; // how far the neck dips inward before flaring out
  const k = KAPPA * radius;

  const neckL = mid - neckHalf;
  const headL = mid - headHalf;
  const headR = mid + headHalf;
  const neckR = mid + neckHalf;

  return [
    { cmd: "L" as const, p: [neckL, 0] as Pt },
    // Slight concave pinch in, then out to the base of the round head.
    {
      cmd: "C" as const,
      c1: [neckL + radius * 0.15, sign * pinchDepth] as Pt,
      c2: [headL - radius * 0.15, sign * pinchDepth] as Pt,
      p: [headL, 0] as Pt,
    },
    // Round head: two quarter-circle beziers up over the top and back down.
    {
      cmd: "C" as const,
      c1: [headL, sign * k] as Pt,
      c2: [mid - k, sign * radius] as Pt,
      p: [mid, sign * radius] as Pt,
    },
    {
      cmd: "C" as const,
      c1: [mid + k, sign * radius] as Pt,
      c2: [headR, sign * k] as Pt,
      p: [headR, 0] as Pt,
    },
    // Mirror of the pinch, back down to the straight run into the corner.
    {
      cmd: "C" as const,
      c1: [headR + radius * 0.15, sign * pinchDepth] as Pt,
      c2: [neckR - radius * 0.15, sign * pinchDepth] as Pt,
      p: [neckR, 0] as Pt,
    },
    { cmd: "L" as const, p: [len, 0] as Pt },
  ];
}

type Pt = [number, number];
type Op = { cmd: "L"; p: Pt } | { cmd: "C"; c1: Pt; c2: Pt; p: Pt };

/** Builds one piece's silhouette path for a square of side `size`, rotating clockwise from the top-left corner. */
export function piecePath(edgeSigns: PieceEdges, size: number, tabFraction = 0.19): PieceShape {
  const radius = size * tabFraction;
  const bleed = radius * 1.7;
  const boxSize = size + bleed * 2;
  const x0 = bleed;
  const y0 = bleed;

  let d = `M ${x0} ${y0}`;
  d += edge(x0, y0, edgeSigns.top, size, radius, "h");
  d += edge(x0 + size, y0, edgeSigns.right, size, radius, "v");
  d += edge(x0 + size, y0 + size, edgeSigns.bottom, size, radius, "h-");
  d += edge(x0, y0 + size, edgeSigns.left, size, radius, "v-");
  d += " Z";

  return { d, bleed, boxSize };
}

/** One edge starting at (ax, ay), length `len`, in the given direction/outward `axis`. */
function edge(ax: number, ay: number, sign: number, len: number, radius: number, axis: "h" | "v" | "h-" | "v-"): string {
  if (sign === 0) {
    switch (axis) {
      case "h":
        return ` L ${ax + len} ${ay}`;
      case "h-":
        return ` L ${ax - len} ${ay}`;
      case "v":
        return ` L ${ax} ${ay + len}`;
      case "v-":
        return ` L ${ax} ${ay - len}`;
    }
  }

  const toAbs = (p: Pt): Pt => {
    const [along, perp] = p;
    switch (axis) {
      case "h":
        return [ax + along, ay - perp];
      case "h-":
        return [ax - along, ay + perp];
      case "v":
        return [ax + perp, ay + along];
      case "v-":
        return [ax - perp, ay - along];
    }
  };

  const ops: Op[] = knobOps(len, sign, radius);
  let d = "";
  for (const op of ops) {
    if (op.cmd === "L") {
      const [x, y] = toAbs(op.p);
      d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    } else {
      const [c1x, c1y] = toAbs(op.c1);
      const [c2x, c2y] = toAbs(op.c2);
      const [x, y] = toAbs(op.p);
      d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
  }
  return d;
}
