import {h} from 'preact';
import {shallow} from 'enzyme';

import AppLayout, {AppLayoutMain, AppLayoutNav, AppLayoutAside} from '.';

describe('children', () => {
	test('renders children into AppLayout', () => {
		const context = shallow(<AppLayout><p>Hello world</p></AppLayout>);
		expect(context.find('p').text()).toBe('Hello world');
	});

	test('renders children into AppLayoutMain ', () => {
		const context = shallow(<AppLayoutMain><p>Hello world</p></AppLayoutMain>);
		expect(context.find('p').text()).toBe('Hello world');
	});

	test('renders children into AppLayoutNav', () => {
		const context = shallow(<AppLayoutNav><p>Hello world</p></AppLayoutNav>);
		expect(context.find('p').text()).toBe('Hello world');
	});

	test('renders children into AppLayoutAside', () => {
		const context = shallow(<AppLayoutAside><p>Hello world</p></AppLayoutAside>);
		expect(context.find('p').text()).toBe('Hello world');
	});
});