export default function Snowball({ k, constants, state }) {
	const snowball = k.add([
		k.rect(50, 50, { radius: 25 }),
		k.anchor("bot"),
		k.pos(k.width() / 2, k.height()-64),
		k.area(),
		k.body(),
		"snowball",
	]);

	k.onKeyPress(" ", () => {
		snowball.jump(k.vec2(20, 200).neg());
	})

	return snowball;
}
