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
	strokeLength,
	isDrawing
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
			className={isDrawing && strokePercentage !== '0' ? 'isDrawing' : null}
		/>
		{/* Note: using position fixed for Safari SVG issues */}
		<style jsx>{`
			svg {
				position: fixed;
				top: 70px;
				right: 20px;
				left: 20px;
				padding: 20px;
				height: calc( 100% - 50vh - 50px - 80px);
				width: calc(100% - 80px);
			}
			path {
				will-change: stroke-dashoffset;
				stroke-dasharray: ${strokeLength};
				stroke-dashoffset: ${strokeLength - (strokePercentage / 60 * strokeLength)};
				transition: none;
			}
			.isDrawing {
				transition: stroke-dashoffset 1s linear;
			}
			@media (min-width: 800px){
				svg {
					top: 40px;
					left: 120px;
					padding: 40px;
					width: calc(100% - 160px - 340px - 80px);
					height: calc(100% - 160px);
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
	strokeLength: PropTypes.string.isRequired,
	isDrawing: PropTypes.bool.isRequired
};

export default memo(HarmonographSVG);
