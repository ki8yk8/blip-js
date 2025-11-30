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

		const locked = k.add([
			k.sprite("key"),
			k.pos(
				book_page.pos.sub(-book_page.width / 2 + 30, book_page.height / 2 - 20)
			),
			k.scale(0.6),
			k.visibility(true),
		]);
		const locked_text = k.add([
			k.text("Locked !!!"),
			k.pos(book_page.pos.add(0, book_page.height / 2 - 20)),
			k.color("BROWN"),
			k.visibility(true),
		]);

		const arrow_left = k.add([
			k.sprite("arrow"),
			k.pos(level_bg.pos.sub(level_bg.width / 2, 0)),
			k.rotate(-180),
			k.visibility(true),
		]);
		const arrow_right = k.add([
			k.sprite("arrow"),
			k.pos(level_bg.pos.add(level_bg.width / 2, 0)),
			k.rotate(0),
			k.visibility(true),
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
