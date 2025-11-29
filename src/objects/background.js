export default function Background({ k, random_patches = 10 }) {
	const patches_colors = ["#93B1CD", "#78B3DD", "WHITE"];

	for (let i = 0; i < random_patches; i++) {
		const [x, y] = [
			k.rand(100, k.width() - 100),
			k.rand(100, k.height() - 100),
		];
		k.add([
			k.rect(k.rand(30, 60), k.rand(30, 80), { radius: k.rand(10, 40) }),
			k.color(k.choose(patches_colors)),
			k.pos(x, y),
			k.rotate(k.rand(0, 360)),
			k.opacity(k.rand(0.2, 0.6)),
			"patches",
		]);
	}

	// drawing the border bars
	const top_border = k.add([
		k.rect(k.width(), 8),
		k.color("#a24b55"),
		k.pos(k.width() / 2, 30),
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
