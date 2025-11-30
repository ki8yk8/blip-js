export default function Stone({ k, pos }) {
	const sprites = ["stone1", "stone2", "stone3", "stone4"];

	const stone = k.add([
		k.sprite(k.choose(sprites)),
		k.anchor("bot"),
		k.pos(pos),
		k.scale(1),
		"stone",
	]);

	k.animate(stone, "scale", [k.vec2(1), k.vec2(1.04), k.vec2(1)], 2);

	return stone;
}
