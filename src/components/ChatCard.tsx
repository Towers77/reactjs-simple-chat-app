export interface ChatCardProps {
	chatName: string;
	unreadMessages: number;
	latestMessage?: string;
}

export const ChatCard = ({
	chatName,
	unreadMessages,
	latestMessage,
}: ChatCardProps) => {
	return (
		<>
			<div className="flex gap-2">
				<svg
					className="w-8 h-8 text-slate-400 rounded-full m-1 mt-[0.4rem]"
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
					<span className="text-white/50 text-xs line-clamp-1">
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
