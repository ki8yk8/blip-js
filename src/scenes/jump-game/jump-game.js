export function registerJumpGameScene({ k, constants, state }) {
	k.scene("jump-game", () => {
		const logo = k.add([
			k.text("Snowball Jump", { size: 68, align: "center" }),
			k.pos(k.width() / 2, 100),
			k.color("RED"),
		]);

		const levels = 5;
		const level_bg = k.add([
			k.rect(300, 250, { radius: 10 }),
			k.pos(k.width() / 2, k.height() / 2),
			k.color("BROWN"),
		]);
		const book_page = k.add([
			k.rect(level_bg.width - 20, level_bg.height - 20, { radius: 5 }),
			k.pos(level_bg.pos),
			k.color("WHITE"),
		]);
		const level = k.add([
			k.text("Level", { size: 32, align: "center" }),
			k.pos(book_page.pos.add(0, -book_page.height / 2 + 60)),
			k.color("BLACK"),
		]);
		const level_text = k.add([
			k.text("1", { size: 96, align: "center" }),
			k.pos(level.pos.add(0, 72)),
			k.color("GREEN"),
		]);

		const instruction = k.add([
			k.text("Press arrow key to change level and press enter to play it", {
				maxWidth: 500,
				align: "center",
			}),
			k.pos(k.width() / 2, k.height() - 100),
			k.color("BROWN"),
		]);
	});
}
