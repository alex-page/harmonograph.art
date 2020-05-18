import CopyPlugin from 'copy-webpack-plugin';

export default config => {
	config.plugins.push(
		new CopyPlugin({
			patterns: [{
				from: 'robots.txt',
				to: 'robots.txt'
			}]
		})
	)
};