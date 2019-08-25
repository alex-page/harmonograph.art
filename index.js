const {h} = require('preact');
const render = require('preact-render-to-string');

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
 * Get a random number inside a maximum and minimum value
 *
 * @param  {number}  max       - The maximum value
 * @param  {number}  min       - The minimum value
 * @param  {boolean} isRounded - If the number should be rounded
 *
 * @return {number}            - The randomised number
 */
const randomNumber = (max, min, isRounded) => {
	min = min ? min : 0;
	isRounded = isRounded ? isRounded : false;

	const randomNumber = Math.random() * (max - min);

	if (isRounded) {
		return round(randomNumber + min, 0);
	}

	return randomNumber + min;
};

/**
 * Adjust the points for the provided size
 *
 * @param {object} points - The x and y coordinates
 * @param {number} size   - The size of the harmonograph
 *
 * @return {object}       - The new x and y coordinates
 */
const adjustViewBox = (points, size) => {
	const {x, y} = points;
	const minX = Math.min(...x);
	const minY = Math.min(...y);

	const maxX = Math.max(...x) - minX;
	const maxY = Math.max(...y) - minY;

	const scale = maxX > maxY ? size / maxX : size / maxY;

	const adjustedX = x.map(xVal => round((xVal - minX) * scale));
	const adjustedY = y.map(yVal => round((yVal - minY) * scale));

	return {
		x: adjustedX,
		y: adjustedY
	};
};

/**
 * Create a randomised pendulum swing
 *
 * Resources:
 * - http://www.worldtreesoftware.com/harmonograph-intro.html
 *
 * @return {object} settings            - The settings for the pendulum
 * @return {number} settings.amplitude  - How far a pendulum swings back and forth
 * @return {number} settings.frequency  - How fast a pendulum swings back and forth
 * @return {number} settings.phase      - The rate that a pendulum loses its energy, or slows down
 * @return {number} settings.damping    - The offset from the normal starting position of a pendulum
 */
const randomPendulum = () => ({
	amplitude: 200,
	frequency: round(randomNumber(4, 2, true) + randomNumber(0.02, -0.02)),
	phase: round(randomNumber(0, Math.PI)),
	damping: round(randomNumber(0, 0.01))
});

/**
 * Reduce number of XY points by creating bezier curves
 *
 * @param   {object} xyPoints - The X and Y points of the Harmonograph
 *
 * @returns {string}          - The SVG path data as a string
 */
const harmonographBezierPath = ({x, y}) => {
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
		const prev = i <= 0 ? 0 : i - 1;
		const next = i >= totalPoints ? totalPoints - 1 : i + 1;

		const controlPointX = factor * (x[next] - x[prev]);
		const controlPointY = factor * (y[next] - y[prev]);

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
 * Draw all the XY points on the harmonograph
 *
 * @param {number} drawingTime - Total time the pendulums swing
 * @param {number} size        - The size of the pendulum
 * @param {object} pendulum    - The pendulum settings, see randomPendulum
 *
 * @returns {object}           - The x and y points
 */
const generateHarmonograph = (drawingTime, size, pendulum) => {
	let i = 0;
	let time = 0;
	const timeIncrement = 0.01;
	const harmonograph = {
		x: [],
		y: []
	};

	// Iterate and draw the harmonograph
	while (i < drawingTime * 60) {
		i++;

		// Calculate the pendulum movement
		const movement = pendulum.map(p => {
			return p.amplitude * Math.sin((p.frequency * time) + p.phase) * Math.exp(-p.damping * time);
		});

		// Apply the movement to x and y coordinates
		const x = movement[0] + movement[1];
		const y = movement[2] + movement[3];

		harmonograph.x.push((x + size) / 2);
		harmonograph.y.push((y + size) / 2);

		time += timeIncrement;
	}

	return harmonograph;
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
 * @param  {string}  userSettings.backgroundColor - Any additional styles
 * @param  {number}  userSettings.pendulumTime    - How long the pendulum swings
 * @param  {array}   userSettings.pendulum        - The pendulum settings, see randomPendulum
 *
 * @returns {string}                              - The SVG element
 */
module.exports = userSettings => {
	const {
		size,
		strokeWidth,
		strokeColor,
		backgroundColor,
		pendulumTime,
		pendulum
	} = {
		size: 700,
		strokeWidth: 1,
		strokeColor: '#000',
		backgroundColor: 'transparent',
		pendulumTime: 150,
		pendulum: [
			randomPendulum(),
			randomPendulum(),
			randomPendulum(),
			randomPendulum()
		],
		...userSettings
	};

	// Create all of the XY points on the Harmonograph
	const harmonographPoints = generateHarmonograph(pendulumTime, size, pendulum);

	// Adjust the points for the view box
	const adjustedPoints = adjustViewBox(harmonographPoints, size);

	// Reduce the number of XY points by using bezier curves
	const harmonographPath = harmonographBezierPath(adjustedPoints);

	// // Create the svg element
	const svg = h('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: `0 0 ${size} ${size}`,
		style: {
			backgroundColor
		}
	},
	h('path', {
		stroke: strokeColor,
		strokeWidth,
		fill: 'none',
		d: harmonographPath
	}));

	const svgHTML = render(svg);

	// Send the svg element
	return svgHTML;
};
