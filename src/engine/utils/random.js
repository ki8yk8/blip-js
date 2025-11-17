export function rand(generator, lower = 0, upper = 1) {
	return generator() * (upper - lower) + lower;
}

export function randi(generator, lower = 0, upper = 1) {
	return Math.round(rand(generator, lower, upper));
}

// Reference: https://en.wikipedia.org/wiki/Linear_congruential_generator
export class RNG {
	constructor(seed) {
		this.x = seed;
		this.a = 1664525;
		this.c = 1013904223;
		this.m = 2**32;
	}

	generate() {
		this.x = (this.a * this.x + this.c) % this.m;

		// normalizing between 0 and 1
		return this.x / this.m;
	}
}

export function randSeed(seed) {
	if (seed === undefined) {
		seed = Date.now();
	}

	// implement generator function here
	return new RNG(seed).generate;
}

export function choose(generator, list) {
	list = structuredClone(list); // avoid copy by reference
	const random_index = randi(generator, 0, list.length - 1);
	return list[random_index];
}

export function chooseMultiple(generator, list, n = 1, replacement = true) {
	list = structuredClone(list);

	if (n > list.length && !replacement) {
		throw new Error(
			`Impossible to make ${n} choices from array with length ${list.length} without replacement`
		);
	}

	const choices = [];
	for (let i = 0; i < n; i++) {
		const choice = choose(generator, list);
		choices.push(choice);

		if (!replacement) {
			// remove elment at found index
			list.splice(list.indexOf(choice), 1);
		}
	}

	return choices;
}

export function shuffle(generator, list) {
	list = structuredClone(list);
	return chooseMultiple(generator, list, list.length, false);
}
