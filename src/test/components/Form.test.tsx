import { fireEvent, render, screen } from '@testing-library/react';
import { Form } from '../../components/Form';

const inputPropsList = [
	{
		label: 'Test',
		type: 'text',
		maxLength: 10,
		errorText: '',
		handleChange: () => {},
	},
	{
		label: 'Test2',
		type: 'text2',
		maxLength: 10,
		errorText: '',
		handleChange: () => {},
	},
];

const submitButtonProps = {
	text: 'Test',
	textColor: 'text-slate-700',
	bgColor: 'bg-slate-700',
	handleClick: () => {},
	isDisabled: false,
};

const handleClick = (div: HTMLElement) => {
	div.classList.add('clicked');
};

const getDiv = () => screen.getByText('Test div');
const getTitle = () => screen.getByText('title test') as HTMLSpanElement;
const getBelowText = () =>
	screen.getByText('belowText test') as HTMLSpanElement;
const getBelowTextClickable = () =>
	screen.getByText('belowTextClickable test') as HTMLSpanElement;
const getAllInputs = () => screen.getAllByRole('textbox') as HTMLInputElement[];

describe('Form', () => {
	beforeEach(() => {
		render(
			<>
				<Form
					title="title test"
					inputPropsList={inputPropsList}
					submitButtonProps={submitButtonProps}
					belowText="belowText test"
					belowTextClickable="belowTextClickable test"
					handleClickText={() => handleClick(getDiv())}
				/>
				<div>Test div</div>
			</>
		);
	});

	test('Form is displaying correctly', () => {
		const title = getTitle();
		const belowText = getBelowText();
		const belowTextClickable = getBelowTextClickable();
		const inputs = getAllInputs();

		expect(title).toBeDefined();
		expect(belowText).toBeDefined();
		expect(belowTextClickable).toBeDefined();

		expect(title.textContent).toBe('title test');
		expect(belowText.textContent).toBe('belowText test');
		expect(belowTextClickable.textContent).toBe('belowTextClickable test');

		expect(inputs.length).toBe(2);
	});

	test('Clickable text is clickable', () => {
		const div = getDiv();
		const clickableText = getBelowTextClickable();

		expect(div).toBeDefined();
		expect(clickableText).toBeDefined();

		expect(div.classList.contains('clicked')).toBeFalsy();

		fireEvent.click(clickableText);

		expect(div.classList.contains('clicked')).toBeTruthy();
	});
});
