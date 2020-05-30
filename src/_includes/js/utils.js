import colorString from 'color-string';
import {randomPendulums} from '@harmonograph/svg';

export const getPendulums = pendulums => {
	if (!pendulums) {
		return randomPendulums();
	}

	const newPendulums = [];
	const pendulumArray = pendulums.split('+').map(value => Number(value));
	for (let i = 0; i < pendulumArray.length; i += 4) {
		newPendulums.push({
			amplitude: pendulumArray[i],
			frequency: pendulumArray[i + 1],
			phase: pendulumArray[i + 2],
			damping: pendulumArray[i + 3]
		});
	}

	return newPendulums;
};

export const getRandomColor = () => `#${Math.random().toString(16).slice(2, 8).toString(16).toUpperCase()}`;

export const rgbaToHsva = ([r, g, b, a]) => {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	const d = max - min;
	const s = (max === 0 ? 0 : d / max);
	const v = max / 255;

	let h;

	switch (max) {
		case min: h = 0;
			break;
		case r: h = (g - b) + d * (g < b ? 6 : 0); h /= 6 * d;
			break;
		case g: h = (b - r) + d * 2; h /= 6 * d;
			break;
		case b: h = (r - g) + d * 4; h /= 6 * d;
			break;
	}

	h = Math.round(h * 360);

	return [h, s, v, a];
};

export const hsvaToHex = ([h, s, v, a]) => {
	let r;
	let g;
	let b;

	h /= 360;

	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0: r = v, g = t, b = p;
			break;
		case 1: r = q, g = v, b = p;
			break;
		case 2: r = p, g = v, b = t;
			break;
		case 3: r = p, g = q, b = v;
			break;
		case 4: r = t, g = p, b = v;
			break;
		case 5: r = v, g = p, b = q;
			break;
	}

	const rgba = [
		Math.round(r * 255),
		Math.round(g * 255),
		Math.round(b * 255),
		a
	];

	return colorString.to.hex(rgba);
};

