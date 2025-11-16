import Blip from "./blip";
import { rgbToHex } from "./blip";

const blip = new Blip();

// creating a rectangle on the new canvas manually
blip.canvas_ctx.fillStyle = "red";
blip.canvas_ctx.fillRect(50, 50, 100, 80);

console.log(rgbToHex(200, 0, 5));
