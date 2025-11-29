export default function Snowboard({ k }) {
	const snowboard = k.add([
		k.rect(20, 100, { radius: [50, 50, 0, 0] }),
		k.color("WHITE"),
		k.pos(k.width() / 2, k.height() - 100),
		k.anchor("bot"),
		k.particles({
			scale: 0,
		}),
		"snowboard",
	]);

	return snowboard;
}
