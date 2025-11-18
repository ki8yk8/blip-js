import Engine from "../engine";

const k = new Engine({
	height: window.innerHeight,
	width: window.innerWidth,
	backgroundColor: "#011627",
});

const ball = k.add([
	k.rect(80, 80, { radius: 40 }),
	k.anchor("center"),
	k.pos(k.width() / 2, k.height() - 80),
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
