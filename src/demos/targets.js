import Engine from "../engine";

const k = new Engine({
	height: window.innerHeight,
	width: window.innerWidth,
	backgroundColor: "#011627",
});

const ball = k.add([
	k.rect(80, 80, { radius: 40 }),
	k.anchor("center"),
	k.pos(k.width() / 2, k.height() / 2),
	k.color("#ff9f1c"),
	k.area(),
	k.tag("ball"),
]);

const score = k.add([
	k.text("Score: 0", { size: 32 }),
	k.anchor("topleft"),
	k.pos(50, 50),
	{
		value: 0,
	},
]);

const speed = 10;
k.onKeyDown("ArrowLeft", () => moveBall(ball, -speed, 0));
k.onKeyDown("ArrowRight", () => moveBall(ball, speed, 0));
k.onKeyDown("ArrowUp", () => moveBall(ball, 0, -speed));
k.onKeyDown("ArrowDown", () => moveBall(ball, 0, speed));

function moveBall(ball, s_x, s_y) {
	let ball_pos = ball.pos.add(s_x, s_y);
	const x = k.clamp(ball_pos.x, 40, k.width() - 40);
	const y = k.clamp(ball_pos.y, 40, k.height() - 40);

	ball.pos = k.vec2(x, y);
}

k.loop(1, () => {
	const rnd_x = k.rand(100, k.width() - 100);
	const rnd_y = k.rand(100, k.height() - 100);
	spawnTarget(rnd_x, rnd_y);
});

function spawnTarget(x, y) {
	const target = k.add([
		k.rect(50, 50, { radius: [20, 0, 20, 0] }),
		k.color("#e71d36"),
		k.pos(x, y),
		k.area(),
		k.rotate(0),
		k.tag("target"),
	]);

	target.onCollide("ball", () => {
		score.value++;
		k.tween(1, 0, 0.25, (v) => (target.scale = k.vec2(v, v)));
		k.wait(0.25, () => k.destroy(target));
	});

	k.onUpdate(() => {
		if (target) {
			target.angle += 30 * k.dt;
		}
	});
}

k.onUpdate(() => {
	score.text = `Score: ${score.value}`;
});

const instructions = k.add([
	k.text("Press 'c' to clear all targets, and arrow keys to catch the target"),
	k.pos(k.width() / 2, 20),
	k.anchor("center"),
]);

// key functions; h = help, c = clear all target, and arrows
k.onKeyPressed("c", () => {
	k.get("target").forEach((e) => {
		k.destroy(e);
	});
});
