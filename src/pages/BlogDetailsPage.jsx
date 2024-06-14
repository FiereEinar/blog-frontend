import LoadingScreen from '@/components/LoadingScreen';
import { Comment } from '@/components/ui/comment';
import fetchBlogById from '@/hooks/fetchBlogById';
import { capitalizeFirstLetter } from '@/lib/utils';
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
				<section className='flex flex-col gap-3 max-w-[34rem] p-5 justify-center items-center overflow-auto'>
					<p className='text-muted-foreground'>
						{format(data.dateAdded, 'MMMM dd, yyyy')}
					</p>
					<h1 className='text-2xl text-center font-semibold'>{data.title}</h1>
					<h4 className='text-xl'>{data.topic.title}</h4>
					<img className='rounded-sm' src={data.img.url} alt='data Image' />
					<p>{data.text}</p>
				</section>

				<aside className='flex flex-col gap-3 mt-10 p-5 border-l max-w-80 w-full'>
					<h1 className='text-xl'>Comments</h1>
					<div className='min-h-80 border flex flex-col justify-between'>
						<div className='max-h-80 overflow-auto'>
							{data.comments.map((comment) => (
								<Comment
									// imgURL={comment.creator.profile.imgUrl}
									key={comment._id}
									text={comment.text}
									date={format(comment.dateAdded, 'MMMM dd, yyyy')}
									author={`${capitalizeFirstLetter(comment.creator.firstName)} 
									${capitalizeFirstLetter(comment.creator.lastName)}`}
								/>
							))}
						</div>
						<div className='flex gap-2 '>
							<input className='border' type='text' />
							<button className='border rounded-sm'>Comment</button>
						</div>
					</div>
				</aside>
			</main>
		</>
	);
}
