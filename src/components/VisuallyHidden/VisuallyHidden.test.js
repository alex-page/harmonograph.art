import {h} from 'preact';
import {shallow} from 'enzyme';

import VisuallyHidden from '.';

describe('children', () => {
	test('VisuallyHidden renders children', () => {
		const context = shallow(<VisuallyHidden><p>Hello world</p></VisuallyHidden>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});
