import { h, Component } from 'preact';

import style from './style';

const Label = ({children}) => (
	<label className={style.Label}>
		{children}
	</label>
);

export default Label;
