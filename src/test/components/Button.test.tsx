import { Button } from '../../components/Button';
import { fireEvent, render, screen } from '@testing-library/react';

const handleClick = (div: HTMLElement) => {
	div.classList.add('clicked');
};
const getButton = () => screen.getByText('Hello');
const getDiv = () => screen.getByText('Test');

describe('Button, enabled', () => {
	beforeEach(() => {
		render(
			<>
				<Button
					text="Hello"
					textColor="text-white"
					bgColor="bg-black"
					hoverColor="hover:bg-gray-900"
					handleClick={() => handleClick(getDiv())}
					isDisabled={false}
				/>
				<div>Test</div>
			</>
		);
	});

	test('Button is displaying correctly', () => {
		const button = getButton();

		expect(button).toBeDefined();

		expect(button.textContent).toBe('Hello');

		expect(button.className).toContain('text-white bg-black hover:bg-gray-900');

		expect(button.className).not.toContain(
			'text-white/50 bg-slate-950 cursor-default'
		);
	});

	test('Button is clickable', () => {
		const button = getButton();
		const p = getDiv();

		expect(button).toBeDefined();
		expect(p).toBeDefined();

		expect(p.classList.contains('clicked')).toBeFalsy();

		fireEvent.click(button);

		expect(p.classList.contains('clicked')).toBeTruthy();
	});
});

describe('Button, disabled', () => {
	beforeEach(() => {
		render(
			<>
				<Button
					text="Hello"
					textColor="text-white"
					bgColor="bg-black"
					hoverColor="hover:bg-gray-900"
					handleClick={() => handleClick(getDiv())}
					isDisabled={true}
				/>
				<p>Test</p>
			</>
		);
	});

	test('Button is displaying correctly', () => {
		const button = getButton();

		expect(button).toBeDefined();

		expect(button.textContent).toBe('Hello');

		expect(button.className).toContain(
			'text-white/50 bg-slate-950 cursor-default'
		);

		expect(button.className).not.toContain(
			'text-white bg-black hover:bg-gray-900'
		);
	});

	test('Button is not clickable', () => {
		const button = getButton();
		const p = getDiv();

		expect(button).toBeDefined();
		expect(p).toBeDefined();

		expect(p.classList.contains('clicked')).toBeFalsy();

		fireEvent.click(button);

		expect(p.classList.contains('clicked')).toBeFalsy();
	});
});
