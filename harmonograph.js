/***************************************************************************************************************************************************************
 *
 * index.js - Draw beautiful randomised lissajous curves in the browser
 *
 * RandomNumber     - Get a random number inside a maximum and minimum value
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


function round( x ) {
	return Math.round(x * 1000) / 1000;
}



function PathToBezier( harmonograph ){
	var bezierHarmonograph = {
		x: [],
		y: [],
		controlPointX: [],
		controlPointY: [],
	};

	var factor = 0.5 * step / 3;
	var totalPoints = harmonograph.x.length;
	var step = 50;

	// Reduce the points by steps of 50 and create controlPoints
	for ( var i = 0; i < totalPoints; i += step ) {
		bezierHarmonograph.x.push( round( harmonograph.x[ i ] ) );
		bezierHarmonograph.y.push( round( harmonograph.y[ i ] ) );

		var prev = i < 0 ? 0 : i - 1;
		var next = i > totalPoints ? totalPoints - 1 : i + 1;

		bezierHarmonograph.controlPointX.push(
			factor * ( harmonograph.x[ next ] - harmonograph.x[ prev ] )
		);
		bezierHarmonograph.controlPointY.push(
			factor * ( harmonograph.y[ next ] - harmonograph.y[ prev ] )
		);
	}
}


function PathToBezier( harmonographPath ) {

	var bezierHarmonograph = PathToBezier( harmonographPath );

	var data = 'M ';
	data += bezierHarmonograph.x[0] + ' ' + bezierHarmonograph.y[0];
	data += 'C ';
	data += round(bezierHarmonograph.x[ 0 ] + bezierHarmonograph.controlPointX[ 0 ]);
	data += ' ';
	data += round(bezierHarmonograph.y[ 0 ] + bezierHarmonograph.controlPointY[ 0 ]);
	data += ', ';
	data += round(bezierHarmonograph.x[ 1 ] - bezierHarmonograph.controlPointX[ 1 ]);
	data += ' ';
	data += round(bezierHarmonograph.y[ 1 ] - bezierHarmonograph.controlPointY[ 1 ]);
	data += ', ';
	data += bezierHarmonograph.x[ 1 ], bezierHarmonograph.y[ 1 ];

	var totalCurvedPoints = bezierHarmonograph.x.length;
	if (totalCurvedPoints > 2) {
		data += 'S ';
		for ( var i = 2; i < totalCurvedPoints; i++ ) {
			data += round( bezierHarmonograph.x[ i ] - bezierHarmonograph.controlPointX[ i ] );
			data += round( bezierHarmonograph.y[ i ] - bezierHarmonograph.controlPointY[ i ]);
			data += ', ';
			data += round( bezierHarmonograph.x[ i ] );
			data += round( bezierHarmonograph.y[ i ] );
		}
	}

	return data;

	console.log( data );
}


/**
 * Harmonograph - Draw the harmonograph to svg
 *
 * Resources:
 * - https://en.wikipedia.org/wiki/Harmonograph
 * - https://aschinchon.wordpress.com/2014/10/13/beautiful-curves-the-harmonograph/
 *
 * @param  {number}  settings.size        - The size of the svg
 * @param  {number}  settings.strokeWidth - The width of the line
 * @param  {number}  settings.strokeColor - The color of the harmonograph
 * @param  {number}  settings.drawingTime - How long the pendulum swings
 * @param  {array}   settings.pendulum    - The pendulum settings, see RandomPendulum
 */
function Harmonograph( settings ) {
	// If the values don't exist set a default value
	var size         = settings.size ? settings.size : 700;
	var strokeWidth  = settings.strokewidth ? settings.strokewidth : 1;
	var strokeColor  = settings.strokeColor ? settings.strokeColor : '#000';
	var drawingTime  = settings.drawingTime ? settings.drawingTime : 150;
	var pendulum     = settings.pendulum    ? settings.pendulum : [
		RandomPendulum(),
		RandomPendulum(),
		RandomPendulum(),
		RandomPendulum(),
	];

	// For each frame calculate it's location
	var i = 0;
	var time = 0;
	var timeIncrement = 0.01;
	var harmonograph  = { x: [], y: [] };

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

	var harmonographBezier = PathToBezier( harmonograph );
	var harmonographPath = GenerateBezierSVG( harmonographBezier );


	var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ size }" height="${ size }" viewbox="0 0 ${ size } ${ size }"><path stroke="${ strokeColor }" stroke-width="${ strokeWidth }" fill="none" d="${ harmonographPath }"></path></svg>`;
	console.log( svg );

	return svg;
}
