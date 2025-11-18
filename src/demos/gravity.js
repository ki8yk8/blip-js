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

// 100 is padding for safety
const random_x_on_screeen = k.rand(100, k.width() - 100);

const ball = k.add([
	k.rect(50, 50, { radius: 25 }),
	k.color("#fdfffc"),
	k.pos(random_x_on_screeen, 100),
	k.area(),
	k.anchor("bot"),
]);

const ground_top = ground.pos.y - ground.height;
// this without gravity
// k.tween(ball.pos.y, , 2, (y) => {
// 	ball.pos.y = y;
// });

// this with gravity
const start_time = k.time;
const g = 20;
k.onUpdate(() => {
	const new_y = (1 / 2) * g * Math.pow(start_time - k.time, 2);
	ball.moveBy(0, new_y);

	// clamping the position to prevent the fall
	ball.pos.y = k.clamp(ball.pos.y, 0, ground_top)
});
