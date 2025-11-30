export default function Igloo({k, pos}) {
	const igloo = k.add([
		k.sprite("igloo"),
		k.pos(pos),
		k.anchor("bot"),
		k.area(),
		"igloo",
	])

	return igloo;
}