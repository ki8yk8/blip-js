import { vec2 } from "../vec2";

export function body(props = {}) {
	return {
		vel: vec2(0, 0),
		acc: vec2(0, 0),
		mass: 1,
		isStatic: props?.isStatic ?? false,
		init(engine) {
			if (this.acc) {
				this.acc = this.acc.add(vec2(0, engine._gravity));
			} else {
				this.acc = vec2(0, engine._gravity);
			}
		},
		jump(force) {
			// collision should only occur when the object is touching the ground
			if (this.getCollisions().length > 0) {
				const impulse = force.scale(1 / this.mass);
				this.vel = this.vel.add(impulse).neg();
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

			if (static_object.length > 0) {
				this.vel = this.vel.neg().scale(0.6);
			}
		},
	};
}
