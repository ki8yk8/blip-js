export function registerGameOverScene({ k, state, constants }) {
	k.scene("over", (score) => {
		const score_text = k.add([
			k.text(`${score}`, { size: 64 }),
			k.pos(k.width() / 2, 100),
			k.color("PURPLE"),
		]);

		const hint = k.add([
			k.text("Press space to continue"),
			k.pos(k.width() / 2, k.height() - 200),
			k.color("BROWN"),
		]);
	});
}
