import { rgbToHex } from "../utils";

export function rect(width, height, opt) {
	const radius = opt["radius"] ?? [0, 0, 0, 0];
	const fill = opt["fill"] ?? true;

	return {
		rect: { width, height, radius, fill },
		draw(ctx, e) {
			ctx.fillStyle = rgbToHex(e.color) || "rgb(0, 0, 0)";
			ctx.fillRect(e.pos.x, e.pos.y, e.rect.w, e.rect.h);
		},
	};
}
