import React from 'react';
import PropTypes from 'prop-types';

import '../css/global.css';

const MyApp = ({Component, pageProps}) => {
	return (
		<Component {...pageProps}/>
	);
};

MyApp.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object.isRequired
};

export default MyApp;
