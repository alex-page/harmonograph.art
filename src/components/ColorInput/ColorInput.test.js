import {h} from 'preact';
import {shallow} from 'enzyme';

import ColorInput from '.';
import Label from '../Label';

describe('id', () => {
	test('id', () => {
		const context = shallow(
			<ColorInput
				label="Background color"
				id="backgroundColor"
				defaultValue={'#000'}
				onChange={() => null}
			/>
		);

		expect(context.find('button').props().id).toBe('swatch-backgroundColor');
		expect(context.find('input').props().id).toBe('backgroundColor');
		expect(context.find(Label).props().id).toBe('backgroundColor');
	});
});

describe('label', () => {
	test('label', () => {
		const context = shallow(
			<ColorInput
				label="Background color"
				id="backgroundColor"
				defaultValue={'#000'}
				onChange={() => null}
			/>
		);

		expect(context.find(Label).props().children).toBe('Background color');
	});
});

describe('defaultValue', () => {
	test('defaultValue', () => {
		const context = shallow(
			<ColorInput
				label="Background color"
				id="backgroundColor"
				defaultValue={'#000'}
				onChange={() => null}
			/>
		);

		expect(context.find('button').props().style.backgroundColor).toBe('#000');
		expect(context.find('input').props().value).toBe('#000');
	})
})

