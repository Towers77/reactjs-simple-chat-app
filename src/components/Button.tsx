import { ReactNode } from 'react';

interface ButtonProps {
	text?: string;
	Icon?: ReactNode;
	textColor: string;
	bgColor: string;
	hoverColor?: string;
	handleClick: () => void;
}

const Button = ({
	text,
	Icon,
	textColor,
	bgColor,
	hoverColor,
	handleClick,
}: ButtonProps) => {
	return (
		<button
			className={`${textColor} ${bgColor} ${hoverColor} flex gap-2 justify-center px-4 py-2 rounded-md shadow duration-200 hover:scale-105 hover:shadow-lg active:scale-100 min-w-fit min-h-fit`}
			onClick={handleClick}
		>
			{Icon}
			{text}
		</button>
	);
};

export default Button;
