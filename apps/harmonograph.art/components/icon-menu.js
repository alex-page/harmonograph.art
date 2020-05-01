import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const IconMenu = ({items}) => (
	<nav>
		<ul>
			{items.map(item => (
				<li key={item.text}>
					{
						item.href.startsWith('http') ?
							<a title={item.text} href={item.href}>
								{item.icon}
							</a> :
							<Link href={item.href}>
								<a title={item.text}>
									{item.icon}
								</a>
							</Link>
					}
				</li>
			))}
		</ul>
		<style jsx>{`
			nav {
				background: var(--frame-background-color);
				grid-row: 1/1;
			}

			ul {
				margin: 0;
				padding: 0;
				list-style: none;
			
				display:grid;
			
				grid-auto-flow: column;
				grid-auto-columns: 80px;
				grid-auto-rows: 80px;
			
				width: 100%;
			}
			
			li {
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
				nav {
					grid-column: 1/1;
					grid-row: auto/auto;
				}

				ul {
					grid-auto-flow: row;
				}
			
				li {
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
