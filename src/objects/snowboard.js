import { vec2, Vec2 } from "../engine/vec2";

export default function Snowboard({ k }) {
	const snowboard = k.add([
		k.rect(20, 100, { radius: [50, 50, 0, 0] }),
		k.color("WHITE"),
		k.pos(k.width() / 2, k.height() - 100),
		k.anchor("bot"),
		"snowboard",
	]);

	// particles should have property
	// scale: 1 to 0
	// speed: 100
	// angle: 0 to 360
	// lifetime: 0.75, 1.5
	// direction: 0, and spread: 360
	const properties = {
		scale: [1, 0],
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
			k.animate(particle, "angle", properties.angle, properties.lifetime);
			k.animate(particle, "color", properties.colors, properties.lifetime);

			k.tween(
				particle.pos,
				target,
				properties.lifetime,
				(p) => {
					particle.moveTo(p);
				}
			);

			k.wait(properties.lifetime, () => (particle.visible = false));
		});
	}

	return [snowboard, emit];
}
