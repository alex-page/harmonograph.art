import {h} from 'preact';
import {shallow} from 'enzyme';

import Label from '.';

describe('children', () => {
	test('Label renders children', () => {
		const context = shallow(<Label><p>Hello world</p></Label>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});

describe('id', () => {
	test('Label uses id', () => {
		const context = shallow(<Label id="a"><p>Hello world</p></Label>);
		expect(context.find('label').props().for).toBe('a');
	});
});
