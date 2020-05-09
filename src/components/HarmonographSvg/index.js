import {h} from 'preact';
import { memo, forwardRef } from 'preact/compat';

import style from './style.css';

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

HarmonographSVG.displayName = "HarmonographSVG";

export default memo(HarmonographSVG);
