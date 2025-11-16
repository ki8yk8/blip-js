export function rect(width, height, opt) {
	const radius = opt["radius"] ?? [0, 0, 0, 0];
	const fill = opt["fill"] ?? true;

	return { rectangle: { width, height, radius, fill } };
}
