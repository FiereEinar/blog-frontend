import { capitalizeFirstLetter } from '@/lib/utils';
import { Comment } from './ui/comment';
import { format } from 'date-fns';

import CommentForm from './CommentForm';

export default function CommentSection({ comments }) {
	return (
		<aside className='flex flex-col gap-3 mt-10 p-5 border-x max-w-[26rem] w-full'>
			<h1 className='text-xl mb-3'>Comments</h1>

			<div className='min-h-[30rem] flex flex-col justify-between'>
				<div className='flex flex-col gap-2'>
					{comments.length === 0 && (
						<p className='italic text-sm text-muted-foreground'>
							No comments yet.
						</p>
					)}
					{comments.map((comment) => (
						<Comment
							imgURL={comment.creator?.profile?.imgUrl || undefined}
							key={comment._id}
							text={comment.text}
							date={format(comment.dateAdded, 'MMMM dd, yyyy')}
							author={`${capitalizeFirstLetter(comment.creator.firstName)} 
								${capitalizeFirstLetter(comment.creator.lastName)}`}
						/>
					))}
				</div>

				<CommentForm />
			</div>
		</aside>
	);
}
