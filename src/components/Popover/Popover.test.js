import {h} from 'preact';
import {shallow} from 'enzyme';

import Popover from '.';

describe('children', () => {
	test('Popover renders children', () => {
		const context = shallow(<Popover><p>Hello world</p></Popover>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});

describe('hidePopover()', () => {
	test('click event does not propogate', () => {
		const onClickSpy = jest.fn();
		const context = shallow(<Popover hidePopover={onClickSpy}>Hello world</Popover>);
		context.simulate('click');
		expect(onClickSpy).toHaveBeenCalledTimes(0);
	});
});
