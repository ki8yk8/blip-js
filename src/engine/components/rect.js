import { rgbToHex } from "../utils";
import { convertBasedOnAnchor } from "./anchor";

export function rect(width, height, opt) {
	const radius = opt["radius"] ?? [0, 0, 0, 0];
	const fill = opt["fill"] ?? true;

	return {
		rect: { width, height, radius, fill },
		draw(ctx, e) {
			const anchored_pos = convertBasedOnAnchor(
				e.pos.x,
				e.pos.y,
				e.rect.width,
				e.rect.height,
				e.anchor
			);

			ctx.beginPath();
			ctx.roundRect(
				anchored_pos.x,
				anchored_pos.y,
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
