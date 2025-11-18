import { rgbToHex, toRadian } from "../utils";
import { convertBasedOnAnchor } from "./anchor";

export function text(text, opts = { size: 18, font: "Monospace" }) {
	const size = opts?.size ?? 18;
	const font = opts?.font ?? "Monospace";

	return {
		width: size,
		height: size,
		text,
		textSize: size,
		font,
		draw(ctx, e) {
			this.width = ctx.measureText(e.text).width;
			this.height = size;

			const anchored_pos = convertBasedOnAnchor(
				e.pos.x,
				e.pos.y,
				e.width,
				e.height,
				e.anchor
			);

			// pushes the current state in the stack
			ctx.save();

			// the default for rotation is 0, 0 of canvas
			// this brings the canvas at the point of the anchor
			ctx.translate(e.pos.x, e.pos.y);
			// does the rotation
			ctx.rotate(toRadian(e.angle));
			// handles the scaling
			ctx.scale(e.scale.x, e.scale.y);

			ctx.font = `${this.textSize}px ${this.font}`;
			ctx.fillStyle = rgbToHex(e.color);
			ctx.fillText(this.text, anchored_pos.x, anchored_pos.y);

			// resetting to its original position and rotation angle
			ctx.translate(-anchored_pos.x, -anchored_pos.y);

			// restores context from the stack
			ctx.restore();
		},
	};
}
