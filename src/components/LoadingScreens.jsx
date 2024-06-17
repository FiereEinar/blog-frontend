import { Skeleton } from './ui/skeleton';

export function BlogPageLoadingScreen() {
	const blogs = new Array(8).fill(1);

	return (
		<main className='flex flex-col gap-3 p-3'>
			<section className='flex w-full gap-3 flex-wrap justify-center items-stretch'>
				{blogs.map((_, i) => (
					<BlogCardLoading key={i} />
				))}
			</section>
		</main>
	);
}

function BlogCardLoading() {
	return (
		<article className='transition-all border w-80 rounded-md text-muted-foreground hover:shadow-lg hover:border-gray-300 hover:-translate-y-1'>
			<div className='w-full h-full p-3 flex flex-col gap-2 justify-between'>
				<Skeleton className='w-full h-40 rounded-sm' />
				<Skeleton className='h-5 w-[100px]' />
				<Skeleton className='h-3 w-[150px]' />
				<Skeleton className='h-16 w-[300px]' />
				<Skeleton className='h-3 w-[100px]' />
				<div className='flex justify-start mt-2 items-center gap-2'>
					<Skeleton className='w-6 h-6 rounded-full' />
					<Skeleton className='w-3 h-6' />
				</div>
			</div>
		</article>
	);
}

export function ProfileSheetLoadingScreen() {
	return (
		<section className='py-5 flex flex-col gap-2'>
			<Skeleton className='w-24 h-24 rounded-md object-cover object-center' />
			<InputFieldLoading />
			<InputFieldLoading />
			<InputFieldLoading />
			<InputFieldLoading />
		</section>
	);
}

function InputFieldLoading() {
	return (
		<div className='flex-1 flex flex-col gap-1'>
			<Skeleton className='h-5 w-[120px]' />
			<Skeleton className='h-9 w-full' />
		</div>
	);
}
