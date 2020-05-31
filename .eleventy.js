// Dependencies
const minifyCss = require('clean-css');
const {exec} = require('child_process');


// Local dependencies
const fs = require('fs');

module.exports = ( eleventyConfig ) => {
	/**
	 * cssmin - Minify CSS filter
	 */
	eleventyConfig.addFilter( 'cssmin', code => {
		const minified = new minifyCss({}).minify( code ).styles;
		return minified;
	});

	/**
	 * Rollup javascript
	 */
	eleventyConfig.addNunjucksAsyncShortcode("jsBundle", async() => {
		return new Promise((resolve, reject) => {
			exec('npx rollup -c',(error, stdout, stderr) => {
				if(error){
					reject(error);
				}

				resolve(stdout);
			});
		});
	})

	/**
	 * Copy everything in the assets directory to the built site
	 */
	eleventyConfig.addPassthroughCopy({'src/_assets': 'assets'});
	eleventyConfig.addPassthroughCopy('src/CNAME');

	// Adjust default browserSync config
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function(error, browserSync) {

				browserSync.addMiddleware('*', (req, res) => {
					const content_404 = fs.readFileSync('_site/404.html');
					// Provides the 404 content without redirect.
					res.write(content_404);
					// Add 404 http status code in request header.
					// res.writeHead(404, { 'Content-Type': 'text/html' });
					res.writeHead(404);
					res.end();
				});
			}
		}
	});

	// The configuration object ( optional )
	return {
		dir: {
			input: 'src',
			includes: '_includes'
		},
		templateFormats : ['njk', 'md'],
		htmlTemplateEngine : 'njk',
		markdownTemplateEngine: 'njk',
	};
};