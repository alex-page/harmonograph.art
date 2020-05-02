import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClick, isSecondary, children}) => (
	<>
		<button type="button" onClick={onClick}>{children}</button>
		<style jsx>{`
			button {
				border: none;
				font-size: 0.8rem;
				font-family: var(--base-font);
				border-radius: 5px;
				cursor: pointer;
				text-decoration: none;
				font-weight: 300;
				display: inline-flex;
				padding: 10px 20px;
				color: ${isSecondary ? 'var(--link-bright-color)' : 'var(--text-color)'};
				background-color: ${isSecondary ? 'var(--background-color)' : 'var(--link-color)'};
			}

			button:hover,
			button:focus {
				outline: 2px solid var(--active-color);
				outline-offset: 4px;
			}

			button + button {
				margin-left: 20px;
			}
		`}
		</style>
	</>
);

Button.propTypes = {
	onClick: PropTypes.func,
	isSecondary: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default Button;
