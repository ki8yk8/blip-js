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

// acceleration due to gravity in pixels per second square
const g = 200;

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
