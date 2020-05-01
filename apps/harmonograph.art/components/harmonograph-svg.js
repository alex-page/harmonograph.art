import React, {memo} from 'react';
import PropTypes from 'prop-types';

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
const HarmonographSVG = React.forwardRef(({
	backgroundColor,
	strokeColor,
	strokeWidth,
	path,
	strokePercentage,
	strokeLength
}, ref) => (
	<svg
		ref={ref}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 700 700"
		style={{backgroundColor}}
	>
		<path
			stroke={strokeColor}
			strokeWidth={strokeWidth}
			fill="none"
			id="harmonograph-path"
			d={path}
			style={{
				strokeDasharray: strokeLength,
				strokeDashoffset: strokeLength - (strokePercentage / 100 * strokeLength)
			}}
		/>
		<style jsx>{`
			svg {
				padding: 20px;
				opacity: ${strokeLength === '0' ? '0' : '1'};
			}
			@media (min-width: 800px){
				svg {
					padding: 5vh;
					max-width: 80vh;
				}
			}
		`}
		</style>
	</svg>
));

HarmonographSVG.propTypes = {
	backgroundColor: PropTypes.string.isRequired,
	strokeColor: PropTypes.string.isRequired,
	strokeWidth: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	strokePercentage: PropTypes.string.isRequired,
	strokeLength: PropTypes.string.isRequired
};

export default memo(HarmonographSVG);
