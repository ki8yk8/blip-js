import { describe, expect, test } from "vitest";
import { Random } from "../engine/utils/random";

const random = new Random(100);
const [rand, randi, choose, shuffle] = [
	random.rand.bind(random),
	random.randi.bind(random),
	random.choose.bind(random),
	random.shuffle.bind(random),
];

describe("Random utilities test", () => {
	test("rand should return number betwen lower and upper inclusive", () => {
		const [lower, upper] = [10, 20];

		for (let i = 0; i <= 100; i++) {
			const choice = rand(lower, upper);
			expect(choice).toBeGreaterThanOrEqual(lower);
			expect(choice).toBeLessThanOrEqual(upper);
		}
	});

	test("randi should always return integer between lower and upper", () => {
		// since rand has been tested no need to test for many times once is enough
		const [lower, upper] = [10, 20];
		const choice = randi(lower, upper);

		expect(Number.isInteger(choice)).toBe(true);
	});

	test("choose with replacement should always choose from the list", () => {
		const list = [1, 2, 3, 4, 5];

		for (let i = 0; i < 100; i++) {
			expect(choose(list)).toBeOneOf(list);
		}
	});

	test("shuffle should shuffle and contain all the elements", () => {
		const list = [1, 2, 3, 4, 5];
		const shuffled = shuffle(list);

		console.log(shuffled);
		const all_exists = list.every((x) => shuffled.includes(x));
		expect(all_exists).toBe(true);

		// at least one element should be in different position
		const different_position = list.some(
			(x, index) => shuffled.indexOf(x) !== index
		);
		expect(different_position).toBe(true);
	});
});
