import Engine from "./engine";

const e = new Engine();

const object = e.add([
	e.rect(100, 200, { radius: [10, 10, 20, 0] }),
	e.color(0, 0, 0),
	e.pos(200, 200),
	e.anchor("center"),
	e.rotate(-20),
]);

e.tween(0, 90, 5, (value) => {
	object.angle = value;
});

e.onKeyDown(" ", () => {
	console.log("Space pressed");
});

e.onKeyPressed("ArrowUp", () => {
	object.moveTo(100, 100);
	console.log(object.pos);
});

e.onKeyPressed("ArrowDown", () => {
	object.moveBy(100, 100);
	console.log(object.pos);
})

e.onUpdate(() => {
	// object.angle += 10 * e.dt;
	// object.scale.x += 0.05 * e.dt;
});

// e.add([
// 	e.rect(10, 10, { radius: 5 }),
// 	e.color(255, 0, 0),
// 	e.pos(200, 200),
// 	e.anchor("center"),
// ]);
