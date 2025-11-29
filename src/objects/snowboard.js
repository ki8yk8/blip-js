export default function Snowboard({ k }) {
	const snowboard = k.add([
		k.rect(20, 100, { radius: [50, 50, 0, 0] }),
		k.color("WHITE"),
		k.pos(k.width() / 2, k.height() - 100),
		k.anchor("bot"),
		k.particles({
			spread: 60,
			direction: 90,
			lifetime: 0.3,
			colors: [k.Color("WHITE"), k.Color("GREEN")],
		}),
		"snowboard",
	]);

	let lastEmitted = k.time;
	k.onKeyDown("ArrowUp", () => {
		if (k.time - lastEmitted > 0.15) {
			snowboard.emit(3);
			lastEmitted = k.time;
		}
	});

	return snowboard;
}
