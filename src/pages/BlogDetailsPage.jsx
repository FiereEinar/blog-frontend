import { fetchBlogById } from '@/api/blog';
import BlogInfo from '@/components/BlogInfo';
import CommentSection from '@/components/CommentSection';
import { DefaultLoadingScreen } from '@/components/LoadingScreens';
import { toast } from '@/components/ui/use-toast';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function BlogDetailsPage() {
	const { blogId } = useParams();

	const { data, error, isLoading } = useQuery({
		queryKey: [`blog_post_${blogId}`],
		queryFn: () => fetchBlogById(blogId),
	});

	useLoadingTracker(isLoading, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

	if (isLoading) {
		return <DefaultLoadingScreen />;
	}

	if (error) {
		return <p>An error has occured, please restart the application</p>;
	}

	return (
		<main className='flex justify-center flex-wrap gap-10'>
			<BlogInfo blog={data} />
			<CommentSection comments={data.comments} />
		</main>
	);
}
