export default function Snowball({ k, constants, state }) {
	const snowball = k.add([
		k.rect(50, 50, { radius: 25 }),
		k.anchor("bot"),
		k.pos(k.width() / 2, 100),
		k.area(),
		k.body(),
		"snowball",
	]);

	return snowball;
}
