import SnowBlocks from "../objects/snow-blocks";

const DELAY = 0.8;

export function registerGameOverScene({ k, state, constants }) {
	k.scene("over", (score) => {
		const snowblocks = SnowBlocks({
			k,
			n: 12,
			pos: k.vec2(k.width() / 2, k.height()),
		});

		// squence of long and small trees
		const tree1 = k.add([
			k.sprite("tree-long"),
			k.pos(snowblocks.pos.add(-snowblocks.width / 2 + 50, -snowblocks.height)),
			k.anchor("bot"),
		]);
		const tree2 = k.add([
			k.sprite("tree-small"),
			k.pos(tree1.pos.add(50, 0)),
			k.anchor("bot"),
		]);
		const tree3 = k.add([
			k.sprite("tree-long"),
			k.pos(tree2.pos.add(50, 0)),
			k.anchor("bot"),
		]);
		const igloo = k.add([
			k.sprite("igloo"),
			k.pos(tree3.pos.add(50, 0)),
			k.anchor("bot"),
		]);
		const tree4 = k.add([
			k.sprite("tree-small"),
			k.pos(snowblocks.pos.add(snowblocks.width / 2 - 200, -snowblocks.height)),
			k.anchor("bot"),
		]);
		const tree5 = k.add([
			k.sprite("tree-long"),
			k.pos(tree4.pos.add(35, 0)),
			k.anchor("bot"),
		]);
		const snowman = k.add([
			k.sprite("snowman"),
			k.pos(tree5.pos.add(100, 0)),
			k.anchor("bot"),
			k.rotate(0),
		]);

		k.animate(snowman, "angle", [0, -2, 2, -2, 2, 0], 2);

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

		const particle_left = k.add([
			k.pos(k.width() / 2 - 100, 200),
			k.particles({
				opacities: [k.vec2(1.0), k.vec2(0.0)],
				spread: 45,
				direction: -135,
				colors: [k.Color("RED"), k.Color("ORANGE"), k.Color("GREEN")],
				lifetime: 1,
				speed: 50,
			}),
		]);
		k.wait(DELAY, () => particle_left.emit(100));
		k.wait(DELAY + 0.25, () => particle_left.emit(50));

		const particle_right = k.add([
			k.pos(k.width() / 2 + 100, 200),
			k.particles({
				opacities: [k.vec2(1.0), k.vec2(0.0)],
				spread: 45,
				direction: -45,
				colors: [k.Color("RED"), k.Color("ORANGE"), k.Color("GREEN")],
				lifetime: 1,
				speed: 50,
			}),
		]);
		k.wait(2, () => particle_right.emit(100));
		k.wait(DELAY + 0.25, () => particle_right.emit(50));

		const hint = k.add([
			k.text("Press space to continue"),
			k.pos(k.width() / 2, k.height() - 200),
			k.color("BROWN"),
			k.scale(1),
			k.rotate(0),
		]);

		k.animate(
			hint,
			"scale",
			[k.vec2(1), k.vec2(1.1), k.vec2(1), k.vec2(0.9), k.vec2(1)],
			2
		);
		k.animate(hint, "angle", [0, -4, 0, 4, 0], 2);

		k.onKeyPress(" ", () => {
			// resets the state
			state = {
				points: 0,
				health: 100,
				fuel: 100,
			};

			k.go("home");
		});
	});
}
