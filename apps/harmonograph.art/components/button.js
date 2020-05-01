import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClick, isSecondary, children}) => (
	<>
		<button type="button" onClick={onClick}>{children}</button>
		<style jsx>{`
button {
	border: none;
	font-size: var(--base-font-size);
	font-family: var(--base-font);
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;
	font-weight: 300;
	display: inline-flex;
	padding: 15px 30px;
	${isSecondary ?
		'color: #3FD562; background: var(--background-color);' :
		'color: #fff; background-color: var(--link-color);'
	}
}

button:hover,
button:focus {
	outline: 2px solid var(--active-color);
	outline-offset: 4px;
}`}
		</style>
	</>
);

Button.propTypes = {
	onClick: PropTypes.func,
	isSecondary: PropTypes.bool,
	children: PropTypes.element.isRequired
};

export default Button;
