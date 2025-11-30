import { get_random_pos } from "../utils/pos";

const BAR_GAP = 30;
const BAR_WIDTH = 8;

export default function Background({ k, random_patches = 10 }) {
	const patches_colors = ["#93B1CD", "#78B3DD", "WHITE"];

	get_random_pos({
		n: random_patches,
		x_min: 100,
		x_max: k.width() - 100,
		y_min: 100,
		y_max: k.height() - 100,
		gap: 200,
	}).forEach((pos) => {
		k.add([
			k.rect(k.rand(30, 60), k.rand(30, 80), { radius: k.rand(10, 40) }),
			k.color(k.choose(patches_colors)),
			k.pos(k.vec2(pos)),
			k.rotate(k.rand(0, 360)),
			k.opacity(k.rand(0.2, 0.6)),
			"patches",
		]);
	});

	// drawing the border bars
	const top_border = k.add([
		k.rect(k.width(), BAR_WIDTH),
		k.color("#a24b55"),
		k.pos(k.width() / 2, 30),
		k.anchor("bot"),
		k.area(),
	]);
	for (
		let i = 0;
		i <= Math.floor((top_border.width - BAR_GAP * 2) / (BAR_WIDTH + BAR_GAP));
		i++
	) {
		k.add([
			k.rect(BAR_WIDTH, 30),
			k.pos(BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, 30),
			k.anchor("bot"),
			k.color("#a24b55"),
			k.area(),
		]);
	}
	k.add([
		k.rect(k.width(), top_border.pos.y),
		k.pos(k.width() / 2, top_border.pos.y),
		k.anchor("bot"),
		k.color("BLACK"),
		k.area(),
		"bar",
	]);

	const bot_border = k.add([
		k.rect(k.width(), 8),
		k.color("#a24b55"),
		k.pos(k.width() / 2, k.height() - 30),
		k.area(),
		"bar",
	]);

	const left_border = k.add([
		k.rect(8, k.height()),
		k.color("#a24b55"),
		k.pos(30, k.height() / 2),
		k.area(),
		"bar",
	]);

	const right_border = k.add([
		k.rect(8, k.height()),
		k.color("#a24b55"),
		k.pos(k.width() - 30, k.height() / 2),
		k.area(),
		"bar",
	]);
}
