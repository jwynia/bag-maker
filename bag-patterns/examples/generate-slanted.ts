// In examples/generate-slanted.ts
import { SlantedBagPattern } from "../src";
import type { SlantedBagParams } from "../src/patterns/slanted-bag";
import * as fs from "fs";

const params: SlantedBagParams = {
  width: 350, // 55cm in mm
  internalHeight: 410, // 41cm in mm (between notches)
  slantAngle: 15, // 15 degrees
  slantWidth: 50, // 10cm in mm
  zipperLength: 25.4, // 25.4cm length zipper
  slotHeight: 30, // 3cm in mm
  cornerRadius: 15, // 1.5cm radius in mm
  notchSize: 30, // 2cm notch size
};

const pattern = new SlantedBagPattern(params);
const svg = pattern.toSVG();

// Write directly to file instead of using stdout
fs.writeFileSync("output.svg", svg);
