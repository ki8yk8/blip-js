import Engine from "./engine";
import Background from "./objects/background";
import { spawnBoulders } from "./objects/boulders";
import { Hearts } from "./objects/hearts";
import Snowboard from "./objects/snowboard";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: "#DDE7F7",
});

const state = {
	points: 0,
};

const constants = {
	heart_spawn_rate: 4,
	max_hearts: 2,
};

k.loadSprite("heart", "/sprites/star.png");

Background({ k, random_patches: 20 });

const snowboard = Snowboard({ k, state });
spawnBoulders(k, snowboard.pos);

const h = Hearts({ k, state });

const tag_object = k.add(["hello"]);
console.log(tag_object);

k.loop(constants.heart_spawn_rate, () => {
	// if (k.get("heart").length <= constants.max_hearts) {
	// 	Hearts({ k, state });
	// }
});
