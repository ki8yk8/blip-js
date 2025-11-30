import Igloo from "../../objects/igloo";
import Platform from "../../objects/platform";
import SnowBlocks from "../../objects/snow-blocks";
import Snowball from "../../objects/snowball";

export function registerJumpGameLevel3Scene({ k, constants, state }) {
	k.scene("jump-game-level-3", () => {
		const n = Math.ceil(k.width() / 64);
		const snowblocks = SnowBlocks({
			k,
			pos: k.vec2(k.width() / 2, k.height()),
			n,
		});

		// level 3
		const snowball = Snowball({
			k,
			pos: k.vec2(100, 500),
			constants,
			state,
			onWin: goNextLevel,
		});

		const p1 = Platform({
			k,
			n: 8,
			pos: k.vec2(k.width() / 2 + 120, k.height() - 100),
		});
		const p2 = Platform({
			k,
			n: 8,
			pos: p1.pos.sub(140, 48),
		});
		const p3 = Platform({
			k,
			n: 2,
			pos: p2.pos.sub(320, 10),
		});
		const p4 = Platform({
			k,
			n: 9,
			pos: p3.pos.add(400, -20),
		});

		Igloo({ k, pos: p4.pos.add(190, 0), rotate: true });

		function goNextLevel() {
			window.localStorage.setItem(
				"jumpLevel",
				k.max(window.localStorage.getItem("jumpLevel") ?? 1, 4)
			);
			k.go("jump-game", 4);
		}
	});
}
