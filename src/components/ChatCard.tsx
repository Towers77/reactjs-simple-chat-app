import { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Message } from './Chat';
import { UserContext } from '../utils/context/UserProvider';
import { SelectedChatContext } from '../utils/context/SelectedChatProvider';

export interface ChatCardProps {
	chatId: number;
	chatName: string;
	socket?: Socket;
}

export const ChatCard = ({ chatId, chatName, socket }: ChatCardProps) => {
	const userState = useContext(UserContext);
	const selectedChatState = useContext(SelectedChatContext);
	const [latestMessage, setLatestMessage] = useState('');
	const [unreadMessages, setUnreadMessages] = useState(0);

	useEffect(() => {
		const addNewMessageBadge = (data: Message) => {
			console.log(selectedChatState?.chat.id);
			if (
				chatId !== selectedChatState?.chat.id &&
				data.sent_in.id === chatId &&
				data.sent_by.id !== userState?.user.id
			) {
				setUnreadMessages((unreadMessages) => unreadMessages + 1);
				setLatestMessage(data.text);
			}
		};

		socket?.on('createMessage', addNewMessageBadge);

		return () => {
			socket?.off('createMessage');
		};
	}, [selectedChatState?.chat.id]);

	useEffect(() => {
		if (selectedChatState?.chat.id === chatId) {
			setLatestMessage('');
			setUnreadMessages(0);
		}
	}, [selectedChatState?.chat.id]);

	return (
		<>
			<div className="flex gap-2 ">
				<svg
					className="w-8 h-8 shrink-0 text-slate-400 rounded-full m-1 mt-[0.4rem]"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
				</svg>
				<div className="flex flex-col">
					<span
						className={`text-white text-md ${
							latestMessage ? '' : 'mt-[0.65rem]'
						}`}
					>
						{chatName}
					</span>
					<span className="text-white/50 text-xs line-clamp-1 break-all min-w-9/10">
						{latestMessage}
					</span>
				</div>
			</div>
			{unreadMessages > 0 && (
				<div className="badge mt-3 bg-slate-300 border-none text-slate-800">
					{'+' + unreadMessages}
				</div>
			)}
		</>
	);
};
