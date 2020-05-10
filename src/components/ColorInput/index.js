import {h} from 'preact';
import { useState } from 'preact/hooks';
// import {ChromePicker} from 'react-color';

import style from './style.css';

import Label from '../Label';
import Popover from '../Popover';
import VisuallyHidden from '../VisuallyHidden';

const ColorInput = ({id, label, defaultValue}) => {
	const [showPicker, setShowPicker] = useState(false);

	return (
		<div className={style.ColorInput}>
			<Label id={id}>{label}</Label>
			<button
				className={style.Swatch}
				style={{backgroundColor: defaultValue}}
				id={`swatch-${id}`}
				type="button"
				onClick={() => setShowPicker(true)}
				onTouchStart={() => setShowPicker(true)}
			>
				<VisuallyHidden>Open swatch</VisuallyHidden>
			</button>
			<input
				className={style.Input}
				readOnly
				type="text"
				id={id}
				value={defaultValue}
				onClick={() => setShowPicker(true)}
				onTouchStart={() => setShowPicker(true)}
			/>
			<Popover
				isVisible={showPicker}
				hidePopover={() => setShowPicker(false)}
			>
				<p>Content</p>
			</Popover>
		</div>
	);
};

export default ColorInput;
