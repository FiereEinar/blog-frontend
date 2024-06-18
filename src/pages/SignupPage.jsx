import { postSignUp } from '@/api/user';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/inputField';
import { Logo } from '@/components/ui/logo';
import { useToast } from '@/components/ui/use-toast';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { userSignInSchema } from '@/utils/validations/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
	const { toast } = useToast();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(userSignInSchema) });

	useLoadingTracker(isSubmitting, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

	const onFormSubmit = async (data) => {
		try {
			const response = await postSignUp(data);

			if (!response.ok) {
				setError('root', {
					message: 'Encountered a problem while signing you in.',
				});
				toast({
					variant: 'destructive',
					description: 'Encountered a problem while signing you in.',
				});
				return;
			}

			toast({
				title: 'Account created successfully!',
				description: 'Now log in with you account to proceed.',
			});
			navigate('/login');
		} catch (err) {
			setError('root', { message: err.message });
		}
	};

	return (
		<main>
			<nav className='p-3 border-b md:px-10'>
				<Logo />
			</nav>

			<section className='flex flex-col items-center justify-center pt-10 gap-5'>
				<h1 className='text-3xl'>Sign up</h1>
				<form
					onSubmit={handleSubmit(onFormSubmit)}
					className='md:w-[31rem] w-[22rem] border p-5 rounded-md shadow-md flex flex-col gap-2'
				>
					<div className='flex gap-3 flex-wrap'>
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
