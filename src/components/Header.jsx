import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/pages/Homepage';

export default function Header() {
	const isLoggedIn = useContext(AuthContext);
	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.removeItem('Token');
		navigate('/login');
	};

	return (
		<nav className='w-full border p-3 flex justify-between'>
			<Link to='/'>
				<div className='flex items-center justify-start gap-2'>
					<img
						className=' w-10 h-10 rounded-full'
						src='/src/assets/blog-logo.png'
						alt=''
					/>
					<h4 className='text-2xl'>
						<span className=' text-orange-500'>Blogs</span>.Daily
					</h4>
				</div>
			</Link>
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
