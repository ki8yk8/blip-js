export default function Spikes({k, pos}) {
	const spikes = k.add([
		k.sprite("spike"),
		k.pos(pos),
		k.anchor("bot"),
		k.area(),
		"spikes",
	])

	return spikes;
}