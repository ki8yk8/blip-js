import Igloo from "../../objects/igloo";
import Lift from "../../objects/lift";
import Platform from "../../objects/platform";
import { letItSnow } from "../../objects/snow";
import SnowBlocks from "../../objects/snow-blocks";
import Snowball from "../../objects/snowball";
import Spikes from "../../objects/spikes";

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
			pos: k.vec2(120, 400),
			constants,
			state,
			onWin: goNextLevel,
			onLose: () => k.go("jump-game", 4),
		});

		const p1 = Platform({ k, n: 3, pos: k.vec2(120, k.height() - 120) });
		const p2 = Platform({
			k,
			n: 3,
			pos: k.vec2(k.width() - 120, k.height() - 120),
		});

		// creating linear spikes
		for (let x = 240; x <= k.width() - 160; x += 64) {
			Spikes({ k, pos: k.vec2(x, k.height() - 64) });
		}
		Lift({ k, pos: p1.pos.add(140, 64), vertical: false, min: 0, max: 230 });

		const p3 = Platform({ k, n: 8, pos: p2.pos.sub(400, 80) });
		const p4 = Platform({ k, n: 8, pos: p3.pos.sub(-100, 140) });

		Lift({ k, pos: p3.pos.sub(240, -16), min: 0, max: -120 });

		Igloo({ k, pos: p4.pos.add(150, 0), rotate: true });
		letItSnow({ k });

		function goNextLevel() {
			window.localStorage.setItem(
				"jumpLevel",
				k.max(window.localStorage.getItem("jumpLevel") ?? 1, 5)
			);
			k.go("jump-game", 5);
		}
	});
}
