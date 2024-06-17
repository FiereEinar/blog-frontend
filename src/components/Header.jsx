import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/pages/Homepage';
import { Logo } from './ui/logo';
import ProfileSheet from './ProfileSheet';

export default function Header() {
	const isLoggedIn = useContext(AuthContext);
	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.removeItem('Token');
		navigate('/login');
	};

	return (
		<nav className='w-full border-b p-3 flex justify-between items-center md:px-10'>
			<Logo />

			<div className='flex gap-3'>
				{isLoggedIn ? (
					<>
						<Button
							variant='ghost'
							className='md:px-8 flex gap-1'
							onClick={onLogout}
							size='sm'
						>
							<img className='w-5 h-5' src='/public/logout.svg' alt='' />
							<span className='sm:flex hidden'>Log out</span>
						</Button>
						<ProfileSheet />
					</>
				) : (
					<>
						<Link to='/login'>
							<Button className='md:px-8' size='sm' variant='ghost'>
								Log in
							</Button>
						</Link>
						<Link className='sm:flex hidden' to='/signup'>
							<Button className='md:px-8' size='sm'>
								Sign up
							</Button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
