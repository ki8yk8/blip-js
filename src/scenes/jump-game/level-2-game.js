import SnowBlocks from "../../objects/snow-blocks";
import Snowball from "../../objects/snowball";

function getRanodmPos(k) {
	return k.vec2(k.rand(300, k.width() - 64), k.height() - 64);
}

export function registerJumpGameLevel2Scene({ k, constants, state }) {
	k.scene("jump-game-level-2", () => {
		const n = Math.ceil(k.width() / 64);
		const snowblocks = SnowBlocks({
			k,
			pos: k.vec2(k.width() / 2, k.height()),
			n,
		});

		// level 2

		const snowball = Snowball({
			k,
			pos: k.vec2((k.width() * 2) / 3, 100),
			constants,
			state,
			onWin: () => k.go("jump-game-level-2"),
		});
	});
}
