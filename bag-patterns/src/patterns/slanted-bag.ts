import { PathStyle } from "src/core/types";
import { BagPattern, Path, Panel, Point } from "../core";

export interface SlantedBagParams extends Record<string, number> {
  width: number; // Overall width
  height: number; // Overall height
  slantAngle: number; // Angle of side sections
  slantWidth: number; // Width of angled portion
  zipperLength: number; // Length of zipper in cm
  slotHeight: number; // Height of slot opening
  cornerRadius: number; // Radius for slot corners
}

export class SlantedBagPattern extends BagPattern {
  protected declare params: SlantedBagParams;
  private readonly ZIPPER_REDUCTION = 25; // 2.5cm reduction in mm

  constructor(params: SlantedBagParams) {
    super({ width: params.width, height: params.height }, params);
  }

  private generateOutlinePath(): Path {
    const { width, height, slantAngle, slantWidth } = this
      .params as SlantedBagParams;

    // Calculate slant offset based on angle
    const slantOffset = Math.tan((slantAngle * Math.PI) / 180) * slantWidth;
    const notchSize = slantWidth * 0.2; // Make notch size proportional to slant width

    return (
      new Path()
        // Start from after top-left notch
        .moveTo({ x: notchSize, y: 0 })
        // Top edge
        .lineTo({ x: width - notchSize, y: 0 })
        // Top-right notch
        .lineTo({ x: width - notchSize, y: notchSize })
        .lineTo({ x: width, y: notchSize })
        // Right side to slant
        .lineTo({ x: width, y: slantWidth })
        .lineTo({ x: width - slantOffset, y: height / 2 })
        .lineTo({ x: width, y: height - slantWidth })
        // Bottom-right notch
        .lineTo({ x: width, y: height - notchSize })
        .lineTo({ x: width - notchSize, y: height - notchSize })
        .lineTo({ x: width - notchSize, y: height })
        // Bottom edge
        .lineTo({ x: notchSize, y: height })
        // Bottom-left notch
        .lineTo({ x: notchSize, y: height - notchSize })
        .lineTo({ x: 0, y: height - notchSize })
        // Left side to slant
        .lineTo({ x: 0, y: height - slantWidth })
        .lineTo({ x: slantOffset, y: height / 2 })
        .lineTo({ x: 0, y: slantWidth })
        // Top-left notch completion
        .lineTo({ x: 0, y: notchSize })
        .lineTo({ x: notchSize, y: notchSize })
        .closePath()
    );
  }

  private generateCenterSlot(): Path {
    const { width, height, zipperLength, slotHeight, cornerRadius } = this
      .params as SlantedBagParams;

    // Convert zipper length to slot width (converting cm to mm and applying reduction)
    const slotWidth = zipperLength * 10 - this.ZIPPER_REDUCTION;

    // Center the slot
    const slotPadding = (width - slotWidth) / 2;
    const slotY = (height - slotHeight) / 2;

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
