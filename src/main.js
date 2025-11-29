import Engine from "./engine";
import Background from "./objects/background";
import { spawnBoulders } from "./objects/boulders";
import Snowboard from "./objects/snowboard";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: "#DDE7F7",
});

Background({ k, random_patches: 20 });

const snowboard = Snowboard({ k });
spawnBoulders(k, snowboard.pos);
