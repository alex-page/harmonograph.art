import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = ({children}) => (
	<div>
		{children}
		<style jsx>{`
			div {
				margin: 0;
				display: grid;
				min-height: 100vh;
				min-height: -webkit-fill-available;
				grid-template-rows: 80px calc(50% - 80px - 5vh) 50%;
				grid-gap: 2.5vh;

				height: 100%; // safari
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;

				background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M1%202V0h1v1H0v1z%22%20fill-opacity%3D%22.05%22%2F%3E%3C%2Fsvg%3E");
				background-size: auto;
				background-size: 16px 16px;
				background-color: #222;
			}
			
			@media (min-width: 800px){
				div {
					grid-template-rows: none;
					grid-template-columns: 80px 1fr 350px;
					grid-auto-flow: column;
					grid-gap: 5vh;
				}
			}
		`}
		</style>
	</div>
);

AppLayout.propTypes = {
	children: PropTypes.array.isRequired
};

export default AppLayout;
