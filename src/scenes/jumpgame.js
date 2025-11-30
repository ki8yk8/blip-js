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
		const platform = k.add([
			k.sprite("snow-platform-left"),
			k.pos(k.width()/2, 500),
			k.area(),
			"snowblock"
		])
	});
}
