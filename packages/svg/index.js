const {h} = require('preact');
const render = require('preact-render-to-string');
const {svgPathProperties: SvgPathProperties} = require('svg-path-properties');

const generateHarmonograph = require('@harmonograph/xy');
const {randomPendulums} = require('@harmonograph/xy');

/**
 * Rounds a number to three decimal places
 *
 * @param   {number} numberToRound - The number to round
 * @param   {number} maxDecimals   - The maximum number of decimals
 *
 * @returns {number}               - The rounded number
 */
const round = (numberToRound, maxDecimals = 3) => Number(
	Math.round(numberToRound + 'e' + maxDecimals) + 'e-' + maxDecimals
);

/**
 * Reduce number of XY points by creating bezier curves
 *
 * @param {number} drawingTime - Total time the pendulums swing
 * @param {number} size        - The size of the pendulum
 * @param {object} pendulums   - The pendulum settings, see randomPendulum
 *
 * @returns {string}           - The SVG path data as a string
 */
const harmonographBezierPath = (pendulumTime, size, pendulums) => {
	const {x, y} = generateHarmonograph(pendulumTime, size, pendulums);

	const harmonograph = {
		x: [],
		y: [],
		cpX: [], // Control point X
		cpY: [] // Control point Y
	};

	const step = 50;
	const factor = 0.5 * step / 3;
	const totalPoints = x.length;

	// Reduce the points by steps of 50 and create controlPoints
	for (let i = 0; i < totalPoints; i += step) {
		harmonograph.x.push(x[i]);
		harmonograph.y.push(y[i]);

		// Get the control points for the stepped values
		const previous = i <= 0 ? 0 : i - 1;
		const next = i >= totalPoints ? totalPoints - 1 : i + 1;

		const controlPointX = factor * (x[next] - x[previous]);
		const controlPointY = factor * (y[next] - y[previous]);

		harmonograph.cpX.push(controlPointX);
		harmonograph.cpY.push(controlPointY);
	}

	// Create the SVG data path
	const svg = [
		'M',
		harmonograph.x[0],
		harmonograph.y[0],
		'C',
		round(harmonograph.x[0] + harmonograph.cpX[0]),
		round(harmonograph.y[0] + harmonograph.cpY[0]) + ',',
		round(harmonograph.x[1] - harmonograph.cpX[1]),
		round(harmonograph.y[1] - harmonograph.cpY[1]) + ',',
		harmonograph.x[1],
		harmonograph.y[1]
	];

	// Create the curves
	const totalCurvedPoints = harmonograph.x.length;
	if (totalCurvedPoints > 2) {
		svg.push('S');

		for (let i = 2; i < totalCurvedPoints; i++) {
			svg.push(round(harmonograph.x[i] - harmonograph.cpX[i]));
			svg.push(round(harmonograph.y[i] - harmonograph.cpY[i]) + ',');
			svg.push(harmonograph.x[i]);
			svg.push(harmonograph.y[i]);
		}
	}

	// Send back the svg data
	return svg.join(' ');
};

/**
 * Create a randomised harmonograph SVG
 *
 * Resources:
 * - https://en.wikipedia.org/wiki/Harmonograph
 * - https://aschinchon.wordpress.com/2014/10/13/beautiful-curves-the-harmonograph/
 *
 * @param  {object}  userSettings                 - The users settings
 * @param  {number}  userSettings.size            - The size of the svg
 * @param  {number}  userSettings.strokeWidth     - The width of the line
 * @param  {string}  userSettings.strokeColor     - The color of the harmonograph
 * @param  {number}  userSettings.pendulumTime    - How long the pendulum swings
 * @param  {number}  userSettings.animated        - If the SVG path is animated
 * @param  {array}   userSettings.pendulum        - The pendulum settings, see randomPendulum
 *
 * @returns {string}                              - The SVG element
 */
const generateHarmonographSVG = userSettings => {
	const {
		size,
		strokeWidth,
		strokeColor,
		backgroundColor,
		pendulumTime,
		animatePath,
		pendulums
	} = {
		size: 700,
		strokeWidth: 1,
		strokeColor: '#000',
		backgroundColor: 'transparent',
		pendulumTime: 150,
		animatePath: false,
		pendulums: randomPendulums(),
		...userSettings
	};

	// Reduce the number of XY points by using bezier curves
	const harmonographPath = harmonographBezierPath(pendulumTime, size, pendulums);

	const pathProperties = new SvgPathProperties(harmonographPath);
	const pathLength = pathProperties.getTotalLength();

	let styleElement = null;
	if (Object.keys(animatePath).length === 0) {
		const animationSettings = {
			duration: '15000ms',
			easing: 'linear',
			...animatePath
		};

		styleElement = 	h('style', null, `path{stroke-dasharray:${pathLength};stroke-dashoffset:${pathLength};animation:go ${animationSettings.duration} ${animationSettings.easing};}@keyframes go{from{stroke-dashoffset:${pathLength}}to{stroke-dashoffset:0;}}`);
	}

	// // Create the svg element
	const svg = h('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: `0 0 ${size} ${size}`,
		backgroundColor
	},
	styleElement,
	h('path', {
		stroke: strokeColor,
		'stroke-width': strokeWidth,
		fill: 'none',
		d: harmonographPath
	}));

	const svgHTML = render(svg);

	// Send the svg element
	return svgHTML;
};

module.exports = generateHarmonographSVG;
module.exports.randomPendulums = randomPendulums;
module.exports.harmonographBezierPath = harmonographBezierPath;
