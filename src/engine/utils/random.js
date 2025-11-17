export function rand(lower = 0, upper = 1) {
	return Math.random() * (upper - lower) + lower;
}

export function randi(lower = 0, upper = 1) {
	return Math.round(rand(lower, upper));
}

export function randSeed(seed) {
	if (seed === undefined) {
		seed = Date.now();
	}

	// implement generator function here
}

export function choose(list) {
	list = structuredClone(list); // avoid copy by reference
	const random_index = randi(0, list.length - 1);
	return list[random_index];
}

export function chooseMultiple(list, n = 1, replacement = true) {
	list = structuredClone(list);

	if (n > list.length && !replacement) {
		throw new Error(
			`Impossible to make ${n} choices from array with length ${list.length} without replacement`
		);
	}

	const choices = [];
	for (let i = 0; i < n; i++) {
		const choice = choose(list);
		choices.push(choice);

		if (!replacement) {
			// remove elment at found index
			list.splice(list.indexOf(choice), 1);
		}
	}

	return choices;
}

export function shuffle(list) {
	list =  structuredClone(list);
	return chooseMultiple(list, list.length, false);
}
