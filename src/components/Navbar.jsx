import { navlinks } from '@/constants';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav className='w-full border p-3 flex justify-center items-center gap-5'>
			{navlinks.map((link, i) => (
				<NavLink
					to={link.path}
					key={i}
					className={({ isActive, isPending }) =>
						isPending ? 'text-gray-500' : isActive ? 'text-orange-500' : ''
					}
				>
					<p>{link.name}</p>
				</NavLink>
			))}
		</nav>
	);
}
