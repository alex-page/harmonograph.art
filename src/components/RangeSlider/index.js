import { h, Component } from 'preact';

import Label from '../Label';
import style from './style';

const RangeSlider = ({
	id,
	label,
	max,
	min,
	step,
	defaultValue,
	onInput,
	children
}) => {
	return (
		<>
			<div className={style.RangeSliderLabel}>
				<Label htmlFor={id}>{label}</Label>{children}
			</div>
			<input
				className={style.RangeSlider}
				type="range"
				id={id}
				max={max}
				min={min}
				step={step}
				value={defaultValue}
				oninput={event => onInput(event.target.value)}
			/>
		</>
	);
};

export default RangeSlider;
