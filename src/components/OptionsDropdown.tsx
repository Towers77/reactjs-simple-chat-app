import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/context/UserProvider';
import axios from 'axios';

export interface OptionsDropdownProps {
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OptionsDropdown = ({ setIsLoading }: OptionsDropdownProps) => {
	const userState = useContext(UserContext);

	const navigate = useNavigate();

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
		<details id="dd" className="dropdown dropdown-end">
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
					<button onClick={showCreateNewChatModal}>Create new chat</button>
				</li>
				<li>
					<button onClick={handleLogout}>Log out</button>
				</li>
			</ul>
		</details>
	);
};
