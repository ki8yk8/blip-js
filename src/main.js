import Engine from "./engine";
import { registerGameScene } from "./scenes/game";
import { registerHomeScreen } from "./scenes/homescreen";
import { registerInstructionsScreen } from "./scenes/instructions";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: "#DDE7F7",
});

const state = {
	points: 0,
	health: 100,
	fuel: 100,
};

const constants = {
	heart_spawn_rate: 4,
	max_hearts: 2,
	rotation_fuel_rate: 2.5,
	main_fuel_rate: 5,
	fuel_fills: 50,
};

k.loadSprite("heart", "/sprites/star.png");
k.loadSprite("fuel", "/sprites/fuel.png");

registerHomeScreen({ k, constants, state });
registerGameScene({ k, constants, state });
registerInstructionsScreen({ k, constants, state });

k.go("game");
