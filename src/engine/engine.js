import { anchor } from "./components/anchor";
import { pos } from "./components/pos";
import { rect } from "./components/rect";
import { rotate } from "./components/rotate";
import { scale } from "./components/scale";
import { color, hexToRgb, rgbToHex, toDegree, toRadian } from "./utils";
import { clamp, map, max, min } from "./utils/numbers";
import { Random } from "./utils/random";
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
		this.clamp = clamp;
		this.min = min;
		this.max = max;
		this.map = map;

		// adding the components
		this.anchor = anchor;
		this.pos = pos;
		this.rect = rect;
		this.rotate = rotate;
		this.scale = scale;

		// random utilities
		this.random = new Random();
		this.rand = this.random.rand.bind(this.random);
		this.randi = this.random.randi.bind(this.random);
		this.choose = this.random.choose.bind(this.random);
		this.chooseMultiple = this.random.chooseMultiple.bind(this.random);
		this.shuffle = this.random.shuffle.bind(this.random);
		this.randSeed = this.random.randSeed.bind(this.random);

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
		const entity = {};

		// default values that are overrriden later if defined by the user
		for (const d of this.defaults()) {
			Object.assign(entity, d);
		}

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
		return [
			this.pos(0, 0),
			this.anchor("center"),
			this.color(255, 255, 255),
			this.rotate(0),
			this.scale(1, 1),
		];
	}

	onUpdate(func) {
		this.on_update_functions.push(func);
	}
}

export default Engine;
