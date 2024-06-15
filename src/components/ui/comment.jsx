export function Comment({ author, text, imgURL, date }) {
	return (
		<article className='flex flex-col gap-3 text-sm border-t p-3 w-full'>
			<div className='flex gap-3'>
				<img
					className='w-9 h-9 rounded-full border'
					src={imgURL || '/src/assets/default_user.jpg'}
					alt='profile'
				/>
				<div>
					<h4 className=' font-medium'>{author}</h4>
					<p className=' text-xs italic'>{date}</p>
				</div>
			</div>
			<p>{text}</p>
		</article>
	);
}
