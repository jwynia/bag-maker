// In examples/generate-slanted.ts
import { WideBaseZipperedPouchPattern } from "../src";
import type { WideBaseZipperedPouchParams } from "../src/patterns/wide-base-zippered-pouch";
import * as fs from "fs";

const params: WideBaseZipperedPouchParams = {
  width: 300,
  internalHeight: 250,
  slantWidth: 50,
  zipperLength: 25.4,
  slotHeight: 30,
  cornerRadius: 15,
  notchSize: 30,
};

const pattern = new WideBaseZipperedPouchPattern(params);
const svg = pattern.toSVG();

// Write directly to file instead of using stdout
fs.writeFileSync("output.svg", svg);
