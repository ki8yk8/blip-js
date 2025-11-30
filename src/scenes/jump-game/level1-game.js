import Grass from "../../objects/grass";
import Igloo from "../../objects/igloo";
import Platform from "../../objects/platform";
import Snow from "../../objects/snow";
import SnowBlocks from "../../objects/snow-blocks";
import Snowball from "../../objects/snowball";
import Stone from "../../objects/stone";

function getRanodmPos(k) {
	return k.vec2(k.rand(300, k.width() - 64), k.height() - 64);
}

export function registerJumpGameLevel1Scene({ k, constants, state }) {
	k.scene("jump-game-level-1", () => {
		const n = Math.ceil(k.width() / 64);
		const snowblocks = SnowBlocks({
			k,
			pos: k.vec2(k.width() / 2, k.height()),
			n,
		});

		// level 1
		Platform({ k, n: 1, pos: k.vec2((k.width() * 2) / 3, 200) });
		Platform({ k, n: 2, pos: k.vec2((k.width() * 2) / 3 - 32, 280) });
		Platform({ k, n: 3, pos: k.vec2((k.width() * 2) / 3 - 32 * 2, 360) });
		Platform({ k, n: 4, pos: k.vec2((k.width() * 2) / 3 - 32 * 3, 450) });
		Platform({ k, n: 5, pos: k.vec2((k.width() * 2) / 3 - 32 * 4, 540) });

		Igloo({
			k,
			pos: k.vec2(k.width() / 4, k.height() - 64),
		});
		Grass({ k, pos: getRanodmPos(k) });
		Stone({ k, pos: getRanodmPos(k) });

		const snowball = Snowball({
			k,
			pos: k.vec2((k.width() * 2) / 3, 100),
			constants,
			state,
			onWin: goNextLevel,
		});

		Snow({ k });

		function goNextLevel() {
			window.localStorage.setItem(
				"jumpLevel",
				k.max(window.localStorage.getItem("jumpLevel") ?? 1, 2)
			);
			k.go("jump-game", 2);
		}
	});
}
