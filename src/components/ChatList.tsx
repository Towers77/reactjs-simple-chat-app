import { useContext, useEffect, useState } from 'react';
import { ChatCard } from './ChatCard';
import { User, UserContext } from '../utils/context/UserProvider';
import axios from 'axios';

interface ChatCard {
	id: number;
	user1: User;
	user2: User;
}

export const ChatList = () => {
	const userState = useContext(UserContext);
	const [chatSearchText, setChatSearchText] = useState('');
	const [chatList, setChatList] = useState<ChatCard[]>([]);

	const filterChatList = (chat: ChatCard) => {
		return userState?.user.id === chat.user1.id
			? chat.user2.username.toLowerCase().includes(chatSearchText.toLowerCase())
			: chat.user1.username
					.toLowerCase()
					.includes(chatSearchText.toLowerCase());
	};

	useEffect(() => {
		const getChatList = async () => {
			try {
				const response = await axios.get<ChatCard[]>(
					`http://localhost:3000/api/v1/chats/${userState?.user.id}`,
					{
						withCredentials: true,
					}
				);
				setChatList(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		if (userState?.user.id !== 0) getChatList();
	}, [userState?.user.id]);

	return (
		<div className="grid">
			<svg
				className="w-4 h-4 text-white absolute m-4 ml-6"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
			>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
				/>
			</svg>
			<input
				className="rounded-lg mx-3 my-2 p-1 pl-10 bg-slate-800 text-white placeholder:text-white/60"
				type="text"
				placeholder="Search for a chat"
				onChange={(e) => setChatSearchText(e.target.value)}
			/>
			<ul className="grid divide-y divide-white/30">
				{chatList
					.filter((chat) => filterChatList(chat))
					.map((chat) => {
						return (
							<li
								key={chat.id}
								className="bg-slate-900 shadow p-2 flex hover:bg-slate-800 duration-75 justify-between"
							>
								<ChatCard
									chatName={
										userState?.user.id === chat.user2.id
											? chat.user1.username
											: chat.user2.username
									}
									unreadMessages={0}
									latestMessage=""
								/>
							</li>
						);
					})}
			</ul>
		</div>
	);
};
