export default function Fuel({ k, constants, state }) {
	const [rand_x, rand_y] = [
		k.rand(200, k.width() - 200),
		k.rand(200, k.height() - 200),
	];
	const fuel = k.add([
		k.sprite("fuel"),
		k.pos(rand_x, rand_y),
		k.area(),
		"fuel",
	]);

	fuel.onCollide("snowboard", () => {
		state.fuel += constants.fuel_fills;
	});

	return fuel;
}
