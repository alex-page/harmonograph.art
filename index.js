/***************************************************************************************************************************************************************
 *
 * index.js -
 *
 * FunctionName()
 *
 **************************************************************************************************************************************************************/


'use strict';


const SETTINGS = {
	distanceBetweenPendulums: 900,
	paperCenter: 800,
	lengthOfPenArm: 700,
	paperRadius: 300,
	leftPendulumAmplitude: 100,
	rightPendulumAmplitude: 100,
	leftPendulumPhase: 0,
	rightPendulumPhase: 0,
	leftPendulumDamping: 0.001,
	rightPendulumDamping: 0.001,
	leftPendulumFrequency: 0.3,
	rightPendulumFrequency: 0.302,
	paperRotationFrequency: 0.0008,
	speed: 1,
	lineWidth: 2,
	lineColor: '#fff',
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

		// Apply settings to canvas
		context.lineWidth   = settings.lineWidth;
		context.strokeStyle = settings.lineColor;

		const vertices = GenerateHarmonograph( settings );
		DrawHarmonograph( vertices, context, settings );

	}
	else {
		element.innerHtml( 'Harmonograph not supported in this browser.' );
		console.error( 'Harmonograph not supported in this browser.' );
	}
}


/**
 * DrawHarmonograph()
 *
 */
const DrawHarmonograph = ( vertices, context, settings ) => {
	context.beginPath();
	context.moveTo( vertices[ 0 ].x, vertices[ 0 ].y );

	vertices.map(( { x, y  }) => {
		context.lineTo( x, y );
	});

	context.stroke();
}

/**
 * The harmonograph movements can be described matematically with the following equations
 *
 * x = A1 * sin( f1 * t + p1 ) * exp( -d1 * t ) + A2 * sin( f2 * t + p2 ) * exp( -d2 * t )
 * y = A3 * sin( f3 * t + p3 ) * exp( -d3 * t ) + A4 * sin( f4 * t + p4 ) * exp( -d4 * t )
 *
 * in which f represents frequency, p represent phase, A represent amplitude, d represents damping and t represents time.
 *
 * @param {*} settings
 */
const GenerateHarmonograph = ( settings ) => {
	return [
		{
			x: 0,
			y: 0,
		},
		{
			x: 300,
			y: 100
		},
		{
			x: 80,
			y: 200
		},
		{
			x: 10,
			y: 100
		},
		{
			x: 0,
			y: 0
		}
	];
}

// Amplitude = Amplitude / 180 * Math.PI
