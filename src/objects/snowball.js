import { vec2 } from "../engine/vec2";

export default function Snowball({ k, pos = vec2(k.width() / 2, 100) }) {
	const snowball = k.add([
		k.rect(50, 50, { radius: 25 }),
		k.anchor("bot"),
		k.pos(pos),
		k.area(),
		k.color("#D8F2F4"),
		"snowball",
	]);

	const particles = k.add([
		k.rect(1, 1),
		k.pos(0, 0),
		k.particles({
			spread: 360,
			colors: [k.Color("RED"), k.Color("PURPLE")],
			lifetime: 2,
			speed: 50,
		}),
	]);

	const max_velocity = 300;
	const gravity = 200;
	const drag = 0.1;
	const jump_force = 200;

	snowball.vel = k.vec2(0, 0);

	snowball.onCollide("snowblock", (e) => {
		const [s_bbox, e_bbox] = [k.bbox(snowball), k.bbox(e)];
		if (Math.abs(s_bbox[2].y - e_bbox[0].y) < 5) {
			snowball.vel.y = 0;
			snowball.acc.y = 0;
		}
	});

	snowball.onCollide("platform", (e) => {
		// head (ball) to tail (platform) collision
		const [s_bbox, e_bbox] = [k.bbox(snowball), k.bbox(e)];

		if (Math.abs(s_bbox[0].y - e_bbox[2].y) < 5) {
			snowball.vel.y = 0;
		}
	});

	snowball.onCollide("igloo", async () => {
		// animating the snowball
		function jump() {
			snowball.vel.y = -jump_force / 2;
			snowball.vel.x = 0;
			snowball.acc.x = 0;
		}
		function confetti() {
			particles.pos = snowball.pos;
			particles.emit(20);
		}

		jump();
		await k.wait(0.8, jump);
		confetti();
		await k.wait(0.5, jump);
		confetti();
		await k.wait(0.5, jump);
		confetti();
		await k.wait(0.5, jump);

		// new level starts
		console.log("level complete");
	});

	// do not let snowball cross the boundary ever
	k.onUpdate(() => {
		snowball.pos.x = k.clamp(
			snowball.pos.x,
			snowball.width / 2,
			k.width() - snowball.width / 2
		);
		snowball.pos.y = k.clamp(snowball.pos.y, snowball.height, k.height() - 64);
	});

	// handle movement left and right
	k.onUpdate(() => {
		if (!snowball.checkCollision("snowblock")) {
			snowball.acc.y = gravity;
			return;
		}

		// on press space jump
		if (k.isKeyDown(" ")) {
			snowball.vel.y = -jump_force;
			snowball.acc.y = gravity;
		}
		if (k.isKeyDown("ArrowRight")) {
			snowball.vel.x = 150;
		} else if (k.isKeyDown("ArrowLeft")) {
			snowball.vel.x = -150;
		} else {
			snowball.vel.x = snowball.vel.x * (1 - drag);
		}

		snowball.vel.x = k.clamp(snowball.vel.x, -max_velocity, max_velocity);
		snowball.vel.y = k.clamp(snowball.vel.y, -max_velocity, max_velocity);
	});

	return snowball;
}
