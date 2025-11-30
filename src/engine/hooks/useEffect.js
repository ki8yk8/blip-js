// both dependency and callbacks are callbacks
// dependency is made a function so, that we can refresh the value
export default function useEffect(engine, callback, get_deps = () => []) {
	let start_value = get_deps();

	if (!Array.isArray(start_value)) start_value = [start_value];
	callback();

	engine.onUpdate(() => {
		let dependency = get_deps();
		if (!Array.isArray(dependency)) dependency = [dependency];

		dependency.forEach((depend, index) => {
			if (depend !== start_value[index]) {
				callback();
				start_value = [].concat(
					start_value.slice(0, index),
					[depend],
					start_value.slice(index + 1)
				);
			}
		});
	});
}
