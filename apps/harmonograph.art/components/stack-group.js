import React from 'react';
import PropTypes from 'prop-types';

const StackGroup = ({children}) => {
	return (
		<div className="stack">
			{children}
			<style global jsx>{`
				.stack > * + * { 
					margin-top: 20px;
				}
			`}
			</style>
		</div>
	);
};

StackGroup.propTypes = {
	children: PropTypes.array.isRequired
};

export default StackGroup;
