import { Random } from "../engine/utils/random";
import { vec2 } from "../engine/vec2";

// anchor is always "center"
export function get_random_pos({
	n,
	initial,
	x_min,
	x_max,
	y_min,
	y_max,
	gap,
}) {
	const random = new Random();
	const positions = [];

	if (initial) {
		positions.push(initial);
	}

	let tries = n * 10;

	while (positions.length <= n && tries >= 0) {
		const [rnd_x, rnd_y] = [
			random.rand(x_min, x_max),
			random.rand(y_min, y_max),
		];

		const candidate = vec2(rnd_x, rnd_y);

		const far_away = positions.every((pos) => {
			return vec2(pos).dist(candidate) >= gap;
		});

		if (far_away) positions.push([rnd_x, rnd_y]);
		tries--;
	}

	if (initial) {
		return positions.slice(1);
	}
	return positions;
}
