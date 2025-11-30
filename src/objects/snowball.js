export default function Snowball({ k, constants, state }) {
	const snowball = k.add([
		k.rect(50, 50, { radius: 25 }),
		k.anchor("bot"),
		k.pos(k.width() / 2, 100),
		k.area(),
		"snowball",
	]);
	const max_velocity = 300;
	const gravity = 200;
	const drag = 0.1;
	const jump_force = 200;

	snowball.vel = k.vec2(0, 0);
	snowball.acc = k.vec2(0, gravity);

	snowball.onCollide("snowblock", (e) => {
		console.log(snowball.pos.y, e.pos.y);
		// only attach on bottom
		// if (snowball.pos.y<e.pos.y) {
		snowball.vel.y = 0;
		snowball.acc.y = 0;
		// }
	});

	// do not let snowball cross the boundary ever
	k.onUpdate(() => {
		snowball.pos.x = k.clamp(
			snowball.pos.x,
			snowball.width / 2,
			k.width() - snowball.width / 2
		);
		snowball.pos.y = k.clamp(snowball.pos.y, snowball.height, k.height() - 64);
	});

	// handle movement left and right
	k.onUpdate(() => {
		if (!snowball.checkCollision("snowblock")) {
			snowball.acc.y = gravity;
			return;
		} else {
			snowball.acc.y = 0;
		}

		// on press space jump
		if (k.isKeyDown(" ")) {
			snowball.vel.y = -jump_force;
			snowball.acc.y = gravity;
		}
		if (k.isKeyDown("ArrowRight")) {
			snowball.vel.x = 150;
		} else if (k.isKeyDown("ArrowLeft")) {
			snowball.vel.x = -150;
		} else {
			snowball.vel.x = snowball.vel.x * (1 - drag);
		}

		snowball.vel.x = k.clamp(snowball.vel.x, -max_velocity, max_velocity);
		snowball.vel.y = k.clamp(snowball.vel.y, -max_velocity, max_velocity);
	});

	return snowball;
}
