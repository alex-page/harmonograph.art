import { h, Component } from 'preact';
import Router from 'preact-router';

import Page from './page';

const App = () => {

	return (
		<Router>
			<Page path="/:strokeColorQuery?/:backgroundColorQuery?/:strokeWidthQuery?/:strokePercentageQuery?/:isDrawingQuery?/:pendulumsQuery?/" />
		</Router>
	);
};

export default App;
