const getColor = (color) => {
	return color
		? `#${color}`
		: `#${  Math.random().toString(16).slice(2, 8).toString(16).toUpperCase()}`;
}

export default getColor;
