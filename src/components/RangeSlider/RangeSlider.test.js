import {h} from 'preact';
import {shallow} from 'enzyme';

import RangeSlider from '.';
import Label from '../Label';

const onInputSpy = jest.fn();
const context = shallow(
	<RangeSlider
		id="hey"
		label="ho"
		max="10"
		min="0"
		step="1"
		defaultValue="5"
		onInput={onInputSpy}
	>
		<p>Hello world</p>
	</RangeSlider>
);

describe('children', () => {
	test('RangeSlider renders children', () => {
		expect(context.find('p').text()).toBe('Hello world');
	});
});

describe('id', () => {
	test('RangeSlider id on label for and input id', () => {
		expect(context.find(Label).props().htmlFor).toBe('hey');
		expect(context.find('input').props().id).toBe('hey');
	});
});

describe('label', () => {
	test('RangeSlider label children to be label', () => {
		expect(context.find(Label).props().children).toBe('ho');
	});
});

describe('max', () => {
	test('RangeSlider input max', () => {
		expect(context.find('input').props().max).toBe('10');
	});
});

describe('min', () => {
	test('RangeSlider input min', () => {
		expect(context.find('input').props().min).toBe('0');
	});
});

describe('value', () => {
	test('RangeSlider input value', () => {
		expect(context.find('input').props().value).toBe('5');
	});
});

describe('step', () => {
	test('RangeSlider input step', () => {
		expect(context.find('input').props().step).toBe('1');
	});
});
