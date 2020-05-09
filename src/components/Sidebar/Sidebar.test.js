import {h} from 'preact';
import {shallow} from 'enzyme';

import {SidebarFooter, SidebarHeader, SidebarMain} from '.';

describe('SidebarFooter children', () => {
	test('SidebarFooter renders children', () => {
		const context = shallow(<SidebarFooter><p>Hello world</p></SidebarFooter>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});

describe('SidebarHeader children', () => {
	test('SidebarHeader renders children', () => {
		const context = shallow(<SidebarHeader><p>Hello world</p></SidebarHeader>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});

describe('SidebarMain children', () => {
	test('SidebarMain renders children', () => {
		const context = shallow(<SidebarMain><p>Hello world</p></SidebarMain>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});
