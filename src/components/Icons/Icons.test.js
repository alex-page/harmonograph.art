import {h} from 'preact';
import {shallow} from 'enzyme';

import {
	GitHubIcon,
	AuthorIcon,
	TwitterIcon,
	Logo,
	DownloadIcon,
	RandomIcon,
	ShareIcon,
	PauseIcon,
	PlayIcon,
	SuccessIcon
} from '../Icons';

describe('GitHubIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<GitHubIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('AuthorIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<AuthorIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('TwitterIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<TwitterIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('Logo renders', () => {
	test('renders menu', () => {
		const context = shallow(<Logo/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('GitHubIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<GitHubIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('DownloadIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<DownloadIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('RandomIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<RandomIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('ShareIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<ShareIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('PauseIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<PauseIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('PlayIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<PlayIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});

describe('SuccessIcon renders', () => {
	test('renders menu', () => {
		const context = shallow(<SuccessIcon/>);
		expect(context.find('svg').length).toBe(1);
	});
});


