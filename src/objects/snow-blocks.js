export default function SnowBlocks({ k, pos, n }) {
	if (n <= 0) {
		throw new Error(`n should be greater than 0, got ${n}`);
	} else if (n === 1) {
		const block = k.add([
			k.sprite("snow-block"),
			k.pos(pos),
			k.anchor("bot"),
			k.area(),
			"snowblock",
		]);
		return block;
	} else {
		let leftmost_pos = pos.add((-n / 2) * 64 + 32, 0);
		// first add left block
		k.add([k.sprite("snow-block-left"), k.pos(leftmost_pos), k.anchor("bot")]);
		leftmost_pos = leftmost_pos.add(64, 0);

		// -2 because 1 is already used in leftmost and 1 will be used in right most
		for (let i = 0; i < n - 2; i++) {
			k.add([
				k.sprite("snow-block-middle"),
				k.pos(leftmost_pos),
				k.anchor("bot"),
			]);
			leftmost_pos = leftmost_pos.add(64, 0);
		}

		k.add([k.sprite("snow-block-right"), k.pos(leftmost_pos), k.anchor("bot")]);

		// create a rectangle with an opacity of 0 that covers the entire as a single rectangle
		return k.add([
			k.rect(n * 64, 64),
			k.pos(pos),
			k.opacity(0.0),
			k.color("BLACK"),
			k.anchor("bot"),
			k.area(),
			"snowblock",
		]);
	}
}
