import {h} from 'preact';
import { render } from 'enzyme';

import HarmonographSvg from '.';

describe('backgroundColor', () => {
	test('backgroundColor', () => {
		const context = render(
			<HarmonographSvg
				backgroundColor="red"
				strokeColor="green"
				strokeWidth="1"
				strokeLength="1000"
				path="a a a"
				strokePercentage="30"
				isDrawing="false"
			/>
		);

		expect(context['0'].attribs.style).toBe('background-color: red;');
	});
});

describe('strokeColor', () => {
	test('strokeColor', () => {
		const context = render(
			<HarmonographSvg
				backgroundColor="red"
				strokeColor="green"
				strokeWidth="1"
				strokeLength="1000"
				path="a a a"
				strokePercentage="30"
				isDrawing="false"
			/>
		);

		expect(context['0'].children[0].attribs.stroke).toBe('green');
	});
});

describe('strokeWidth', () => {
	test('strokeWidth', () => {
		const context = render(
			<HarmonographSvg
				backgroundColor="red"
				strokeColor="green"
				strokeWidth="1"
				strokeLength="1000"
				path="a a a"
				strokePercentage="30"
				isDrawing="false"
			/>
		);

		expect(context['0'].children[0].attribs['stroke-width']).toBe('1');
	});
});

describe('path', () => {
	test('path', () => {
		const context = render(
			<HarmonographSvg
				backgroundColor="red"
				strokeColor="green"
				strokeWidth="1"
				strokeLength="1000"
				path="a a a"
				strokePercentage="30"
				isDrawing="false"
			/>
		);

		expect(context['0'].children[0].attribs.d).toBe('a a a');
	});
});

describe('strokePercentage', () => {
	test('strokePercentage', () => {
		const context = render(
			<HarmonographSvg
				backgroundColor="red"
				strokeColor="green"
				strokeWidth="1"
				strokeLength="1000"
				path="a a a"
				strokePercentage="30"
				isDrawing="false"
			/>
		);

		const contextStyle = context['0'].children[0].attribs.style;
		expect(contextStyle.includes('stroke-dashoffset: 500px;')).toBe(true);
	});
});

describe('isDrawing', () => {
	test('isDrawing false has transition none', () => {
		const context = render(
			<HarmonographSvg
				backgroundColor="red"
				strokeColor="green"
				strokeWidth="1"
				strokeLength="1000"
				path="a a a"
				strokePercentage="0"
				isDrawing={false}
			/>
		);

		const contextStyle = context['0'].children[0].attribs.style;
		expect(contextStyle.includes('transition: none;')).toBe(true);
	});

	test('isDrawing true has transition', () => {
		const context = render(
			<HarmonographSvg
				backgroundColor="red"
				strokeColor="green"
				strokeWidth="1"
				strokeLength="1000"
				path="a a a"
				strokePercentage="0"
				isDrawing={true}
			/>
		);

		const contextStyle = context['0'].children[0].attribs.style;
		expect(contextStyle.includes('transition: stroke-dashoffset 1s linear;')).toBe(true);
	});
});

