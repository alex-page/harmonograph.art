import { h, Component } from 'preact';

import style from './style';

const Scrollable = ({children}) => (
	<div className={style.Scrollable}>
		{children}
	</div>
);

export default Scrollable;
