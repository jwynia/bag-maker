import { Dimension, Panel, PatternElement } from "./types";
import type { Path } from "./path";

export abstract class BagPattern {
  protected dimensions: Dimension;
  protected params: Record<string, number>;

  constructor(dimensions: Dimension, params: Record<string, number> = {}) {
    this.dimensions = dimensions;
    this.params = params;
  }

  abstract generatePanels(): Panel[];

  toSVG(): string {
    const panels = this.generatePanels();
    const panel = panels[0]; // For now, just handle first panel

    return `
      <svg xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 ${this.dimensions.width} ${this.dimensions.height}">
        ${this.renderElement(panel.outline)}
        ${panel.elements.map((elem) => this.renderElement(elem)).join("\n")}
      </svg>
    `;
  }

  private renderElement(elem: PatternElement): string {
    const style = elem.style || {};
    const attrs = {
      d: elem.path.toString(),
      fill: style.fill || "none",
      stroke: style.stroke || "black",
      "stroke-width": style.strokeWidth || 1,
      ...(style.strokeDasharray
        ? { "stroke-dasharray": style.strokeDasharray }
        : {}),
    };

    return `<path ${Object.entries(attrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ")}/>`;
  }
}
