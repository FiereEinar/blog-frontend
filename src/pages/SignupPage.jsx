import { postSignUp } from '@/api/user';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/inputField';
import { Logo } from '@/components/ui/logo';
import { userSignInSchema } from '@/utils/validations/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(userSignInSchema) });

	const onFormSubmit = async (data) => {
		try {
			const response = await postSignUp(data);

			if (!response.ok) {
				setError('root', {
					message: 'Encountered a problem while signing you in.',
				});
			}

			navigate('/login');
		} catch (err) {
			setError('root', { message: err.message });
		}
	};

	return (
		<main>
			<nav className='p-3 border-b'>
				<Logo />
			</nav>

			<section className='flex flex-col items-center justify-center pt-10 gap-5'>
				<h1 className='text-3xl'>Sign up</h1>
				<form
					onSubmit={handleSubmit(onFormSubmit)}
					className='border p-5 rounded-md shadow-md flex flex-col gap-2'
				>
					<div className='flex gap-3'>
						<InputField
							register={{ ...register('firstName') }}
							error={errors.firstName}
							type='text'
							id='firstName'
							label='Firstname:'
						/>
						<InputField
							register={{ ...register('lastName') }}
							error={errors.lastName}
							type='text'
							id='lastName'
							label='Lastname:'
						/>
					</div>
					<InputField
						register={{ ...register('email') }}
						error={errors.email}
						type='email'
						id='email'
						label='Email:'
					/>
					<InputField
						register={{ ...register('password') }}
						error={errors.password}
						type='password'
						id='password'
						label='Password:'
					/>
					<InputField
						register={{ ...register('confirmPassword') }}
						error={errors.confirmPassword}
						type='password'
						id='confirmPassword'
						label='Confirm Password:'
					/>
					{errors.root && (
						<p className='text-red-500 text-sm'>{errors.root.message}</p>
					)}
					<p className=' text-muted-foreground italic text-sm'>
						Already have an account?
						<Link className='underline' to='/login'>
							{' '}
							Log in
						</Link>
					</p>
					<div className='flex justify-end mt-2'>
						<Button disabled={isSubmitting} size='sm' type='submit'>
							{isSubmitting ? 'Loading...' : 'Submit'}
						</Button>
					</div>
				</form>
			</section>
		</main>
	);
}
