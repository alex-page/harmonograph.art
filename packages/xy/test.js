// Local dependencies
const test = require('ava');
const generateHarmonographXY = require('.');
const {adjustXY} = require('.');

test('Changes negative XY values to start from zero', t => {
	const originalPoints = {x: [-50, 0, 150], y: [-100, 0, 100]};
	const adjustedPoints = {x: [50, 100, 250], y: [0, 100, 200]};

	t.deepEqual(adjustXY(originalPoints, 250), adjustedPoints);
});

test('Changes positive XY values to start from zero', t => {
	const originalPoints = {x: [50, 100, 150], y: [100, 150, 200]};
	const adjustedPoints = {x: [0, 50, 100], y: [50, 100, 150]};

	t.deepEqual(adjustXY(originalPoints, 150), adjustedPoints);
});

test('XY adjustment fits into maximum size starting from zero', t => {
	const originalPoints = {x: [-50, 0, 100], y: [-100, 0, 100]};
	const adjustedPoints = {x: [25, 50, 100], y: [0, 50, 100]};

	t.deepEqual(adjustXY(originalPoints, 100), adjustedPoints);
});

test('harmongraph: should return an SVG', t => {
	const pendulumns = [{
		amplitude: 200, frequency: 2.985, phase: 2.054, damping: 0.001
	}, {
		amplitude: 200, frequency: 3.006, phase: 1.82, damping: 0.008
	}, {
		amplitude: 200, frequency: 3.003, phase: 2.283, damping: 0.001
	}, {
		amplitude: 200, frequency: 1.994, phase: 1.155, damping: 0.001
	}];

	t.deepEqual(generateHarmonographXY(1, 200, pendulumns), {
		x: [
			200, 198.476, 196.839, 195.09, 193.232, 191.266, 189.194, 187.017, 184.737, 182.357, 179.879, 177.305, 174.637, 171.877, 169.029, 166.094, 163.076, 159.977, 156.8, 153.547, 150.222, 146.827, 143.367, 139.843, 136.258, 132.618, 128.923, 125.178, 121.387, 117.551, 113.676, 109.764, 105.82, 101.845, 97.845, 93.823, 89.781, 85.725, 81.657, 77.581, 73.501, 69.421, 65.344, 61.273, 57.214, 53.168, 49.14, 45.133, 41.152, 37.198, 33.277, 29.392, 25.546, 21.742, 17.984, 14.275, 10.619, 7.019, 3.479, 0
		],
		y: [
			187.441, 186.61, 185.707, 184.736, 183.695, 182.587, 181.413, 180.174, 178.871, 177.506, 176.08, 174.595, 173.052, 171.452, 169.797, 168.09, 166.33, 164.521, 162.663, 160.759, 158.809, 156.817, 154.784, 152.711, 150.601, 148.454, 146.274, 144.063, 141.821, 139.551, 137.255, 134.934, 132.592, 130.229, 127.848, 125.451, 123.039, 120.615, 118.181, 115.738, 113.289, 110.835, 108.379, 105.922, 103.467, 101.015, 98.568, 96.128, 93.696, 91.276, 88.868, 86.475, 84.097, 81.738, 79.398, 77.079, 74.783, 72.512, 70.267, 68.049
		]
	});
});

test('harmongraph: should return nothing when duration zero', t => {
	const pendulumns = [{
		amplitude: 200, frequency: 3.992, phase: 2.768, damping: 0.003
	}, {
		amplitude: 200, frequency: 1.983, phase: 1.697, damping: 0.004
	}, {
		amplitude: 200, frequency: 2.988, phase: 1.268, damping: 0.003
	}, {
		amplitude: 200, frequency: 2.989, phase: 0.318, damping: 0.002
	}];

	t.deepEqual(generateHarmonographXY(0, 200, pendulumns), {
		x: [],
		y: []
	});
});
