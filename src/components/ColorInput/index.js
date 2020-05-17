import {h} from 'preact';
import {useState} from 'preact/hooks';

import style from './style.css';

import Label from '../Label';
import Popover from '../Popover';
import VisuallyHidden from '../VisuallyHidden';
import ColorPicker from '../ColorPicker';

const ColorInput = ({id, label, color, setColor}) => {
	const [showPicker, setShowPicker] = useState(false);

	return (
		<div className={style.ColorInput}>
			<Label id={id}>{label}</Label>
			<button
				className={style.SwatchButton}
				id={`swatch-${id}`}
				type="button"
				onClick={() => setShowPicker(true)}
				onTouchStart={() => setShowPicker(true)}
			>
				<span className={style.Swatch} style={{backgroundColor: color}} />
				<VisuallyHidden>Open swatch</VisuallyHidden>
			</button>
			<input
				className={style.Input}
				type="text"
				id={id}
				value={color}
				onChange={event => setColor(event.target.value)}
			/>
			{
				showPicker && (
				<Popover
					hidePopover={() => setShowPicker(false)}
				>
					<ColorPicker
						color={color}
						setColor={setColor}
						id={id}
					/>
				</Popover>
				)
			}
			
		</div>
	);
};

export default ColorInput;
