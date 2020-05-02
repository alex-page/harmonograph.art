import React from 'react';
import PropTypes from 'prop-types';

const IconMenu = ({items}) => (
	<nav>
		<ul>
			{items.map(({text, icon, target, href}) => (
				<li key={text}>
					<a title={text} href={href} target={target} rel={target ? 'noopener' : null}>
						{icon}
					</a>
				</li>
			))}
		</ul>
		<style jsx>{`
			nav {
				background: var(--frame-background-color);
			}

			ul {
				margin: 0;
				padding: 0;
				list-style: none;

				display: flex;
				height: var(--icon-menu-sm);
			}

			li {
				flex: 1;
				border-right: 1px solid var(--subdued-color);
			}

			a {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				text-decoration: none;
			}
			
			a:hover,
			a:focus {
				box-shadow: inset 0 -4px 0 0 var(--active-color);
				background-color: var(--subdued-color);
			}

			@media (min-width: 800px){
				ul {
					width: var(--icon-menu-lg);
					height: auto;
					flex-direction: column;
				}
			
				li {
					flex: auto;
					height: var(--icon-menu-lg);
					border-bottom: 1px solid var(--subdued-color);
				}

				a:hover,
				a:focus {
					box-shadow: inset -4px 0 0 0 var(--active-color);
				}
			}
		`}
		</style>
	</nav>
);

IconMenu.propTypes = {
	items: PropTypes.array.isRequired
};

export default IconMenu;
