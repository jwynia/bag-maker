import { PathStyle } from "src/core/types";
import { BagPattern, Path, Panel, Point } from "../core";

export interface SlantedBagParams extends Record<string, number> {
  width: number; // Overall width in mm
  internalHeight: number; // Height between notches in mm
  slantWidth: number; // Width of angled portion in mm
  zipperLength: number; // Length of zipper in cm
  slotHeight: number; // Height of slot opening in mm
  cornerRadius: number; // Radius for slot corners in mm
  notchSize: number; // Size of corner notches in mm
}

export class SlantedBagPattern extends BagPattern {
  protected declare params: SlantedBagParams;
  private readonly ZIPPER_REDUCTION = 25; // 2.5cm reduction in mm

  constructor(params: SlantedBagParams) {
    const totalHeight = params.internalHeight + 2 * params.notchSize;
    super({ width: params.width, height: totalHeight }, params);
  }
  private calculateSlantAngle(): number {
    const { internalHeight, slantWidth } = this.params;
    return Math.atan(slantWidth / (internalHeight / 2)) * (180 / Math.PI);
  }

  private calculateSlantOffset(): number {
    const { slantWidth } = this.params;
    const slantAngle = this.calculateSlantAngle();
    return Math.tan((slantAngle * Math.PI) / 180) * slantWidth;
  }

  private calculateTotalHeight(): number {
    const { internalHeight } = this.params;
    const notchSize = this.calculateNotchSize();
    return internalHeight + 2 * notchSize;
  }

  private calculateNotchSize(): number {
    return this.params.notchSize;
  }

  private generateOutlinePath(): Path {
    const { width } = this.params;
    const notchSize = this.calculateNotchSize();
    const slantOffset = this.calculateSlantOffset();
    const totalHeight = this.calculateTotalHeight();

    return new Path()
      .moveTo({ x: notchSize, y: 0 })
      .lineTo({ x: width - notchSize, y: 0 })
      .lineTo({ x: width - notchSize, y: notchSize })
      .lineTo({ x: width, y: notchSize })
      .lineTo({ x: width - slantOffset, y: totalHeight / 2 })
      .lineTo({ x: width, y: totalHeight - notchSize })
      .lineTo({ x: width - notchSize, y: totalHeight - notchSize })
      .lineTo({ x: width - notchSize, y: totalHeight })
      .lineTo({ x: notchSize, y: totalHeight })
      .lineTo({ x: notchSize, y: totalHeight - notchSize })
      .lineTo({ x: 0, y: totalHeight - notchSize })
      .lineTo({ x: slantOffset, y: totalHeight / 2 })
      .lineTo({ x: 0, y: notchSize })
      .lineTo({ x: notchSize, y: notchSize })
      .closePath();
  }

  private generateCenterSlot(): Path {
    const { width, slotHeight, cornerRadius } = this.params;
    const slotWidth = this.params.zipperLength * 10 - this.ZIPPER_REDUCTION;
    const slotPadding = (width - slotWidth) / 2;
    const totalHeight = this.calculateTotalHeight();
    const slotY = (totalHeight - slotHeight) / 2;

    return new Path()
      .moveTo({ x: slotPadding + cornerRadius, y: slotY })
      .lineTo({ x: slotPadding + slotWidth - cornerRadius, y: slotY })
      .arcTo(
        { x: slotPadding + slotWidth, y: slotY + cornerRadius },
        cornerRadius
      )
      .lineTo({
        x: slotPadding + slotWidth,
        y: slotY + slotHeight - cornerRadius,
      })
      .arcTo(
        { x: slotPadding + slotWidth - cornerRadius, y: slotY + slotHeight },
        cornerRadius
      )
      .lineTo({ x: slotPadding + cornerRadius, y: slotY + slotHeight })
      .arcTo(
        { x: slotPadding, y: slotY + slotHeight - cornerRadius },
        cornerRadius
      )
      .lineTo({ x: slotPadding, y: slotY + cornerRadius })
      .arcTo({ x: slotPadding + cornerRadius, y: slotY }, cornerRadius);
  }

  generatePanels(): Panel[] {
    return [
      {
        outline: {
          path: this.generateOutlinePath(),
          style: { stroke: "black" },
        },
        elements: [
          {
            path: this.generateCenterSlot(),
            style: { stroke: "black" },
          },
        ],
      },
    ];
  }
}
