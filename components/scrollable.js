import React from 'react';
import PropTypes from 'prop-types';

const Scrollable = ({children}) => (
	<div>
		{children}
		<style jsx>{`
			div {
				overflow-x: auto;
				flex: 1;
			}
		`}
		</style>
	</div>
);

Scrollable.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default Scrollable;
