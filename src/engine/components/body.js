import { vec2 } from "../vec2";

export function body(props = {}) {
	return {
		vel: vec2(0, 0),
		acc: vec2(0, 0),
		isStatic: props?.isStatic ?? false,
		init(engine) {
			if (this.acc) {
				this.acc = this.acc.add(vec2(0, engine._gravity));
			} else {
				this.acc = vec2(0, engine._gravity);
			}
		},
		jump(force) {},
	};
}
