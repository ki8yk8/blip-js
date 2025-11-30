import { COLORS } from "../utils";
import { vec2, Vec2 } from "../vec2";

export function particles(props = {}) {
	const properties = {
		scale: props.scale ?? [vec2(0.2), vec2(1)],
		opacities: props.opacities ?? [1.0, 0.1],
		angle: props.angle ?? [0, 360],
		speed: props.speed ?? 100,
		lifetime: props.lifetime ?? 1,
		direction: props.direction ?? 0,
		spread: props.spread ?? 40,
		colors: props.colors ?? COLORS["WHITE"],
	};

	return {
		engine: null,
		init(engine) {
			this.engine = engine;
		},
		particles: { direction: properties.direction, spread: properties.spread },
		emit(n = 10) {
			const k = this.engine;

			const particles = [];
			for (let i = 0; i < n; i++) {
				particles.push(
					k.add([
						k.rect(10, 10, { radius: 10 }),
						k.pos(this.pos),
						k.rotate(0),
						k.scale(1),
						k.visibility(true),
						k.color(
							Array.isArray(properties.colors)
								? properties.colors[0]
								: properties.colors
						),
						k.opacity(properties.opacities[0]),
						k.body(),
						k.anchor("center"),
					])
				);
			}

			particles.forEach((particle, index) => {
				const fire_angle = k.map(
					index,
					0,
					-properties.spread / 2,
					particles.length - 1,
					properties.spread / 2
				);
				particle.fire_angle = fire_angle + this.particles.direction;
				const direction = Vec2.fromAngle(particle.fire_angle);
				const target = particle.pos.add(
					direction.scale(properties.speed * properties.lifetime)
				);

				k.animate(particle, "scale", properties.scale, properties.lifetime);
				k.animate(
					particle,
					"opacity",
					properties.opacities,
					properties.lifetime
				);
				k.animate(particle, "angle", properties.angle, properties.lifetime);

				if (Array.isArray(properties.colors)) {
					k.animate(particle, "color", properties.colors, properties.lifetime);
				}

				k.tween(particle.pos, target, properties.lifetime, (p) => {
					particle.moveTo(p);
				});

				k.wait(properties.lifetime, () => particle.destroy());
			});
		},
	};
}
