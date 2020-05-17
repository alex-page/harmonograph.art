import {h} from 'preact';
import pkg from '../../../package.json';

import style from './style.css';

import {
	GitHubIcon, AuthorIcon, TwitterIcon, Logo
} from '../Icons';

const IconMenu = () => {
	const items = [
		{
			text: pkg.name,
			href: '/',
			icon: <img width="32" src="/assets/logo.png" />
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
		}
	];

	return (
		<ul className={style.IconMenu}>
			{items.map(({text, icon, target, href}) => (
				<li className={style.IconMenuItem} key={icon}>
					<a className={style.IconMenuLink} title={text} href={href} target={target} rel={target ? 'noopener' : null}>
						{icon}
					</a>
				</li>
			))}
		</ul>
	);
}


export default IconMenu;
