import axios from 'axios';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, UserContext } from '../utils/context/UserProvider';
import { CreateNewChatModal } from '../components/CreateNewChatModal';
import { ChatList } from '../components/ChatList';
import { OptionsDropdown } from '../components/OptionsDropdown';
import { SelectedChatContext } from '../utils/context/SelectedChatProvider';
import { Chat } from '../components/Chat';
import { io } from 'socket.io-client';

export const Profile = () => {
	const userState = useContext(UserContext);
	const selectedChatState = useContext(SelectedChatContext);
	const [isLoading, setIsLoading] = useState(false);

	const { id } = useParams();

	const socket = useMemo(
		() =>
			io('http://localhost:3000', {
				withCredentials: true,
				transports: ['websocket'],
			}),
		[]
	);

	useEffect(() => {
		socket.emit('joinChat', selectedChatState?.chat.id);
		socket.emit('findMessagesFromOneChat', selectedChatState?.chat.id);
	}, [selectedChatState?.chat.id]);

	useEffect(() => {
		const getProfile = async () => {
			try {
				const response = await axios.get<User>(
					`http://localhost:3000/api/v1/users/${id}`,
					{
						withCredentials: true,
					}
				);

				userState?.setUsername(response.data.username);
				userState?.setId(response.data.id);
			} catch (error) {
				console.log(error);
			}
		};

		getProfile();
	}, []);

	const handleCloseDropdown = () => {
		if (
			(
				document.getElementById('dd') as HTMLFormElement
			).attributes.getNamedItem('open')
		) {
			(
				document.getElementById('dd') as HTMLFormElement
			).attributes.removeNamedItem('open');
		}
	};

	return (
		<div
			className="bg-slate-950 h-screen w-screen 2xl:p-6 flex justify-center font-fira-code"
			onClick={handleCloseDropdown}
		>
			{isLoading ? (
				<div className="w-full h-full flex flex-col justify-center place-items-center gap-6">
					<div className="loading loading-spinner loading-lg text-slate-600"></div>
				</div>
			) : (
				<main className="flex bg-slate-900 w-full h-full z-50 shadow-lg 2xl:w-[1500px] shadow-black/50">
					<CreateNewChatModal />
					<aside className="basis-1/4 w-96 flex flex-col shadow-xl">
						<div className="bg-slate-800 flex justify-between p-3">
							<div className="flex gap-2">
								<svg
									className="w-10 h-10 text-slate-500 border-slate-300 border-2 rounded-full m-1"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
								</svg>
								<span className="text-white text-lg mt-[0.60rem]">
									{userState?.user.username}
								</span>
							</div>
							<OptionsDropdown setIsLoading={setIsLoading} />
						</div>
						<ChatList />
					</aside>
					<aside className="basis-3/4 flex">
						{selectedChatState?.chat.id === -0 ? (
							<div className="w-full grid place-content-center">
								<h1 className="text-2xl text-white text-center">
									Select a chat to start messaging!
								</h1>
							</div>
						) : (
							<Chat socket={socket} />
						)}
					</aside>
				</main>
			)}
		</div>
	);
};
