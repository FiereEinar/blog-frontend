import CommentSection from '@/components/CommentSection';
import LoadingScreen from '@/components/LoadingScreen';
import fetchBlogById from '@/hooks/fetchBlogById';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

export default function BlogDetailsPage() {
	const { blogId } = useParams();
	const { data, error, isLoading } = useQuery({
		queryKey: [`blog_post_${blogId}`],
		queryFn: () => fetchBlogById(blogId),
	});

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <p>An error has occured.</p>;
	}

	console.log(data);

	return (
		<>
			<main className='flex justify-center flex-wrap gap-10'>
				<section className='flex flex-col gap-3 max-w-[34rem] p-5 justify-center items-center border-b'>
					<p className='text-muted-foreground'>
						{format(data.dateAdded, 'MMMM dd, yyyy')}
					</p>
					<h1 className='text-2xl text-center font-semibold'>{data.title}</h1>
					<h4 className='text-xl'>{data.topic.title}</h4>
					<img className='rounded-sm' src={data.img.url} alt='data Image' />
					<p>{data.text}</p>
				</section>

				<CommentSection comments={data.comments} />
			</main>
		</>
	);
}
