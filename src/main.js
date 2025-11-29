import Engine, { COLORS } from "./engine";
import Background from "./objects/background";
import { spawnBoulders } from "./objects/boulders";
import Snowboard from "./objects/snowboard";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: "#DDE7F7",
});

Background({ k });

spawnBoulders(k);
const snowboard = Snowboard({ k });
