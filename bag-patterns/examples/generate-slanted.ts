// In examples/generate-slanted.ts
import { SlantedBagPattern } from "../src";
import type { SlantedBagParams } from "../src/patterns/slanted-bag";
import * as fs from "fs";

const params: SlantedBagParams = {
  width: 300, // 55cm in mm
  height: 250, // 45cm in mm
  slantAngle: 15, // 15 degrees
  slantWidth: 120, // 10cm in mm
  zipperLength: 25.4, // 25.4cm length zipper
  slotHeight: 30, // 3cm in mm
  cornerRadius: 15, // 1.5cm radius in mm
};

const pattern = new SlantedBagPattern(params);
const svg = pattern.toSVG();

// Write directly to file instead of using stdout
fs.writeFileSync("output.svg", svg);
