import React from 'react';
import PropTypes from 'prop-types';

import StackGroup from '../components/stack-group';

const Sidebar = ({children}) => (
	<aside>
		{children}
		<style jsx>{`
			aside {
				order: 3;
				height: 50vh;

				display: flex;
				flex-direction: column;
				background: var(--frame-background-color);
			}

			@media (min-width: 800px){
				aside {
					width: 340px;
					min-height: 100vh;
				}
			}
		`}
		</style>
	</aside>
);

Sidebar.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export const SidebarFooter = ({children}) => (
	<>
		<div>
			{children}
		</div>
		<style jsx>{`
			div {
				padding: 20px;
				border-top: 1px solid var(--subdued-color);
			}
		`}
		</style>
	</>
);

SidebarFooter.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export const SidebarHeader = ({title, children}) => (
	<div>
		<StackGroup>
			<h1>{title}</h1>
			{children}
		</StackGroup>
		<style jsx>{`
			h1 {
				font-size: 1rem;
				margin: 0;
			}
			div {
				border-bottom: 1px solid var(--subdued-color);
				padding: 20px;
			}
		`}
		</style>
	</div>
);

SidebarHeader.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export const SidebarMain = ({children}) => (
	<div>
		<StackGroup>
			{children}
		</StackGroup>
		<style jsx>{`
			div {
				padding: 20px;
			}
		`}
		</style>
	</div>
);

SidebarMain.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default Sidebar;
