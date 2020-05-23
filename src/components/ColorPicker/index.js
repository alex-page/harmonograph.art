import {h} from 'preact';
import {useState, useEffect, useRef, useLayoutEffect} from 'preact/hooks';
import colorString from 'color-string';
import {HSVAtoHEX, RGBAtoHSVA} from '../../utils/color';

import Label from '../Label';
import VisuallyHidden from '../VisuallyHidden';

import style from './style.css';

const ColorPicker = ({
	color: inputColor,
	setColor: setInputColor,
	id
}) => {
	const node = useRef();
	const [color, setColor] = useState('');
	const [hue, setHue] = useState(0);
	const [alpha, setAlpha] = useState(1);
	const [dimensions, setDimensions] = useState({});
	const [position, setPosition] = useState({x: null, y: null});
	const [isInteractive, setIsInteractive] = useState(false);

	// Measure the color picker and adjust dimensions
	useLayoutEffect(() => {
		if(!node.current) return;

		const measure = () => window.requestAnimationFrame(() => {
			const {top, left, width, height} = node.current.getBoundingClientRect();
			setDimensions({width, height, top, left});
		});

		measure();

		window.addEventListener("resize", measure);
		// window.addEventListener("scroll", measure);

		return () => {
			window.removeEventListener("resize", measure);
			// window.removeEventListener("scroll", measure);
		};
	}, [node.current]);

	// Add event listeners, set as interactive update XY position
	useEffect(() => {
		if(!node.current) return;

		const updateXY = event => {
			console.log('yo')
			if(!isInteractive) return;
			const eventX = event.clientX || event.touches[0].clientX;
			const eventY = event.clientY || event.touches[0].clientY;
			let newX = eventX - dimensions.left;
			let newY = eventY - dimensions.top;
	
			if(newX < 0) newX = 0;
			else if(newX > dimensions.width) newX = dimensions.width;
	
			if(newY < 0) newY = 0;
			else if(newY > dimensions.height) newY = dimensions.height;

			setPosition({x: newX, y: newY});
		};

		const setInteractiveTrue = () => setIsInteractive(true);
		const setInteractiveFalse = () => setIsInteractive(false);

		node.current.addEventListener("touchstart", setInteractiveTrue, {passive: true});
		node.current.addEventListener("touchmove", updateXY, {passive: true});
		node.current.addEventListener("touchend", setInteractiveFalse, {passive: true});
		node.current.addEventListener("mousedown", setInteractiveTrue, {passive: true});
		node.current.addEventListener("mousemove", updateXY, {passive: true});
		node.current.addEventListener("mouseup", setInteractiveFalse, {passive: true});

		return () => {
			node.current.removeEventListener("touchstart", setInteractiveTrue);
			node.current.removeEventListener("touchmove", updateXY);
			node.current.removeEventListener("touchend", setInteractiveFalse);
			node.current.removeEventListener("mousedown", setInteractiveTrue);
			node.current.removeEventListener("mousemove", updateXY);
			node.current.removeEventListener("mouseup", setInteractiveFalse);
		};
	}, [node.current, dimensions, isInteractive]);

	const updateColor = (h, x, y, a) => {
		const newHSVA = [h, x / dimensions.width, 1 - y / dimensions.height, a];
		const hex = HSVAtoHEX(newHSVA);
		setColor(hex);
		setInputColor(hex);
	}

	const handleHue = (event) => {
		const newHue = event.target.value;
		setHue(newHue);
		updateColor(newHue, position.x, position.y, alpha);
	}

	const handleAlpha = (event) => {
		const newAlpha = event.target.value;
		setAlpha(newAlpha);
		updateColor(hue, position.x, position.y, newAlpha);
	}

	// Change the color when the inputted color changes
	useEffect(() => {
		const colorStringData = colorString.get(inputColor.toLowerCase());
		const validColor = colorStringData && colorStringData.value || [255,255,255,1];
		const [h,s,v,a] = RGBAtoHSVA(validColor);
		const {width, height} = node.current.getBoundingClientRect();
		if(inputColor !== color && validColor){
			setColor(inputColor);
			setHue(h);
			setAlpha(a);
			setPosition({x: width * s, y: height - (v * height)});
		}
	}, [inputColor]);

	// Update the color when the X and Y value changes
	useEffect(() => {
		if(position.x && position.y){
			updateColor(hue, position.x, position.y, alpha);
		}
	}, [position]);

	return (
		<div>
			<div ref={node} className={style.ColorPicker}>
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
					style={{transform: `translate(${position.x}px, ${position.y}px)`}}
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
