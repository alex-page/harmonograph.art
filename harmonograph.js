/***************************************************************************************************************************************************************
 *
 * index.js - Draw beautiful randomised lissajous curves in the browser
 *
 * RandomNumber     - Get a random number inside a maximum and minimum value
 * Round            - Rounds a number to three decimal places
 * RandomPendulum   - Create a randomised pendulum swing
 * Harmonograph     - Create the svg, harmonograph points and start draw
 *
 **************************************************************************************************************************************************************/


/**
 * RandomNumber - Get a random number inside a maximum and minimum value
 *
 * @param  {number}  max   - The maximum value
 * @param  {number}  min   - The minimum value
 * @param  {boolean} round - If the number should be rounded
 *
 * @return {number}        - The randomised number
 */
function RandomNumber( max, min, round ) {
	min   = min   ? min   : 0;
	round = round ? round : false;

	if ( round ){
		return Math.floor( Math.random() * ( max - min ) + min );
	}

	return Math.random() * ( max - min ) + min ;
}


/**
 * Round - Rounds a number to three decimal places
 *
 * @param   {number} numberToRound - The number to round
 * 
 * @returns {number}               - The rounded number
 */
function Round( numberToRound ) {
	return Math.round( numberToRound * 1000 ) / 1000;
}


/**
 * GetViewbox - Renders the svg and gets the viewbox dimensions
 *
 * @param   {node} svg - The SVG element to be sent back to the user
 * 
 * @returns {string}   - The viewbox numbers
 */
function GetViewbox( svg ){
	// Hide the svg from the user
	svg.style.position = 'absolute';
	svg.style.width = '1px';
	svg.style.height = '1px';
	svg.style.padding = '0';
	svg.style.margin = '-1px';
	svg.style.overflow = 'hidden';
	svg.style.clip = 'rect(0,0,0,0)';
	svg.style.border = '0';

	// Add the hidden SVG
	document.body.appendChild( svg );

	// Get the bounding box
	var bbox = svg.getBBox();
	
	// Now we have the bounding we can remove the element
	svg.removeAttribute( 'style' );
	svg.remove();

	return bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height;
}


/**
 * RandomPendulum - Create a randomised pendulum swing
 *
 * Resources:
 * - http://www.worldtreesoftware.com/harmonograph-intro.html
 *
 * @return {number} settings.amplitude  - How far a pendulum swings back and forth
 * @return {number} settings.frequency  - How fast a pendulum swings back and forth
 * @return {number} settings.phase      - The rate that a pendulum loses its energy, or slows down
 * @return {number} settings.damping    - The offset from the normal starting position of a pendulum
 */
function RandomPendulum() {
	return {
		amplitude: 200,
		frequency: RandomNumber( 4, 2, true ) + RandomNumber( 0.02, -0.02 ),
		phase:     RandomNumber( 0, Math.PI ),
		damping:   RandomNumber( 0, 0.01 ),
	}
}


/**
 * HarmonographBezierPath - Reduce number of XY points by creating bezier curves
 *
 * @param   {object} xyPoints - The X and Y points of the Harmonograph
 * 
 * @returns {string}          - The SVG path data as a string
 */
function HarmonographBezierPath( xyPoints ){
	var harmonograph = {
		x: [],
		y: [],
		cpX: [], // Control point X`
		cpY: [], // Control point Y
	};

	var step   = 50;
	var factor = 0.5 * step / 3;
	var totalPoints = xyPoints.x.length;

	// Reduce the points by steps of 50 and create controlPoints
	for ( var i = 0; i < totalPoints; i += step ) {
		harmonograph.x.push( Round( xyPoints.x[ i ] ) );
		harmonograph.y.push( Round( xyPoints.y[ i ] ) );

		// Get the control points for the stepped values
		var prev = i <= 0 ? 0 : i - 1;
		var next = i >= totalPoints ? totalPoints - 1 : i + 1;

		var controlPointX = factor * ( xyPoints.x[ next ] - xyPoints.x[ prev ] );
		var controlPointY = factor * ( xyPoints.y[ next ] - xyPoints.y[ prev ] );

		harmonograph.cpX.push( controlPointX );
		harmonograph.cpY.push( controlPointY );
	}

	// Create the SVG data path
	var svg = [
		'M',
		harmonograph.x[ 0 ],
		harmonograph.y[ 0 ],
		'C',
		Round( harmonograph.x[ 0 ] + harmonograph.cpX[ 0 ] ),
		Round( harmonograph.y[ 0 ] + harmonograph.cpY[ 0 ] ) + ',',
		Round( harmonograph.x[ 1 ] - harmonograph.cpX[ 1 ] ),
		Round( harmonograph.y[ 1 ] - harmonograph.cpY[ 1 ] ) + ',',
		harmonograph.x[ 1 ], harmonograph.y[ 1 ],
	];

	// Create the curves
	var totalCurvedPoints = harmonograph.x.length;
	if( totalCurvedPoints > 2 ) {
		svg.push ( 'S' );

		for ( var i = 2; i < totalCurvedPoints; i++ ) {
			svg.push( Round( harmonograph.x[ i ] - harmonograph.cpX[ i ] ) );
			svg.push( Round( harmonograph.y[ i ] - harmonograph.cpY[ i ] ) + ',' );
			svg.push( Round( harmonograph.x[ i ] ) );
			svg.push( Round( harmonograph.y[ i ] ) );
		}
	}

	// Turn the Array into the SVG string
	var svgData = svg.join( ' ' );

	// Send back the svg data
	return svgData;
}


/**
 * GenerateHarmonograph - Draw all the XY points on the harmonograph
 *
 * @param {number} drawingTime - Total time the pendulums swing
 * @param {number} size        - The pendulum settings, see RandomPendulum
 * @param {object} pendulum    - The pendulum settings, see RandomPendulum
 *
 * @returns {object}           - The x and y points
 */
function GenerateHarmonograph( drawingTime, size, pendulum ) {
	var i             = 0;
	var time          = 0;
	var timeIncrement = 0.01;
	var harmonograph  = { x: [], y: [] };

	// Iterate and draw the harmonograph
	while( i < drawingTime * 60 ) {
		i++;

		// Calculate the pendulum movement
		var movement = pendulum.map( function( p ) {
			return p.amplitude * Math.sin( p.frequency * time + p.phase ) * Math.exp( -p.damping * time );
		});

		// Apply the movement to x and y coordinates
		var x = movement[ 0 ] + movement[ 1 ];
		var y = movement[ 2 ] + movement[ 3 ];

		harmonograph.x.push( x + size / 2 );
		harmonograph.y.push( y + size / 2 );

		time += timeIncrement;
	}

	return harmonograph;
}


/**
 * Harmonograph - Draw the harmonograph to svg
 *
 * Resources:
 * - https://en.wikipedia.org/wiki/Harmonograph
 * - https://aschinchon.wordpress.com/2014/10/13/beautiful-curves-the-harmonograph/
 *
 * @param  {number}  userSettings.size         - The size of the svg
 * @param  {number}  userSettings.strokeWidth  - The width of the line
 * @param  {number}  userSettings.strokeColor  - The color of the harmonograph
 * @param  {number}  userSettings.pendulumTime - How long the pendulum swings
 * @param  {array}   userSettings.pendulum     - The pendulum settings, see RandomPendulum
 * 
 * @returns {node}                             - The SVG node
 */
function Harmonograph( userSettings ) {

	// Create settings from user input or defaults
	var settings     = userSettings          ? userSettings          : {};
	var size         = settings.size         ? settings.size         : 700;
	var strokeWidth  = settings.strokewidth  ? settings.strokewidth  : 1;
	var strokeColor  = settings.strokeColor  ? settings.strokeColor  : '#000';
	var pendulumTime = settings.pendulumTime ? settings.pendulumTime : 150;
	var pendulum     = settings.pendulum     ? settings.pendulum     : [
		RandomPendulum(),
		RandomPendulum(),
		RandomPendulum(),
		RandomPendulum(),
	];

	// Create all of the XY points on the Harmonograph
	var harmonographPoints = GenerateHarmonograph( pendulumTime, size, pendulum );

	// Reduce the number of XY points by using bezier curves
	var harmonographPath = HarmonographBezierPath( harmonographPoints );

	// Create the svg element
	var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );

	// Apply the attributes
	svg.setAttribute( 'xlms', 'http://www.w3.org/2000/svg' );

	// Create the path
	var svgPath = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
	svgPath.setAttribute( 'd', harmonographPath );
	svgPath.setAttribute( 'stroke', strokeColor );
	svgPath.setAttribute( 'stroke-width', strokeWidth );
	svgPath.setAttribute( 'fill', 'none' );

	// Put the path in the SVG
	svg.appendChild( svgPath );

	// Get the viewbox of the SVG
	svg.setAttribute( 'viewBox', GetViewbox( svg ) );

	// Send the svg element
	return svg;
}
