import Engine from "./engine";
import * as k from "./engine";

const blip = new Engine();

blip.add([
	k.rect(100, 200, { radius: [10, 10, 20, 0] }),
	k.color(0, 0, 0),
	k.pos(100, 100),
]);
