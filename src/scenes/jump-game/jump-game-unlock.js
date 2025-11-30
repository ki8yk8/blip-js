export function registerJumpGameUnlockScene({ k, constants, state }) {
	k.scene("jump-game-unlock", () => {
		window.localStorage.setItem("portalOpened", true);

		// welcome text for the jump game
		const welcome_text = k.add([
			k.text("Congratulations", { size: 48 }),
			k.pos(k.width() / 2, 100),
			k.color("RED"),
		]);
		k.add([
			k.text("You unlocked the hidden game of winter"),
			k.pos(welcome_text.pos.add(0, 50)),
			k.color("BLACK"),
		]);

		// instruction begins here
		const instructions = k.add([
			k.text(
				"You are a snowball whose goal is to reach the igloo. You can use space to jump and arrow left and right keys to move left and right. At each level, your progress is saved so that, you can come back later. Enjoy...",
				{
					maxWidth: 500,
					align: "center",
				}
			),
			k.pos(k.width() / 2, k.height() / 2),
			k.color("PURPLE"),
		]);

		const hint = k.add([
			k.text("Press space to proceed...", { size: 28 }),
			k.pos(k.width() / 2, k.height() - 100),
			k.color("BROWN"),
			k.rotate(0),
			k.scale(1),
		]);

		// adding hint animations
		k.animate(hint, "angle", [0, -4, 0, 4, 0], 4);
		k.animate(
			hint,
			"scale",
			[k.vec2(1), k.vec2(0.9), k.vec2(1), k.vec2(1.1), k.vec2(1)],
			3
		);

		k.onKeyPress(" ", () => {
			k.go("jump-game");
		});
	});
}
