export default function Igloo({ k, pos, rotate = false }) {
	if (!rotate) return IglooLeft({ k, pos });

	return IglooRight({ k, pos });
}

function IglooLeft({ k, pos }) {
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

function IglooRight({ k, pos }) {
	const snowman = k.add([
		k.sprite("snowman"),
		k.pos(pos.sub(60, 0)),
		k.anchor("bot"),
		k.rotate(0),
		"snowman",
	]);

	k.animate(snowman, "angle", [0, -3, 0, 3, 0], 4);

	const igloo = k.add([
		k.sprite("igloo"),
		k.pos(pos),
		k.anchor("bot"),
		"igloo",
	]);
	igloo.scale.x = -1;

	// long tree
	k.add([
		k.sprite("tree-long"),
		k.pos(pos.add(60, 0)),
		k.anchor("bot"),
		"tree",
	]);
}
