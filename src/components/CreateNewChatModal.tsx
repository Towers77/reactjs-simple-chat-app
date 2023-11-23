import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ChatCard } from './ChatCard';
import { UserContext } from '../utils/context/UserProvider';
import { Button } from './Button';

interface CreateNewChatModalProps {}

interface User {
	username: string;
	id: number;
}

export const CreateNewChatModal = ({}: CreateNewChatModalProps) => {
	const userState = useContext(UserContext);

	const [userSearchText, setUserSearchText] = useState('');
	const [userSearchResults, setUserSearchResults] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState(-1);

	useEffect(() => {
		const getUserSearchResults = async () => {
			try {
				const response = await axios.get<User[]>(
					`http://localhost:3000/api/v1/users/search/${userSearchText}`,
					{
						withCredentials: true,
					}
				);
				setUserSearchResults(
					response.data.filter(
						(user) => user.username !== userState?.user.username
					)
				);
			} catch (error) {
				console.log(error);
			}
		};
		if (userSearchText === '') {
			setSelectedUser(-1);
			setUserSearchResults([]);
			return;
		}
		getUserSearchResults();
	}, [userSearchText]);

	const handleCreateNewChat = async () => {
		try {
			await axios.post(
				'http://localhost:3000/api/v1/chats',
				{
					user1_id: userState?.user.id,
					user2_id: selectedUser,
				},
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
		} catch (error) {
			console.log(error);
		} finally {
			setUserSearchText('');
		}
	};

	return (
		<dialog id="my_modal_3" className="modal">
			<div className="modal-box bg-slate-800 h-fit overflow-hidden">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>
				<div className="flex flex-col gap-4 justify-center mt-2 mx-4">
					<input
						className="rounded-lg mx-3 my-2 p-1 px-4 shadow bg-slate-900 text-white placeholder:text-white/60"
						type="text"
						placeholder="Search for a user"
						onChange={(e) => setUserSearchText(e.target.value)}
					/>

					<ul className="grid gap-1 h-32 overflow-y-scroll no-scrollbar mb-2">
						{userSearchResults.map((user) => (
							<li
								key={user.id}
								className={`${
									selectedUser === user.id ? 'bg-slate-900/50' : 'bg-slate-900'
								} rounded-lg p-2 shadow max-h-[3.9rem] cursor-pointer hover:bg-slate-900/50 duration-100`}
								onClick={() => setSelectedUser(user.id)}
							>
								<ChatCard chatName={user.username} unreadMessages={0} />
							</li>
						))}
					</ul>
					<div className="flex justify-center">
						<Button
							text="Start a new chat"
							textColor="text-white"
							bgColor="bg-slate-700"
							handleClick={handleCreateNewChat}
							isDisabled={selectedUser === -1}
						/>
					</div>
				</div>
			</div>
		</dialog>
	);
};
