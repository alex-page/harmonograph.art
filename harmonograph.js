/***************************************************************************************************************************************************************
 *
 * index.js - Draw beautiful randomised lissajous curves in the browser
 *
 * RandomNumber   - Get a random number inside a maximum and minimum value
 * RandomPendulum - Create a randomised pendulum swing
 * Harmonograph   - Draw a harmonograph to html5 canvas
 *
 **************************************************************************************************************************************************************/


'use strict';


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
 * Harmonograph - Draw a harmonograph to html5 canvas
 *
 * Resources:
 * - https://en.wikipedia.org/wiki/Harmonograph
 * - https://aschinchon.wordpress.com/2014/10/13/beautiful-curves-the-harmonograph/
 *
 * @param  {object}  settings.element     - The canvas element to have the harmonograph drawn inside
 * @param  {number}  settings.speed       - The speed of the drawing
 * @param  {number}  settings.color       - The color of the harmonograph
 * @param  {number}  settings.drawingTime - How long until drawing should stop
 * @param  {array}   settings.pendulum    - The pendulum settings, see RandomPendulum
 */
function Harmonograph( settings ) {

	// Check if it's possible to draw the harmonograph
	if( settings.element.getContext ) {

		// If the values don't exist set a default value
		var speed       = settings.speed       ? settings.speed       : 10;
		var width       = settings.width       ? settings.width       : 0.1;
		var color       = settings.color       ? settings.color       : '#000';
		var drawingTime = settings.drawingTime ? settings.drawingTime : 150;
		var pendulum    = settings.pendulum    ? settings.pendulum : [
			RandomPendulum(),
			RandomPendulum(),
			RandomPendulum(),
			RandomPendulum(),
		];

		// Set global variables
		var element       = settings.element;     // The html5 canvas element
		var time          = 0;                    // Time used in the calculation of XY coordinate
		var startTime     = new Date().getTime(); // The total time for drawing
		var drawFrame     = 0.001;                // How often an XY coordinate is drawn
		var timeIncrement = speed * drawFrame;    // The speed the XY coordinates are drawn

		// Prepare the canvas for drawing
		var context = element.getContext( '2d' );
		context.clearRect( 0, 0, element.width, element.height );
		context.save();

		// Start the context
		context.restore();
		context.beginPath();
		context.stroke();

		// Draw a new x and y value based off the speed
		var drawHarmonograph = setInterval( function() {

			// Line settings for stroke
			context.imageSmoothingEnabled = true;
			context.lineWidth             = width;
			context.strokeStyle           = color;

			// Calculate the pendulum movement
			var movement = pendulum.map( function( p ) {
				return p.amplitude * Math.sin( p.frequency * time + p.phase ) * Math.exp( -p.damping * time );
			})

			// Apply the movement to x and y coordinates
			var x = movement[ 0 ] + movement[ 1 ];
			var y = movement[ 2 ] + movement[ 3 ];

			// Draw a connected line at the next x and y point
			context.lineTo( x + element.width / 2, y + element.height / 2 );
			context.stroke();

			// Increase the time and total drawing time
			time += timeIncrement;

			// Check if we should stop drawing the harmonograph
			if( new Date().getTime() - startTime >= drawingTime * 1000 ) {
				clearInterval( drawHarmonograph );
			}
		}, drawFrame );
	}

	// Harmonograph uses context and is not supported in some browsers
	else {
		element.innerHtml( 'Harmonograph not supported in this browser.' );
		console.error( 'Harmonograph not supported in this browser.' );
	}
}
