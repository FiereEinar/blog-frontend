import { fetchBlogByTopicId } from '@/api/blog';
import { fetchTopics } from '@/api/topic';
import { BlogFeed } from '@/components/BlogFeed';
import { DefaultLoadingScreen } from '@/components/LoadingScreens';
import { MainContainer } from '@/components/ui/container';
import { toast } from '@/components/ui/use-toast';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function TopicPage() {
	const { topicId } = useParams();

	// this might seem odd but the topics are already queried in the Navbar when the Homepage is rendered
	const {
		data: topics,
		error: topicsError,
		isLoading: topicsLoading,
	} = useQuery({
		queryKey: ['topics'],
		queryFn: fetchTopics,
	});

	const topicTitle = topics.find((topic) => topic._id === topicId).title;

	const {
		data: blogs,
		error: blogsError,
		isLoading: blogsLoading,
	} = useQuery({
		queryKey: [`blogs_topic_${topicId}`],
		queryFn: () => fetchBlogByTopicId(topicId),
	});

	useLoadingTracker(blogsLoading, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

	if (blogsLoading || topicsLoading) {
		return <DefaultLoadingScreen />;
	}

	if (blogsError || topicsError) {
		return <h1>An error has occurred, please restart the application</h1>;
	}

	return (
		<MainContainer>
			<h1 className='text-center text-2xl pb-5'>
				Currently Browsing Topic: {topicTitle}
			</h1>
			<BlogFeed blogs={blogs} />
		</MainContainer>
	);
}
