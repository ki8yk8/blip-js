export default function useEffect(engine, callback, dependency = []) {
	let start_value = [...dependency];

	engine.update(() => {
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
