import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import pkg from '../package.json';

import HarmonographSVG from '../components/harmonograph-svg';
import Sidebar from '../components/sidebar';
import IconMenu from '../components/icon-menu';
import AppLayout from '../components/app-layout';
import StackGroup from '../components/stack-group';
import ColorPicker from '../components/color-picker';
import RangeSlider from '../components/range-slider';
import Button from '../components/button';
import {
	AuthorIcon,
	GitHubIcon,
	TwitterIcon,
	DownloadIcon,
	ShuffleIcon,
	ShareIcon
} from '../components/icons';

import {
	useHarmonograph,
	useHarmonographDispatch
} from '../components/harmonograph-context';

const Index = ({query}) => {
	const harmonograph = useHarmonograph();
	const dispatch = useHarmonographDispatch();
	const harmonographSVGRef = React.createRef();

	const {
		strokeColor,
		backgroundColor,
		strokeWidth,
		strokePercentage,
		strokeLength,
		path,
		pendulums
	} = harmonograph;

	const updateHarmonograph = (key, value) => dispatch({
		type: 'UPDATE',
		key,
		value
	});

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

	const shareHarmonograph = async () => {
		const url = window.location.href.split('?')[0];
		const queryObject = {
			strokeColor,
			backgroundColor,
			strokeWidth,
			strokePercentage,
			pendulums: pendulums.flatMap(pendulum => Object.values(pendulum)).join(',')
		};

		const query = Object.entries(queryObject).map(([key, value]) => {
			return `${key}=${value.toString().replace(/#/g, '%23')}`;
		}).join('&');

		if (navigator.share) {
			await navigator.share({
				title: 'Make a Harmonograph',
				text: 'Check out my awesome harmonograph',
				url: `${url}?${query}`
			});
		} else if (navigator.clipboard) {
			await navigator.clipboard.writeText(`${url}?${query}`);
		}
	};

	// Update the length once the SVG is rendered
	useEffect(() => {
		const strokeLength = harmonographSVGRef.current.firstChild.getTotalLength();
		return dispatch({
			type: 'UPDATE',
			key: 'strokeLength',
			value: strokeLength.toString()
		});
	}, [path, harmonographSVGRef, dispatch]);

	// Update the state based on the query
	useEffect(() => {
		if (Object.keys(query).length === 0) {
			return;
		}

		const queryPendulums = query.pendulums.split(',').map(value => Number(value));
		const newPendulums = [];
		for (let i = 0; i < queryPendulums.length; i += 4) {
			newPendulums.push({
				amplitude: queryPendulums[i],
				frequency: queryPendulums[i + 1],
				phase: queryPendulums[i + 2],
				damping: queryPendulums[i + 3]
			});
		}

		const formattedQuery = {
			...query,
			pendulums: newPendulums
		};

		for (const [key, value] of Object.entries(formattedQuery)) {
			dispatch({
				type: 'UPDATE',
				key,
				value
			});
		}
	}, [query, dispatch]);

	return (
		<AppLayout>
			<Sidebar footerMessage={`${pkg.description} - v${pkg.version}`}>
				<form>
					<StackGroup>
						<ColorPicker
							label="Stroke color"
							id="strokeColor"
							defaultValue={strokeColor}
							onChange={updateHarmonograph}
						/>
						<ColorPicker
							label="Background color"
							id="backgroundColor"
							defaultValue={backgroundColor}
							onChange={updateHarmonograph}
						/>
						<RangeSlider
							label="Stroke width"
							min="0.25"
							max="2.5"
							step="0.25"
							id="strokeWidth"
							defaultValue={strokeWidth}
							onChange={updateHarmonograph}
						/>
						<RangeSlider
							label="Stroke length"
							min="0"
							max="100"
							defaultValue={strokePercentage}
							step="0.001"
							id="strokePercentage"
							onChange={updateHarmonograph}
						/>
						<Button
							isSecondary
							onClick={() => dispatch({type: 'RANDOMISE'})}
						>
							<><ShuffleIcon/> Shuffle pendulums</>
						</Button>
						<Button onClick={shareHarmonograph}>
							<><ShareIcon/> Share</>
						</Button>
						<Button onClick={downloadHarmonograph}>
							<><DownloadIcon/> Download</>
						</Button>
					</StackGroup>
				</form>
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
				/>
				<noscript>
					The application requires JavaScript to work 💔.
				</noscript>
			</main>
			<IconMenu items={[
				{
					text: pkg.name,
					href: '/',
					icon: pkg.emoji
				}, {
					text: 'GitHub',
					href: pkg.homepage,
					icon: <GitHubIcon/>
				}, {
					text: 'Twitter',
					href: pkg.author.twitter,
					icon: <TwitterIcon/>
				}, {
					text: pkg.author.name,
					href: pkg.author.url,
					icon: <AuthorIcon/>
				}
			]}/>
			<style jsx>{`
				main {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					max-height: 100%;
				}
				form {
					padding: 20px;
					overflow-y: auto;
				}
			`}
			</style>
		</AppLayout>
	);
};

Index.propTypes = {
	query: PropTypes.object
};

export async function getServerSideProps({query}) {
	return {
		props: {
			query
		}
	};
}

export default Index;
