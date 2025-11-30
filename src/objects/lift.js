export default function Lift({ k, vertical = true, min = 0, max = -400, pos }) {
	const platform = k.add([
		k.sprite("snow-platform"),
		k.anchor("bot"),
		k.pos(pos),
	]);

	const lift_area = k.add([
		k.rect(64, 32),
		k.anchor("top"),
		k.pos(pos.sub(0, 64)),
		k.color("BLACK"),
		k.opacity(0),
		k.area(),
		"platform",
	]);
	const collide_area = k.add([
		k.rect(64 - 50, 10),
		k.color("BLACK"),
		k.pos(pos.sub(0, 64)),
		k.anchor("top"),
		k.area(),
		"snowblock",
	]);

	async function upAndDown() {
		await k.wait(2, () => {});
		await k.tween(min, max, 2, (v) => {
			if (vertical) {
				platform.pos.y = pos.y + v;
			} else {
				platform.pos.x = pos.x + v;
			}
		});
		await k.wait(2, () => {});
		await k.tween(min, max, 2, (v) => {
			if (vertical) {
				platform.pos.y = pos.y + max - v;
			} else {
				platform.pos.x = pos.x + max - v;
			}
		});
		await k.wait(2, () => {});
	}

	k.loop(11, upAndDown);

	lift_area.onCollideUpdate("snowball", (e) => {
		if (!k.isKeyDown("ArrowLeft") && !k.isKeyDown("ArrowRight")) {
			if (vertical) {
				e.pos.y = lift_area.pos.y;
			} else {
				e.pos.x = lift_area.pos.x;
			}
		}
	});
	k.onUpdate(() => {
		lift_area.pos = platform.pos.sub(0, 64);
		collide_area.pos = platform.pos.sub(0, 64);
	});

	return platform;
}
