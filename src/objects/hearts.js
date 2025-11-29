export function Hearts({ k }) {
	const [rnd_x, rnd_y] = [
		k.rand(200, k.width() - 200),
		k.rand(200, k.height() - 200),
	];

	const hearts = k.add([
		k.sprite("heart"),
		k.anchor("center"),
		k.pos(rnd_x, rnd_y),
		k.scale(0.8),
		k.area(),
		"heart",
	]);

	hearts.onCollide("boulder", () => {
		const [rnd_x, rnd_y] = [
			k.rand(200, k.width() - 200),
			k.rand(200, k.height() - 200),
		];

		hearts.pos = k.vec2(rnd_x, rnd_y);
	});

	return hearts;
}
