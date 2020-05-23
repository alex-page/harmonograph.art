import {h} from 'preact';
import {useEffect} from 'preact/hooks';

import style from './style.css';

const Popover = ({hidePopover, leftOffset = '0', children}) => {
	useEffect(() => {
		document.addEventListener("keydown", hidePopover, {passive: true});
		document.addEventListener("mousedown", hidePopover, {passive: true});
		document.addEventListener("touchstart", hidePopover, {passive: true});

		return () => {
			document.removeEventListener("keydown", hidePopover, {passive: true});
			document.removeEventListener("mousedown", hidePopover, {passive: true});
			document.removeEventListener("touchstart", hidePopover, {passive: true});
		};
	}, [hidePopover]);


	return (
		<div
			className={style.PopoverContent}
			style={{left: leftOffset}}
			onMouseDown={(event) => event.stopPropagation()}
			onTouchStart={(event) => event.stopPropagation()}
		>
			{children}
		</div>
	);
};

export default Popover;
