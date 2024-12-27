// In examples/generate-slanted.ts
import { SlantedBagPattern } from "../src";
import type { SlantedBagParams } from "../src/patterns/slanted-bag";
import * as fs from "fs";

const params: SlantedBagParams = {
  width: 300,
  internalHeight: 250,
  slantWidth: 50,
  zipperLength: 25.4,
  slotHeight: 30,
  cornerRadius: 15,
  notchSize: 30,
};

const pattern = new SlantedBagPattern(params);
const svg = pattern.toSVG();

// Write directly to file instead of using stdout
fs.writeFileSync("output.svg", svg);
