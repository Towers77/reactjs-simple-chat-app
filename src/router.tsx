import { createBrowserRouter } from 'react-router-dom';
import { Home } from './views/Home';
import { Profile } from './views/Profile';
import { SelectedChatProvider } from './utils/context/SelectedChatProvider';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/profile/:id',
		element: (
			<SelectedChatProvider>
				<Profile />
			</SelectedChatProvider>
		),
	},
]);

export default router;
