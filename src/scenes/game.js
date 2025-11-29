import Background from "../objects/background";
import { spawnBoulders } from "../objects/boulders";
import { Hearts } from "../objects/hearts";
import Snowboard from "../objects/snowboard";

export function registerGameScene({ k, state, constants }) {
	k.scene("game", () => {
		Background({ k, random_patches: 20 });

		const snowboard = Snowboard({ k, state });
		spawnBoulders(k, snowboard.pos);

		k.loop(constants.heart_spawn_rate, () => {
			if (k.get("heart").length <= constants.max_hearts) {
				Hearts({ k, state });
			}
		});
	});
}
