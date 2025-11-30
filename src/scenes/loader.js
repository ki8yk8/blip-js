export function registerLoaderScene({ k, constants, state }) {
	k.scene("loading", () => {
		const to_load_sprites = {
			heart: "/sprites/star.png",
			fuel: "/sprites/fuel.png",
			ghost: "/sprites/ghosty.png",
			portal: "/sprites/portal.png",
			spike: "/sprites/spike.png",

			// snow assets
			grass1: "/sprites/snow_100 1.png",
			grass2: "/sprites/snow_101 1.png",

			igloo: "/sprites/snow_115 1.png",

			"snow-block": "/sprites/snow_73 1.png",
			"snow-block-left": "/sprites/snow_53 1.png",
			"snow-block-middle": "/sprites/snow_54 1.png",
			"snow-block-right": "/sprites/snow_55 1.png",

			"snow-wall-circular-left": "/sprites/snow_56 1.png",
			"snow-wall-cricular-right": "/sprites/snow_57 1.png",
			"snow-wall-circular-masked-left": "/sprites/snow_76 1.png",
			"snow-wall-circular-masked-right": "/sprites/snow_77 1.png",

			"snow-platform-left": "/sprites/snow_78 1.png",
			"snow-platform-right": "/sprites/snow_59 1.png",
			"snow-platform": "/sprites/snow_79 1.png",

			soil: "/sprites/snow_74 1.png",
			stone1: "/sprites/snow_104 1.png",
			stone2: "/sprites/snow_106 1.png",
			stone3: "/sprites/snow_117 1.png",
			stone4: "/sprites/snow_118 1.png",

			"tree-long": "/sprites/snow_97 1.png",
			"tree-small": "/sprites/snow_108 1.png",

			snowman: "/sprites/snow_113 1.png",
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
				await k.wait(
					process.env.NODE_ENV === "development" ? 0 : 0.15,
					() => {}
				);
				await k.loadSprite(name, path);
				loaded++;
				increaseProgress();
			}

			k.go("jump-game");
		})();
	});
}
