import Background from "../objects/background";
import { spawnBoulders } from "../objects/boulders";
import Fuel from "../objects/fuel";
import Ghost from "../objects/ghost";
import { Hearts } from "../objects/hearts";
import Portal from "../objects/portal";
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

		let portal_opened = false;
		k.useEffect(
			() => {
				score.text = `Score: ${state.points}`;
				score.loaded = false;

				// open portal for the next game
				if (state.points >= constants.portal_opens && !portal_opened) {
					Portal({ k });
					portal_opened = true;
				}
			},
			() => [state.points]
		);

		let last_spawned = k.time;
		k.useEffect(
			() => {
				if (
					k.time > last_spawned + constants.gap_in_fuel_spawn &&
					state.fuel < constants.fuel_threshold
				) {
					Fuel({ k, constants, state });
					last_spawned = k.time;
				}
			},
			() => [state.fuel]
		);

		k.onUpdate(() => {
			if (state.health <= 0 || state.fuel <= 0) {
				k.go("over", state.points);
			}
		});

		Ghost({ k, constants, state });
	});
}
