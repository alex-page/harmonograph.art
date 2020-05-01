const generateHarmonographSVG = require('@harmonograph/svg');
const color = require('color');

const getColor = colorValue => {
	if (/^[A-Fa-f\d]{3,6}$/.test(colorValue)) {
		colorValue = '#' + colorValue;
	}

	try {
		return color(colorValue).hex();
	} catch {
		return null;
	}
};

const getHarmonograph = request => {
	const {strokeColor, strokeWidth, size} = request.query;

	const settings = {
		...(strokeColor && {strokeColor: getColor(strokeColor)}),
		...(strokeWidth && {strokeWidth}),
		...(size && {size})
	};

	return generateHarmonographSVG(settings);
};

module.exports = (request, response) => {
	const data = getHarmonograph(request);

	response.setHeader('Content-Type', 'image/svg+xml;charset=utf-8');
	response.send(data);
};

module.exports.getHarmonograph = getHarmonograph;
