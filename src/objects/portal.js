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

	portal.onCollide("snowboard", () => {
		k.go("jump-game");
	})

	return portal;
}
