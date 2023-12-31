import { useContext, useEffect, useState } from 'react';
import { Button } from './Button';
import { ChatBubble } from './ChatBubble';
import { SelectedChatContext } from '../utils/context/SelectedChatProvider';
import { ChatCard } from './ChatCard';
import { Socket } from 'socket.io-client';
import { User, UserContext } from '../utils/context/UserProvider';

interface ChatProps {
	socket: Socket;
}

export interface Message {
	id: number;
	created_at: Date;
	text: string;
	sent_by: User;
	sent_in: {
		id: number;
	};
}

export const Chat = ({ socket }: ChatProps) => {
	const userState = useContext(UserContext);
	const selectedChatState = useContext(SelectedChatContext);

	const [isLoading, setIsLoading] = useState(false);
	const [chatName, setChatName] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [messageText, setMessageText] = useState('');

	/**
	 * For now, messages are fetched from the server every time a chat is selected,
	 * but it would probably be better to store the messages as a map of arrays of
	 * messages (Message[][], where first index is chat index, and the second is message index)
	 * in the client side, on first fetch and then add new messages to the specific chat when a
	 * new message is sent.
	 */
	useEffect(() => {
		const addNewMessage = (data: Message) => {
			if (data.sent_in.id === selectedChatState?.chat.id)
				setMessages((messages) => [data, ...messages]);
		};
		const setChatMessages = (data: Message[]) => {
			setIsLoading(true);
			setMessages(data.reverse());
			setChatName(selectedChatState?.chat.receiver.username || '');
			setIsLoading(false);
		};

		socket.on('findMessagesFromOneChat', setChatMessages);
		socket.on('createMessage', addNewMessage);

		return () => {
			socket.off('findMessagesFromOneChat');
			socket.off('createMessage', addNewMessage);
		};
	}, [selectedChatState?.chat.id]);

	useEffect(() => {
		setMessageText('');
	}, [selectedChatState?.chat.id]);

	const handleSendMessage = () => {
		socket.emit('createMessage', {
			text: messageText,
			sent_by: userState?.user.id,
			sent_in: selectedChatState?.chat.id,
		});
		setMessageText('');
	};

	const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

	return (
		<>
			{isLoading ? (
				<div className="w-full h-full flex flex-col justify-center place-items-center gap-6">
					<div className="loading loading-spinner loading-lg text-slate-600"></div>
				</div>
			) : (
				<div className="flex flex-col justify-between h-full w-full">
					<header className="basis-1/12 bg-slate-950/20 flex justify-between pl-6 shadow-lg">
						<div className="self-center">
							<ChatCard chatId={-1} chatName={chatName} />
						</div>
						<span className="self-center">search</span>
					</header>
					<main className="basis-10/12 p-6 flex flex-col-reverse overflow-y-scroll no-scrollbar">
						{messages.map((message, index) => (
							<ChatBubble
								key={message.id}
								type={
									message.sent_by.id === userState?.user.id
										? 'chat-end'
										: 'chat-start'
								}
								message={message.text}
								sender={
									messages[index + 1]?.sent_by.id !== message.sent_by.id
										? message.sent_by.username
										: undefined
								}
								sentAt={
									messages[index - 1]?.sent_by.id !== message.sent_by.id
										? message.created_at
										: undefined
								}
							/>
						))}
					</main>
					<div className="basis-1/12 flex flex-col justify-center px-20 bg-slate-950/20">
						<div className="flex justify-between">
							<input
								className="rounded-lg mx-3 my-2 p-1 px-4 h-10 bg-slate-800 text-white placeholder:text-white/60 basis-11/12"
								type="text"
								value={messageText}
								placeholder="Type a message"
								onChange={(e) => setMessageText(e.target.value)}
								onKeyUp={handleOnKeyUp}
							/>
							<div className="self-center">
								<Button
									text="Send"
									textColor="text-white"
									bgColor="bg-slate-700"
									handleClick={handleSendMessage}
									isDisabled={false}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
