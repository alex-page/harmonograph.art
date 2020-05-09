import {h} from 'preact';

import style from './style.css';

const AppLayout = ({children}) => (
	<div className={style.AppLayout}>
		{children}
	</div>
);

export const AppLayoutMain = ({children}) => (
	<div className={style.AppLayoutMain}>
		{children}
	</div>
);

export const AppLayoutAside = ({children}) => (
	<aside className={style.AppLayoutAside}>
		{children}
	</aside>
);

export const AppLayoutNav = ({children}) => (
	<nav className={style.AppLayoutNav}>
		{children}
	</nav>
);

export default AppLayout;
