import { fetchTopics } from '@/api/topic';
import BlogCard from '@/components/BlogCard';
import LoadingScreen from '@/components/LoadingScreen';
import { fetchBlogByTopicId } from '@/hooks/useFetchBlogByTopicId';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function TopicPage() {
	const { topicId } = useParams();

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

	if (blogsLoading || topicsLoading) {
		return <LoadingScreen />;
	}

	if (blogsError || topicsError) {
		return <h1>An error has occurred, please restart the application</h1>;
	}

	return (
		<main>
			<h1 className='text-center text-2xl p-5'>
				Currently Browsing Topic: {topicTitle}
			</h1>
			<section className='flex w-full gap-3 flex-wrap justify-center items-stretch'>
				{blogs.length === 0 && (
					<p className='italic text-muted-foreground'>
						No blogs available for this topic.
					</p>
				)}
				{blogs.map((blog) => (
					<BlogCard key={blog._id} blog={blog} />
				))}
			</section>
		</main>
	);
}
