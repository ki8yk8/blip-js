export function registerHomeScreen({ k, state, constants }) {
	k.scene("home", () => {
		const logo = k.add([k.text("Ski Downhill"), k.color("PURPLE")]);
	});
}
