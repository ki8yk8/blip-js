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

const press_up_hint = k.add([
	k.text("Press arrow up key to move the cannon upward"),
	k.pos(k.width() / 2, 100),
]);
const press_down_hint = k.add([
	k.text("Press arrow down key to move the cannon downward"),
	k.pos(k.width() / 2, press_up_hint.pos.y + press_up_hint.height + 10),
]);
const press_space_hint = k.add([
	k.text("Press space to shoot"),
	k.pos(k.width() / 2, press_down_hint.pos.y + press_down_hint.height + 10),
]);

// acceleration due to gravity in pixels per second square
const g = 200;
const v = 400; // initial velocity of ball

const ground_top = ground.pos.y - ground.height;
const ball = k.add([
	k.rect(50, 50, { radius: 25 }),
	k.pos(100, ground_top - 25),
	k.area("ball"),
]);

const ruler = k.add([
	k.rect(100, 10),
	k.pos(ball.pos.x, ball.pos.y),
	k.anchor("left"),
	k.color("#20bf55"),
]);

k.onKeyPressed("ArrowUp", () => {
	let new_angle = ruler.angle - 10;
	new_angle = k.clamp(new_angle, -90, 0);
	ruler.angle = new_angle;
});
k.onKeyPressed("ArrowDown", () => {
	let new_angle = ruler.angle + 10;
	new_angle = k.clamp(new_angle, -90, 0);
	ruler.angle = new_angle;
});
k.onKeyPressed(" ", () => {
	const angle = k.toRadian(ruler.angle);
	const [vx, vy] = [v * Math.cos(angle), v * Math.sin(angle)];

	ball.vel = k.vec2(vx, vy);
	ball.acc = k.vec2(0, g);
});

ball.onCollide("ground", () => {
	ball.acc = k.vec2(0, 0);
	ball.vel = k.vec2(0, 0);
})
