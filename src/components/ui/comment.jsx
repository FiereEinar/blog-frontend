export function Comment({ author, text, imgURL, date }) {
	return (
		<article className='flex gap-2 text-sm border p-2 rounded-md'>
			<img className='w-9 h-9 rounded-full border' src={imgURL} alt='profile' />
			<div className='flex-1'>
				<h4 className=' font-medium'>{author}</h4>
				<p className=' text-xs italic'>{date}</p>
				<hr className='my-1' />
				<p>{text}</p>
			</div>
		</article>
	);
}
