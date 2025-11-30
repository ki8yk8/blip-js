import Grass from "./grass";
import Stone from "./stone";

export default function Platform({ k, n, pos, constants }) {
	// there is 60% chance of either a grass or a stone spawning

	if (n === 1) {
		k.add([k.sprite("snow-platform"), k.anchor("bot"), k.pos(pos)]);
		const platform = k.add([
			k.rect(64 - 50, 10),
			k.color("BLACK"),
			k.pos(pos.add(0, -64)),
			k.anchor("top"),
			k.opacity(0),
			k.area(),
			"snowblock",
		]);
		k.add([
			k.rect(64, 32),
			k.color("BLACK"),
			k.pos(pos.add(0, -64)),
			k.anchor("top"),
			k.opacity(0),
			k.area(),
			"platform",
		]);

		return platform;
	} else if (n > 1) {
		let left_pos = pos.sub((n * 64) / 2 - 32, 0);
		// left
		k.add([k.sprite("snow-platform-left"), k.pos(left_pos), k.anchor("bot")]);
		left_pos = left_pos.add(64, 0);

		// between
		for (let i = 1; i < n - 1; i++) {
			k.add([
				k.sprite("snow-platform-middle"),
				k.pos(left_pos),
				k.anchor("bot"),
			]);
			left_pos = left_pos.add(64, 0);
		}

		// right
		k.add([k.sprite("snow-platform-right"), k.pos(left_pos), k.anchor("bot")]);

		const platform = k.add([
			k.rect(n * 64 - 50, 10),
			k.color("BLACK"),
			k.opacity(0),
			k.pos(pos.add(0, -64)),
			k.anchor("top"),
			k.area(),
			"snowblock",
		]);
		k.add([
			k.rect(n * 64, 32),
			k.color("BLACK"),
			k.pos(pos.add(0, -64)),
			k.anchor("top"),
			k.opacity(0),
			k.area(),
			"platform",
		]);

		if (k.rand() < 0.6) {
			const rand_pos = platform.pos.add(
				k.rand(-platform.width / 2 - 50, platform.width / 2 - 50),
				0
			);

			if (k.choose(["grass", "stone"]) === "grass") {
				Grass({ k, pos: rand_pos });
			} else {
				Stone({ k, pos: rand_pos });
			}
		}

		return platform;
	} else {
		throw new Error(`n should be greater or equal to 1. got ${n}`);
	}
}
