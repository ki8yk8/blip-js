export default function Ghost({ k, constants, state }) {
	const [rand_x, rand_y] = [
		k.rand(200, k.width() - 100),
		k.rand(200, k.height() - 100),
	];
	const angles = [180, 45, 90];

	const ghost = k.add([
		k.sprite("ghost"),
		k.scale(0.8),
		k.pos(rand_x, rand_y),
		k.rotate(k.choose(angles)),
		k.area(),
		"ghost",
	]);

	// adds a movement velocity
	ghost.vel = k.vec2(constants.ghost_speed, 0);

	ghost.onCollide("bar", () => {
		ghost.angle = -ghost.angle;
		ghost.vel = ghost.vel.rotate(ghost.angle);
	});

	k.wait(constants.ghost_stays, () => k.destroy(ghost));

	return ghost;
}
