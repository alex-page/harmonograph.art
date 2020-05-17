import {h} from 'preact';
import {useEffect} from 'preact/hooks';

import style from './style.css';

const Popover = ({hidePopover, leftOffset = '0', children}) => {

	useEffect(() => {
		document.addEventListener("keydown", hidePopover, false);

		return () => {
			document.removeEventListener("keydown", hidePopover, false);
		};
	}, [hidePopover]);


	return (
		<div>
			<div
				className={style.PopoverOverlay}
				onClick={hidePopover}
				onTouchStart={hidePopover} />
			<div
				className={style.PopoverContent}
				style={{left: leftOffset}}
			>
				{children}
			</div>
		</div>
	);
};

export default Popover;
