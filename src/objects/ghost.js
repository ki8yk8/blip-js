export default function Ghost({ k, constants, state }) {
	const [rand_x, rand_y] = [
		k.rand(200, k.width() - 100),
		k.rand(200, k.height() - 100),
	];

	const ghost = k.add([
		k.sprite("ghost"),
		k.scale(0.8),
		k.pos(rand_x, rand_y),
		k.rotate(0),
		k.area(),
		k.body(),
		"ghost",
	]);

	let last_evaluated_time = k.time;
	let should_follow = false;
	k.onUpdate(() => {
		const snowboard = k.get("snowboard")[0];

		if (k.time > last_evaluated_time + constants.evaluation_time) {
			last_evaluated_time = k.time;
			should_follow = k.choose([true, false]);
		}

		if (should_follow) {
			const dir = snowboard.pos.sub(ghost.pos).unit();
			ghost.vel = dir.scale(constants.ghost_speed);

			ghost.angle = dir.angle();
		} else {
			ghost.vel = k.vec2(0, 0);
		}
	});

	k.wait(constants.ghost_stays, () => k.destroy(ghost));

	ghost.onCollide("snowboard", () => {
		state.health -= constants.ghost_hits;
		k.destroy(ghost);
	});

	return ghost;
}
