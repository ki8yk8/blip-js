export { color, rgbToHex, hexToRgb } from "./utils/colors";

class Blip {
	constructor(
		props = {
			width: 600,
			height: 900,
			backgroundColor: "#ffffff",
			canvas: undefined,
		}
	) {
		this.width = props.width;
		this.height = props.height;

		this.canvas = props.canvas || document.createElement("canvas");

		if (!props.canvas) {
			document.body.appendChild(this.canvas);
		}
		this.canvas_ctx = this.canvas.getContext("2d");

		// setting the size
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}
}

export default Blip;
