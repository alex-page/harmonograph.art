import {h, createRef, Fragment} from 'preact';
import {useState} from 'preact/hooks';
import {useClipboard} from 'use-clipboard-copy';
import {harmonographBezierPath, getPathLength} from '@harmonograph/svg';

import pkg from '../../../package.json';
import getPendulums from '../../scripts/getPendulums';
import getColor from '../../scripts/getColor';
import useInterval from '../../hooks/useInterval';

import style from './style.css';

import Scrollable from '../Scrollable';
import Button from '../Button';
import ColorPicker from '../ColorPicker';
import HarmonographSVG from '../HarmonographSvg';
import RangeSlider from '../RangeSlider';
import IconMenu from '../IconMenu';
import {SidebarHeader, SidebarFooter, SidebarMain} from '../Sidebar';
import {
	DownloadIcon,
	RandomIcon,
	ShareIcon,
	PauseIcon,
	PlayIcon,
	SuccessIcon
} from '../Icons';

const Page = ({
	strokeColorQuery,
	backgroundColorQuery,
	strokeWidthQuery,
	strokePercentageQuery,
	isDrawingQuery,
	pendulumsQuery
}) => {
	const [strokeColor, setStrokeColor] = useState(() => getColor(strokeColorQuery));
	const [backgroundColor, setBackgroundColor] = useState(() => getColor(backgroundColorQuery));
	const [strokeWidth, setStrokeWidth] = useState(strokeWidthQuery || 1);
	const [strokePercentage, setStrokePercentage] = useState(strokePercentageQuery || 0);
	const [isDrawing, setIsDrawing] = useState(isDrawingQuery !== 'false');
	const [pendulums, setPendulums] = useState(() => getPendulums(pendulumsQuery));
	const [path, setPath] = useState(harmonographBezierPath(300, 700, pendulums));
	const [strokeLength, setStrokeLength] = useState(getPathLength(path));

	const harmonographSVGRef = createRef();

	const clipboard = useClipboard({ copiedTimeout: 1000 });
	const shareHarmonograph = () => {
		const path = Object.values({
			strokeColor: strokeColor.replace('#', ''),
			backgroundColor: backgroundColor.replace('#', ''),
			strokeWidth,
			strokePercentage,
			isDrawing,
			pendulums: pendulums.flatMap(pendulum => Object.values(pendulum)).join('+')
		}).join('/');

		const url = `${window.location.origin}/${path}/`;
	
		if(navigator.share){
			navigator.share({ title: pkg.name, text: pkg.description, url});
			return;
		}

		clipboard.copy(url);
	};

	const downloadHarmonograph = () => {
		// Create a blob from the references outerHTML
		const harmonographBlob = new Blob(
			[harmonographSVGRef.current.outerHTML],
			{type: 'image/svg+xml'}
		);

		// Create a temporary link to download the file
		const temporaryLink = document.createElement('a');
		temporaryLink.href = URL.createObjectURL(harmonographBlob);
		temporaryLink.download = 'harmonograph.svg';
		document.body.append(temporaryLink);
		temporaryLink.click();
		temporaryLink.remove();
	};

	const randomHarmonograph = () => {
		const newPendulums = getPendulums();
		const path = harmonographBezierPath(300, 700, newPendulums);
		setPendulums(newPendulums);
		setPath(path);
		setStrokePercentage(0);
		setStrokeLength(getPathLength(path));
		setStrokeColor(getColor());
		setBackgroundColor(getColor());
		setIsDrawing(true);
	};

	// Draw the harmonograph every second
	useInterval(() => {
		if (strokePercentage === '60') {
			setIsDrawing(false);
			return;
		}

		setStrokePercentage((Number(strokePercentage) + 1).toString());
	}, isDrawing ? 1000 : null);

	return (
		<div className={style.PageLayout}>
			<aside className={style.PageAside}>
				<Scrollable>
					<SidebarHeader title={`${pkg.name} - v${pkg.version}`}>
						<p>{pkg.description}</p>
						<Button rotateIcon isSecondary onClick={randomHarmonograph}>
							<RandomIcon /> Randomise harmonograph
						</Button>
					</SidebarHeader>
					<SidebarMain>
						<ColorPicker
							label="Stroke color"
							id="strokeColor"
							popoverOpen={false}
							defaultValue={strokeColor}
							onChange={setStrokeColor}
						/>
						<ColorPicker
							label="Background color"
							id="backgroundColor"
							popoverOpen={false}
							defaultValue={backgroundColor}
							onChange={setBackgroundColor}
						/>
						<RangeSlider
							label="Stroke width"
							min="0.25"
							max="2.5"
							step="0.25"
							id="strokeWidth"
							defaultValue={strokeWidth}
							onInput={setStrokeWidth}
						/>
						<RangeSlider
							label="Stroke length"
							min="0"
							max="60"
							defaultValue={strokePercentage}
							step="1"
							id="strokePercentage"
							onInput={value => {
								setStrokePercentage(value);
								setIsDrawing(false);
							}}
						>
							<Button
								isSecondary
								onClick={() => {
									setIsDrawing(!isDrawing);
									if (!isDrawing && Number(strokePercentage) < 60) {
										setStrokePercentage((Number(strokePercentage) + 1).toString());
									}
								}}
							>
								{
									isDrawing
										? <Fragment><PauseIcon /> Pause</Fragment>
										: <Fragment><PlayIcon /> Play</Fragment>
								}
							</Button>
						</RangeSlider>
					</SidebarMain>
				</Scrollable>
				<SidebarFooter>
					<Button
						onClick={shareHarmonograph}
					>
						{
							clipboard.copied
								? <><SuccessIcon /> Copied</>
								: <><ShareIcon /> Share</>
						}
						
					</Button>
					<Button onClick={downloadHarmonograph}>
						<DownloadIcon />Download
					</Button>
				</SidebarFooter>
			</aside>
			<main className={style.PageMain}>
				<HarmonographSVG
					ref={harmonographSVGRef}
					strokeColor={strokeColor}
					backgroundColor={backgroundColor}
					strokeWidth={strokeWidth}
					pendulums={pendulums}
					strokePercentage={strokePercentage}
					isDrawing={isDrawing}
					path={path}
					strokeLength={strokeLength}
				/>
			</main>
			<nav className={style.PageNav}>
				<IconMenu />
			</nav>
		</div>
	)
}

export default Page;