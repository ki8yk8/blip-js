import { get_random_pos } from "../utils/pos";

export default function Boulder({ k, pos }) {
	const boulder = k.add([
		k.rect(100, 100, { radius: [40, 30, 50, 20] }),
		k.pos(pos),
		k.color("#243A56"),
		k.area(),
		"boulder",
	]);

	k.add([
		k.rect(20, 50, { radius: [0, 50, 10, 4] }),
		k.pos(boulder.pos.add(boulder.width / 2 - 16, -12)),
		k.color("#4276AF"),
	]);

	return boulder;
}

export function spawnBoulders(k, initial, n = 6) {
	get_random_pos({
		n,
		x_min: 100,
		x_max: k.width() - 100,
		y_min: 100,
		y_max: k.height() - 100,
		gap: 200,
		initial,
	}).forEach((pos) => {
		Boulder({ k, pos: k.vec2(pos) });
	});
}
