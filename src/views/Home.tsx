import { ChangeEvent, useState } from 'react';
import { ButtonProps } from '../components/Button';
import { Header } from '../components/Header';
import { InputWithLabelProps } from '../components/InputWithLabel';
import { Transition } from '@headlessui/react';
import Form from '../components/Form';
import { ChatBubble } from '../components/ChatBubble';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const emailRegex = new RegExp('/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i');

export const Home = () => {
	// Form input states
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	// Form validation errors state
	const [usernameError, setUsernameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	// Form to show state
	const [activeForm, setActiveForm] = useState('register');

	const navigate = useNavigate();

	const handleRegister = async () => {
		try {
			// Form validations
			if (username === '') {
				setUsernameError('Please enter a username');
				return;
			}
			if (username.length < 3) {
				setUsernameError('Username must be atleast 3 characters long');
				return;
			}
			if (emailRegex.test(email)) {
				setEmailError('Please enter a valid email address');
				return;
			}
			if (password === '') {
				setPasswordError('Please enter a password');
				return;
			}
			if (password.length < 6) {
				setPasswordError('Password must be atleast 6 characters long');
				return;
			}

			setActiveForm('none');
			await axios.post(
				'http://localhost:3000/api/v1/auth/register',
				{
					username,
					email,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			setActiveForm('login');
		} catch (error) {
			setActiveForm('register');
			if (error instanceof Error) console.log(error);
		}
	};

	const handleLogin = async () => {
		try {
			if (emailRegex.test(email)) {
				setEmailError('Please enter a valid email address');
				return;
			}
			if (password === '') {
				setPasswordError('Please enter a password');
				return;
			}
			if (password.length < 6) {
				setPasswordError('Password must be atleast 6 characters long');
				return;
			}

			const response = await axios.post(
				'http://localhost:3000/api/v1/auth/login',
				{
					email,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);

			navigate(`/profile/${response.data.id}`);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				if (
					error.response?.data.message ===
					'Provided email does not match with any account'
				)
					setEmailError(error.response?.data.message);
				if (error.response?.data.message === 'Wrong password')
					setPasswordError('Password does not match with any account');
			}
		}
	};

	const registerInputs: InputWithLabelProps[] = [
		{
			label: 'Username',
			type: 'text',
			maxLength: 25,
			errorText: usernameError,
			handleChange: (e: ChangeEvent<HTMLInputElement>) => {
				setUsername(e.target.value);
				if (usernameError !== '') setUsernameError('');
			},
		},
		{
			label: 'Email',
			type: 'text',
			maxLength: 256,
			errorText: emailError,
			handleChange: (e: ChangeEvent<HTMLInputElement>) => {
				setEmail(e.target.value);
				if (emailError !== '') setEmailError('');
			},
		},
		{
			label: 'Password',
			type: 'password',
			maxLength: 256,
			errorText: passwordError,
			handleChange: (e: ChangeEvent<HTMLInputElement>) => {
				setPassword(e.target.value);
				if (passwordError !== '') setPasswordError('');
			},
		},
	];

	const loginInputs: InputWithLabelProps[] = [
		{
			label: 'Email',
			type: 'text',
			maxLength: 256,
			errorText: emailError,
			handleChange: (e: ChangeEvent<HTMLInputElement>) => {
				setEmail(e.target.value);
				if (emailError !== '') setEmailError('');
			},
		},
		{
			label: 'Password',
			type: 'password',
			maxLength: 256,
			errorText: passwordError,
			handleChange: (e: ChangeEvent<HTMLInputElement>) => {
				setPassword(e.target.value);
				if (passwordError !== '') setPasswordError('');
			},
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
		handleClick: handleLogin,
	};

	return (
		<>
			<Header />
			<main className="absolute left-1/2 top-1/2 sm:w-4/6 h-4/6 -translate-x-1/2 -translate-y-1/2 bg-almond shadow-lg text-oxford font-fira-code rounded-sm grid xl:grid-cols-2">
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
						handleClickText={() => {
							setActiveForm('login');
							setUsernameError('');
							setEmailError('');
							setPasswordError('');
						}}
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
						handleClickText={() => {
							setActiveForm('register');
							setUsernameError('');
							setEmailError('');
							setPasswordError('');
						}}
						belowText="Don't have an account?"
						belowTextClickable="Sign In!"
					/>
				</Transition>
				<Transition
					show={activeForm === 'none'}
					enter="transition-opacity duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-0"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="w-full h-full flex justify-center">
						<div className="loading loading-spinner loading-lg text-oxford"></div>
					</div>
				</Transition>
				<div className="bg-oxford absolute w-1/2 h-full right-0 py-24 pt-12 px-28 xl:flex flex-col gap-6 hidden">
					<span className="text-almond text-md 2xl:text-xl">
						Chat with anyone, <br /> from anywhere.
					</span>
					<div className="h-full w-full bg-gradient-to-tr from-navy-light via-almond to-navy-light rounded shadow-xl flex flex-col-reverse min-h-fit min-w-fit text-xs 2xl:text-md">
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
