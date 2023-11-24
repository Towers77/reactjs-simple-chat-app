import { fireEvent, render, screen } from '@testing-library/react';
import { InputWithLabel } from '../../components/InputWithLabel';

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	screen.getByText('Test').classList.add(event.target.value);
};
const getInput = () => screen.getByRole('textbox') as HTMLInputElement;
const getSpan = () => screen.getByText('Hello') as HTMLSpanElement;
const getErrorSpan = () => screen.getByText('Error') as HTMLSpanElement;

describe('InputWithLabel, no error', () => {
	beforeEach(() => {
		render(
			<>
				<InputWithLabel
					label="Hello"
					maxLength={10}
					type="text"
					errorText=""
					handleChange={handleChange}
				/>
				<div>Test</div>
			</>
		);
	});

	test('InputWithLabel is displaying correctly', () => {
		const input = getInput();
		const span = getSpan();

		expect(input).toBeDefined();
		expect(span).toBeDefined();

		expect(input.type).toBe('text');

		expect(input.maxLength).toBe(10);

		expect(input.className).toContain(
			'border-slate-700 focus:border-slate-500'
		);

		expect(span.className).toContain('text-slate-700');

		expect(input.className).not.toContain('border-red-600 text-red-600');

		expect(span.className).not.toContain('text-red-600');

		expect(input.className).not.toContain('text-slate-400');
	});

	test('InputWithLabel responds to on change event', () => {
		const input = getInput();
		const div = screen.getByText('Test');

		expect(input).toBeDefined();
		expect(div).toBeDefined();

		expect(div.classList.contains('Hello')).toBeFalsy();

		fireEvent.change(input, { target: { value: 'Hello' } });

		expect(div.classList.contains('Hello')).toBeTruthy();
	});

	test('InputWithLabel responds to on focus/blur events', () => {
		const input = getInput();
		const span = getSpan();

		expect(input).toBeDefined();
		expect(span).toBeDefined();

		expect(span.className).toContain('text-slate-700');
		expect(input.className).toContain('text-slate-700');

		fireEvent.focus(input);

		expect(span.className).toContain('text-slate-400');
		expect(input.className).toContain('text-slate-400');

		fireEvent.blur(input);

		expect(span.className).toContain('text-slate-700');
		expect(input.className).toContain('text-slate-700');
	});
});

describe('InputWithLabel, with error', () => {
	beforeEach(() => {
		render(
			<>
				<InputWithLabel
					label="Hello"
					maxLength={10}
					type="text"
					errorText="Error"
					handleChange={handleChange}
				/>
				<div>Test</div>
			</>
		);
	});

	test('InputWithLabel is displaying correctly', () => {
		const input = getInput();
		const span = getSpan();
		const errorSpan = getErrorSpan();

		expect(input).toBeDefined();
		expect(span).toBeDefined();
		expect(errorSpan).toBeDefined();

		expect(input.type).toBe('text');

		expect(input.maxLength).toBe(10);

		expect(errorSpan.textContent).toBe('Error');

		expect(input.className).toContain('border-red-600 text-red-600');

		expect(span.className).toContain('text-red-600');

		expect(input.className).not.toContain(
			'border-slate-700 focus:border-slate-500'
		);

		expect(span.className).not.toContain('text-slate-700');

		expect(input.className).not.toContain('text-slate-400');
	});
});
