import { vec2, Vec2 } from "../engine/vec2";

export default function Snowboard({ k }) {
	const snowboard = k.add([
		k.rect(20, 100, { radius: [50, 50, 0, 0] }),
		k.color("WHITE"),
		k.pos(k.width() / 2, k.height() - 100),
		k.anchor("bot"),
		"snowboard",
	]);

	const properties = {
		scale: [vec2(0.2), vec2(1)],
		opacities: [1.0, 0.0],
		angle: [0, 360],
		speed: 100,
		lifetime: 1,
		direction: 0,
		spread: 40,
		colors: [k.Color(k.colors.RED), k.Color(k.colors.ORANGE)],
	};

	const particles = [];
	for (let i = 0; i < 4; i++) {
		particles.push(
			k.add([
				k.rect(10, 10, { radius: 0 }),
				k.pos(k.width() / 2, k.height() / 2),
				k.rotate(0),
				k.scale(1),
				k.visibility(false),
				k.color(properties.colors?.[0] ?? "WHITE"),
				k.opacity(properties.opacities?.[0] ?? 1),
				k.anchor("center"),
				"particle",
			])
		);
	}
	function emit() {
		particles.forEach((particle, index) => {
			particle.visible = true;
			const fire_angle = k.map(
				index,
				0,
				-properties.spread / 2,
				particles.length - 1,
				properties.spread / 2
			);
			particle.fire_angle = fire_angle + properties.direction;
			const direction = Vec2.fromAngle(particle.fire_angle);
			const target = particle.pos.add(
				direction.scale(properties.speed * properties.lifetime)
			);

			k.animate(particle, "scale", properties.scale, properties.lifetime);
			k.animate(particle, "opacity", properties.opacities, properties.lifetime);
			k.animate(particle, "angle", properties.angle, properties.lifetime);
			k.animate(particle, "color", properties.colors, properties.lifetime);

			k.tween(particle.pos, target, properties.lifetime, (p) => {
				particle.moveTo(p);
			});

			k.wait(properties.lifetime, () => (particle.visible = false));
		});
	}

	return [snowboard, emit];
}
