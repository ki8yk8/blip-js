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

	const turn_speed = 100;
	const forward_acc = 300;
	const drag = 4;

	k.onUpdate(() => {
		// handle turning thursts
		if (k.isKeyDown("ArrowLeft")) {
			snowboard.angle -= turn_speed * k.dt;
		}
		if (k.isKeyDown("ArrowRight")) {
			snowboard.angle += turn_speed * k.dt;
		}

		// accleartion at every frame
		let acc = k.vec2(0, 0);
		const forward = k.vec2(0, -1).rotate(snowboard.angle);

		if (k.isKeyDown("ArrowUp")) {
			acc = acc.add(forward.scale(forward_acc));
		}

		if (!snowboard.vel.nearlyEq(k.vec2(0, 0), 0.1)) {
			const drag_force = snowboard.vel.scale(-drag);
			acc = acc.add(drag_force);
		}

		snowboard.acc = acc;
	});

	return snowboard;
}
