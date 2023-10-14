import { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import InputWithLabel from '../components/InputWithLabel';
import { Transition } from '@headlessui/react';

const Home = () => {
	const [activeForm, setActiveForm] = useState('register');
	const handleRegister = () => {};

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
					<div className="m-10 flex flex-col gap-10">
						<span className="text-3xl">Sign In</span>
						<InputWithLabel label="Username" type="text" maxLength={25} />
						<InputWithLabel label="Email Address" type="text" maxLength={256} />
						<InputWithLabel label="Password" type="password" maxLength={256} />

						<div className="flex justify-center">
							<Button
								text="Sign In"
								textColor="text-almond"
								bgColor="bg-oxford"
								handleClick={handleRegister}
							/>
						</div>
						<span className="text-navy-light self-center">
							Already have an account?
						</span>
						<span
							className="text-navy-light cursor-pointer self-center hover:underline hover:text-navy duration-100"
							onClick={() => setActiveForm('login')}
						>
							Log In!
						</span>
					</div>
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
					<div className="m-10 flex flex-col gap-10">
						<span className="text-3xl">Log In</span>
						<InputWithLabel label="Email Address" type="text" maxLength={256} />
						<InputWithLabel label="Password" type="password" maxLength={256} />

						<div className="flex justify-center">
							<Button
								text="Log In"
								textColor="text-almond"
								bgColor="bg-oxford"
								handleClick={handleRegister}
							/>
						</div>
						<span className="text-navy-light self-center">
							Don't have an account?
						</span>
						<span
							className="text-navy-light cursor-pointer self-center hover:underline hover:text-navy duration-100"
							onClick={() => setActiveForm('register')}
						>
							Sign In!
						</span>
					</div>
				</Transition>
				<div className="bg-oxford absolute w-1/2 h-full right-0 py-20 px-32 flex flex-col gap-10">
					<span className="text-almond text-xl">
						Chat with anyone, <br /> from anywhere.
					</span>
					<div className="h-full w-full bg-almond rounded shadow-xl flex flex-col-reverse">
						<div className="chat chat-end">
							<div className="chat-bubble flex place-items-center text-almond bg-oxford shadow-md max-w-1/2">
								Good, still working on that chat app...
							</div>
							<div className="chat-header text-md">Robert</div>
							<div className="chat-footer text-sm opacity-50 mt-1">16:06</div>
						</div>
						<div className="chat chat-start">
							<div className="chat-bubble flex place-items-center text-almond bg-oxford shadow-md max-w-1/2">
								How've you been?
							</div>
							<div className="chat-footer text-sm opacity-50 mt-1">16:04</div>
						</div>
						<div className="chat chat-start">
							<div className="chat-bubble flex place-items-center text-almond bg-oxford shadow-md max-w-1/2">
								Hey!
							</div>
							<div className="chat-header text-md">Karen</div>
						</div>
						<div className="chat chat-end">
							<div className="chat-bubble flex place-items-center text-almond bg-oxford shadow-md max-w-1/2">
								Hello
							</div>
							<div className="chat-header text-md">Robert</div>
							<div className="chat-footer text-sm opacity-50 mt-1">16:00</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
