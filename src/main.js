import Engine from "./engine";

const e = new Engine();

const object = e.add([
	e.rect(100, 200, { radius: [10, 10, 20, 0] }),
	e.color(0, 0, 0),
	e.pos(200, 200),
	e.anchor("center"),
	e.rotate(0),
	e.tag(["animal", "rectangle", "demo"]),
	e.area(),
]);

const moving_object = e.add([
	e.rect(100, 200, { radius: [10, 10, 20, 0] }),
	e.color(0, 0, 0),
	e.pos(600, 200),
	e.anchor("center"),
	e.rotate(0),
	e.tag(["react"]),
	e.area(),
]);

const text = e.add([
	e.text("Hello World", { size: 24, font: "Monospace" }),
	e.pos(200, 200),
	e.anchor("center"),
	e.rotate(0),
	e.color(0, 0, 255),
]);

e.onUpdate(() => {
	// console.log(text.width, text.height);
});

// moving_object.move(-100, 0);

// object.onCollide("react", () => {
// 	console.log("Collided with react");
// });
// object.onCollideUpdate("react", () => {
// 	console.log("colliding");
// });
// object.onCollideEnd("react", () => {
// 	console.log("Collision end");
// });

e.onUpdate(() => {
	// console.log(object._collisions);
});

// playing with tags
// console.log(object.tags);
// console.log(object.is("animal"));
// object.untag("animal");
// console.log(object.is("animal"));

// getting an element
const obj = e.get("demo")[0];
obj.color = { r: 255, g: 0, b: 0 };

// e.tween(0, 90, 5, (value) => {
// 	object.angle = value;
// });

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
});

e.onUpdate(() => {
	// object.angle += 10 * e.dt;
	// object.scale.x += 0.05 * e.dt;
});

e.add([
	e.rect(10, 10, { radius: 5 }),
	e.color(0, 255, 0),
	e.pos(200, 200),
	e.anchor("center"),
]);
