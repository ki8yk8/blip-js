export default function Snowboard({ k }) {
	const snowboard = k.add([
		k.rect(20, 50, { radius: [9, 9, 2, 2] }),
		k.color("WHITE"),
		k.pos(k.width() / 2, k.height() - 100),
		k.anchor("bot"),
		k.particles({
			spread: 60,
			direction: 90,
			lifetime: 0.3,
			colors: [k.Color("RED"), k.Color("GREEN")],
		}),
		k.area(),
		"snowboard",
	]);

	// left thruster and right thrusters particles emitter

	const movement_keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

	const turn_speed = 100;
	const forward_acc = 100;
	const drag = 4;

	k.onUpdate(() => {
		// handle turning thursts
		if (k.isKeyDown("ArrowLeft")) {
			snowboard.angle -= turn_speed * k.dt;
		}
		if (k.isKeyDown("ArrowRight")) {
			snowboard.angle += turn_speed * k.dt;
		}

		const acc_vectors = k.vec2(0, -1).rotate(snowboard.angle);

		if (k.isKeyDown("ArrowUp")) {
			snowboard.acc = acc_vectors.scale(forward_acc);
		} else {
			snowboard.acc = k.vec2(0, 0);
		}

		if (!snowboard.vel.eq(0, 0)) {
			const drag_force = snowboard.vel.scale(-drag);
			snowboard.acc = snowboard.acc.add(drag_force);
		}
	});

	return snowboard;
}
