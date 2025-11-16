import { describe, expect, test } from "vitest";
import { rgbToHex, hexToRgb, color } from "../blip";

describe("Colors Uilities Test", () => {
	test("Hex to RGB should work for 6-string format", () => {
		expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
	});

	test("RGB to Hex must work", () => {
		expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
	});

	test("color should accept hex value", () => {
		expect(color("#fffff")).toEqual({ r: 255, g: 255, b: 255 });
	});
	test("color should accept rgb value in list", () => {
		expect(color(255, 255, 255)).toBe({ r: 255, g: 255, b: 255 });
	});
	test("color should accept rgb value in object with keys r, g, b", () => {
		expect(color({ r: 255, g: 255, b: 255 })).toBe({ r: 255, g: 255, b: 255 });
	});
});
