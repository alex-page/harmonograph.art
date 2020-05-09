import {h} from 'preact';

import style from './style.css';

const Scrollable = ({children}) => (
	<div className={style.Scrollable}>
		{children}
	</div>
);

export default Scrollable;
