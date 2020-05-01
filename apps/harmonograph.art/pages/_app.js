import React from 'react';
import PropTypes from 'prop-types';

import {HarmonographProvider} from '../components/harmonograph-context';

import '../css/global.css';

const MyApp = ({Component, pageProps}) => {
	return (
		<HarmonographProvider>
			<Component {...pageProps}/>
		</HarmonographProvider>
	);
};

MyApp.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object.isRequired
};

export default MyApp;
