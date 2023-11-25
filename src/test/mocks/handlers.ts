import { HttpResponse, http } from 'msw';
import { User } from '../../utils/context/UserProvider';

const users: User[] = [
	{
		id: 1,
		username: 'userTest1',
	},
	{
		id: 2,
		username: 'userTest2',
	},
	{
		id: 3,
		username: 'userTest3',
	},
];

interface Chat {
	user1_id: number;
	user2_id: number;
}

export const handlers = [
	http.get('api/v1/users/search/:username', ({ params }) => {
		const username = params.username as string;

		const filteredUsers = users.filter((user) => {
			return user.username.toLowerCase().includes(username.toLowerCase());
		});

		return HttpResponse.json(filteredUsers);
	}),

	http.post('api/v1/chats', async ({ request }) => {
		const newChat = (await request.json()) as Chat;

		if (!newChat.user1_id || !newChat.user2_id)
			return HttpResponse.json(undefined, { status: 400 });

		return HttpResponse.json(undefined, { status: 201 });
	}),
];
