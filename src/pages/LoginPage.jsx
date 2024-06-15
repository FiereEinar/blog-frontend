import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userLoginSchema } from '@/utils/validations/userSchema';
import { Link, useNavigate } from 'react-router-dom';
import { postSignIn } from '@/api/user';
import { Logo } from '@/components/ui/logo';
import { InputField } from '@/components/ui/inputField';

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
		<main className=''>
			<nav className='p-3 border-b '>
				<Logo />
			</nav>

			<section className='flex flex-col items-center justify-center pt-10 gap-5'>
				<h1 className='text-3xl'>Login</h1>
				<form
					onSubmit={handleSubmit(onFormSubmit)}
					className='w-[30rem] border p-5 rounded-md shadow-md flex flex-col gap-2'
				>
					<InputField
						type='email'
						id='email'
						label='Email:'
						register={{ ...register('email') }}
						error={errors.email}
					/>
					<InputField
						type='password'
						id='password'
						label='Password:'
						register={{ ...register('password') }}
						error={errors.password}
					/>
					<p className=' text-muted-foreground italic text-sm'>
						Already have an account?
						<Link className='underline' to='/signup'>
							{' '}
							Sign up
						</Link>
					</p>

					<div className='flex w-full justify-end'>
						<Button disabled={isSubmitting} type='submit' size='sm'>
							{isSubmitting ? 'Loading...' : 'Submit'}
						</Button>
					</div>
					{errors.root && (
						<p className='text-red-500 text-sm'>{errors.root.message}</p>
					)}
				</form>
			</section>
		</main>
	);
}
