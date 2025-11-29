import { Vec2 } from "../vec2";
import { isColor } from "./colors";

export function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}

export function min(n, min) {
	return Math.min(n, min);
}

export function max(n, max) {
	return Math.max(n, max);
}

export function map(v, s1, d1, s2, d2) {
	if (d1 instanceof Vec2 && d2 instanceof Vec2) {
		return d1.add(d2.sub(d1).scale((v - s1) / (s2 - s1)));
	} else if (isColor(d1) && isColor(d2)) {
		return {
			r: Math.floor(map(v, s1, d1.r, s2, d2.r)),
			g: Math.floor(map(v, s1, d1.g, s2, d2.g)),
			b: Math.floor(map(v, s1, d1.b, s2, d2.b)),
		};
	}

	// v = value, s1, and s2 are source low and high and d = destination
	return d1 + ((d2 - d1) * (v - s1)) / (s2 - s1);
}
