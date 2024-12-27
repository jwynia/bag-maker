"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlantedBagPattern = void 0;
const core_1 = require("../core");
class SlantedBagPattern extends core_1.BagPattern {
    notchSize = 5; // Now specific to this pattern type
    notchStyle = {
        stroke: "black",
        strokeDasharray: "2,2",
    };
    constructor(params) {
        super({ width: params.width, height: params.height }, params);
    }
    generateOutlinePath() {
        const { width, height, slantAngle, slantWidth } = this
            .params;
        // Calculate slant offset based on angle
        const slantOffset = Math.tan((slantAngle * Math.PI) / 180) * slantWidth;
        // Start from top-left and work clockwise
        return (new core_1.Path()
            .moveTo({ x: 0, y: 0 })
            // Top edge
            .lineTo({ x: width, y: 0 })
            // Right angled section
            .lineTo({ x: width, y: slantWidth })
            .lineTo({ x: width - slantOffset, y: height / 2 })
            .lineTo({ x: width, y: height - slantWidth })
            // Bottom edge
            .lineTo({ x: width, y: height })
            .lineTo({ x: 0, y: height })
            // Left angled section
            .lineTo({ x: 0, y: height - slantWidth })
            .lineTo({ x: slantOffset, y: height / 2 })
            .lineTo({ x: 0, y: slantWidth })
            .closePath());
    }
    generateCenterSlot() {
        const { width, height, slotHeight, slotPadding, cornerRadius } = this
            .params;
        const slotWidth = width - slotPadding * 2;
        const slotY = (height - slotHeight) / 2;
        return (new core_1.Path()
            // Start at left edge of slot
            .moveTo({ x: slotPadding + cornerRadius, y: slotY })
            // Top edge
            .lineTo({ x: width - slotPadding - cornerRadius, y: slotY })
            // Top right corner
            .arcTo({ x: width - slotPadding, y: slotY + cornerRadius }, cornerRadius)
            // Right edge
            .lineTo({
            x: width - slotPadding,
            y: slotY + slotHeight - cornerRadius,
        })
            // Bottom right corner
            .arcTo({ x: width - slotPadding - cornerRadius, y: slotY + slotHeight }, cornerRadius)
            // Bottom edge
            .lineTo({ x: slotPadding + cornerRadius, y: slotY + slotHeight })
            // Bottom left corner
            .arcTo({ x: slotPadding, y: slotY + slotHeight - cornerRadius }, cornerRadius)
            // Left edge
            .lineTo({ x: slotPadding, y: slotY + cornerRadius })
            // Top left corner
            .arcTo({ x: slotPadding + cornerRadius, y: slotY }, cornerRadius));
        // Removed closePath() since this is a complete circle
    }
    generateCornerNotches() {
        const { width, height, slantWidth, slantAngle } = this
            .params;
        const notchSize = 5; // 5mm notch size
        const slantOffset = Math.tan((slantAngle * Math.PI) / 180) * slantWidth;
        // Calculate notch positions
        const notches = [];
        // Top left notch
        notches.push(new core_1.Path()
            .moveTo({ x: slantOffset - notchSize, y: height / 2 })
            .lineTo({ x: slantOffset + notchSize, y: height / 2 }));
        // Top right notch
        notches.push(new core_1.Path()
            .moveTo({ x: width - slantOffset - notchSize, y: height / 2 })
            .lineTo({ x: width - slantOffset + notchSize, y: height / 2 }));
        // Bottom notches - similar to top but mirrored
        notches.push(new core_1.Path()
            .moveTo({ x: slantOffset - notchSize, y: height / 2 })
            .lineTo({ x: slantOffset + notchSize, y: height / 2 }));
        notches.push(new core_1.Path()
            .moveTo({ x: width - slantOffset - notchSize, y: height / 2 })
            .lineTo({ x: width - slantOffset + notchSize, y: height / 2 }));
        return notches;
    }
    generatePanels() {
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
                    ...this.generateCornerNotches().map((notch) => ({
                        path: notch,
                        style: this.notchStyle,
                    })),
                ],
            },
        ];
    }
}
exports.SlantedBagPattern = SlantedBagPattern;
// Usage example:
const params = {
    width: 550, // 55cm
    height: 450, // 45cm
    slantAngle: 15, // 15 degrees
    slantWidth: 100, // 10cm
    slotHeight: 30, // 3cm
    slotPadding: 50, // 5cm from edges
    cornerRadius: 15, // 1.5cm radius for slot corners
};
const pattern = new SlantedBagPattern(params);
