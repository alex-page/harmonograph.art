import { h, Component } from 'preact';

import style from './style';

const Popover = ({hidePopover, isVisible, children}) => {
	return (
		<div style={{display: isVisible ? 'block' : 'none'}}>
			<div
				className={style.PopoverOverlay}
				onClick={() => hidePopover()}
				onTouchStart={() => hidePopover()}/>
			<div className={style.PopoverContent}>
				{children}
			</div>
		</div>
	);
};

export default Popover;
