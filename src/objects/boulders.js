export default function Boulder({k}) {
	const boulder = k.add([
		k.rect(100, 100, {radius: [40, 30, 50, 20]})
	])

	return boulder;
}