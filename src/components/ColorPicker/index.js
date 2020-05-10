import {h} from 'preact';
import { useState } from 'preact/hooks';
import {ChromePicker} from 'react-color';

import style from './style.css';

import Label from '../Label';
import Popover from '../Popover';
import VisuallyHidden from '../VisuallyHidden';

const ColorPicker = ({id, label, defaultValue, onChange}) => {
	const [showPicker, setShowPicker] = useState(false);

	const updateColor = ({rgb, hex}) => {
		const {r, g, b, a} = rgb;
		const color = a === 1 ?
			hex.toUpperCase() :
			`rgba(${r},${g},${b},${a})`;

		return onChange(color);
	};

	return (
		<div className={style.ColorPicker}>
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
				<ChromePicker
					color={defaultValue}
					onChange={updateColor}
				/>
			</Popover>
		</div>
	);
};

export default ColorPicker;
