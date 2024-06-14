import Header from '@/components/Header';
import useAuth from '@/hooks/useAuth';
import { createContext } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthContext = createContext(false);

export default function Homepage() {
	const isLoggedIn = useAuth();

	return (
		<AuthContext.Provider value={isLoggedIn}>
			<section>
				<Header />
				<Outlet />
			</section>
		</AuthContext.Provider>
	);
}
