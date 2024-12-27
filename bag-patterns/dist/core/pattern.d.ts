import { Dimension, Panel } from "./types";
export declare abstract class BagPattern {
    protected dimensions: Dimension;
    protected params: Record<string, number>;
    constructor(dimensions: Dimension, params?: Record<string, number>);
    abstract generatePanels(): Panel[];
    toSVG(): string;
    private renderElement;
}
