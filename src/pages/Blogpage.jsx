import LoadingScreen from '@/components/LoadingScreen';
import useFetchBlogs from '@/hooks/useFetchData';
import { useQuery } from '@tanstack/react-query';
import BlogCard from '@/components/BlogCard';

export default function Blogpage() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['blogs'],
		queryFn: useFetchBlogs,
	});

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <h1>An error has occurred, please restart the application</h1>;
	}

	return (
		<main className='flex flex-col gap-3 p-3'>
			<section className='flex w-full gap-3 flex-wrap justify-center items-stretch'>
				{data.map((blog) => (
					<BlogCard key={blog._id} blog={blog} />
				))}
			</section>
		</main>
	);
}
