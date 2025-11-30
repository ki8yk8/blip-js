import { vec2 } from "../vec2";

export function body(props = {}) {
	return {
		vel: vec2(0, 0),
		acc: vec2(0, 0),
		mass: props.mass ?? 1,
		isStatic: props?.isStatic ?? false,
		init(engine) {
			this.acc = vec2(0, engine._gravity);
		},
		jump(...props) {
			const force = vec2(props);

			const ground_collisions = this.getCollisions().filter(
				(e) => "isStatic" in e && e.isStatic
			);
			// collision should only occur when the object is touching the ground
			if (ground_collisions.length > 0) {
				const impulse = force.scale(1 / this.mass);
				this.vel = this.vel.add(impulse);
			}
		},

		resolvePhysics(dt) {
			if (this.isStatic) return;

			this.vel = this.vel.add(this.acc.scale(dt));

			// if collided with static object then velocity should be zero
			const in_collision = this.getCollisions();
			const static_object = in_collision.filter(
				(e) => "isStatic" in e && e.isStatic
			);

			for (const obj of static_object) {
				const normal = this.getCollisionNormal(obj);
				if (!normal) continue;

				const vel_along_normal = this.vel.dot(normal);
				if (vel_along_normal < 0) {
					// here bounce = 0 means stop and we can have soft bounce with bounce = 0.6
					const bounce = 0;
					this.vel = this.vel.add(
						normal.scale(-vel_along_normal * (1 + bounce))
					);
				}
			}
			// CHECK if this conflicts with the another vel of pos
			this.pos = this.pos.add(this.vel.scale(dt));
		},
		isOnGround() {
			return this.getCollisions().some(
				(e) => e.isStatic && this.getCollisionsNormal(e).y < 0
			);
		},
	};
}
