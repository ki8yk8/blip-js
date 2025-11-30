import SnowBlocks from "../objects/snow-blocks";

export function registerHomeScreen({ k, state, constants }) {
	k.scene("home", () => {
		// adding cool sprites
		SnowBlocks({ k, n: 10, pos: k.vec2(k.width() / 2, k.height()) });
		const igloo = k.add([
			k.sprite("igloo"),
			,
			k.pos(k.width() / 2, k.height() - 64),
			k.anchor("bot"),
		]);
		k.add([k.sprite("stone1"), k.pos(igloo.pos.add(-100, 0)), k.anchor("bot")]);
		k.add([
			k.sprite("tree-long"),
			k.pos(igloo.pos.add(-50, 0)),
			k.anchor("bot"),
		]);
		const snowman = k.add([
			k.sprite("snowman"),
			k.anchor("bot"),
			k.pos(igloo.pos.add(200, 0)),
			k.rotate(0),
		]);

		k.animate(snowman, "angle", [0, -2, 2, -2, 2, 0], 2);

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
		if (window.localStorage.getItem("portalOpened")) {
			menu_items.push("Jump Game");
		}

		const menu_objects = [];
		let index = 0;

		menu_items.forEach((item, index) => {
			// rectangle background
			const background = k.add([
				k.rect(500, 80),
				k.pos(k.width() / 2, logo.pos.y + 150 + 100 * index + 4 * index),
				k.color(index === 2 ? "RED" : "SKYBLUE"),
				k.rotate(0),
				k.scale(1),
			]);

			// rectangle text
			const text = k.add([
				k.text(item, { size: 48 }),
				k.pos(background.pos),
				k.rotate(0),
				k.scale(1),
			]);

			menu_objects.push({
				background,
				text,
			});
		});

		// adding the controls
		function handleMenuItemChanged(menu_objects, index, active = true) {
			const item = menu_objects[index];
			const { background, text } = item;

			if (active) {
				background.angle = 2;
				text.angle = 2;

				background.color = k.Color(index == 2 ? "ORANGE" : "GREEN");

				background.scale = k.vec2(1.05);
			} else {
				background.angle = 0;
				text.angle = 0;

				background.color = k.Color(index == 2 ? "RED" : "SKYBLUE");

				background.scale = k.vec2(1);
			}
		}

		// by default first item is active and others are inactive
		handleMenuItemChanged(menu_objects, 0, true);
		handleMenuItemChanged(menu_objects, 1, false);

		// handling the key presses
		k.onKeyPress("ArrowUp", () => {
			if (index !== 0) {
				handleMenuItemChanged(menu_objects, index, false);
				handleMenuItemChanged(menu_objects, index - 1, true);
				index--;
			}
		});
		k.onKeyPress("ArrowDown", () => {
			if (index < menu_objects.length - 1) {
				handleMenuItemChanged(menu_objects, index, false);
				handleMenuItemChanged(menu_objects, index + 1, true);
				index++;
			}
		});
		k.onKeyPress("Enter", () => {
			switch (index) {
				case 0:
					k.go("game");
					break;

				case 1:
					k.go("instructions");
					break;

				case 2:
					k.go("jump-game");
					break;
			}
		});

		let s_pressed = 0;
		k.onKeyPress("s", () => {
			s_pressed++;

			if (s_pressed === 3) {
				k.go("jump-game-unlock");
			}
		});
	});
}
