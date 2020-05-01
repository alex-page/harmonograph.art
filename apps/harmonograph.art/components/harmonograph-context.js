import React, {useContext, useReducer, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
	randomPendulums,
	harmonographBezierPath
} from '@harmonograph/svg';

const HarmonographStateContext = React.createContext();
const HarmonographDispatchContext = React.createContext();

// This is now running once on server
// This should run once on the client side and for every refresh
// This should not run when props are changing
const pendulums = randomPendulums();
const initialState = {
	strokeColor: '#FFCA09',
	backgroundColor: '#663399',
	strokeWidth: "1",
	strokePercentage: "20",
	strokeLength: "0",
	pendulums,
	path: harmonographBezierPath(150, 700, pendulums)
};

export const HarmonographProvider = ({children}) => {
	const reducer = (state, action) => {
		console.log('yo', state[action.key]);
		switch (action.type) {
			case 'UPDATE': {
				if (state[action.key] === action.value) {
					return state;
				}

				const updatedState = {
					[action.key]: action.value
				};

				if (action.key === 'pendulums') {
					updatedState.path = harmonographBezierPath(700, 600, action.value);
				}

				return {
					...state,
					...updatedState
				};
			}

			case 'RANDOMISE': {
				const newPendulums = randomPendulums();
				const newPath = harmonographBezierPath(700, 600, newPendulums);

				return {
					...state,
					pendulums: newPendulums,
					path: newPath
				};
			}

			default: {
				throw new Error(`Unhandled action type: ${action.type}`);
			}
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<HarmonographDispatchContext.Provider value={dispatch}>
			<HarmonographStateContext.Provider value={state}>
				{children}
			</HarmonographStateContext.Provider>
		</HarmonographDispatchContext.Provider>
	);
};

HarmonographProvider.propTypes = {
	children: PropTypes.element.isRequired
};

export const useHarmonograph = () => useContext(HarmonographStateContext);
export const useHarmonographDispatch = () => useContext(HarmonographDispatchContext);
