import { BagPattern, Panel } from "../core";
interface SlantedBagParams extends Record<string, number> {
    width: number;
    height: number;
    slantAngle: number;
    slantWidth: number;
    slotHeight: number;
    slotPadding: number;
    cornerRadius: number;
}
export declare class SlantedBagPattern extends BagPattern {
    protected params: SlantedBagParams;
    private notchSize;
    private notchStyle;
    constructor(params: SlantedBagParams);
    private generateOutlinePath;
    private generateCenterSlot;
    private generateCornerNotches;
    generatePanels(): Panel[];
}
export {};
