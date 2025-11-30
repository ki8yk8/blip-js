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

		function goNextLevel() {
			window.localStorage.setItem(
				"jumpLevel",
				k.max(window.localStorage.getItem("jumpLevel") ?? 1, 4)
			);
			k.go("jump-game", 4);
		}
	});
}
