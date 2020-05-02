import React from 'react';
import PropTypes from 'prop-types';

const Popover = ({
	hidePopover,
	isVisible,
	children
}) => {
	return (
		<div>
			<div
				className="overlay"
				onClick={() => hidePopover()}
				onTouchStart={() => hidePopover()}/>
			<div className="contents">
				{children}
			</div>
			<style jsx>{`
				div {
					display: ${isVisible ? 'block' : 'none'};
				}
				.overlay {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
				}
				.contents {
					position: absolute;
					left: 50px;
					top: calc(100% + 10px);
					z-index: 10;
				}
			`}
			</style>
		</div>
	);
};

Popover.propTypes = {
	hidePopover: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	children: PropTypes.element.isRequired
};

export default Popover;
