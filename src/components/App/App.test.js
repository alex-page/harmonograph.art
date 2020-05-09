import {h} from 'preact';
import {shallow} from 'enzyme';

import App from '.';

describe('renders', () => {
	test('App renders', () => {
		const context = shallow(<App />);
		expect(context.getElements().length).toBe(1);
	});
});
