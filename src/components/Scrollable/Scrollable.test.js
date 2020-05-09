import {h} from 'preact';
import {shallow} from 'enzyme';

import Scrollable from '.';

describe('children', () => {
	test('Scrollable renders children', () => {
		const context = shallow(<Scrollable><p>Hello world</p></Scrollable>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});
