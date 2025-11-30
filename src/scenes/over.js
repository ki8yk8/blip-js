export function registerGameOverScene({ k, state, constants }) {
	k.scene("over", (score) => {
		const score_title = k.add([
			k.text("You Scored", { size: 32 }),
			k.pos(k.width() / 2, 200),
			k.color("BLACK"),
		]);

		const score_text = k.add([
			k.text(`${score}`, { size: 72 }),
			k.pos(score_title.pos.add(0, 64)),
			k.color("PURPLE"),
		]);

		const hint = k.add([
			k.text("Press space to continue"),
			k.pos(k.width() / 2, k.height() - 200),
			k.color("BROWN"),
		]);
	});
}
