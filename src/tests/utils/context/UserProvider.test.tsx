import { render, screen } from '@testing-library/react';
import { UserContext } from '../../../utils/context/UserProvider';
import { useContext } from 'react';

const TestingComponent = () => {
	const userState = useContext(UserContext);

	return (
		<>
			<p>{userState?.user.id}</p>
			<p>{userState?.user.username}</p>
		</>
	);
};

const getUsernameParagraph = () => screen.getByText('username');
const getIdParagraph = () => screen.getByText('1');

const providedState = {
	user: {
		id: 1,
		username: 'username',
	},
	setId: () => {},
	setUsername: () => {},
};

describe('UserProvider', () => {
	beforeEach(() => {
		render(
			<UserContext.Provider value={providedState}>
				<TestingComponent />
			</UserContext.Provider>
		);
	});

	test('Should render the user context', () => {
		const usernameParagraph = getUsernameParagraph();
		const idParagraph = getIdParagraph();

		expect(usernameParagraph.textContent).toBe('username');
		expect(idParagraph.textContent).toBe('1');
	});
});
