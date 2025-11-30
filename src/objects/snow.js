export default function Snow({ k, N }) {
	let snow_particles = [];
	for (let i = 0; i < N; i++) {
		const w = k.rand(5, 10);
		const theta = k.rand(0, 45);

		const particle = k.add([
			k.rect(w, w, { radius: w / 2 }),
			k.pos(k.rand(0, k.width()), 0),
			k.anchor("center"),
			k.color("SKYBLUE"),
			k.area(),
			"snow",
		]);

		particle.vel = k.vec2(0, 100).rotate(theta);

		snow_particles.push(particle);
	}

	k.onUpdate(() => {
		snow_particles = snow_particles.filter((e) => {
			return e.pos.x > k.width() || e.pos.x < 0 || e.pos.y > k.height();
		});
	});
}

export async function letItSnow({ k }) {
	const N = k.rand(1, 5);
	const t = k.rand(1, 4);

	await k.wait(t, () => Snow({ k, N }));
	letItSnow({ k });
}
