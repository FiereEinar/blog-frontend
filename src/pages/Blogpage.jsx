import LoadingScreen from '@/components/LoadingScreen';
import useFetchBlogs from '@/hooks/useFetchData';
import { determineReadtime } from '@/lib/utils';

export default function Blogpage() {
	const [blogs, loading, error] = useFetchBlogs();

	return (
		<>
			{error && <h1>An error has occurred, please restart the application</h1>}
			<div className='flex flex-col gap-3 p-3'>
				{loading ? (
					<LoadingScreen />
				) : (
					<>
						<h1 className='text-3xl w-full flex justify-center'>Blogs</h1>
						<section className='flex w-full gap-3'>
							{blogs.map((blog) => (
								<article
									className='border w-96 p-5 rounded-md flex flex-col gap-1 justify-between'
									key={blog._id}
								>
									<h4 className='text-xl italic font-semibold'>
										{blog.topic.title}
									</h4>
									<p className='text-xs italic'>
										Read time: {determineReadtime(blog.text)} minutes
									</p>
									<img
										className='w-full h-36 object-cover object-center'
										src={blog.img.url}
										alt=''
									/>
									<h4 className='text-xl italic'>{blog.title}</h4>
									<p className='text-xs italic'>{blog.dateAdded}</p>
									<div className='flex justify-start mt-2 items-center gap-2'>
										<img
											className='w-6 h-6'
											src='src/assets/comment.svg'
											alt='comment'
										/>
										<p>{blog.comments.length}</p>
									</div>
								</article>
							))}
						</section>
					</>
				)}
			</div>
		</>
	);
}
