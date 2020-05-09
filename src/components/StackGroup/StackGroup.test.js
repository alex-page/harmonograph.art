import {h} from 'preact';
import {shallow} from 'enzyme';

import StackGroup from '.';

describe('children', () => {
	test('StackGroup renders children', () => {
		const context = shallow(<StackGroup><p>Hello world</p></StackGroup>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});
