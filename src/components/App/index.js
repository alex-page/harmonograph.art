import {h} from 'preact';
import Router from 'preact-router';

import Page from '../Page';
import IconMenu from '../IconMenu';

import style from './style.css';

import pkg from '../../../package.json';
import {
	GitHubIcon, AuthorIcon, TwitterIcon
} from '../Icons';

const App = () => {
	return (
		<div className={style.AppLayout}>
			<Router>
				<Page path="/:strokeColorQuery?/:backgroundColorQuery?/:strokeWidthQuery?/:strokePercentageQuery?/:isDrawingQuery?/:pendulumsQuery?/" />
			</Router>
			<nav className={style.AppNav}>
				<IconMenu items={[{
					text: pkg.name,
					href: '/',
					icon: <img width="32" src="/assets/logo.png" alt="harmonograph.art logo" />
				}, {
					text: 'GitHub',
					href: pkg.homepage,
					icon: <GitHubIcon />,
					target: '_blank'
				}, {
					text: 'Twitter',
					href: pkg.author.twitter,
					icon: <TwitterIcon />,
					target: '_blank'
				}, {
					text: pkg.author.name,
					href: pkg.author.url,
					icon: <AuthorIcon />,
					target: '_blank'
				}]} />
			</nav>
		</div>
	);
};

export default App;
