import Engine from "./engine";
import * as k from "./engine";

// TODO: Later make sure that all the components are imported from this engine not the import
const engine = new Engine();

const object = engine.add([
	k.rect(100, 200, { radius: [10, 10, 20, 0] }),
	k.color(0, 0, 0),
	k.pos(200, 200),
	k.anchor("center"),
	k.rotate(-20),
]);

engine.onUpdate(() => {
	object.angle += 10 * engine.dt;
})

// engine.add([
// 	k.rect(10, 10, { radius: 5 }),
// 	k.color(255, 0, 0),
// 	k.pos(200, 200),
// 	k.anchor("center"),
// ]);
