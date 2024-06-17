import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Blogpage from './pages/Blogpage';
import Landingpage from './pages/Landingpage';
import LoginPage from './pages/LoginPage';
import NotfoundPage from './pages/NotfoundPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import AboutPage from './pages/AboutPage';
import TopicPage from './pages/TopicPage';
import SignupPage from './pages/SignupPage';

/**
 * The main entry point is Homepage.jsx
 */

export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			element: <Homepage />,
			errorElement: <NotfoundPage />,
			children: [
				{
					index: true,
					element: <Landingpage />,
				},
				{
					path: '/blogs',
					element: <Blogpage />,
				},
				{
					path: '/blog/:blogId',
					element: <BlogDetailsPage />,
				},
				{
					path: '/about',
					element: <AboutPage />,
				},
				{
					path: '/topic/:topicId',
					element: <TopicPage />,
				},
			],
		},
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/signup',
			element: <SignupPage />,
		},
	]);

	return <RouterProvider router={route}></RouterProvider>;
}
