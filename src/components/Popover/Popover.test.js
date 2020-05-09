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
	test('click event triggers function', () => {
		const onClickSpy = jest.fn();
		const context = shallow(<Popover hidePopover={onClickSpy}>Hello world</Popover>);
		context.find('.PopoverOverlay').simulate('click');
		expect(onClickSpy).toHaveBeenCalledTimes(1);
	});
});

describe('isVisible', () => {
	test('isVisible', () => {
		const context = shallow(<Popover isVisible>Hello world</Popover>);
		expect(context.props().style.display).toBe('block');
	});

	test('isVisible false', () => {
		const context = shallow(<Popover isVisible={false}>Hello world</Popover>);
		expect(context.props().style.display).toBe('none');
	});
});