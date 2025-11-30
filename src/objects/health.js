export default function Health({ k, constants, state }) {
	const [rand_x, rand_y] = [
		k.rand(200, k.width() - 200),
		k.rand(200, k.height() - 200),
	];

	const health = k.add([
		k.sprite("health"),
		k.pos(rand_x, rand_y),
		k.rotate(0),
		k.scale(1),
		k.area(),
		"health",
	]);

	k.animate(health, "angle", [0, -4, 0, 4, 0], 4);
	k.animate(
		health,
		"scale",
		[k.vec2(1), k.vec2(0.9), k.vec2(1), k.vec2(1.1), k.vec2(1)],
		4
	);

	k.onCollide("snowboard", () => {
		state.health += constants.health_increases;
		k.destroy(health);
	});

	k.wait(constants.health_stays, () => k.destroy(health));

	return health;
}
