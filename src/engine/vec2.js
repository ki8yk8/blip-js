export class Vec2 {
	constructor(...props) {
		const { x, y } = this.parse_props(props);

		this.x = x;
		this.y = y;
	}

	parse_props(props) {
		if (props.length === 2 && props.every((prop) => typeof prop === "number")) {
			return { x: props[0], y: props[1] };
		} else if (
			props.length === 1 &&
			typeof props[0] === "object" &&
			"x" in props[0] &&
			"y" in props[0]
		) {
			return props[0];
		} else if (props.length === 1 && Array.isArray(props[0])) {
			return { x: props[0][0], y: props[0][1] };
		} else if (props[0] instanceof Vec2) {
			return { x: props[0].x, y: props[0].y };
		}

		throw new Error("Props should be either x, y or [x, y] or {x: , y:}");
	}

	clone() {
		return new Vec2(this.x, this.y);
	}
	add(ax, ay = 0) {
		let [x, y] = [0, 0];

		if (ax instanceof Vec2) {
			x = ax.x;
			y = ax.y;
		} else {
			x = ax;
			y = ay;
		}

		return new Vec2({ x: x + this.x, y: y + this.y });
	}

	sub(...props) {
		const { x, y } = this.parse_props(props);

		return new Vec2({ x: this.x - x, y: this.y - y });
	}

	neg() {
		return new Vec2(-this.x, -this.y);
	}

	scale() {}
	dist() {}
	sdist() {}
	len() {}
	unit() {}
	dot() {}
	cross() {}
	angle() {}
	angleBetween() {}
	isZero() {}
	eq() {}
	rotate() {}
}
