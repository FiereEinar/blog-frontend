import LoadingScreen from '@/components/LoadingScreen';
import useFetchBlogs from '@/hooks/useFetchData';
import Navbar from '@/components/Navbar';
import { useQuery } from '@tanstack/react-query';
import BlogCard from '@/components/BlogCard';

export default function Blogpage() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['blogs'],
		queryFn: useFetchBlogs,
	});

	if (error) {
		return <h1>An error has occurred, please restart the application</h1>;
	}

	return (
		<div className='flex flex-col'>
			<Navbar />

			<main className='flex flex-col gap-3 p-3'>
				{isLoading ? (
					<LoadingScreen />
				) : (
					<section className='flex w-full gap-3 flex-wrap justify-center items-stretch'>
						{data.map((blog) => (
							<BlogCard key={blog._id} blog={blog} />
						))}
					</section>
				)}
			</main>
		</div>
	);
}
