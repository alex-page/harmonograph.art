import {h} from 'preact';

import style from './style.css';

const Label = ({id, children}) => (
	<label htmlFor={id} className={style.Label}>
		{children}
	</label>
);

export default Label;
