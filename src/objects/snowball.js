export default function Snowball({ k, constants, state }) {
	const snowball = k.add([
		k.rect(50, 50, { radius: 25 }),
		k.anchor("bot"),
		k.pos(k.width() / 2, 100),
		k.area(),
		"snowball",
	]);

	snowball.acc = k.vec2(0, 200);

	snowball.onCollide("snowblock", () => {
		snowball.vel.y = snowball.vel.y * -0.2;
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
	const drag = 0.1;
	k.onUpdate(() => {
		if (!snowball.checkCollision("snowblock")) return;

		// on press space jump
		if (k.isKeyDown(" ")) {
			snowball.vel = snowball.vel.add(0, -150);
		}
		if (k.isKeyDown("ArrowRight")) {
			snowball.vel.x = 200;
		} else if (k.isKeyDown("ArrowLeft")) {
			snowball.vel.x = -200;
		} else {
			snowball.vel.x = snowball.vel.x * (1 - drag);
		}
	});

	return snowball;
}
