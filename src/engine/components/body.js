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
			const force = vec2(...props);

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
				const info = this.getCollisionNormal(obj);
				if (!info) continue;

				const normal = info.normal;
				const penetraion = info.penetraion ?? 0;

				// pusing object outof penetration
				const perecent = 0.8;
				const epsilon = 1e-6;
				const slope = 0.01;
				const correctionMag =
					k.max(penetraion - slope, 0) / (1 / this.mass + epsilon);

				const vel_along_normal = this.vel.dot(normal);
				if (vel_along_normal < 0) {
					// here bounce = 0 means stop and we can have soft bounce with bounce = 0.6
					const bounce = 0;
					const new_vel_along_normal = -vel_along_normal * (1 + bounce);
					this.vel = this.vel.add(
						normal.scale(new_vel_along_normal - vel_along_normal)
					);
				}
			}
			// CHECK if this conflicts with the another vel of pos
			this.pos = this.pos.add(this.vel.scale(dt));
		},
		isOnGround() {
			return this.getCollisions().some((e) => {
				const info = this.getCollisionNormal(e);

				return "isStatic" in e && e.isStatic && info && info.y < 0;
			});
		},
	};
}
