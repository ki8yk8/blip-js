import Engine from "../engine";

const k = new Engine({
	height: window.innerHeight,
	width: window.innerWidth,
	backgroundColor: "#011627",
});

const ground = k.add([
	k.rect(k.width(), 100),
	k.pos(k.width() / 2, k.height()),
	k.anchor("bot"),
	k.color("#7765e3"),
	k.area(),
	k.tag("ground"),
]);

const ground_top = ground.pos.y - ground.height;
const g = 20;
const time_taken = Math.sqrt((2 * (ground_top - 100)) / g);

k.onKeyPressed("ArrowUp", () => {
	// 100 is padding for safety
	const random_x_on_screeen = k.rand(100, k.width() - 100);

	const ball = k.add([
		k.rect(50, 50, { radius: 25 }),
		k.color("#fdfffc"),
		k.pos(random_x_on_screeen, 100),
		k.area(),
		k.anchor("bot"),
	]);

	//this without gravity
	k.tween(ball.pos.y, ground_top, time_taken, (y) => {
		ball.pos.y = y;
	});
});

k.onKeyPressed("ArrowDown", () => {
	// 100 is padding for safety
	const random_x_on_screeen = k.rand(100, k.width() - 100);

	const ball = k.add([
		k.rect(50, 50, { radius: 25 }),
		k.color("#fdfffc"),
		k.pos(random_x_on_screeen, 100),
		k.area(),
		k.anchor("bot"),
	]);

	//this with gravity
	const start_time = k.time;
	k.onUpdate(() => {
		const new_y = (1 / 2) * g * Math.pow(start_time - k.time, 2);
		ball.moveBy(0, new_y);

		// clamping the position to prevent the fall
		ball.pos.y = k.clamp(ball.pos.y, 0, ground_top);
	});
});

// add text
const spawn_msg = k.add([
	k.text("Spawn the ball", { size: 32 }),
	k.pos(k.width() / 2, k.height() / 3 - 50),
	k.anchor("center"),
	k.color("#ffffff"),
]);
const arrow_up_msg = k.add([
	k.text("Press Arrow Up for without gravity"),
	k.pos(k.width() / 2, k.height() / 3),
	k.anchor("center"),
	k.color("#ffffff"),
]);
const arrow_down_msg = k.add([
	k.text("Press Arrow Down for without gravity"),
	k.pos(k.width() / 2, k.height() / 3 + 30),
	k.anchor("center"),
	k.color("#ffffff"),
]);

// adding the animations
let dir = 1;    // +1 means increasing, -1 means decreasing
const speed = 0.1;
k.onUpdate(() => {
	const factor = dir * speed * k.dt;
	const new_scale = spawn_msg.scale.add(factor, factor);

	if (new_scale.x >= 1.1) dir = -1;
	if (new_scale.x < 1) dir = 1;

	spawn_msg.scale = new_scale;
})
