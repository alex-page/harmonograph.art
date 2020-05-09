import {h} from 'preact';
import Router from 'preact-router';

import Page from '../Page';

const App = () => {
	return (
		<Router>
			<Page path="/:strokeColorQuery?/:backgroundColorQuery?/:strokeWidthQuery?/:strokePercentageQuery?/:isDrawingQuery?/:pendulumsQuery?/" />
		</Router>
	);
};

export default App;
