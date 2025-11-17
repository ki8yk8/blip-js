import { anchor } from "./components/anchor";
import { pos } from "./components/pos";
import { rect } from "./components/rect";
import { rotate } from "./components/rotate";
import { color, hexToRgb, rgbToHex, toDegree, toRadian } from "./utils";
import { vec2 } from "./vec2";

class Engine {
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
		if (this.canvas.getContext) {
			this.canvas_ctx = this.canvas.getContext("2d");
		} else {
			throw new Error("Canvas not supported in this browser");
		}

		// setting the size
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.entities = [];
		this.on_update_functions = [];
		this.time = 0;

		// adding the utils
		this.vec2 = vec2;
		this.toRadian = toRadian;
		this.toDegree = toDegree;
		this.rgbToHex = rgbToHex;
		this.hexToRgb = hexToRgb;
		this.color = color;

		// adding the components
		this.anchor = anchor;
		this.pos = pos;
		this.rect = rect;
		this.rotate = rotate;

		// begin the render
		this.start();
	}

	start() {
		requestAnimationFrame(this.loop.bind(this));
	}

	loop(t) {
		const dt = (t - this.time) / 1000; // in seconds
		this.time = t; // total time elapsed
		this.dt = dt; // time elapsed since last render

		this.update(dt);
		this.draw();

		requestAnimationFrame(this.loop.bind(this));
	}

	update(dt) {
		for (const e of this.entities) {
			if (e.update) e.update(dt, e);
		}

		// calling all the update functions
		for (const func of this.on_update_functions) {
			func();
		}
	}

	draw() {
		this.canvas_ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (const e of this.entities) {
			if (e.draw) e.draw(this.canvas_ctx, e);
		}
	}

	add(components) {
		// default values that are overrriden later if defined by the user
		const entity = { ...this.defaults() };

		for (const c of components) {
			Object.assign(entity, c);
		}

		this.entities.push(entity);
		return entity;
	}

	width() {
		return this.width;
	}
	height() {
		return this.height;
	}

	defaults() {
		const defaults = {
			pos: { x: 0, y: 0 },
			anchor: "center",
			color: { r: 255, g: 255, b: 255 },
			angle: 0,
			scale: 1,
		};

		return { ...defaults };
	}

	onUpdate(func) {
		this.on_update_functions.push(func);
	}
}

export default Engine;
