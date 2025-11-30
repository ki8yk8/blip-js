export function registerLoaderScene({ k, constants, state }) {
	k.scene("loading", () => {
		const to_load_sprites = {
			heart: "/sprites/star.png",
			fuel: "/sprites/fuel.png",
			ghost: "/sprites/ghosty.png",
			grass: "/sprites/grass.png",
			portal: "/sprites/portal.png",
			spike: "/sprites/spike.png",
			steel: "/sprites/steel.png",
		};

		const progress_bar_bg = k.add([
			k.rect(400, 80),
			k.color("BLACK"),
			k.pos(k.width() / 2, k.height() / 2),
		]);
		const progress_bar = k.add([
			k.rect(10, 80 - 12),
			k.pos(progress_bar_bg.pos.add(-progress_bar_bg.width / 2 + 6, 0)),
			k.anchor("left"),
		]);

		let loaded = 0;
		const total = Object.keys(to_load_sprites).length;

		// 0 => 10, 100 => progress_bar_bg.width-12
		function increaseProgress() {
			const width = k.map(
				(loaded / total) * 100,
				0,
				10,
				100,
				progress_bar_bg.width - 12
			);
			progress_bar.width = width;
			progress_bar.rect.width = width;
		}

		const entries = Object.entries(to_load_sprites);
		(async () => {
			for (const [name, path] of entries) {
				await k.wait(0.15, () => {});
				await k.loadSprite(name, path);
				loaded++;
				increaseProgress();
			}

			k.go("home")
		})();
	});
}
