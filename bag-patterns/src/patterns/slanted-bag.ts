import { PathStyle } from "src/core/types";
import { BagPattern, Path, Panel, Point } from "../core";

export interface SlantedBagParams extends Record<string, number> {
  width: number; // Overall width
  internalHeight: number; // Height between notches
  slantAngle: number; // Angle of side sections
  slantWidth: number; // Width of angled portion
  zipperLength: number; // Length of zipper in cm
  slotHeight: number; // Height of slot opening
  cornerRadius: number; // Radius for slot corners
  notchSize: number; // Size of corner notches
}

export class SlantedBagPattern extends BagPattern {
  protected declare params: SlantedBagParams;
  private readonly ZIPPER_REDUCTION = 25; // 2.5cm reduction in mm

  constructor(params: SlantedBagParams) {
    // If notchSize isn't provided, set it in the params
    if (!params.notchSize) {
      params.notchSize = params.slantWidth * 0.2;
    }
    const totalHeight = params.internalHeight + 2 * params.notchSize;
    super({ width: params.width, height: totalHeight }, params);
  }
  private calculateNotchSize(): number {
    return this.params.notchSize ?? this.params.slantWidth * 0.2;
  }

  private calculateSlantOffset(): number {
    const { slantAngle, slantWidth } = this.params;
    return Math.tan((slantAngle * Math.PI) / 180) * slantWidth;
  }

  private calculateTotalHeight(): number {
    const { internalHeight } = this.params;
    const notchSize = this.calculateNotchSize();
    return internalHeight + 2 * notchSize;
  }
  private generateOutlinePath(): Path {
    const { width } = this.params;
    const notchSize = this.calculateNotchSize();
    const slantOffset = this.calculateSlantOffset();
    const totalHeight = this.calculateTotalHeight();

    return (
      new Path()
        // Start from after top-left notch
        .moveTo({ x: notchSize, y: 0 })
        // Top edge
        .lineTo({ x: width - notchSize, y: 0 })
        // Top-right notch and slant
        .lineTo({ x: width - notchSize, y: notchSize })
        .lineTo({ x: width, y: notchSize })
        .lineTo({ x: width - slantOffset, y: totalHeight / 2 })
        // Bottom-right slant and notch
        .lineTo({ x: width, y: totalHeight - notchSize })
        .lineTo({ x: width - notchSize, y: totalHeight - notchSize })
        .lineTo({ x: width - notchSize, y: totalHeight })
        // Bottom edge
        .lineTo({ x: notchSize, y: totalHeight })
        // Bottom-left notch and slant
        .lineTo({ x: notchSize, y: totalHeight - notchSize })
        .lineTo({ x: 0, y: totalHeight - notchSize })
        .lineTo({ x: slantOffset, y: totalHeight / 2 })
        // Top-left slant and notch completion
        .lineTo({ x: 0, y: notchSize })
        .lineTo({ x: notchSize, y: notchSize })
        .closePath()
    );
  }

  private generateCenterSlot(): Path {
    const { width, zipperLength, slotHeight, cornerRadius } = this.params;

    // Convert zipper length to slot width (converting cm to mm and applying reduction)
    const slotWidth = zipperLength * 10 - this.ZIPPER_REDUCTION;

    // Center the slot horizontally
    const slotPadding = (width - slotWidth) / 2;

    // Center the slot vertically using the total calculated height
    const totalHeight = this.calculateTotalHeight();
    const slotY = (totalHeight - slotHeight) / 2;

    // Debug logs
    console.log("Slot calculations:", {
      slotWidth,
      slotPadding,
      slotY,
      totalHeight,
      slotHeight,
    });

    return (
      new Path()
        // Start at left edge of slot
        .moveTo({ x: slotPadding + cornerRadius, y: slotY })
        // Top edge
        .lineTo({ x: slotPadding + slotWidth - cornerRadius, y: slotY })
        // Top right corner
        .arcTo(
          { x: slotPadding + slotWidth, y: slotY + cornerRadius },
          cornerRadius
        )
        // Right edge
        .lineTo({
          x: slotPadding + slotWidth,
          y: slotY + slotHeight - cornerRadius,
        })
        // Bottom right corner
        .arcTo(
          { x: slotPadding + slotWidth - cornerRadius, y: slotY + slotHeight },
          cornerRadius
        )
        // Bottom edge
        .lineTo({ x: slotPadding + cornerRadius, y: slotY + slotHeight })
        // Bottom left corner
        .arcTo(
          { x: slotPadding, y: slotY + slotHeight - cornerRadius },
          cornerRadius
        )
        // Left edge
        .lineTo({ x: slotPadding, y: slotY + cornerRadius })
        // Top left corner
        .arcTo({ x: slotPadding + cornerRadius, y: slotY }, cornerRadius)
    );
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
