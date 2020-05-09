import { h, Component } from 'preact';
import { memo, forwardRef } from 'preact/compat';

import style from './style';

/**
 * Create a randomised harmonograph SVG
 *
 * Resources:
 * - https://en.wikipedia.org/wiki/Harmonograph
 * - https://aschinchon.wordpress.com/2014/10/13/beautiful-curves-the-harmonograph/
 *
 * @param  {number}  size            - The size of the svg
 * @param  {number}  strokeWidth     - The width of the line
 * @param  {string}  strokeColor     - The color of the harmonographrandomPendulum
 * @param  {string}  path            - The SVG path of the harmonograph
 * @param  {number}  pathLength      - The SVG path length
 */
const HarmonographSVG = forwardRef(({
	backgroundColor,
	strokeColor,
	strokeWidth,
	strokeLength,
	path,
	strokePercentage,
	isDrawing
}, ref) => (
	<svg
		ref={ref}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 700 700"
		style={{backgroundColor}}
		className={style.Svg}
	>
		<path
			stroke={strokeColor}
			strokeWidth={strokeWidth}
			style={{
				strokeDasharray: strokeLength,
				strokeDashoffset: strokeLength - (strokePercentage / 60 * strokeLength),
				transition: isDrawing && strokePercentage ? 'stroke-dashoffset 1s linear' : 'none'
			}}
			className={style.Path}
			fill="none"
			d={path}
		/>
	</svg>
));

export default memo(HarmonographSVG);
