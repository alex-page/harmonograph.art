import getPendulums from '.';

describe('getPendulums', () => {
	test('getPendulums without value', () => {
		const context = getPendulums();
		expect(Object.keys(context).length).toBe(4);
	});

	test('getPendulums with value', () => {
		const context = getPendulums('1+2+3+4+5+6+7+8+9+10+11+12+13+14+15+16');
		expect(context).toStrictEqual([{
			amplitude: 1,
			damping: 4,
			frequency: 2,
			phase: 3,
		},
		{
			amplitude: 5,
			damping: 8,
			frequency: 6,
			phase: 7,
		},
		{
			amplitude: 9,
			damping: 12,
			frequency: 10,
			phase: 11,
		},
		{
			amplitude: 13,
			damping: 16,
			frequency: 14,
			phase: 15,
		}]);
	});
});
