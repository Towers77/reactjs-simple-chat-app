import { useState } from 'react';

interface InputWithLabelProps {
	label: string;
	maxLength: number;
	type: string;
	handleChange?: () => void;
}

const InputWithLabel = ({
	label,
	maxLength,
	type,
	handleChange,
}: InputWithLabelProps) => {
	const [labelColor, setLabelColor] = useState('text-navy-light');

	const handleFocus = () => {
		setLabelColor('text-oxford');
	};

	const handleBlur = () => {
		setLabelColor('text-navy-light');
	};
	return (
		<label className="flex flex-col">
			<span className={`${labelColor} duration-200`}>{label}</span>
			<input
				className="bg-transparent outline-none border-b border-navy-light py-1 px-2 focus:border-oxford duration-300 ease-out focus:scale-105"
				type={type}
				maxLength={maxLength}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</label>
	);
};

export default InputWithLabel;
