export default function Boulder({ k }) {
	const [x, y] = [k.rand(200, k.width() - 200), k.rand(200, k.height() - 200)];

	const boulder = k.add([
		k.rect(100, 100, { radius: [40, 30, 50, 20] }),
		k.pos(x, y),
		k.color("#243A56"),
	]);

	const boulder_shadow = k.add([
		k.rect(20, 50, { radius: [0, 50, 10, 4] }),
		k.pos(boulder.pos.add(boulder.width / 2 - 16, -12)),
		k.color("#4276AF"),
	]);

	return boulder;
}

export function spawnBoulders(k, n = 6) {
	for (let i = 0; i < n; i++) {
		Boulder({ k });
	}
}
