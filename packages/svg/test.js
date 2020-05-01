// Local dependencies
const test = require('ava');
const generateHarmonographSVG = require('.');

test('harmongraph: should return a consistent SVG', t => {
	t.is(generateHarmonographSVG({
		pendulumTime: 10,
		size: 500,
		strokeWidth: 2,
		strokeColor: '#000',
		backgroundColor: 'red',
		pendulums: [{
			amplitude: 200, frequency: 2.985, phase: 2.054, damping: 0.001
		},
		{
			amplitude: 200, frequency: 3.006, phase: 1.82, damping: 0.008
		},
		{
			amplitude: 200, frequency: 3.003, phase: 2.283, damping: 0.001
		},
		{
			amplitude: 200, frequency: 1.994, phase: 1.155, damping: 0.001
		}]
	}), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" backgroundColor="red"><path stroke="#000" stroke-width="2" fill="none" d="M 485.049 461.945 C 461.682 449.195, 298.015 354.214, 178.34 280.606 S -20.693 151.495, 6.749 143.845 164.232 172.513, 287.49 205.288 508.733 259.642, 499.308 250.542 374.535 205.158, 250.335 187.733 11.717 179.352, 3.05 225.26 92.674 350.303, 215.166 400.095 465.957 461.4, 492.424 411.458 439.625 252.877, 321.433 158.335 63.877 -6.171, 20.31 0.471 35.416 89.992, 146.816 190.484"></path></svg>');
});

test('harmongraph: add animation style', t => {
	t.is(generateHarmonographSVG({
		pendulumTime: 10,
		animatePath: {
			duration: '2000ms',
			bezierCurve: 'ease-in-out'
		},
		pendulums: [{
			amplitude: 200, frequency: 2.985, phase: 2.054, damping: 0.001
		},
		{
			amplitude: 200, frequency: 3.006, phase: 1.82, damping: 0.008
		},
		{
			amplitude: 200, frequency: 3.003, phase: 2.283, damping: 0.001
		},
		{
			amplitude: 200, frequency: 1.994, phase: 1.155, damping: 0.001
		}]
	}), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" backgroundColor="transparent"><style>path{stroke-dasharray:4356.1940753609;stroke-dashoffset:4356.1940753609;animation:go 2000ms ease-in-out;}@keyframes go{from{stroke-dashoffset:4356.1940753609}to{stroke-dashoffset:0;}}</style><path stroke="#000" stroke-width="1" fill="none" d="M 679.068 646.723 C 646.36 628.881, 417.218 495.899, 249.676 392.849 S -28.969 212.083, 9.448 201.383 229.928 241.52, 402.486 287.403 712.231 363.501, 699.031 350.759 524.344 287.226, 350.469 262.826 16.412 251.089, 4.27 315.364 129.74 490.425, 301.232 560.133 652.343 645.958, 689.393 576.041 615.481 354.027, 450.006 221.669 89.434 -8.64, 28.434 0.66 49.576 125.994, 205.543 266.677"></path></svg>');
});

test('harmongraph: does not render path', t => {
	t.is(generateHarmonographSVG({
		pendulumTime: 10,
		animatePath: true,
		pendulums: [{
			amplitude: 200, frequency: 3.992, phase: 2.768, damping: 0.003
		}, {
			amplitude: 200, frequency: 1.983, phase: 1.697, damping: 0.004
		}, {
			amplitude: 200, frequency: 2.988, phase: 1.268, damping: 0.003
		}, {
			amplitude: 200, frequency: 2.989, phase: 0.318, damping: 0.002
		}]
	}), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" backgroundColor="transparent"><style>path{stroke-dasharray:4356.1940753609;stroke-dashoffset:4356.1940753609;animation:go 2000ms ease-in-out;}@keyframes go{from{stroke-dashoffset:4356.1940753609}to{stroke-dashoffset:0;}}</style><path stroke="#000" stroke-width="1" fill="none" d="M 679.068 646.723 C 646.36 628.881, 417.218 495.899, 249.676 392.849 S -28.969 212.083, 9.448 201.383 229.928 241.52, 402.486 287.403 712.231 363.501, 699.031 350.759 524.344 287.226, 350.469 262.826 16.412 251.089, 4.27 315.364 129.74 490.425, 301.232 560.133 652.343 645.958, 689.393 576.041 615.481 354.027, 450.006 221.669 89.434 -8.64, 28.434 0.66 49.576 125.994, 205.543 266.677"></path></svg>');
});
