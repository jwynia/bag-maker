import type { Path } from "./path";

export interface Point {
  x: number;
  y: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface PatternElement {
  path: Path;
  style?: PathStyle; // Optional styling information
}

export interface PathStyle {
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  // Add other SVG styling properties as needed
}

export interface Panel {
  outline: PatternElement;
  elements: PatternElement[]; // All other elements (cutouts, notches, marks, etc)
}
