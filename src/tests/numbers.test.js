import { describe, expect, test } from "vitest";
import { clamp, map } from "../engine/utils/numbers";

describe("Numbers logic test", () => {
	test("Clamping should clamp the number between negative and positive", () => {
		expect(clamp(10, 0, 100)).toBe(10);
		expect(clamp(10, 20, 100)).toBe(20);
		expect(clamp(10, 0, 8)).toBe(8);
	})

	test("Map should be able to interpolate", () => {
		expect(map(10, 0, 100, 100, 200)).toBe(110);
	})
})