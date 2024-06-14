import { navlinks, socialLinks } from '@/constants';
import { Link, NavLink } from 'react-router-dom';
import {
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import NavigationWrapper from './NavigationWrapper';

export default function Navbar() {
	return (
		<nav className='w-full border-b p-3 flex justify-center items-center gap-5'>
			{navlinks.map((link, i) => (
				<NavLink to={link.path} key={i} className={navlinkClassCallback}>
					<p>{link.name}</p>
				</NavLink>
			))}

			<NavigationWrapper title='Socials'>
				{socialLinks.map((link, i) => (
					<Link key={i} target='_blank' to={link.path}>
						<NavigationMenuLink
							className={`${navigationMenuTriggerStyle()} !w-64`}
						>
							{link.name}
						</NavigationMenuLink>
					</Link>
				))}
			</NavigationWrapper>
		</nav>
	);
}

const navlinkClassCallback = ({ isActive, isPending }) => {
	const shadcnClass = navigationMenuTriggerStyle();
	const navlinkClass = isPending
		? 'text-gray-500'
		: isActive
		? 'text-orange-500'
		: '';

	return `${navlinkClass} ${shadcnClass} hover:text-orange-500`;
};
