import type { Point } from "./types";
export declare class Path {
    private commands;
    moveTo(p: Point): Path;
    lineTo(p: Point): Path;
    arcTo(p: Point, radius: number): Path;
    closePath(): Path;
    toString(): string;
}
