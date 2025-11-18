import Engine from "../engine";

const k = new Engine({
	height: window.innerHeight,
	width: window.innerWidth,
	backgroundColor: "#011627",
});

const player = k.add([
	k.rect(80, 80),
	k.pos(k.width() / 2, k.height() / 2),
	k.color("#7765e3"),
	k.rotate(0),
]);
const player_head = k.add([
	k.rect(20, 20, { radius: [10, 10, 0, 0] }),
	k.pos(player.pos.x, player.pos.y - player.height / 2 - 10),
	k.rotate(0),
	k.color("#20bf55"),
]);

const head_offset = player_head.pos.sub(player.pos);

const instructions = k.add([
	k.text("Press left and right arrow key to rotate player and space to shoot"),
	k.pos(k.width() / 2, 30),
]);

k.onKeyDown("ArrowLeft", () => {
	player.angle -= 100 * k.dt;
});
k.onKeyDown("ArrowRight", () => {
	player.angle += 100 * k.dt;
});
k.onUpdate(() => {
	player_head.pos = player.pos.add(head_offset.rotate(player.angle));
	player_head.angle = player.angle;
});
