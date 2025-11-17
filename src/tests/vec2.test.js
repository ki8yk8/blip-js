import { describe, expect, test } from "vitest";
import { Vec2 } from "../engine";

describe("Vec2 should be initialized in different conditions", () => {
	test("While passing objects", () => {
		const vec = new Vec2({ x: 1, y: 1 });

		expect(vec.x).toBe(1);
		expect(vec.y).toBe(1);
	});
	test("While passing an array", () => {
		const vec = new Vec2([1, 1]);

		expect(vec.x).toBe(1);
		expect(vec.y).toBe(1);
	});
	test("While passing two numbers", () => {
		const vec = new Vec2(1, 1);

		expect(vec.x).toBe(1);
		expect(vec.y).toBe(1);
	});
	test("While passing same instance", () => {
		const vec = new Vec2(new Vec2(1, 1));

		expect(vec.x).toBe(1);
		expect(vec.y).toBe(1);
	});
});

describe("Vec2 should have working arithmetic function", () => {
	test("Addition", () => {
		const vec = new Vec2(2, 3).add(1, 2);

		expect(vec.x).toBe(3);
		expect(vec.y).toBe(5);
	});
	test("Substraction", () => {
		const vec = new Vec2(2, 3).sub(1, 2);

		expect(vec.x).toBe(1);
		expect(vec.y).toBe(1);
	});
	test("Scaling", () => {
		const vec = new Vec2(2, 3).scale(0.5);

		expect(vec.x).toBe(1);
		expect(vec.y).toBe(1.5);
	});
	test("Scaling x, y independently", () => {
		const vec = new Vec2(2, 3).scale(0.5, 2);

		expect(vec.x).toBe(1);
		expect(vec.y).toBe(6);
	});
	test("Negation", () => {
		const vec = new Vec2(2, 3).neg();

		expect(vec.x).toBe(-2);
		expect(vec.y).toBe(-3);
	});
	test("Zero check", () => {
		const zero_vec = new Vec2(0, 0).isZero();
		const non_zero_vec = new Vec2(1, 0).isZero();

		expect(zero_vec).toBe(true);
		expect(non_zero_vec).toBe(false);
	});
	test("Equals", () => {
		const test_vec = new Vec2(1, 4);
		const equal_vec = new Vec2(1, 4);
		const unequal_vec = new Vec2(1, 3);

		expect(test_vec.eq(equal_vec)).toBe(true);
		expect(test_vec.eq(unequal_vec)).toBe(false);
	});
});

describe("Vec2 should implement vector functions", () => {
	test("Distance compute", () => {
		const vec1 = new Vec2(7, 7);
		const vec2 = new Vec2(4, 3);

		expect(vec1.dist(vec2)).toBeCloseTo(5);
	});
	test("Squared distance compute", () => {
		const vec1 = new Vec2(7, 7);
		const vec2 = new Vec2(4, 3);

		expect(vec1.sdist(vec2)).toBe(25);
	});
	test("Compute length", () => {
		const vec = new Vec2(4, 3);

		expect(vec.len()).toBeCloseTo(5);
	});
	test("Unit vector", () => {
		const vec = new Vec2(4, 3);
		const unit = vec.unit();

		expect(unit.x).toBeCloseTo(0.8);
		expect(unit.y).toBeCloseTo(0.6);
	});
	test("Dot product", () => {
		const vec1 = new Vec2(7, 7);
		const vec2 = new Vec2(4, 3);

		expect(vec1.dot(vec2)).toBe(49);
	});
	test("Cross vector", () => {
		const vec1 = new Vec2(7, 7);
		const vec2 = new Vec2(4, 3);

		expect(vec1.cross(vec2)).toBeCloseTo(-7);
	});
	test("Angle", () => {
		const vec = new Vec2(4, 4);
		expect(vec.angle()).toBeCloseTo(-135);
	});
	test("Angle between", () => {
		const vec = new Vec2(4, 4);
		expect(vec.angleBetween(0, 0)).toBeCloseTo(-135);
	});
	test("rotation", () => {
		const vec = new Vec2(4, 4);
		const rotated = vec.rotate(45);

		expect(rotated.x).toBeCloseTo(0);
		expect(rotated.y).toBeCloseTo(5.656854);
	});
});
