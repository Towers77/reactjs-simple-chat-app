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
	const bgColor = type === 'chat-end' ? 'bg-slate-600' : 'bg-slate-800';

	const auxTime = new Date(sentAt as Date);

	const time = new Date(auxTime.setHours(auxTime.getHours() - 3));

	return (
		<div className={`chat ${type}`}>
			<div
				className={`chat-bubble text-white ${bgColor} break-words shadow-md max-w-1/2`}
			>
				{message}
			</div>
			{sender && (
				<div className="chat-header text-md text-white mb-1">{sender}</div>
			)}
			{sentAt && (
				<div className="chat-footer text-sm opacity-50 mt-1 text-white/50">
					{time.toString().slice(16, 21)}
				</div>
			)}
		</div>
	);
};
