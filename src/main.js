import Engine from "./engine";
import { registerGameScene } from "./scenes/game";
import { registerHomeScreen } from "./scenes/homescreen";
import { registerInstructionsScreen } from "./scenes/instructions";
import { registerJumpGameLevel2Scene } from "./scenes/jump-game/level-2-game";
import { registerJumpGameLevel1Scene } from "./scenes/jump-game/level1-game";
import { registerLoaderScene } from "./scenes/loader";
import { registerGameOverScene } from "./scenes/over";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: "#BFCDEA",
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
	gap_in_fuel_spawn: 5,
	fuel_threshold: 60,
	fuel_stays: 5,
	portal_opens: 5,
	ghost_speed: 100,
	ghost_hits: 40,
	ghost_stays: 5,
	evaluation_time: 3,
};

registerHomeScreen({ k, constants, state });
registerGameScene({ k, constants, state });
registerInstructionsScreen({ k, constants, state });
registerGameOverScene({ k, constants, state });
registerLoaderScene({ k, state, constants });

registerJumpGameLevel1Scene({ k, constants, state });
registerJumpGameLevel2Scene({ k, constants, state });

k.go("loading");
