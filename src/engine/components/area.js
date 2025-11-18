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
				console.log(on_enter);
				const {tag, callback} = on_enter;

				if (e.is(tag)) callback(e);
			}
		},
		triggerColisisonOnStay(e) {},
		triggerCollisionOnExit() {},

		checkCollision(tag) {
			const exists = this._collisions.find((e) => e.is(tag));

			return exists;
		},
		getCollisions() {
			return this._collisions;
		},
		onCollide(tag, callback) {
			console.log(tag, callback);
			this._collision_events.onEnter.push({ tag, callback });
		},
		onCollide(callback) {
			this._collision_events.onEnter.push({ tag: "*", callback });
		},
		onCollideUpdate(tag, callback) {
			this._collision_events.onStay.push({ tag, callback });
		},
		onCollideUpdate(callback) {
			this._collision_events.onStay.push({ tag: "*", callback });
		},
		onCollideEnd(tag, callback) {
			this._collision_events.onExit.push({ tag, callback });
		},
		onCollideEnd(callback) {
			this._collision_events.onExit.push({ tag: "*", callback });
		},
	};
}
