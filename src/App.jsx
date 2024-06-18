import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import useAuth from './hooks/useAuth';
import { createContext } from 'react';
import { Outlet } from 'react-router-dom';

// i don't think this is necessary though, could just use useAuth directly
export const AuthContext = createContext(false);

export default function App() {
	const isLoggedIn = useAuth();

	return (
		<AuthContext.Provider value={isLoggedIn}>
			<section>
				<Header />
				<Navbar />
				<Outlet />
				<Footer />
			</section>
		</AuthContext.Provider>
	);
}
