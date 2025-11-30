export default function Grass({ k, pos }) {
	const sprites = ["grass1", "grass2"];

	const grass = k.add([
		k.sprite(k.choose(sprites)),
		k.pos(pos),
		k.anchor("bot"),
		k.rotate(0),
		"grass",
	]);

	k.animate(grass, "angle", [0, -2, 0, 2, 0], 2);

	return grass;
}
