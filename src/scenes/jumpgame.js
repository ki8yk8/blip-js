import Grass from "../objects/grass";
import Igloo from "../objects/igloo";
import Platform from "../objects/platform";
import SnowBlocks from "../objects/snow-blocks";
import Snowball from "../objects/snowball";
import Stone from "../objects/stone";

function getRanodmPos(k) {
	return k.vec2(k.rand(300, k.width() - 64), k.height() - 64);
}

export function registerJumpGameScene({ k, constants, state }) {
	k.scene("jump-game", () => {
		const n = Math.ceil(k.width() / 64);
		const snowblocks = SnowBlocks({
			k,
			pos: k.vec2(k.width() / 2, k.height()),
			n,
		});

		// level 1
		Platform({ k, n: 5, pos: k.vec2(k.width() / 2, 500) });
		Platform({ k, n: 1, pos: k.vec2(k.width() / 2, 400) });

		Igloo({ k, pos: k.vec2(k.width() / 4, k.height() - 64) });
		Grass({ k, pos: getRanodmPos(k) });
		Stone({ k, pos: getRanodmPos(k) });

		const snowball = Snowball({ k, constants, state });
	});
}
