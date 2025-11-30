const BAR_GAP = 2;

export default function Progress({
	k,
	title = "Progress",
	pos = k.vec2(k.width() - 200 - 50, 50),
	n_bars = 20,
	color = "GREEN",
	getPercent = () => [],
}) {
	const bg_rect = k.add([
		k.rect(200, 50, { radius: 2 }),
		k.anchor("topleft"),
		k.pos(pos),
		k.color("BLACK"),
		"progress",
	]);

	const text = k.add([
		k.text(title, { size: 18 }),
		k.pos(bg_rect.pos.add(bg_rect.width, bg_rect.height + 4)),
		k.anchor("topright"),
		k.color(color),
	]);

	// 2*4 => means 4 is padding on left and right
	// + BAR_GAP because the last bar doesn't need a padding
	const BAR_WIDTH =
		(bg_rect.width - 2 * 4 - n_bars * BAR_GAP + BAR_GAP) / n_bars;

	let bar_objects = [];

	function create_bar(percent) {
		const total_bars = Math.ceil(k.map(percent, 0, 0, 100, n_bars));

		bar_objects.forEach((bar) => k.destroy(bar));
		bar_objects = [];

		for (let i = 0; i < total_bars; i++) {
			const bar = k.add([
				k.rect(BAR_WIDTH, bg_rect.height - 2 * 4),
				k.anchor("topleft"),
				k.pos(bg_rect.pos.add(4 + (BAR_WIDTH + BAR_GAP) * i, 4)),
				k.color(color),
			]);

			bar_objects.push(bar);
		}
	}

	k.useEffect(() => {
		const percent = getPercent();
		create_bar(percent);
	}, getPercent);

	return bg_rect;
}
