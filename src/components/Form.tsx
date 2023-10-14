import { Button, ButtonProps } from './Button';
import { InputWithLabel, InputWithLabelProps } from './InputWithLabel';

interface FormProps {
	title: string;
	inputPropsList: InputWithLabelProps[];
	submitButtonProps: ButtonProps;
	belowText?: string;
	belowTextClickable?: string;
	handleClickText: () => void;
}

const Form = ({
	title,
	inputPropsList,
	submitButtonProps,
	belowText,
	belowTextClickable,
	handleClickText,
}: FormProps) => {
	return (
		<div className="m-10 flex flex-col gap-10">
			<span className="text-3xl">{title}</span>
			{inputPropsList.map((elem, index) => {
				return (
					<InputWithLabel
						key={index}
						label={elem.label}
						type={elem.type}
						maxLength={elem.maxLength}
						handleChange={elem.handleChange}
					/>
				);
			})}
			<div className="flex justify-center">
				<Button
					text={submitButtonProps.text}
					textColor={submitButtonProps.textColor}
					bgColor={submitButtonProps.bgColor}
					handleClick={submitButtonProps.handleClick}
				/>
			</div>
			<span className="text-navy-light self-center">{belowText}</span>
			<span
				className="text-navy-light cursor-pointer self-center hover:underline hover:text-navy duration-100"
				onClick={handleClickText}
			>
				{belowTextClickable}
			</span>
		</div>
	);
};

export default Form;
