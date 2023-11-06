import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react';

interface User {
	id: number;
	name: string;
}

interface UserState {
	user: User;
	setId: Dispatch<SetStateAction<number>>;
	setName: Dispatch<SetStateAction<string>>;
}

interface UserProviderProps {
	children: ReactNode;
}

export const UserContext = createContext<UserState | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
	const [id, setId] = useState(0);
	const [name, setName] = useState('');

	const providedState: UserState = {
		user: {
			id,
			name,
		},
		setId,
		setName,
	};

	return (
		<UserContext.Provider value={providedState}>
			{children}
		</UserContext.Provider>
	);
};
