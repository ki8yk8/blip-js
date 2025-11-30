export default function Fuel({ k, constants, state }) {
	const [rand_x, rand_y] = [
		k.rand(200, k.width() - 200),
		k.rand(200, k.height() - 200),
	];
	const fuel = k.add([
		k.sprite("fuel"),
		k.pos(rand_x, rand_y),
		k.area(),
		k.scale(0.8),
		"fuel",
	]);

	fuel.onCollide("snowboard", () => {
		state.fuel += constants.fuel_fills;
		k.destroy(fuel);
	});

	fuel.onCollide("boulder", () => {
		const [rand_x, rand_y] = [
			k.rand(200, k.width() - 200),
			k.rand(200, k.height() - 200),
		];
		fuel.pos = k.vec2(rand_x, rand_y);
	});

	k.wait(constants.fuel_stays, () => {
		k.destroy(fuel);
	});

	return fuel;
}
