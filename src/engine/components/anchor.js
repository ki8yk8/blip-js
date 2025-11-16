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

export function convertBasedOnAnchor(x, y, width, height, anchor) {
	if (!ANCHORS.includes(anchor)) {
		throw new Error(
			`Anchor should be one of ${ANCHORS.join(", ")} got ${anchor}`
		);
	}

	switch (anchor) {
		case "topleft":
			return { x, y };

		case "top":
			return { x: x - width / 2, y };
	}
}
