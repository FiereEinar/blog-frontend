import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/pages/Homepage';
import { Logo } from './ui/logo';

export default function Header() {
	const isLoggedIn = useContext(AuthContext);
	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.removeItem('Token');
		navigate('/login');
	};

	return (
		<nav className='w-full border p-3 flex justify-between'>
			<Logo />

			<div className='flex gap-3'>
				{isLoggedIn ? (
					<Button onClick={onLogout} size='sm'>
						Log out
					</Button>
				) : (
					<>
						<Link to='/login'>
							<Button size='sm' variant='ghost'>
								Log in
							</Button>
						</Link>
						<Link to='/signup'>
							<Button size='sm'>Sign up</Button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
