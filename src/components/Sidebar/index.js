import { h, Component } from 'preact';

import style from './style';

import StackGroup from '../StackGroup';

export const SidebarFooter = ({children}) => (
	<div className={style.SidebarFooter}>
		{children}
	</div>
);

export const SidebarHeader = ({title, children}) => (
	<div className={style.SidebarHeader}>
		<StackGroup>
			<h1 className={style.SidebarHeaderTitle}>{title}</h1>
			{children}
		</StackGroup>
	</div>
);

export const SidebarMain = ({children}) => (
	<div className={style.SidebarMain}>
		<StackGroup>
			{children}
		</StackGroup>
	</div>
);
