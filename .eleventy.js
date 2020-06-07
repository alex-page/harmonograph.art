// Dependencies
const {exec} = require('child_process');
const htmlmin = require("html-minifier");


// Local dependencies
const fs = require('fs');

module.exports = ( eleventyConfig ) => {
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
	eleventyConfig.addPassthroughCopy('src/manifest.json');

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

	eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
		if( outputPath.endsWith(".html") ) {
			let minified = htmlmin.minify(content, {
				minifyCSS: true,
				minifyJS: true,
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}

		return content;
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