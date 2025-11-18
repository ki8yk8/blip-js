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

const g = 200;

k.onKeyPressed(" ", () => {
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
	k.onUpdate(() => {
		// v = u + gt
		if (!ball.checkCollision("ground")) {
			ball.vel.y = ball.vel.y + g * k.dt;
		}
	});

	ball.onCollide("ground", () => {
		ball.vel.y = 0;
	});
});

// add text
const spawn_msg = k.add([
	k.text("Press space to spawn the ball", { size: 32 }),
	k.pos(k.width() / 2, k.height() / 3),
	k.anchor("center"),
	k.color("#ffffff"),
]);

// adding the animations
let dir = 1; // +1 means increasing, -1 means decreasing
const speed = 0.1;
k.onUpdate(() => {
	const factor = dir * speed * k.dt;
	const new_scale = spawn_msg.scale.add(factor, factor);

	if (new_scale.x >= 1.1) dir = -1;
	if (new_scale.x < 1) dir = 1;

	spawn_msg.scale = new_scale;
});
