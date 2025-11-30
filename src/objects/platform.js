export default function Platform({ k, pos, constants }) {
	k.add([k.sprite("snow-platform"), k.anchor("bot"), k.pos(pos)]);
	const platform = k.add([
		k.rect(64 - 50, 10),
		k.color("BLACK"),
		k.pos(pos.add(0, -64)),
		k.anchor("top"),
		k.opacity(0),
		k.area(),
		"snowblock",
	]);

	return platform;
}
