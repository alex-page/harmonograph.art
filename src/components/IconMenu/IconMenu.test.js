import {h} from 'preact';
import {shallow} from 'enzyme';

import IconMenu from '.';
import {
	GitHubIcon,
	AuthorIcon,
	TwitterIcon,
} from '../Icons';

describe('renders', () => {
	test('renders menu', () => {
		const context = shallow(<IconMenu />);
		expect(context.find('li').length).toBe(4);
		expect(context.find('a').length).toBe(4);
		expect(context.find(GitHubIcon).length).toBe(1);
		expect(context.find(AuthorIcon).length).toBe(1);
		expect(context.find(TwitterIcon).length).toBe(1);
	});
});
