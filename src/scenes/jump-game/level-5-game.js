import SnowBlocks from "../../objects/snow-blocks";
import Snowball from "../../objects/snowball";

export function registerJumpGameLevel5Scene({ k, constants, state }) {
	k.scene("jump-game-level-5", () => {
		const n = Math.ceil(k.width() / 64);
		const snowblocks = SnowBlocks({
			k,
			pos: k.vec2(k.width() / 2, k.height()),
			n,
		});

		// level 5
		const snowball = Snowball({
			k,
			pos: k.vec2(100, 500),
			constants,
			state,
			onWin: goNextLevel,
		});

		function goNextLevel() {
			k.go("jump-completed");
		}
	});
}
