import Lift from "../../objects/lift";
import SnowBlocks from "../../objects/snow-blocks";
import Snowball from "../../objects/snowball";

export function registerJumpGameLevel4Scene({ k, constants, state }) {
	k.scene("jump-game-level-4", () => {
		const n = Math.ceil(k.width() / 64);
		const snowblocks = SnowBlocks({
			k,
			pos: k.vec2(k.width() / 2, k.height()),
			n,
		});

		// level 4
		const snowball = Snowball({
			k,
			pos: k.vec2(k.width()/2, 0),
			constants,
			state,
			onWin: goNextLevel,
		});

		Lift({ k, pos: k.vec2(k.width() / 2, k.height() - 74) });

		function goNextLevel() {
			window.localStorage.setItem(
				"jumpLevel",
				k.max(window.localStorage.getItem("jumpLevel") ?? 1, 5)
			);
			k.go("jump-game", 5);
		}
	});
}
