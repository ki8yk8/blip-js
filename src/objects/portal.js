export default function Portal({ k, state, constants }) {
	const portal = k.add([
		k.sprite("portal"),
		k.pos(k.width() / 2, k.height() - 100),
		k.area(),
		k.scale(0.8),
		k.rotate(0),
		"portal",
	]);

	k.animate(portal, "scale", [k.vec2(0.8), k.vec2(1.1), k.vec2(0.8)], 2);
	k.animate(portal, "angle", [0, -15, 15, 0], 2);

	portal.onCollide("snowboard", async (e) => {
		// animate the snowboard
		e.vel = k.vec2(0, 0);
		e.acc = k.vec2(0, 0);

		await k.tween(1, 0, 1, (s) => (e.scale = k.vec2(s)));

		k.go("jump-game-unlock");
	});

	return portal;
}
