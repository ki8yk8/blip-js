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
		this.time = 0;

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
	}

	update(dt) {
		for (const e of this.entities) {
			if (e.update) e.update(dt, e);
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

		for (const c of components) {
			Object.assign(entity, c);
		}

		this.entities.push(this.add_defaults(entity));
		return entity;
	}

	add_defaults(entity) {
		const defaults = {
			pos: { x: 0, y: 0 },
			anchor: "center",
			color: { r: 255, g: 255, b: 255 },
			rotate: 0,
			scale: 1,
		};

		return { ...defaults, ...entity };
	}
}

export default Engine;
