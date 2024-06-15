export function InputField({ id, label, type, error, register }) {
	return (
		<div className='flex-1 flex flex-col'>
			<label htmlFor={id}>{label}</label>
			<input
				{...register}
				id={id}
				className='border border-slate-400 rounded-sm p-1 px-2'
				type={type}
			/>
			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
		</div>
	);
}
