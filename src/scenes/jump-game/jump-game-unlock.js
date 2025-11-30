import { letItSnow } from "../../objects/snow";

export function registerJumpGameUnlockScene({ k, constants, state }) {
	k.scene("jump-game-unlock", () => {
		window.localStorage.setItem("portalOpened", true);

		const tree1 = k.add([
			k.sprite("tree-small"),
			k.pos(k.width() - 150, k.height()),
			k.anchor("bot"),
		]);
		const tree2 = k.add([
			k.sprite("tree-long"),
			k.pos(tree1.pos.add(48, 0)),
			k.anchor("bot"),
		]);
		k.add([
			k.sprite("stone2"),
			k.pos(tree1.pos.add(tree2.pos).scale(0.5).add(20, 0)),
			k.anchor("bot"),
		]);
		k.add([k.sprite("grass2"), k.pos(tree1.pos.add(10, 0)), k.anchor("bot")]);

		const snowman = k.add([
			k.sprite("snowman"),
			k.anchor("bot"),
			k.pos(0, k.height()),
			k.rotate(10),
		]);
		k.animate(snowman, "angle", [10, 6, 10, 14, 10], 4);

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

		letItSnow({ k });
	});
}
