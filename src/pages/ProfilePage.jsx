import { getUserById } from '@/api/user';
import LoadingScreen from '@/components/LoadingScreen';
import { Logo } from '@/components/ui/logo';
import { useQuery } from '@tanstack/react-query';

export default function ProfilePage() {
	const userId = localStorage.getItem('UserId');

	const { data, error, isLoading } = useQuery({
		queryKey: [`user_${userId}`],
		queryFn: () => getUserById(userId),
	});

	if (error) {
		return <p>An error has occured, please restart the application.</p>;
	}

	return (
		<main className='flex flex-col justify-center items-center'>
			<nav className='p-3 border-b md:px-10 w-full'>
				<Logo />
			</nav>

			{isLoading ? (
				<LoadingScreen />
			) : (
				<section className='p-5 flex gap-5 border justify-center mt-10 shadow-lg rounded-md'>
					<div>
						<img
							className='w-44 h-44 rounded-full'
							src={data.profile.imgUrl}
							alt=''
						/>
					</div>

					<div className='border-l'></div>

					<div className='w-[20rem]'>
						<p>
							{data.firstName} {data.lastName}
						</p>
						<p>{data.email}</p>
					</div>
				</section>
			)}
		</main>
	);
}
