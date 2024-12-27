"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BagPattern = void 0;
class BagPattern {
    dimensions;
    params;
    constructor(dimensions, params = {}) {
        this.dimensions = dimensions;
        this.params = params;
    }
    toSVG() {
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
    renderElement(elem) {
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
exports.BagPattern = BagPattern;
