import {h} from 'preact';
import { memo, forwardRef } from 'preact/compat';

import style from './style.css';

const HarmonographSVG = forwardRef(({
	backgroundColor,
	strokeColor,
	strokeWidth,
	path,
	strokePercentage,
	isDrawing,
	pathLength
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
				strokeDasharray: pathLength,
				strokeDashoffset: pathLength - (strokePercentage / 100 * pathLength),
				transition: isDrawing && strokePercentage ? 'stroke-dashoffset 1s linear' : 'none',
				willChange: 'stroke-dashoffset'
			}}
			className={style.Path}
			fill="none"
			d={path}
		/>
	</svg>
));

HarmonographSVG.displayName = "HarmonographSVG";

export default memo(HarmonographSVG);
