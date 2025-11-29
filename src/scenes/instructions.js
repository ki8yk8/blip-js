export function registerInstructionsScreen({ k }) {
	k.scene("instructions", () => {
		const hint = k.add([
			k.text("Press space to continue"),
			k.pos(k.width() / 2, k.height() - 100),
			k.rotate(0),
			k.scale(1),
			k.color("BROWN"),
		]);

		k.animate(hint, "angle", [0, 2, 0, -2, 0], 4);
		k.animate(
			hint,
			"scale",
			[k.vec2(1), k.vec2(1.1), k.vec2(1), k.vec2(0.9), k.vec2(1)],
			4
		);

		// exit the instruction screen
		k.onKeyPress(" ", () => {
			k.go("home");
		});
	});
}
