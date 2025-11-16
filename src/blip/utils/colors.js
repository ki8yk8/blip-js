export function rgbToHex(r, g, b) {
	let R = r.toString(16);
	let G = g.toString(16);
	let B = b.toString(16);

	// checking if they are single digit
	R = R.length === 1 ? `0${R}` : R;
	G = G.length === 1 ? `0${G}` : G;
	B = B.length === 1 ? `0${B}` : B;

	return `#${R}${G}${B}`;
}
export function hexToRgb(hex) {
	if (hex.length !== 7) {
		throw new Error(`Hex color must be in format #RRGGBB, got ${hex}`);
	}

	// getting individual colors and parsing them from hex to decimal
	let [R, G, B] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5)];
	R = parseInt(R, 16);
	G = parseInt(G, 16);
	B = parseInt(B, 16);

	return [R, G, B];
}

export function color(...props) {
	if (props.length === 1 && props[0].startsWith("#")) {
		//hex color
		return hexToRgb(props[0]);
	} else if (
		props.length === 3 &&
		props.every((item) => typeof item === "number")
	) {
		//rgb color format
		return { color: (props[0], props[1], props[2]) };
	} else {
		throw new Error(
			`color accepts only RGB and Hex color format, got ${props}`
		);
	}
}
