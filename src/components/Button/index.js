import { h, Component } from 'preact';

import style from './style';

const Button = ({onClick, isSecondary, rotateIcon, children}) => {
	const classNames = [
		style.Button,
		rotateIcon && style.ButtonRotateIcon
	].join(' ');

	return (
		<button
			className={classNames}
			type="button"
			onClick={onClick}
			style={{
				color: isSecondary ? 'var(--link-bright-color)' : 'var(--text-color)',
				backgroundColor: isSecondary ? 'var(--background-color)' : 'var(--link-color)'
			}}
		>{children}</button>
	);
};

export default Button;
