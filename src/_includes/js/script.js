import Alpine from 'alpinejs';
import colorString from 'color-string';
import {harmonographBezierPath} from '@harmonograph/svg';

import {
	getPendulums,
	getColor,
	rgbaToHsva,
	hsvaToHex
} from './utils';

// Start apline
Alpine.start();

window.getInitialData = () => {
	const queryString = window.location.search.replace('?h=', '').split('+');
	const strokeColor = getColor(queryString[0]);
	const backgroundColor = getColor(queryString[1]);
	const pendulums = getPendulums(queryString[5]);
	const path = harmonographBezierPath(150, 700, pendulums);

	return {
		strokeWidth: queryString[2] || 1,
		drawTime: Number(queryString[3]) || 0,
		drawTimeInterval: null,
		isDrawing: queryString[4] !== 'false',
		backgroundColor,
		backgroundColorInput: backgroundColor,
		strokeColor,
		strokeColorInput: strokeColor,
		pathLength: null,
		path,
		pendulums,
		isCopying: false,
		backgroundColorPicker: {
			x: 0,
			y: 0,
			open: false,
			interactive: false,
			hue: 0,
			alpha: 1,
			rect: {}
		},
		strokeColorPicker: {
			x: 0,
			y: 0,
			open: false,
			interactive: false,
			hue: 0,
			alpha: 1,
			rect: {}
		},

		initApp() {
			this.setUpColorPicker('strokeColor');
			this.setUpColorPicker('backgroundColor');
			this.getPathLength();
			this.isDrawing = queryString[4] !== 'false';
			this.$nextTick(() => {
				this.startAnimation();
			});
		},

		getPathLength() {
			this.$nextTick(() => {
				const path = this.$refs.svg.querySelector('path');
				this.pathLength = path.getTotalLength();
			});
		},

		randomise() {
			const pendulums = getPendulums();
			this.pendulums = pendulums;
			this.backgroundColor = getColor();
			this.strokeColor = getColor();
			this.pathLength = null;
			this.path = harmonographBezierPath(150, 700, pendulums);
			this.setUpColorPicker('backgroundColor');
			this.setUpColorPicker('strokeColor');
			history.pushState(null, '', '?');
			this.getPathLength();
			this.pauseAnimation();
		},

		download() {
			const harmonographSVG = this.$refs.svg.cloneNode(true);
			const path = harmonographSVG.firstElementChild;
			harmonographSVG.removeAttribute(':style');
			harmonographSVG.removeAttribute('x-ref');
			path.removeAttribute(':stroke');
			path.removeAttribute(':stroke-width');
			path.removeAttribute(':d');
			path.removeAttribute(':style');

			const harmonographBlob = new Blob(
				[harmonographSVG.outerHTML],
				{type: 'image/svg+xml'}
			);

			// Create a temporary link to download the file
			const temporaryLink = document.createElement('a');
			temporaryLink.href = URL.createObjectURL(harmonographBlob);
			temporaryLink.download = 'harmonograph.svg';
			document.body.append(temporaryLink);
			temporaryLink.click();
			temporaryLink.remove();
		},

		async share() {
			const path = Object.values({
				strokeColor: this.strokeColor.replace('#', ''),
				backgroundColor: this.backgroundColor.replace('#', ''),
				strokeWidth: this.strokeWidth,
				drawTime: this.drawTime,
				isDrawing: this.isDrawing,
				pendulums: this.pendulums.flatMap(pendulum => Object.values(pendulum)).join(',')
			}).join('+');

			const url = `${window.location.origin}/?h=${path}`;

			if (navigator.share) {
				await navigator.share({
					title: document.title,
					text: document.querySelector('meta[name="description"]').content,
					url
				});
			} else {
				await navigator.clipboard.writeText(url);
			}
		},

		startAnimation() {
			if (!this.isDrawing) {
				return;
			}

			this.drawTimeInterval = setInterval(() => {
				this.drawTime += 1;
				if (this.drawTime >= 100) {
					this.pauseAnimation();
				}
			}, 1000);
		},

		playAnimation() {
			this.isDrawing = true;
			this.startAnimation();
		},

		pauseAnimation() {
			if (this.drawTimeInterval) {
				this.isDrawing = false;
				clearInterval(this.drawTimeInterval);
			}
		},

		resetAnimation() {
			this.drawTime = 0;
			this.playAnimation();
		},

		skipForward() {
			if (this.drawTime + 5 >= 100) {
				this.drawTime = 100;
			}

			this.drawTime += 5;
		},

		skipBackward() {
			if (this.drawTime - 5 <= 0) {
				this.drawTime = 0;
			}

			this.drawTime -= 5;
		},

		scrollTo(key, scrollableElement) {
			const labelKey = `${key}Label`;
			const isScrollable = scrollableElement.scrollHeight > scrollableElement.clientHeight;
			if (!isScrollable) {
				return;
			}

			const topOffset = this.$refs[labelKey].offsetTop - scrollableElement.offsetTop;
			scrollableElement.scrollTo({top: topOffset});
			this.setUpColorPicker(key);
		},

		updateHue(hue, key) {
			const pickerKey = `${key}Picker`;

			const hexColor = hsvaToHex([
				hue,
				this[pickerKey].x / this[pickerKey].rect.width,
				1 - (this[pickerKey].y / this[pickerKey].rect.height),
				this[pickerKey].alpha
			]);

			this[pickerKey].hue = hue;
			this[key] = hexColor;
			this[`${key}Input`] = hexColor;
		},

		updateAlpha(alpha, key) {
			const pickerKey = `${key}Picker`;

			const hexColor = hsvaToHex([
				this[pickerKey].hue,
				this[pickerKey].x / this[pickerKey].rect.width,
				1 - (this[pickerKey].y / this[pickerKey].rect.height),
				alpha
			]);

			this[pickerKey].alpha = alpha;
			this[key] = hexColor;
			this[`${key}Input`] = hexColor;
		},

		getRgbColor(color) {
			const rgbValues = colorString.get(color);
			return rgbValues ? rgbValues.value : null;
		},

		updateColor(key) {
			const inputKey = `${key}Input`;
			const rgbValues = this.getRgbColor(this[inputKey]);
			if (!rgbValues) {
				return;
			}

			this[key] = this[inputKey];
			this.setUpColorPicker(key, rgbValues);
		},

		setUpColorPicker(key, color) {
			const rgbValues = color ? color : this.getRgbColor(this[key]);

			const pickerKey = `${key}Picker`;
			const pickerRef = `${key}Swatch`;

			const [h, s, v, a] = rgbaToHsva(rgbValues);
			this.$refs[pickerRef].parentElement.style.display = 'block';
			this[pickerKey].rect = this.$refs[pickerRef].getBoundingClientRect();
			this.$refs[pickerRef].parentElement.style.display = 'none';

			this[pickerKey].hue = h;
			this[pickerKey].alpha = a;
			this[pickerKey].x = this[pickerKey].rect.width * s;
			this[pickerKey].y = this[pickerKey].rect.height - (v * this[pickerKey].rect.height);
		},

		updateXY(event, key) {
			const pickerKey = `${key}Picker`;

			if (!event.clientX && !event.touches) {
				return;
			}

			const eventX = event.clientX || event.touches[0].clientX;
			const eventY = event.clientY || event.touches[0].clientY;

			let x = eventX - this[pickerKey].rect.left;
			let y = eventY - this[pickerKey].rect.top;

			const {width, height} = this[pickerKey].rect;

			if (x < 0) {
				x = 0;
			} else if (x > width) {
				x = width;
			}

			if (y < 0) {
				y = 0;
			} else if (y > height) {
				y = height;
			}

			const hexColor = hsvaToHex([
				this[pickerKey].hue,
				x / width,
				1 - (y / height),
				this[pickerKey].alpha
			]);

			this[key] = hexColor;
			this[`${key}Input`] = hexColor;
			this[pickerKey].x = x;
			this[pickerKey].y = y;
		}
	};
};
