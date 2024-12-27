import type { Point } from "./types";

export class Path {
  private commands: string[] = [];

  moveTo(p: Point): Path {
    this.commands.push(`M ${p.x} ${p.y}`);
    return this;
  }

  lineTo(p: Point): Path {
    this.commands.push(`L ${p.x} ${p.y}`);
    return this;
  }

  arcTo(p: Point, radius: number): Path {
    // Basic arc implementation - we can improve this later
    this.commands.push(`A ${radius} ${radius} 0 0 1 ${p.x} ${p.y}`);
    return this;
  }

  closePath(): Path {
    this.commands.push("Z");
    return this;
  }

  toString(): string {
    return this.commands.join(" ");
  }
}
