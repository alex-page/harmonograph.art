import { h, Component } from 'preact';

import style from './style';

const VisuallyHidden = ({children}) => (
	<div className={style.VisuallyHidden}>{children}</div>
);

export default VisuallyHidden;

