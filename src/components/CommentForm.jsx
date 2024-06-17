import { Button } from './ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/pages/Homepage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCommentSchema } from '@/utils/validations/userSchema';
import { useParams } from 'react-router-dom';
import { postComment } from '@/api/comment';
import { useToast } from './ui/use-toast';

export default function CommentForm() {
	const { toast } = useToast();
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

			toast({
				title: 'Comment posted successfully!',
				description:
					'Try visiting other pages then come back here to see your comment.',
			});
			reset();
		} catch (err) {
			setError('root', { message: err.message });
		}
	};

	return (
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
					<img className='w-7 h-7' src='/send.svg' alt='' />
				</Button>
			</form>
		</div>
	);
}
