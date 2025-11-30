import { vec2 } from "../vec2";

export function pos(x, y) {
	return {
		pos: vec2(x, y),
		move(...props) {
			if (!this.vel) {
				throw new Error("Move requires object to be a body");
			}
			const vel = vec2(...props);
			this.vel = vel;
		},
		moveTo(...props) {
			this.pos = vec2(...props);
		},
		moveBy(...props) {
			this.pos = this.pos.add(...props);
		},
		update(dt) {
			if (this.vel) {
				this.pos = this.pos.add(this.vel.x * dt, this.vel.y * dt);
				
				this.vel = this.vel.add(this.acc.scale(dt));
			}
		},
	};
}
