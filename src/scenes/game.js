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
