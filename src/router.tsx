import { createBrowserRouter } from 'react-router-dom';
import { Home } from './views/Home';
import { Profile } from './views/Profile';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/profile/:id',
		element: <Profile />,
	},
]);

export default router;
