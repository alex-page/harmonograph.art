import getColor from '.';

describe('getColor', () => {
	test('getColor without value', () => {
		const context = getColor();
		expect(context.length).toBe(7);
		expect(context.includes('#')).toBe(true);
	});

	test('getColor with value', () => {
		const context = getColor('000');
		expect(context).toBe('#000');
	});
});
