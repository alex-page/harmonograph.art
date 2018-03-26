/***************************************************************************************************************************************************************
 *
 * index.js -
 *
 * FunctionName()
 *
 **************************************************************************************************************************************************************/


'use strict';


const GenerateRandomInteger = ( min, max ) => {
  return min + Math.random() * ( max + 1 - min );
}

const SETTINGS = {
	speed: 1,
	line: {
		width: 0.2,
		color: '#fff'
	},
	pendulum: [{
		amplitude: GenerateRandomInteger( 0, 360 ),
		frequency: ( 2 + Math.random() / 40 ) % 10,
		phase: GenerateRandomInteger( 0, 1.5 ) % ( Math.PI * 2 ),
		damping: 0.02,
	},
	{
		amplitude: GenerateRandomInteger( 0, 360 ),
		frequency: ( 2 + Math.random() / 40 ) % 10,
		phase: GenerateRandomInteger( 0, 1.5 ) % ( Math.PI * 2 ),
		damping: 0.0315,
	},
	{
		amplitude: GenerateRandomInteger( 0, 360 ),
		frequency: ( 2 + Math.random() / 40 ) % 10,
		phase: GenerateRandomInteger( 0, 1.5 ) % ( Math.PI * 2 ),
		damping: 0.02,
	},
	{
		amplitude: GenerateRandomInteger( 0, 360 ),
		frequency: ( 2 + Math.random() / 40 ) % 10,
		phase: GenerateRandomInteger( 0, 1.5 ) % ( Math.PI * 2 ),
		damping: 0.02,
	}]
};


/**
 * Harmonograph
 *
 * @param  {object}  element  - The canvas element to have the harmonograph drawn inside
 * @param  {object}  settings - The settings that contains url and width
 */
const Harmonograph = ( element, settings = SETTINGS ) => {
	if( element.getContext ) {
		let context  = element.getContext( '2d' );

		// Clear the canvas
		context.clearRect( 0, 0, element.width, element.height );
		context.save();

		// Apply settings to canvas
		context.beginPath();
		// context.moveTo( element.width / 2, element.height / 2 )
		context.lineWidth   = settings.line.width;
		context.strokeStyle = settings.line.color;

		// As time goes by
		// DrawHarmonograph( element, context, settings );
		for ( let time = 0; time < 100; time += 0.01 ) {
			// Calculate movement of each pendulum
			const movement = settings.pendulum.map( p => {
				return p.amplitude * Math.sin( p.frequency * time + Math.PI * p.phase ) * Math.exp( -p.damping * time );
			})

			// Apply the movement to x and y coordinates
			const x = movement[ 0 ] + movement[ 1 ];
			const y = movement[ 2 ] + movement[ 3 ];

			context.lineTo( x + element.width / 2, y + element.height / 2 );
			time += 0.01;
		}

		context.stroke();
		context.restore();

	}
	else {
		element.innerHtml( 'Harmonograph not supported in this browser.' );
		console.error( 'Harmonograph not supported in this browser.' );
	}
}

/**
 * The harmonograph movements can be described matematically with the following equations
 * https://web.archive.org/web/20100904003022/http://hernan.amiune.com/labs/harmonograph/animated-harmonograph.html
 *
 * x = A1 * sin( f1 * t + p1 ) * exp( -d1 * t ) + A2 * sin( f2 * t + p2 ) * exp( -d2 * t )
 * y = A3 * sin( f3 * t + p3 ) * exp( -d3 * t ) + A4 * sin( f4 * t + p4 ) * exp( -d4 * t )
 *
 * in which f represents frequency, p represent phase, A represent amplitude, d represents damping and t represents time.
 *
 * @param {*} settings
 */

const DrawHarmonograph = ( element, context, settings, time = 0 ) => {

	// if ( time >= 100 ) {
	// 	return
	// }

	// // Calculate movement of each pendulum
	// const movement = settings.pendulum.map( p => {
	// 	return p.amplitude * Math.sin( p.frequency * time + Math.PI * p.phase ) * Math.exp( -p.damping * time );
	// })

	// // Apply the movement to x and y coordinates
	// const x = movement[ 0 ] + movement[ 1 ];
	// const y = movement[ 2 ] + movement[ 3 ];

	// context.lineTo( x + element.width / 2, y + element.height / 2 );
	// time += 0.01;

	// window.requestAnimationFrame( DrawHarmonograph( element, context, settings, time ) );
}
