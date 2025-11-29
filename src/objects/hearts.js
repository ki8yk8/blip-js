export function Hearts({ k, state }) {
	const [rnd_x, rnd_y] = [
		k.rand(200, k.width() - 200),
		k.rand(200, k.height() - 200),
	];

	const hearts = k.add([
		k.sprite("heart"),
		k.anchor("center"),
		k.pos(rnd_x, rnd_y),
		k.rotate(0),
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

	k.animate(
		hearts,
		"scale",
		[k.vec2(0.8), k.vec2(0.9), k.vec2(0.7), k.vec2(0.8)],
		2
	);
	k.animate(hearts, "angle", [0, 360], 4);

	hearts.onCollide("snowboard", () => {
		state.points++;
		k.destroy(hearts);
	});

	return hearts;
}
