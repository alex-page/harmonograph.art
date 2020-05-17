import {h} from 'preact';
import {shallow} from 'enzyme';

import IconMenu from '.';

describe('renders', () => {
	test('renders menu', () => {
		const context = shallow(<IconMenu items={[{
			text: 'yo',
			href: '/',
			icon: '⚡️'
		},{
			text: 'yooo',
			href: '/home',
			icon: '✨'
		}]} />);

		expect(context.find('li').length).toBe(2);
		expect(context.find('a').length).toBe(2);
		expect(context.find('a').at(0).text()).toBe('⚡️');
		expect(context.find('a').at(1).text()).toBe('✨');
	});
});
