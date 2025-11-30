export default function Snowboard({ k , state}) {
	const snowboard = k.add([
		k.rect(20, 50, { radius: [9, 9, 2, 2] }),
		k.color("#384559"),
		k.pos(k.width() / 2, k.height() - 100),
		k.anchor("bot"),
		k.particles({
			spread: 60,
			direction: 90,
			lifetime: 0.3,
			colors: [k.Color("SKYBLUE"), k.Color("PURPLE")],
		}),
		k.area(),
		k.opacity(1),
		"snowboard",
	]);

	// left thruster and right thrusters particles emitter
	const left_emitter = k.add([
		k.pos(snowboard.pos.add(-snowboard.width / 2, (-snowboard.height * 2) / 3)),
		k.particles({
			scale: [k.vec2(0.2), k.vec2(0.6)],
			spread: 10,
			direction: -180,
			speed: 20,
			lifetime: 0.1,
			colors: [k.Color("SKYBLUE"), k.Color("PURPLE")],
		}),
	]);
	const right_emitter = k.add([
		k.pos(snowboard.pos.add(snowboard.width / 2, (-snowboard.height * 2) / 3)),
		k.particles({
			scale: [k.vec2(0.2), k.vec2(0.6)],
			spread: 10,
			direction: 0,
			speed: 20,
			lifetime: 0.1,
			colors: [k.Color("SKYBLUE"), k.Color("PURPLE")],
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

	snowboard.onCollide("boulder", (boulder) => {
		// the loss of health depends on the impact i.e. the velocity with which the snowboard was moving
		const vel_dis = snowboard.vel.len();
		const impact_decrease = vel_dis * 0.1;
		state.health -= impact_decrease;

		handleSnowboardHit();
	});
	snowboard.onCollide("bar", (bar) => {
		handleSnowboardHit();
	});

	function handleSnowboardHit() {
		// on hit boulder, you rotate and blink multiple times and your health decrease
		snowboard.angle = (snowboard.angle + 180) % 360;

		// blink 1
		k.tween(1, 0, 0.5, (o) => (snowboard.opacity = o));
		k.wait(0.5, () => k.tween(1, 0, 0.5, (o) => (snowboard.opacity = o)));
		k.wait(1, () => k.tween(1, 0, 0.5, (o) => (snowboard.opacity = o)));
		k.wait(1.5, () => k.tween(1, 0, 0.5, (o) => (snowboard.opacity = o)));
	}

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
