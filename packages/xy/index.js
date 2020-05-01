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
 * Move XY points to start at 0, 0 and make sure they fit in the size
 *
 * @param {object} points - The x and y coordinates
 * @param {number} size   - The size of the harmonograph
 *
 * @return {object}       - The new x and y coordinates
 */
const adjustXY = (points, size) => {
	const {x, y} = points;
	const minValue = Math.min(...x, ...y);

	const xStartingFromZero = x.map(xValue => xValue + (minValue * -1));
	const yStartingFromZero = y.map(yValue => yValue + (minValue * -1));

	const maxValue = Math.max(...xStartingFromZero, ...yStartingFromZero);
	const scale = size / maxValue;

	const adjustedX = xStartingFromZero.map(xValue => round(xValue * scale));
	const adjustedY = yStartingFromZero.map(yValue => round(yValue * scale));

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
const randomPendulums = () => {
	const generatePendulum = () => ({
		amplitude: 200,
		frequency: round(randomNumber(4, 2, true) + randomNumber(0.02, -0.02)),
		phase: round(randomNumber(0, Math.PI)),
		damping: round(randomNumber(0, 0.01))
	});

	return [
		generatePendulum(),
		generatePendulum(),
		generatePendulum(),
		generatePendulum()
	];
};

/**
 * Draw all the XY points on the harmonograph
 *
 * @param {number} drawingTime - Total time the pendulums swing
 * @param {number} size        - The size of the pendulum
 * @param {object} pendulums    - The pendulum settings, see randomPendulum
 *
 * @returns {object}           - The x and y points
 */
const generateHarmonographXY = (drawingTime, size, pendulums = randomPendulums()) => {
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
		const movement = pendulums.map(p => {
			return p.amplitude * Math.sin((p.frequency * time) + p.phase) * Math.exp(-p.damping * time);
		});

		// Apply the movement to x and y coordinates
		const x = movement[0] + movement[1];
		const y = movement[2] + movement[3];

		harmonograph.x.push((x + size) / 2);
		harmonograph.y.push((y + size) / 2);

		time += timeIncrement;
	}

	const adjustedPoints = adjustXY(harmonograph, size);
	return adjustedPoints;
};

module.exports = generateHarmonographXY;
module.exports.randomPendulums = randomPendulums;
module.exports.adjustXY = adjustXY;
