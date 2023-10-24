type CommentSectionProps = {
	name?: string;
	email: string;
	date: Date;
	comment: string;
};

const CommentSection = (props: CommentSectionProps) => {
	return (
		<article className='p-4 transition border rounded-lg shadow-sm bg-stone-300 dark:border-gray-100 dark:bg-card hover:shadow-lg sm:p-6'>
			{props.name ? (
				<>
					<h3 className='text-sm font-bold'>{props.name}</h3>
					<small className='text-xs'>{props.email}</small>
				</>
			) : (
				<h3 className='text-sm font-bold'>{props.email}</h3>
			)}
			<p className='mb-2 text-xs '>{props.date.toDateString()}</p>
			<p className='text-lg '>{props.comment}</p>
		</article>
	);
};

export default CommentSection;
