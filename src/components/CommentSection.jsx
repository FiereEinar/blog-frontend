import { capitalizeFirstLetter } from '@/lib/utils';
import { Comment } from './ui/comment';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/pages/Homepage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCommentSchema } from '@/utils/validations/userSchema';
import { useParams } from 'react-router-dom';
import { postComment } from '@/api/comment';

export default function CommentSection({ comments }) {
	const isLoggedIn = useContext(AuthContext);
	const { blogId } = useParams();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(userCommentSchema) });

	const onCommentSubmit = async (data) => {
		try {
			const result = await postComment(data, blogId);

			if (!result.success) {
				return setError('root', { message: 'Comment not posted succesfully.' });
			}

			reset();
		} catch (err) {
			setError('root', { message: err.message });
		}
	};

	return (
		<aside className='flex flex-col gap-3 mt-10 p-5 border-x max-w-[26rem] w-full'>
			<h1 className='text-xl mb-3'>Comments</h1>

			<div className='min-h-[30rem] flex flex-col justify-between'>
				<div className='flex flex-col gap-2'>
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

				<div>
					{errors.text && (
						<p className='text-red-500 my-2'>{errors.text.message}</p>
					)}
					{errors.root && (
						<p className='text-red-500 my-2'>{errors.root.message}</p>
					)}
					<form
						onSubmit={handleSubmit(onCommentSubmit)}
						className='flex justify-between'
					>
						<input
							disabled={!isLoggedIn || isSubmitting}
							{...register('text')}
							placeholder={!isLoggedIn ? 'Log in to comment.' : ''}
							className=' border border-slate-500 flex-1 rounded-md px-3'
							type='text'
							id='text'
						/>
						<Button
							size='sm'
							disabled={!isLoggedIn || isSubmitting}
							className=' disabled:opacity-50 rounded-r-md flex border justify-center items-center px-2 gap-1'
						>
							Comment
							<img className='w-7 h-7' src='/src/assets/send.svg' alt='' />
						</Button>
					</form>
				</div>
			</div>
		</aside>
	);
}
