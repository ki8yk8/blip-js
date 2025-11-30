import Igloo from "../../objects/igloo";
import Platform from "../../objects/platform";
import { letItSnow } from "../../objects/snow";
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

		const p1 = Platform({
			k,
			n: 1,
			pos: k.vec2(k.width() / 2, k.height() - 100),
		});
		const p2 = Platform({
			k,
			n: 1,
			pos: p1.pos.sub(120, 0),
		});
		const p3 = Platform({
			k,
			n: 1,
			pos: p2.pos.sub(120, 0),
		});
		const p4 = Platform({ k, n: 1, pos: p3.pos.sub(120, 0) });
		const p5 = Platform({ k, n: 1, pos: p4.pos.add(120, 0) });
		const p6 = Platform({ k, n: 1, pos: p5.pos.add(120, 0) });
		const p7 = Platform({ k, n: 1, pos: p6.pos.add(120, 120) });
		const p8 = Platform({ k, n: 5, pos: p7.pos.add(240, 120) });

		Igloo({ k, pos: p8.pos.add(80, 0), rotate: true });

		letItSnow({ k });
		function goNextLevel() {
			k.go("jump-completed");
		}
	});
}
