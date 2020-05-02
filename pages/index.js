import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
	randomPendulums,
	getPathLength,
	harmonographBezierPath
} from '@harmonograph/svg';

import pkg from '../package.json';

import HarmonographSVG from '../components/harmonograph-svg';
import IconMenu from '../components/icon-menu';
import AppLayout from '../components/app-layout';
import ColorPicker from '../components/color-picker';
import RangeSlider from '../components/range-slider';
import Button from '../components/button';
import Scrollable from '../components/scrollable';
import useInterval from '../components/use-interval';
import Sidebar, {
	SidebarHeader,
	SidebarFooter,
	SidebarMain
} from '../components/sidebar';
import {
	AuthorIcon,
	GitHubIcon,
	TwitterIcon,
	DownloadIcon,
	RandomIcon,
	ShareIcon,
	PauseIcon,
	PlayIcon,
	Logo
} from '../components/icons';

const generateRandomHex = () => '#' + Math.random().toString(16).slice(2, 8)
	.toString(16)
	.toUpperCase();

const Index = props => {
	const harmonographSVGRef = React.createRef();

	const [strokeColor, setStrokeColor] = useState(props.strokeColor);
	const [backgroundColor, setBackgroundColor] = useState(props.backgroundColor);
	const [strokeWidth, setStrokeWidth] = useState(props.strokeWidth);
	const [strokePercentage, setStrokePercentage] = useState(props.strokePercentage);
	const [strokeLength, setStrokeLength] = useState(props.strokeLength);
	const [pendulums, setPendulums] = useState(props.pendulums);
	const [path, setPath] = useState(props.path);
	const [isDrawing, setIsDrawing] = useState(props.isDrawing);

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

	const shareHarmonograph = () => {
		const url = window.location.href.split('?')[0];
		const queryObject = {
			strokeColor,
			backgroundColor,
			strokeWidth,
			strokePercentage,
			isDrawing,
			pendulums: pendulums.flatMap(pendulum => Object.values(pendulum)).join('+')
		};

		const query = Object.values(queryObject).map(value => {
			return `${value.toString().replace('#', '')}`;
		}).join(',');

		if (navigator.share) {
			navigator.share({
				title: 'harmonograph.art',
				text: 'Do you like my harmonograph?',
				url: `${url}?h=${query}`
			});
		} else if (navigator.clipboard) {
			navigator.clipboard.writeText(`${url}?h=${query}`);
		}
	};

	const newHarmonograph = () => {
		const newPendulums = randomPendulums();
		const newPath = harmonographBezierPath(300, 700, newPendulums);
		const newStrokeLength = getPathLength(newPath).toString();
		setPendulums(newPendulums);
		setPath(newPath);
		setStrokeLength(newStrokeLength);
		setStrokeColor(generateRandomHex());
		setBackgroundColor(generateRandomHex());
		setStrokePercentage('0');
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
		<>
			<Head>
				<title>{pkg.name} - v{pkg.version}</title>
				<meta name="description" content={pkg.description}/>
				<meta name="theme-color" content="#3FD562"/>
				<link rel="manifest" href="manifest.json"/>
				<link rel="icon" type="image/png" href="favicon.png"/>
				<link rel="apple-touch-icon" href="icon-apple.png"/>
			</Head>
			<AppLayout>
				<Sidebar>
					<Scrollable>
						<SidebarHeader title={`${pkg.name} - v${pkg.version}`}>
							<p>{pkg.description}</p>
							<Button isSecondary onClick={newHarmonograph}>
								<><RandomIcon/> Randomise</>
							</Button>
							<Button
								isSecondary
								onClick={() => {
									setIsDrawing(!isDrawing);
									if (!isDrawing && Number(strokePercentage) < 60) {
										setStrokePercentage((Number(strokePercentage) + 1).toString());
									}
								}}
							>
								{isDrawing ? <><PauseIcon/> Pause</> : <><PlayIcon/> Play</>}
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
								onChange={setStrokeWidth}
							/>
							<RangeSlider
								label="Stroke length"
								min="0"
								max="60"
								defaultValue={strokePercentage}
								step="1"
								id="strokePercentage"
								onChange={value => {
									setStrokePercentage(value);
									setIsDrawing(false);
								}}
							/>
						</SidebarMain>
					</Scrollable>
					<SidebarFooter>
						<Button onClick={shareHarmonograph}>
							<><ShareIcon/>Share</>
						</Button>
						<Button onClick={downloadHarmonograph}>
							<><DownloadIcon/>Download</>
						</Button>
					</SidebarFooter>
				</Sidebar>
				<main id="app">
					<HarmonographSVG
						ref={harmonographSVGRef}
						strokeColor={strokeColor}
						backgroundColor={backgroundColor}
						strokeWidth={strokeWidth}
						path={path}
						strokePercentage={strokePercentage}
						strokeLength={strokeLength}
						isDrawing={isDrawing}
					/>
					<noscript>
						The application requires JavaScript to work 💔.
					</noscript>
				</main>
				<IconMenu items={[
					{
						text: pkg.name,
						href: '/',
						icon: <Logo/>
					}, {
						text: 'GitHub',
						href: pkg.homepage,
						icon: <GitHubIcon/>,
						target: '_blank'
					}, {
						text: 'Twitter',
						href: pkg.author.twitter,
						icon: <TwitterIcon/>,
						target: '_blank'
					}, {
						text: pkg.author.name,
						href: pkg.author.url,
						icon: <AuthorIcon/>,
						target: '_blank'
					}
				]}/>
				<style jsx>{`
					main {
						order: 2;
						flex: 1 0 auto;

						position: relative;

						display: flex;
						justify-content: center;
						align-items: center;
					}
				`}
				</style>
			</AppLayout>
		</>
	);
};

Index.propTypes = {
	strokeColor: PropTypes.string.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	strokeWidth: PropTypes.string.isRequired,
	strokePercentage: PropTypes.string.isRequired,
	strokeLength: PropTypes.string.isRequired,
	isDrawing: PropTypes.bool.isRequired,
	pendulums: PropTypes.array.isRequired,
	path: PropTypes.string.isRequired
};

export async function getServerSideProps({query}) {
	const generateRandomHex = () => '#' + Math.random().toString(16).slice(2, 8)
		.toString(16)
		.toUpperCase();

	const formatPendulums = pendulumString => {
		const pendulumArray = pendulumString.split(' ').map(value => Number(value));
		const newPendulums = [];
		for (let i = 0; i < pendulumArray.length; i += 4) {
			newPendulums.push({
				amplitude: pendulumArray[i],
				frequency: pendulumArray[i + 1],
				phase: pendulumArray[i + 2],
				damping: pendulumArray[i + 3]
			});
		}

		return newPendulums;
	};

	const queryArray = query && query.h ? query.h.split(',') : [];
	const pendulums = queryArray[5] ? formatPendulums(queryArray[5]) : randomPendulums();
	const path = harmonographBezierPath(300, 700, pendulums);
	const strokeLength = getPathLength(path).toString();

	return {
		props: {
			strokeColor: queryArray[0] ? `#${queryArray[0]}` : generateRandomHex(),
			backgroundColor: queryArray[1] ? `#${queryArray[1]}` : generateRandomHex(),
			strokeWidth: queryArray[2] || '1',
			strokePercentage: queryArray[3] || '0',
			isDrawing: queryArray[4] ? queryArray[4] === 'true' : true,
			pendulums,
			path,
			strokeLength
		}
	};
}

export default Index;
