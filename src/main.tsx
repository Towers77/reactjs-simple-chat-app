import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { UserProvider } from './utils/context/UserProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<UserProvider>
		<RouterProvider router={router} />
	</UserProvider>
);
