export interface ButtonProps {
	text: string;
	textColor: string;
	bgColor: string;
	hoverColor?: string;
	handleClick: () => void;
	isDisabled: boolean;
}

export const Button = ({
	text,
	textColor,
	bgColor,
	hoverColor,
	handleClick,
	isDisabled,
}: ButtonProps) => {
	const buttonStyle = isDisabled
		? 'text-white/50 bg-slate-950 cursor-default'
		: `${textColor} ${bgColor} ${hoverColor} hover:scale-105 hover:shadow-lg active:scale-100`;

	return (
		<button
			className={`${buttonStyle} flex gap-2 justify-center px-4 py-2 rounded-md shadow duration-200 min-w-fit min-h-fit`}
			onClick={isDisabled ? () => {} : handleClick}
		>
			{text}
		</button>
	);
};
