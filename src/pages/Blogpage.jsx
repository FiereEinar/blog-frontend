import { useQuery } from '@tanstack/react-query';
import BlogCard from '@/components/BlogCard';
import { fetchBlogs } from '@/api/blog';
import { BlogPageLoadingScreen } from '@/components/LoadingScreens';
// import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import useLoadingTracker from '@/hooks/useLoadingTracker';

export default function Blogpage() {
	const { toast } = useToast();

	const { data, error, isLoading } = useQuery({
		queryKey: ['blogs'],
		queryFn: fetchBlogs,
	});

	useLoadingTracker(isLoading, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

	if (isLoading) {
		return <BlogPageLoadingScreen />;
	}

	if (error) {
		return <h1>An error has occurred, please restart the application</h1>;
	}

	return (
		<main className='flex flex-col gap-3 p-3 min-h-screen'>
			<section className='flex w-full gap-3 flex-wrap justify-center items-stretch'>
				{data.map((blog) => (
					<BlogCard key={blog._id} blog={blog} />
				))}
			</section>
		</main>
	);
}
