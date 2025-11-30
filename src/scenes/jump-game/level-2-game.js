import Igloo from "../../objects/igloo";
import Platform from "../../objects/platform";
import SnowBlocks from "../../objects/snow-blocks";
import Snowball from "../../objects/snowball";

export function registerJumpGameLevel2Scene({ k, constants, state }) {
	k.scene("jump-game-level-2", () => {
		const n = Math.ceil(k.width() / 64);
		const snowblocks = SnowBlocks({
			k,
			pos: k.vec2(k.width() / 2, k.height()),
			n,
		});

		// level 2
		const p1 = Platform({
			k,
			n: 1,
			pos: k.vec2((k.width() * 2) / 3, k.height() - 100),
		});
		const p2 = Platform({ k, n: 1, pos: p1.pos.add(72, -32) });
		const p3 = Platform({ k, n: 2, pos: p2.pos.add(-180, -32) });
		const p4 = Platform({ k, n: 6, pos: p3.pos.add(-250, 32) });

		Igloo({ k, pos: p4.pos.add(-40, 0) });

		const snowball = Snowball({
			k,
			pos: k.vec2(100, 500),
			constants,
			state,
			onWin: goNextLevel,
		});

		function goNextLevel() {
			window.localStorage.setItem(
				"jumpLevel",
				k.max(window.localStorage.getItem("jumpLevel") ?? 1, 3)
			);
			k.go("jump-game", 3);
		}
	});
}
