import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({children, footerMessage}) => (
	<aside>
		{children}
		<p>
			{footerMessage}
		</p>
		<style jsx>{`
			aside {
				display: grid;
				grid-template-rows: 1fr 50px;
				background: var(--frame-background-color);
				grid-row: 3/3;
			}
			
			@media (min-width: 800px){
				aside {
					min-height: 100vh;
					min-height: -webkit-fill-available;
					grid-column: 3/3;
					grid-row: auto/auto;
				}
			}

			p {
				margin: 0;
				padding: 10px 20px;
				font-weight: 100;
				border-top: 1px solid var(--subdued-color);
			}
		`}
		</style>
	</aside>
);

Sidebar.propTypes = {
	children: PropTypes.element.isRequired,
	footerMessage: PropTypes.string.isRequired
};

export default Sidebar;
