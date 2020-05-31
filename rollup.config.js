import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

module.exports = {
	input: 'src/_includes/js/script.js',
	output: {
		format: 'iife',
		compact: true
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		terser({
			ecma: 8,
			module: true
		})
	]
};
