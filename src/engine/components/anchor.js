const ANCHORS = [
	"top",
	"left",
	"right",
	"bot",
	"topleft",
	"topright",
	"botleft",
	"botright",
	"center",
];

export function anchor(anchor) {
	if (!ANCHORS.includes(anchor)) {
		throw new Error(
			`Anchor should be one of ${ANCHORS.join(", ")} got ${anchor}`
		);
	}

	return { anchor };
}
