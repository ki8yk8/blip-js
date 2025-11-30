export function registerJumpGameScene({ k, constants, state }) {
	k.scene("jump-game", () => {
		k.add([
			k.text("Jump Game"),
			k.pos(k.width() / 2, k.height() / 2),
			k.color("BLACK"),
		]);
	});
}
