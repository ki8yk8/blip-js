import { rgbToHex } from "../utils";

export function rect(width, height, opt) {
	const radius = opt["radius"] ?? [0, 0, 0, 0];
	const fill = opt["fill"] ?? true;

	return {
		rect: { width, height, radius, fill },
		draw(ctx, e) {
			console.log(e);
			ctx.beginPath();
			ctx.roundRect(
				e.pos.x,
				e.pos.y,
				e.rect.width,
				e.rect.height,
				e.rect.radius
			);
			if (e.rect.fill) {
				ctx.fillStyle = rgbToHex(e.color) || "#ffffff";
				ctx.fill();
			}
		},
	};
}
