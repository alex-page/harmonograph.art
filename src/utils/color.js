import colorString from 'color-string';

export const HSVAtoHEX = ([h,s,v,a]) => {
	let r;
	let g;
	let b;

	h = h / 360;

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
	}

	const rgba = [
		Math.round(r * 255),
		Math.round(g * 255),
		Math.round(b * 255),
		a
	];

	return colorString.to.hex(rgba);
}

export const RGBAtoHSVA = ([r,g,b,a]) => {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	
	const d = max - min;
	const s = (max === 0 ? 0 : d / max);
	const v = max / 255;
	
	let h;

	switch (max) {
		case min: h = 0; break;
		case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
		case g: h = (b - r) + d * 2; h /= 6 * d; break;
		case b: h = (r - g) + d * 4; h /= 6 * d; break;
	}

	h = Math.round(h * 360);

	return [h,s,v,a];
}