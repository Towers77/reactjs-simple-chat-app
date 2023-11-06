import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { UserProvider } from './utils/context/UserProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UserProvider>
			<div className="bg-almond h-screen w-screen">
				<RouterProvider router={router} />
			</div>
		</UserProvider>
	</React.StrictMode>
);
