import React from 'react';
import PropTypes from 'prop-types';

const RangeSlider = ({
	id,
	label,
	max,
	min,
	step,
	defaultValue,
	onChange
}) => {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				type="range"
				id={id}
				max={max}
				min={min}
				step={step}
				defaultValue={defaultValue}
				onChange={event => onChange(id, event.target.value)}
			/>
			<style jsx>{`
				input {
					-webkit-appearance: none;
					-moz-appearance: none;

					height: 5px;
					width: 100%;

					margin-bottom: 15px;

					background: var(--background-color);
					cursor: pointer;
				}

				input::-moz-range-thumb,
				input::-webkit-slider-thumb {
					cursor: grab;
					background: #fff;
					border: none;
				}

				input:active,
				input:active::-moz-range-thumb,
				input:active::-webkit-slider-thumb {
					cursor: grabbing;
				}

				input:hover::-moz-range-thumb,
				input:hover::-webkit-slider-thumb,
				input:focus::-moz-range-thumb,
				input:focus::-webkit-slider-thumb {
					outline: 2px solid var(--active-color);
					outline-offset: 3px;
				}
			`}
			</style>
		</>
	);
};

RangeSlider.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	max: PropTypes.string.isRequired,
	min: PropTypes.string.isRequired,
	step: PropTypes.string.isRequired,
	defaultValue: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default RangeSlider;
