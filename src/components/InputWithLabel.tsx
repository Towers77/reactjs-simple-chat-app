import { ChangeEvent, useState } from 'react';

export interface InputWithLabelProps {
	label: string;
	maxLength: number;
	type: string;
	errorText: string;
	handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithLabel = ({
	label,
	maxLength,
	type,
	errorText,
	handleChange,
}: InputWithLabelProps) => {
	const [labelColor, setLabelColor] = useState('text-slate-700');

	const showErrorText = errorText !== '';

	const handleFocus = () => {
		setLabelColor('text-slate-400');
	};

	const handleBlur = () => {
		setLabelColor('text-slate-700');
	};
	return (
		<label className="flex flex-col">
			<div className="flex justify-between">
				<span
					className={`${
						showErrorText ? 'text-red-600' : labelColor
					} duration-200`}
				>
					{label}
				</span>
				{showErrorText && (
					<span className="text-red-600 text-xs duration-200 self-center max-w-2/3 text-end">
						{errorText}
					</span>
				)}
			</div>
			<input
				name="label"
				className={`bg-transparent outline-none border-b ${
					showErrorText
						? 'border-red-600 text-red-600'
						: `border-slate-700 focus:border-slate-500 ${labelColor}`
				} py-1 px-2  duration-300 ease-out focus:scale-105`}
				type={type}
				maxLength={maxLength}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</label>
	);
};
