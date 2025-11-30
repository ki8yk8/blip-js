export default function Igloo({ k, pos }) {
	const tree = k.add([
		k.sprite("tree-long"),
		k.pos(pos.add(40, 0)),
		k.anchor("bot"),
		"tree",
	]);

	const igloo = k.add([
		k.sprite("igloo"),
		k.pos(pos),
		k.anchor("bot"),
		k.area(),
		"igloo",
	]);

	const snowman = k.add([
		k.sprite("snowman"),
		k.pos(pos.sub(100, 0)),
		k.anchor("bot"),
		k.rotate(0),
		"snowman",
	]);

	k.animate(snowman, "angle", [0, -2, 0, 2, 0], 4);

	return igloo;
}
