export default function Snowboard({ k }) {
	const snowboard = k.add([
		k.rect(20, 50, { radius: [9, 9, 2, 2] }),
		k.color("WHITE"),
		k.pos(k.width() / 2, k.height() - 100),
		k.anchor("bot"),
		k.particles({
			spread: 60,
			direction: 90,
			lifetime: 0.3,
			colors: [k.Color("RED"), k.Color("GREEN")],
		}),
		k.area(),
		"snowboard",
	]);
	// acceleration in x and y axis
	const acc = k.vec2(0, 0);

	let lastEmitted = k.time;
	k.onUpdate(() => {
		if (k.isKeyDown("ArrowUp")) {
			snowboard.emit(3);
		}
	})

	return snowboard;
}
