import Engine from "./engine";
import { registerGameScene } from "./scenes/game";
import { registerHomeScreen } from "./scenes/homescreen";

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

registerHomeScreen({ k, constants, state });
registerGameScene({ k, constants, state });

k.go("home");
