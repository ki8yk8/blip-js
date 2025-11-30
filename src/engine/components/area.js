import { vec2 } from "../vec2";

export function area() {
	return {
		_collisions: [],
		_collision_events: {
			onEnter: [],
			onStay: [],
			onExit: [],
		},
		triggerCollisionOnEnter(e) {
			for (const on_enter of this._collision_events.onEnter) {
				const { tag, callback } = on_enter;

				if (e.is(tag)) callback(e);
			}
		},
		triggerCollisionOnStay(e) {
			for (const on_enter of this._collision_events.onStay) {
				const { tag, callback } = on_enter;

				if (e.is(tag)) callback(e);
			}
		},
		triggerCollisionOnExit(e) {
			for (const on_enter of this._collision_events.onExit) {
				const { tag, callback } = on_enter;

				if (e.is(tag)) callback(e);
			}
		},
		checkCollision(tag) {
			const exists = this._collisions.find((e) => e.is(tag));

			return exists;
		},
		getCollisions() {
			return this._collisions;
		},
		getCollisionNormal(other) {
			const center_a = this.pos.add(vec2(this.width / 2, this.height / 2));
			const center_b = other.pos.add(vec2(other.width / 2, other.height / 2));

			const delta = center_a.sub(center_b);

			const [half_a, half_b] = [this.pos.scale(0.5), other.pos.scale(0.5)];

			const overlap_x = half_a.x + half_b.x - Math.abs(delta.x);
			const overap_y = half_a.y + half_b.y - Math.abs(delta.y);

			if (overlap_x < 0 || overap_y < 0) return null;

			if (overlap_x < overap_y) {
				return delta.x > 0 ? vec2(1, 0) : vec2(-1, 0);
			} else {
				return delta.y > 0 ? vec2(0, 1) : vec2(0, -1);
			}
		},
		onCollide(tag, callback = undefined) {
			if (callback === undefined) {
				callback = tag;
				tag = "*";
			}

			if (typeof tag !== "string" || typeof callback !== "function") {
				throw new Error(
					"Tag should be string and callback should be a function"
				);
			}

			this._collision_events.onEnter.push({ tag, callback });
		},
		onCollideUpdate(tag, callback = undefined) {
			if (callback === undefined) {
				callback = tag;
				tag = "*";
			}

			if (typeof tag !== "string" || typeof callback !== "function") {
				throw new Error(
					"Tag should be string and callback should be a function"
				);
			}
			this._collision_events.onStay.push({ tag, callback });
		},
		onCollideEnd(tag, callback = undefined) {
			if (callback === undefined) {
				callback = tag;
				tag = "*";
			}

			if (typeof tag !== "string" || typeof callback !== "function") {
				throw new Error(
					"Tag should be string and callback should be a function"
				);
			}
			this._collision_events.onExit.push({ tag, callback });
		},
	};
}
