import { Random } from "../engine/utils/random";
import { vec2 } from "../engine/vec2";

// anchor is always "center"
function get_random_pos({ n, x_min, x_max, y_min, y_max, gap }) {
	const random = new Random();
	const positions = [];
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

	return positions;
}

export default function Boulder({ k, pos }) {
	const boulder = k.add([
		k.rect(100, 100, { radius: [40, 30, 50, 20] }),
		k.pos(pos),
		k.color("#243A56"),
	]);

	k.add([
		k.rect(20, 50, { radius: [0, 50, 10, 4] }),
		k.pos(boulder.pos.add(boulder.width / 2 - 16, -12)),
		k.color("#4276AF"),
	]);

	return boulder;
}

export function spawnBoulders(k, n = 6) {
	get_random_pos({
		n,
		x_min: 100,
		x_max: k.width() - 100,
		y_min: 100,
		y_max: k.height() - 100,
		gap: 200,
	}).forEach((pos) => {
		Boulder({ k, pos: k.vec2(pos) });
	});
}
