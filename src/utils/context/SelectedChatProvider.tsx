import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react';
import { User } from './UserProvider';

export interface Chat {
	id: number;
	receiver: User;
}

interface ChatState {
	chat: Chat;
	setId: Dispatch<SetStateAction<number>>;
	setReceiver: Dispatch<SetStateAction<User>>;
}

interface SelectedChatProviderProps {
	children: ReactNode;
}

export const SelectedChatContext = createContext<ChatState | null>(null);

export const SelectedChatProvider = ({
	children,
}: SelectedChatProviderProps) => {
	const [id, setId] = useState(0);
	const [receiver, setReceiver] = useState<User>({ id: -1, username: '' });

	const providedState: ChatState = {
		chat: {
			id,
			receiver,
		},
		setId,
		setReceiver,
	};

	return (
		<SelectedChatContext.Provider value={providedState}>
			{children}
		</SelectedChatContext.Provider>
	);
};
