import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CreateNewChatModal } from '../../components/CreateNewChatModal';
import { server } from '../mocks/server';

const getList = () =>
	screen.getByPlaceholderText('Search for a user')
		.nextSibling as HTMLUListElement;
const getSearchInput = () =>
	screen.getByPlaceholderText('Search for a user') as HTMLInputElement;
const getCreateNewChatButton = () => screen.getByText('Start a new chat');

describe('CreateNewChatModal', () => {
	beforeEach(() => {
		render(<CreateNewChatModal />);
	});

	beforeAll(() => {
		server.listen();
	});

	afterAll(() => server.close());

	afterEach(() => server.resetHandlers());

	test('Should fetch users when typing', async () => {
		const searchInput = getSearchInput();
		let list = getList().children;

		expect(searchInput).toBeDefined();
		expect(list).toBeDefined();

		expect(list).toHaveLength(0);

		fireEvent.change(searchInput, { target: { value: 'test' } });

		list = await waitFor(() => getList().children);

		expect(list).toHaveLength(3);
	});

	test('Test that the user can select a user', async () => {
		const searchInput = getSearchInput();

		expect(searchInput).toBeDefined();

		fireEvent.change(searchInput, { target: { value: 'test1' } });

		const list = await waitFor(() => getList().children);

		expect(list[0].className).toContain('bg-slate-900');

		fireEvent.click(list[0]);

		expect(list[0].className).toContain('bg-slate-900/50');
	});

	// TODO
	test('Test that the modal hides after clicking button', async () => {
		const searchInput = getSearchInput();
		const createNewChatButton = getCreateNewChatButton();

		expect(searchInput).toBeDefined();
		expect(createNewChatButton).toBeDefined();

		fireEvent.change(searchInput, { target: { value: 'test2' } });

		const list = await waitFor(() => getList().children);

		fireEvent.click(list[0]);

		fireEvent.click(createNewChatButton);
	});
});
