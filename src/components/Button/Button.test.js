import {h} from 'preact';
import {shallow} from 'enzyme';

import Button from '.';

describe('children', () => {
	test('Button renders children', () => {
		const context = shallow(<Button><p>Hello world</p></Button>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});

describe('onClick()', () => {
	test('click event triggers function', () => {
		const onClickSpy = jest.fn();
		const context = shallow(<Button onClick={onClickSpy}>Hello world</Button>);
		context.simulate('click');
		expect(onClickSpy).toHaveBeenCalledTimes(1);
	});
});

describe('isSecondary', () => {
	test('color', () => {
		const context = shallow(<Button isSecondary>Hello world</Button>);
		expect(context.props().style.backgroundColor).toBe('var(--background-color)');
		expect(context.props().style.color).toBe('var(--link-bright-color)');
	});
});

describe('rotateIcon', () => {
	test('classnames', () => {
		const context = shallow(<Button rotateIcon>Hello world</Button>);
		expect(context.props().className).toBe('Button ButtonRotateIcon');
	});
});