import { anchor } from "./components/anchor";
import { pos } from "./components/pos";
import { rect } from "./components/rect";
import { rotate } from "./components/rotate";
import { scale } from "./components/scale";
import { tag } from "./components/tags";
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
		this.all_tweens = [];
		this.time = 0;

		// keypresses
		this.keys_down = new Set(); // all the keys currently down
		this.keys_pressed = new Set(); // keys that are pressed in the frame
		this.keypress_callbacks = [];
		this.keydown_callbacks = [];
		this.keyrelease_callbacks = [];

		// window event listeners to handle the keys action
		window.addEventListener("keydown", (e) => {
			e.preventDefault();
			const key = e.key;

			// if the key has not been down before then, this is the first time key has been pressed
			if (!this.keys_down.has(key)) {
				this.keys_pressed.add(key);
			}

			this.keys_down.add(key);
		});

		window.addEventListener("keyup", (e) => {
			e.preventDefault();
			const key = e.key;

			// remove the key from keydown
			this.keys_down.delete(key);
			this.keys_pressed.delete(key);
		});

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
		this.tag = tag;

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
		const dt = t / 1000 - this.time; // in seconds
		this.time = t / 1000; // total time elapsed
		this.dt = dt; // time elapsed since last render

		this.update(dt);
		this.draw();

		requestAnimationFrame(this.loop.bind(this));
	}

	update(dt) {
		// handling all the key callbacks
		for (const e of this.keypress_callbacks) {
			const { key, callback } = e;

			if (this.keys_pressed.has(key)) {
				callback();
			}
		}

		for (const e of this.keydown_callbacks) {
			const { key, callback } = e;

			if (this.keys_down.has(key)) {
				callback();
			}
		}

		// updating the frame or re-rendering
		for (const e of this.entities) {
			if (e.update) e.update(dt, e);
		}

		// calling all the update functions
		for (const func of this.on_update_functions) {
			func();
		}

		// calling all the tweens
		this.all_tweens.forEach((tween, index) => {
			const value = this.map(
				this.time,
				tween.start,
				tween.from,
				tween.end,
				tween.to
			);
			tween.func(value);

			if (tween.end < this.time) {
				this.all_tweens.splice(index, 1);
			}
		});

		// new frame equals new keypressed set
		this.keys_pressed.clear();
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
			this.tag(),
		];
	}

	onUpdate(func) {
		this.on_update_functions.push(func);
	}

	tween(from, to, duration, func) {
		const [start, end] = [this.time, this.time + duration];

		this.all_tweens.push({
			start,
			end,
			from,
			to,
			func,
		});
	}

	onKeyPressed(key, callback) {
		this.keypress_callbacks.push({
			key,
			callback,
		});
	}

	onKeyDown(key, callback) {
		this.keydown_callbacks.push({
			key,
			callback,
		});
	}
}

export default Engine;
