export function registerJumpGameCompletedScene({ k, state, constants }) {
	k.scene("jump-completed", () => {
		const text = k.add([
			k.text("Congratulations!!!", { size: 48, align: "center" }),
			k.pos(k.width() / 2, 100),
			k.color("GREEN"),
		]);

		k.add([
			k.text(
				"Thank you for playing the game. With Sige ending, I will be adding more features to this game engine and create more such wonderful games. High vote will be a good feedback.",
				{ maxWidth: 500, align: "center" }
			),
			k.pos(text.pos.add(0, 150)),
			k.color("BLACK"),
		]);

		const hint_text = k.add([
			k.text("Press space to continue", { size: 36 }),
			k.pos(k.width() / 2, k.height() - 100),
			k.rotate(0),
			k.scale(1),
			k.color("BROWN"),
		]);

		k.animate(hint_text, "angle", [0, -2, 0, 2, 0], 3);
		k.animate(
			hint_text,
			"scale",
			[k.vec2(1), k.vec2(1.05), k.vec2(1), k.vec2(0.95), k.vec2(1)],
			4
		);

		k.onKeyPress(" ", () => {
			k.go("home");
		});
	});
}
