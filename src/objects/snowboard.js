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
	const left_emitter = k.add([
		k.rect(4, 4),
		k.color("ORANGE"),
		k.pos(snowboard.pos.add(-snowboard.width / 2, (-snowboard.height * 2) / 3)),
		k.particles({
			spread: 10,
			direction: -180,
			lifetime: 0.2,
			colors: [k.Color("RED"), k.Color("GREEN")],
		}),
	]);
	const right_emitter = k.add([
		k.rect(4, 4),
		k.color("ORANGE"),
		k.pos(snowboard.pos.add(snowboard.width / 2, (-snowboard.height * 2) / 3)),
		k.particles({
			spread: 10,
			direction: 0,
			lifetime: 0.2,
			colors: [k.Color("RED"), k.Color("GREEN")],
		}),
	]);
	const left_thruster_offset = left_emitter.pos.sub(snowboard.pos);
	const right_thruster_offset = right_emitter.pos.sub(snowboard.pos);

	const turn_speed = 100;
	const forward_acc = 300;
	const drag = 4;

	const last_emitted = {
		snowboard: k.time,
		left_thruster: k.time,
		right_thruster: k.time,
	};

	k.onUpdate(() => {
		// handling the position of the left and right thrusters
		right_emitter.pos = snowboard.pos.add(
			right_thruster_offset.rotate(snowboard.angle)
		);
		right_emitter.angle = snowboard.angle;
		right_emitter.particles.direction = snowboard.angle;

		// for left emitter
		left_emitter.pos = snowboard.pos.add(
			left_thruster_offset.rotate(snowboard.angle)
		);
		left_emitter.angle = snowboard.angle;
		left_emitter.particles.direction = -180 + snowboard.angle;
		
		snowboard.particles.direction = 90 + snowboard.angle;

		// handle turning thursts
		if (k.isKeyDown("ArrowLeft")) {
			snowboard.angle -= turn_speed * k.dt;
			if (Math.abs(last_emitted.right_thruster - k.time) > 0.1) {
				right_emitter.emit(3);
				last_emitted.right_thruster = k.time;
			}
		}
		if (k.isKeyDown("ArrowRight")) {
			snowboard.angle += turn_speed * k.dt;

			if (Math.abs(last_emitted.left_thruster - k.time) > 0.1) {
				left_emitter.emit(3);
				last_emitted.left_thruster = k.time;
			}
		}

		// accleartion at every frame
		let acc = k.vec2(0, 0);
		const forward = k.vec2(0, -1).rotate(snowboard.angle);

		if (k.isKeyDown("ArrowUp")) {
			acc = acc.add(forward.scale(forward_acc));

			if (Math.abs(last_emitted.snowboard - k.time) > 0.1) {
				snowboard.emit(3);
				last_emitted.snowboard = k.time;
			}
		}

		if (!snowboard.vel.nearlyEq(k.vec2(0, 0), 0.1)) {
			const drag_force = snowboard.vel.scale(-drag);
			acc = acc.add(drag_force);
		}

		snowboard.acc = acc;
	});

	return snowboard;
}
