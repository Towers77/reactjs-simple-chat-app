import { useState } from 'react';
import { ButtonProps } from '../components/Button';
import { Header } from '../components/Header';
import { InputWithLabelProps } from '../components/InputWithLabel';
import { Transition } from '@headlessui/react';
import Form from '../components/Form';
import { ChatBubble } from '../components/ChatBubble';

const Home = () => {
	const [activeForm, setActiveForm] = useState('register');

	const handleRegister = () => {};

	const registerInputs: InputWithLabelProps[] = [
		{
			label: 'Username',
			type: 'text',
			maxLength: 25,
			handleChange: () => {},
		},
		{
			label: 'Email',
			type: 'text',
			maxLength: 256,
			handleChange: () => {},
		},
		{
			label: 'Password',
			type: 'password',
			maxLength: 256,
			handleChange: () => {},
		},
	];

	const loginInputs: InputWithLabelProps[] = [
		{
			label: 'Email',
			type: 'text',
			maxLength: 256,
			handleChange: () => {},
		},
		{
			label: 'Password',
			type: 'password',
			maxLength: 256,
			handleChange: () => {},
		},
	];

	const registerButton: ButtonProps = {
		text: 'Sign In',
		textColor: 'text-almond',
		bgColor: 'bg-oxford',
		handleClick: handleRegister,
	};

	const loginButton: ButtonProps = {
		text: 'Log In',
		textColor: 'text-almond',
		bgColor: 'bg-oxford',
		handleClick: () => {},
	};

	return (
		<>
			<Header />
			<main className="absolute left-1/2 top-1/2 w-4/6 h-4/6 -translate-x-1/2 -translate-y-1/2 bg-almond shadow-lg text-oxford font-fira-code rounded-sm grid grid-cols-2">
				<Transition
					show={activeForm === 'register'}
					enter="transition-opacity duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-0"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Form
						title="Sign In"
						inputPropsList={registerInputs}
						submitButtonProps={registerButton}
						handleClickText={() => setActiveForm('login')}
						belowText="Already have an account?"
						belowTextClickable="Log In!"
					/>
				</Transition>
				<Transition
					show={activeForm === 'login'}
					enter="transition-opacity duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-0"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Form
						title="Log In"
						inputPropsList={loginInputs}
						submitButtonProps={loginButton}
						handleClickText={() => setActiveForm('register')}
						belowText="Don't have an account?"
						belowTextClickable="Sign In!"
					/>
				</Transition>
				<div className="bg-oxford absolute w-1/2 h-full right-0 py-20 px-32 flex flex-col gap-6">
					<span className="text-almond text-xl">
						Chat with anyone, <br /> from anywhere.
					</span>
					<div className="h-full w-full bg-almond rounded shadow-xl flex flex-col-reverse">
						<ChatBubble
							type="chat-end"
							message="Good, still working on that chat app..."
							sender="Robert"
							sentAt={new Date(2023, 10, 14, 16, 6)}
						/>
						<ChatBubble
							type="chat-start"
							message="How've you been?"
							sentAt={new Date(2023, 10, 14, 16, 4)}
						/>
						<ChatBubble type="chat-start" message="Hey!" sender="Karen" />

						<ChatBubble
							type="chat-end"
							message="Hello there!"
							sender="Robert"
							sentAt={new Date(2023, 10, 14, 16)}
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
