import {h} from 'preact';
import {useState, useEffect, useRef} from 'preact/hooks';
import colorString from 'color-string';

import Label from '../Label';
import VisuallyHidden from '../VisuallyHidden';

import style from './style.css';


const RGBtoHSVA = ([r,g,b,a]) => {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	
	const d = max - min;
	const s = (max === 0 ? 0 : d / max);
	const v = max / 255;
	
	let h;

	switch (max) {
		case min: h = 0; break;
		case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
		case g: h = (b - r) + d * 2; h /= 6 * d; break;
		case b: h = (r - g) + d * 4; h /= 6 * d; break;
	}

	h = Math.round(h * 360);

	return [h,s,v,a];
}

const HSVtoHEX = ([h,s,v,a]) => {
	let r;
	let g;
	let b;

	h = h / 360;

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
	}

	const rgba = [
		Math.round(r * 255),
		Math.round(g * 255),
		Math.round(b * 255),
		a
	];

	return colorString.to.hex(rgba);
}

const ColorPicker = ({
	color: inputColor,
	setColor: setInputColor,
	id
}) => {
	const [color, setColor] = useState('');
	const [hue, setHue] = useState(0);
	const [alpha, setAlpha] = useState(1);

	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [leftOffset, setLeftOffset] = useState(0);
	const [topOffset, setTopOffset] = useState(0);
	const [interactive, setInteractive] = useState(false);

	const colorPicker = useRef();

	useEffect(() => {
		const validColor = colorString.get(inputColor.toLowerCase());
		const [h,s,v,a] = RGBtoHSVA(validColor.value);
		if(inputColor !== color && validColor){
			setColor(inputColor);
			setHue(h);
			setAlpha(a);
		}
		if(validColor && width !== 0 && height !== 0) {
			setX(s * width);
			setY(height - (v * height));
		}
	}, [color, inputColor, width, height]);

	useEffect(() => {
		updateRect();
		window.addEventListener("resize", updateRect, {passive: true});
		return () => {
			window.removeEventListener("resize", updateRect, {passive: true});
		};
	}, [colorPicker]);

	const updateRect = () => {
		const colorPickerPosition = colorPicker.current.getBoundingClientRect();
		setWidth(colorPickerPosition.width);
		setHeight(colorPickerPosition.height);
		setLeftOffset(colorPickerPosition.left);
		setTopOffset(colorPickerPosition.top);
	}

	const updateColor = (h, x, y, a) => {
		const newHSVA = [h, x / width, 1 - y / height, a];
		const hex = HSVtoHEX(newHSVA);
		setColor(hex);
		setInputColor(hex);
	}

	const handleMovement = (event) => {
		if(!interactive || width === 0 || height === 0) return;

		let newX = event.clientX - leftOffset;
		let newY = event.clientY - topOffset;

		if(newX < 0) newX = 0;
		else if(newX > width) newX = width;

		if(newY < 0) newY = 0;
		else if(newY > height) newY = height;

		setX(newX);
		setY(newY);

		updateColor(hue, newX, newY, alpha);
	}

	const handleHue = (event) => {
		const newHue = event.target.value;
		setHue(newHue);
		updateColor(newHue, x, y, alpha);
	}

	const handleAlpha = (event) => {
		const newAlpha = event.target.value;
		setAlpha(newAlpha);
		updateColor(hue, x, y, newAlpha);
	}

	return (
		<div>
			<div
				ref={colorPicker}
				onMouseDown={() => setInteractive(true)}
				onMouseUp={() => setInteractive(false)}
				onTouchStart={() => setInteractive(true)}
				onTouchEnd={() => setInteractive(false)}
				onTouchMove={handleMovement}
				onMouseMove={handleMovement}
				className={style.ColorPicker}
			>
				<div className={style.Hue} style={{
					backgroundColor: `hsl(${hue}, 100%, 50%)`,
					opacity: alpha,
				}}>
					<div className={style.WhiteGradient}>
						<div className={style.BlackGradient} />
					</div>
				</div>
				<div
					className={style.CurrentColor}
					style={{transform: `translate(${x}px, ${y}px)`}}
				/>
			</div>
			<VisuallyHidden>
				<Label id={`${id}-hue`}>Hue</Label>
			</VisuallyHidden>
			<input
				className={style.HueRangeSlider}
				type="range"
				id={`${id}-hue`}
				max={360}
				min={0}
				step={0.01}
				value={hue}
				oninput={handleHue}
			/>
			<VisuallyHidden>
				<Label id={`${id}-alpha`}>Alpha</Label>
			</VisuallyHidden>
			<input
				className={style.AlphaRangeSlider}
				type="range"
				id={`${id}-alpha`}
				min={0}
				max={1}
				step={0.01}
				value={alpha}
				style={{
					backgroundImage: `linear-gradient(to right, rgba(0,0,0,0) 5%, ${color.substring(0, 7)} 100%), url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M1%202V0h1v1H0v1z%22%20fill-opacity%3D%22.05%22%2F%3E%3C%2Fsvg%3E")`
				}}
				oninput={handleAlpha}
			/>
		</div>
	);
};

export default ColorPicker;
