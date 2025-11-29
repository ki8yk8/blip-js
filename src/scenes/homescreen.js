export function registerHomeScreen({ k, state, constants }) {
	k.scene("home", () => {
		const logo = k.add([
			k.text("Ski Downhill", { size: 64 }),
			k.pos(k.width() / 2, 100),
			k.color("PURPLE"),
		]);

		// animate the logo
		k.animate(logo, "angle", [0, -4, 0, 4, 0], 3);
		k.animate(
			logo,
			"scale",
			[k.vec2(1), k.vec2(1.1), k.vec2(0.9), k.vec2(1)],
			2
		);
		k.animate(
			logo,
			"pos",
			[logo.pos, logo.pos.add(0, -20), logo.pos, logo.pos.add(0, 20), logo.pos],
			8
		);
	});
}
