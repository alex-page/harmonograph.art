import {h} from 'preact';

import style from './style.css';

const IconMenu = ({items}) => (
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


export default IconMenu;
