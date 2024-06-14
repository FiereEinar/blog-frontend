import { capitalizeFirstLetter } from '@/lib/utils';
import { Comment } from './ui/comment';
import { format } from 'date-fns';
import { Button } from './ui/button';

export default function CommentSection({ comments }) {
	return (
		<aside className='flex flex-col gap-3 mt-10 p-5 border-x max-w-[26rem] w-full'>
			<h1 className='text-xl mb-3'>Comments</h1>
			<div className='min-h-[30rem] flex flex-col justify-between'>
				<div className='flex flex-col gap-3'>
					{comments.length === 0 && (
						<p className='italic text-sm'>No comments yet.</p>
					)}
					{comments.map((comment) => (
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
				<div className='flex justify-between'>
					<input
						className=' border border-slate-500 flex-1 rounded-md px-3'
						type='text'
					/>
					<Button
						size='sm'
						className=' rounded-r-md flex border justify-center items-center px-2 gap-1'
					>
						Comment
						<img className='w-7 h-7' src='/src/assets/send.svg' alt='' />
					</Button>
				</div>
			</div>
		</aside>
	);
}
