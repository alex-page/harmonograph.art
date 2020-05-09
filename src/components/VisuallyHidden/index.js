import {h} from 'preact';

import style from './style.css';

const VisuallyHidden = ({children}) => (
	<div className={style.VisuallyHidden}>{children}</div>
);

export default VisuallyHidden;

