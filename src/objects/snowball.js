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
		snowball.acc = k.vec2(0, 200);
		snowball.vel = snowball.vel.scale(0.4).neg();
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

	k.onKeyDown(" ", () => {
		if (snowball.checkCollision("snowblock")) {
			snowball.acc = k.vec2(0, 200);
			snowball.vel = snowball.vel.add(0, -200);
		}
	});

	return snowball;
}
