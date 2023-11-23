import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react';

export interface User {
	id: number;
	username: string;
}

interface UserState {
	user: User;
	setId: Dispatch<SetStateAction<number>>;
	setUsername: Dispatch<SetStateAction<string>>;
}

interface UserProviderProps {
	children: ReactNode;
}

export const UserContext = createContext<UserState | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
	const [id, setId] = useState(0);
	const [username, setUsername] = useState('');

	const providedState: UserState = {
		user: {
			id,
			username,
		},
		setId,
		setUsername,
	};

	return (
		<UserContext.Provider value={providedState}>
			{children}
		</UserContext.Provider>
	);
};
