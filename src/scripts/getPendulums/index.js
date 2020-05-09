import {randomPendulums} from '@harmonograph/svg';

const getPendulums = (pendulums) => {
	if(!pendulums){
		return randomPendulums();
	}

	const newPendulums = [];
	const pendulumArray = pendulums.split('+').map(value => Number(value));
	for (let i = 0; i < pendulumArray.length; i += 4) {
		newPendulums.push({
			amplitude: pendulumArray[i],
			frequency: pendulumArray[i + 1],
			phase: pendulumArray[i + 2],
			damping: pendulumArray[i + 3]
		});
	}

	return newPendulums;
}

export default getPendulums;