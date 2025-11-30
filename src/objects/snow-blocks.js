export default function SnowBlocks({ k, pos, n }) {
	if (n <= 0) {
		throw new Error(`n should be greater than 0, got ${n}`);
	} else if (n === 1) {
		k.add([k.sprite("snow-block"), k.pos(pos), k.anchor("bot"), "snowblock"]);
	} else {
		let leftmost_pos = pos.add(-Math.floor(n / 2) * 64, 0);
		// first add left block
		k.add([
			k.sprite("snow-block-left"),
			k.pos(leftmost_pos),
			k.anchor("bot"),
			k.area(),
			"snowblock",
		]);
		leftmost_pos = leftmost_pos.add(64, 0);

		// -2 because 1 is already used in leftmost and 1 will be used in right most
		for (let i = 0; i < n - 2; i++) {
			k.add([
				k.sprite("snow-block-middle"),
				k.pos(leftmost_pos),
				k.anchor("bot"),
				k.area(),
				"snowblock",
			]);
			leftmost_pos = leftmost_pos.add(64, 0);
		}

		k.add([
			k.sprite("snow-block-right"),
			k.pos(leftmost_pos),
			k.anchor("bot"),
			k.area(),
			"snowblock",
		]);
	}
}
