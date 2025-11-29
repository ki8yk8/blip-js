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

		// adding the menu buttons
		const menu_items = ["Start Game", "Instruction"];
		menu_items.forEach((item, index) => {
			// rectangle background
			const background = k.add([
				k.rect(500, 80),
				k.pos(k.width() / 2, logo.pos.y + 150 + 100 * index + 8 * index),
				k.color("SKYBLUE"),
			]);

			// rectangle text
			const text = k.add([k.text(item, { size: 48 }), k.pos(background.pos)]);
		});
	});
}
