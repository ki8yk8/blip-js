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

	// left thruster and right thrusters particles emitter

	const movement_keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

	k.onUpdate(() => {
		if (k.isKeyDown("ArrowUp")) {
			snowboard.acc = snowboard.acc.add(0, -10);
		}
		if (k.isKeyDown("ArrowLeft")) {
			snowboard.acc = snowboard.acc.add(-5, 0);
		}
		if (k.isKeyDown("ArrowRight")) {
			snowboard.acc = snowboard.acc.add(5, 0);
		}

		if (movement_keys.every((key) => !k.isKeyDown(key))) {
			snowboard.acc = k.vec2(0, 0);
		}
	});

	return snowboard;
}
