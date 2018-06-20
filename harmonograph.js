/***************************************************************************************************************************************************************
 *
 * index.js - Draw beautiful randomised lissajous curves in the browser
 *
 * RandomNumber     - Get a random number inside a maximum and minimum value
 * RandomPendulum   - Create a randomised pendulum swing
 * DrawHarmonograph - Draw each of the points on a frame
 * Harmonograph     - Create the canvas, harmonograph points and start draw
 *
 **************************************************************************************************************************************************************/


// 'use strict';


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


/**
 * DrawHarmonograph - Draw each of the points on a frame
 *
 * @param {object} context      - The HTML5 canvas to draw onto
 * @param {array}  harmonograph - The points of the harmonograph
 * @param {number} width        - The width of the line
 * @param {string} color        - The color of the harmonograph
 * @param {number} totalFrames  - The total frames
 */
function DrawHarmonograph( context, harmonograph, width, color, totalFrames ){
	var totalFrames = totalFrames ? totalFrames : 0;

	// Check if we should stop drawing the harmonograph
	if( harmonograph[ totalFrames ] === undefined ) {
		cancelAnimationFrame( DrawHarmonograph );
		return;
	}

	// Line settings for stroke
	context.lineWidth             = width;
	context.strokeStyle           = color;

	// Draw a connected line at the next x and y point
	var xc = ( harmonograph[ totalFrames ].x + harmonograph[ totalFrames + 1 ].x ) / 2;
	var yc = ( harmonograph[ totalFrames ].y + harmonograph[ totalFrames + 1].y ) / 2;
	context.quadraticCurveTo( harmonograph[ totalFrames ].x, harmonograph[ totalFrames ].y, xc, yc );
	context.stroke();

	totalFrames += 1;

	// Draw the next point on the next frame
	requestAnimationFrame( function() {
		return DrawHarmonograph( context, harmonograph, width, color, totalFrames );
	});
}


/**
 * Harmonograph - Draw a harmonograph to html5 canvas
 *
 * Resources:
 * - https://en.wikipedia.org/wiki/Harmonograph
 * - https://aschinchon.wordpress.com/2014/10/13/beautiful-curves-the-harmonograph/
 *
 * @param  {object}  settings.element     - The canvas element to have the harmonograph drawn inside
 * @param  {number}  settings.speed       - The speed of the drawing
 * @param  {number}  settings.width       - The width of the line
 * @param  {number}  settings.color       - The color of the harmonograph
 * @param  {number}  settings.drawingTime - How long until drawing should stop
 * @param  {array}   settings.pendulum    - The pendulum settings, see RandomPendulum
 */
function Harmonograph( settings ) {

	// Check if it's possible to draw the harmonograph
	if( settings.element.getContext ) {

		// If the values don't exist set a default value
		var speed       = settings.speed       ? settings.speed       : 10;
		var width       = settings.width       ? settings.width       : 0.05;
		var color       = settings.color       ? settings.color       : '#000';
		var drawingTime = settings.drawingTime ? settings.drawingTime : 150;
		var pendulum    = settings.pendulum    ? settings.pendulum : [
			RandomPendulum(),
			RandomPendulum(),
			RandomPendulum(),
			RandomPendulum(),
		];

		// Set global variables
		var element       = settings.element; // The html5 canvas element
		var timeIncrement = speed * 0.001;    // The time increment for the algorithm
		var time          = 0;
		var i             = 0;
		var harmonograph  = [];

		// For each frame calculate it's location
		while( i < drawingTime * 60 ) {
			i++;

			// Calculate the pendulum movement
			var movement = pendulum.map( function( p ) {
				return p.amplitude * Math.sin( p.frequency * time + p.phase ) * Math.exp( -p.damping * time );
			})

			// Apply the movement to x and y coordinates
			var x = movement[ 0 ] + movement[ 1 ];
			var y = movement[ 2 ] + movement[ 3 ];

			harmonograph.push({
				x: x + element.width / 2,
				y: y + element.height / 2,
			});

			time += timeIncrement;
		}

		// Prepare the canvas for drawing
		var context = element.getContext( '2d' );
		context.clearRect( 0, 0, element.width, element.height );
		context.save();

		// Start the context
		context.restore();
		context.beginPath();
		context.stroke();

		// Start drawing on the next frame
		requestAnimationFrame( function() {
			return DrawHarmonograph( context, harmonograph, width, color );
		});
	}

	// Harmonograph uses context and is not supported in some browsers
	else {
		element.innerHtml( 'Harmonograph not supported in this browser.' );
		console.error( 'Harmonograph not supported in this browser.' );
	}
}
