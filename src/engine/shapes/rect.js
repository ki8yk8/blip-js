export function rect(width, height, opt) {
	const radius = opt["radius"] ?? [0, 0, 0, 0];
	const fill = opt["fill"] ?? true;

	return {
		rect: { width, height, radius, fill },
		draw(ctx, e) {
			ctx.fillStyle = e.color || "rgb(255, 255, 255)";
			ctx.fillRect(e.pos.x, e.pos.y, e.rect.w, e.rect.h);
		},
	};
}
