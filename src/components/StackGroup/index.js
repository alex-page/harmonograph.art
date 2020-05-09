import { h, Component } from 'preact';

import style from './style';

const StackGroup = ({children}) => {
	return (
		<div className={style.StackGroup}>
			{children}
		</div>
	);
};

export default StackGroup;
