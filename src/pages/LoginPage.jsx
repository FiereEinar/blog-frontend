import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userLoginSchema } from '@/utils/validations/userSchema';
import { useNavigate } from 'react-router-dom';
import { postSignIn } from '@/api/user';

export default function LoginPage() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(userLoginSchema) });

	const onFormSubmit = async (data) => {
		try {
			const result = await postSignIn(data);

			if (!result.token) {
				setError('root', { message: result.message });
			} else {
				localStorage.setItem('Token', `Bearer ${result.token}`);
				navigate('/');
			}
		} catch (err) {
			setError('root', { message: err.message });
		}
	};

	return (
		<section className='flex flex-col gap-3 justify-center items-center pt-32'>
			<h1 className='text-3xl'>Login</h1>
			<form
				onSubmit={handleSubmit(onFormSubmit)}
				className='w-[30rem] flex flex-col gap-5'
			>
				<div className='flex flex-col'>
					<label htmlFor='email'>Email:</label>

					<input
						{...register('email')}
						className='border rounded-sm'
						type='text'
						id='email'
					/>
					{errors.email && (
						<p className='text-red-500'>{errors.email.message}</p>
					)}
				</div>
				<div className='flex flex-col'>
					<label htmlFor='password'>Password:</label>

					<input
						{...register('password')}
						className='border rounded-sm'
						type='password'
						id='password'
					/>
					{errors.password && (
						<p className='text-red-500'>{errors.password.message}</p>
					)}
				</div>

				<div className='flex w-full justify-end'>
					<Button disabled={isSubmitting} type='submit' size='sm'>
						{isSubmitting ? 'Loading' : 'Submit'}
					</Button>
				</div>
				{errors.root && <p className='text-red-500'>{errors.root.message}</p>}
			</form>
		</section>
	);
}
