export function registerInstructionsScreen({ k }) {
	k.scene("instructions", () => {
		const logo = k.add([
			k.text("Instructions", { size: 48 }),
			k.pos(k.width() / 2, 100),
			k.color("PURPLE"),
		]);

		const hint = k.add([
			k.text("Press space to continue"),
			k.pos(k.width() / 2, k.height() - 100),
			k.rotate(0),
			k.scale(1),
			k.color("BROWN"),
		]);

		const instructions = ["Instruction 1", "Instruction 2", "Instruction 3"];
		let index = 0;

		const instruction_objects = k.add([
			k.text(instructions[index], {
				size: 24,
				maxWidth: k.min(k.width() - 50, 400),
				align: "center",
			}),
			k.pos(k.width() / 2, logo.pos.y + logo.height / 2 + 50),
			k.color("BLACK"),
		]);

		const pagination = k.add([
			k.text(`Page: ${index + 1}/${instructions.length}`),
			k.pos(k.width() - 20, 100),
			k.anchor("right"),
			k.color("GREEN"),
		]);

		k.onKeyPress("ArrowLeft", () => {
			handlePageChange(-1);
		});
		k.onKeyPress("ArrowRight", () => {
			handlePageChange(1);
		});

		function handlePageChange(increment = 1) {
			index = k.clamp(index + increment, 0, instructions.length - 1);

			pagination.text = `Page: ${index + 1}/${instructions.length}`;
			pagination.loaded = false;

			instruction_objects.text = instructions[index];
			instruction_objects.loaded = false;
		}

		// animating the objects
		k.animate(hint, "angle", [0, 2, 0, -2, 0], 4);
		k.animate(
			hint,
			"scale",
			[k.vec2(1), k.vec2(1.1), k.vec2(1), k.vec2(0.9), k.vec2(1)],
			4
		);

		// exit the instruction screen
		k.onKeyPress(" ", () => {
			k.go("home");
		});
	});
}
