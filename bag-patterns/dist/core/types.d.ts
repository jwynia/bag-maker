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
    style?: PathStyle;
}
export interface PathStyle {
    stroke?: string;
    fill?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
}
export interface Panel {
    outline: PatternElement;
    elements: PatternElement[];
}
