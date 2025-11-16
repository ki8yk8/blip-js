import { describe, expect, test } from "vitest";
import { rgbToHex, hexToRgb } from "../blip";

describe("Colors Uilities Test", () => {
	test("Hex to RGB should work for 6-string format", () => {
		expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
	});

	test("RGB to Hex must work", () => {
		expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
	})
});
