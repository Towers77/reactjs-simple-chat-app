import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, UserContext } from '../utils/context/UserProvider';
import { CreateNewChatModal } from '../components/CreateNewChatModal';
import { ChatList } from '../components/ChatList';

export const Profile = () => {
	const userState = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const getProfile = async () => {
			try {
				const response = await axios.get<User>(
					`http://localhost:3000/api/v1/users/${id}`,
					{
						withCredentials: true,
					}
				);

				userState?.setUsername(response.data.username);
				userState?.setId(response.data.id);
			} catch (error) {
				console.log(error);
			}
		};

		getProfile();
	}, []);

	const handleLogout = async () => {
		try {
			const response = await axios.get(
				'http://localhost:3000/api/v1/auth/logout',
				{
					withCredentials: true,
				}
			);
			setIsLoading(true);
			if (response.status !== 200) throw new Error('Something went wrong...');

			userState?.setUsername('');
			userState?.setId(0);
			setTimeout(() => navigate('/'), 1000);
		} catch (error) {
			console.log(error);
		}
	};

	const showCreateNewChatModal = () => {
		if (document) {
			(document.getElementById('my_modal_3') as HTMLFormElement).showModal();
		}
	};

	return (
		<div className="bg-slate-950 h-screen w-screen 2xl:p-6 flex justify-center font-fira-code">
			{isLoading ? (
				<div className="w-full h-full flex flex-col justify-center place-items-center gap-6">
					<div className="loading loading-spinner loading-lg text-slate-600"></div>
				</div>
			) : (
				<main className="flex bg-slate-900 w-full h-full z-50 shadow-lg 2xl:w-[1500px] shadow-black/50">
					<CreateNewChatModal />
					<aside className="basis-1/4 w-96 flex flex-col ">
						<div className="bg-slate-800 flex justify-between p-3">
							<div className="flex gap-2">
								<svg
									className="w-10 h-10 text-slate-500 border-slate-300 border-2 rounded-full m-1"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
								</svg>
								<span className="text-white text-lg mt-[0.60rem]">
									{userState?.user.username}
								</span>
							</div>
							<details className="dropdown dropdown-end">
								<summary className="btn btn-ghost btn-circle">
									<svg
										className="w-6 h-6 text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 4 15"
									>
										<path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
									</svg>
								</summary>
								<ul className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-slate-700 text-white rounded-box w-52">
									<li>
										<button onClick={showCreateNewChatModal}>
											Create new chat
										</button>
									</li>
									<li>
										<button onClick={handleLogout}>Log out</button>
									</li>
								</ul>
							</details>
						</div>
						<ChatList />
					</aside>
					<aside className="basis-3/4">lol</aside>
				</main>
			)}
		</div>
	);
};
