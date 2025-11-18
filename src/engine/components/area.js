export function area() {
	return {
		_collisions: [],
		_collision_events: {
			onEnter: [],
			onStay: [],
			onExit: [],
		},
		checkCollision(tag) {
			const exists = this._collisions.find((e) => e.is(tag));

			return exists;
		},
		getCollisions() {
			return this._collisions;
		},
		onCollide(tag, callback) {
			this._collision_events.onEnter.push({ tag, callback });
		},
		onCollide(callback) {
			this.onCollide("*", callback);
		},
		onCollideUpdate(tag, callback) {
			this._collision_events.onStay.push({ tag, callback });
		},
		onCollideUpdate(callback) {
			this.onCollideUpdate("*", callback);
		},
		onCollideEnd(tag, callback) {
			this._collision_events.onExit.push({ tag, callback });
		},
		onCollideEnd(callback) {
			this.onCollideEnd("*", callback);
		},
	};
}
