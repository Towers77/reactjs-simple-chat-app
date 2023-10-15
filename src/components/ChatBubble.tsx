export interface ChatBubbleProps {
	type: 'chat-end' | 'chat-start';
	message: string;
	sender?: string;
	sentAt?: Date;
}

export const ChatBubble = ({
	type,
	message,
	sender,
	sentAt,
}: ChatBubbleProps) => {
	return (
		<div className={`chat ${type}`}>
			<div className="chat-bubble flex place-items-center text-almond bg-oxford shadow-md max-w-1/2">
				{message}
			</div>
			{sender && (
				<div className="chat-header text-md text-oxford">{sender}</div>
			)}
			{sentAt && (
				<div className="chat-footer text-sm opacity-50 mt-1 text-navy">
					{sentAt.toLocaleTimeString().slice(0, 5)}
				</div>
			)}
		</div>
	);
};
