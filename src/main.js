import Engine from "./engine";
import * as k from "./engine";

const engine = new Engine();

engine.add([
	k.rect(100, 200, { radius: [10, 10, 20, 0] }),
	k.color(0, 0, 0),
	k.pos(200, 200),
	k.anchor("botright"),
]);

engine.add([
	k.rect(10, 10, {radius: 5}),
	k.color(255, 0, 0),
	k.pos(200, 200),
	k.anchor("center"),
])
