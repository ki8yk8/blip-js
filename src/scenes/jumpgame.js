import Platform from "../objects/platform";
import SnowBlocks from "../objects/snow-blocks";
import Snowball from "../objects/snowball";

export function registerJumpGameScene({ k, constants, state }) {
	k.scene("jump-game", () => {
		const n = Math.ceil(k.width() / 64);
		const snowblocks = SnowBlocks({
			k,
			pos: k.vec2(k.width() / 2, k.height()),
			n,
		});

		const snowball = Snowball({ k, constants, state });

		// level 1
		const platform = Platform({ k, pos: k.vec2(k.width() / 2, 500) });

		// testing bboxes
		const obj_1 = k.add([
			k.rect(100, 100),
			k.pos(k.width() / 2, k.height() / 2),
			k.anchor("top"),
			k.color("BLACK"),
		]);
		const obj_2 = k.add([
			k.rect(100, 100),
			k.pos(k.width() / 2, k.height() / 2 + 50),
			k.anchor("center"),
			k.scale(1.5),
			k.color("GREEN"),
		]);
		const obj_3 = k.add([
			k.rect(100, 100),
			k.pos(k.width() / 2 + 50, k.height() / 2 + 100),
			k.scale(1.5),
			k.anchor("botright"),
		]);

		k.wait(1, () => console.log(k.bbox(obj_1), k.bbox(obj_3)));
	});
}
