import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {ChromePicker} from 'react-color';
import Popover from './popover';

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
		<div>
			<label htmlFor={id}>{label}</label>
			<button
				style={{backgroundColor: defaultValue}}
				id={`swatch-${id}`}
				type="button"
				onClick={() => setShowPicker(true)}
				onTouchStart={() => setShowPicker(true)}
			>
				Open swatch
			</button>
			<input
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
			<style jsx>{`
				div {
					display: flex;
					flex-wrap: wrap;
					position: relative;
				}
				input {
					border: none;
					font-size: var(--base-font-size);
					font-family: var(--base-font);
					border-radius: 5px;

					background: var(--background-color);
					margin-top: 15px;
					color: var(--text-color);
					padding: 10px;
					width: calc(100% - 80px);
				}

				input:hover,
				input:focus,
				button:hover,
				button:focus {
					outline: 2px solid var(--active-color);
					outline-offset: 4px;
				}

				button {
					cursor: pointer;
					border: none;
					width: 40px;
					height: 40px;
					display: block;
					border-radius: 5px;
					border: 1px solid var(--background-color);
					margin-right: 10px;
					text-indent: -999px;
				}
			`}
			</style>
		</div>
	);
};

ColorPicker.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func
};

export default ColorPicker;
