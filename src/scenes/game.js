import Background from "../objects/background";
import { spawnBoulders } from "../objects/boulders";
import { Hearts } from "../objects/hearts";
import Progress from "../objects/progress";
import Snowboard from "../objects/snowboard";

export function registerGameScene({ k, state, constants }) {
	k.scene("game", () => {
		Background({ k, random_patches: 20 });

		const snowboard = Snowboard({ k, state, constants });
		spawnBoulders(k, snowboard.pos);
		const health_progress = Progress({
			k,
			title: "Health",
			color: "GREEN",
			getPercent() {
				return state.health;
			},
		});
		const fuel_progress = Progress({
			k,
			title: "Fuel",
			pos: health_progress.pos.add(0, 80),
			color: "PURPLE",
			getPercent() {
				return state.fuel;
			},
		});

		k.loop(constants.heart_spawn_rate, () => {
			if (k.get("heart").length <= constants.max_hearts) {
				Hearts({ k, state });
			}
		});

		k.add([
			k.rect(200, 50, { radius: 10 }),
			k.color("BLACK"),
			k.pos(30, 40),
			k.anchor("topleft"),
		]);

		const score = k.add([
			k.text("Score: 0", { size: 28 }),
			k.color("WHITE"),
			k.pos(50, 50),
			k.anchor("topleft"),
		]);

		k.useEffect(
			() => {
				score.text = `Score: ${state.points}`;
				score.loaded = false;
			},
			() => [state.points]
		);
	});
}
