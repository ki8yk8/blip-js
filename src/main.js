import Engine, { COLORS } from "./engine";
import Snowboard from "./objects/snowboard";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: COLORS.BLACK,
});

const [snowboard, emit] = Snowboard({ k });
emit();
