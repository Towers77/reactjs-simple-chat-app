import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';

export const Profile = () => {
	const [username, setUsername] = useState('');

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const getProfile = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/api/v1/users/${id}`,
					{
						withCredentials: true,
					}
				);
				console.log(response);
				setUsername(response.data.username);
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

			if (response.status !== 200) throw new Error('Something went wrong...');

			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{username}{' '}
			<Button
				text="logout"
				textColor="text-white"
				bgColor="bg-black"
				handleClick={handleLogout}
			/>
		</div>
	);
};
