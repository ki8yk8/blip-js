export function registerJumpGameScene({ k, constants, state }) {
	k.scene("jump-game", () => {
		const logo = k.add([
			k.text("Snowball Jump", { size: 68, align: "center" }),
			k.pos(k.width() / 2, 100),
			k.color("RED"),
		]);

		const levels = 5;
		const reached_level = window.localStorage.getItem("jumpLevel") ?? 1;
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
			k.visibility(false),
		]);
		const locked_text = k.add([
			k.text("Locked !!!"),
			k.pos(book_page.pos.add(0, book_page.height / 2 - 20)),
			k.color("BROWN"),
			k.visibility(false),
		]);

		const arrow_left = k.add([
			k.sprite("arrow"),
			k.pos(level_bg.pos.sub(level_bg.width / 2, 0)),
			k.rotate(-180),
			k.visibility(false),
		]);
		const arrow_right = k.add([
			k.sprite("arrow"),
			k.pos(level_bg.pos.add(level_bg.width / 2, 0)),
			k.rotate(0),
			k.visibility(true),
		]);

		let selected = 1;
		k.onKeyPress("ArrowRight", () => {
			selected = k.clamp(selected + 1, 1, levels);
			renderBookBasedOnSelected(selected);
		});
		k.onKeyPress("ArrowLeft", () => {
			selected = k.clamp(selected - 1, 1, levels);
			renderBookBasedOnSelected(selected);
		});

		function renderBookBasedOnSelected(selected) {
			arrow_left.visible = true;
			arrow_right.visible = true;
			if (selected >= levels) {
				arrow_right.visible = false;
			}
			if (selected <= 1) {
				arrow_left.visible = false;
			}

			level_text.text = `${selected}`;
			level_text.loaded = false;

			if (selected > reached_level) {
				locked.visible = true;
				locked_text.visible = true;
				level_text.color = k.Color("BROWN");
			} else {
				locked.visible = false;
				locked_text.visible = false;
				level_text.color = k.Color("GREEN");
			}
		}

		k.onKeyPress("Enter", () => {
			if (selected <= reached_level) {
				k.go(`jump-game-level-${selected}`);
			}
		});

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
