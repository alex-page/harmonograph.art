import {h} from 'preact';

import style from './style.css';

const StackGroup = ({children}) => {
	return (
		<div className={style.StackGroup}>
			{children}
		</div>
	);
};

export default StackGroup;
