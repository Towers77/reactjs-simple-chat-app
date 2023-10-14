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
			className={`${textColor} ${bgColor} ${hoverColor} flex gap-2 place-items-center px-4 py-2 rounded-md shadow duration-150 hover:scale-105 active:scale-100`}
			onClick={handleClick}
		>
			{Icon}
			{text}
		</button>
	);
};

export default Button;
