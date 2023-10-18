type CommentSectionProps = {
	name?: string;
	email: string;
	date: Date;
	comment: string;
};

const CommentSection = (props: CommentSectionProps) => {
	return (
		<div className='bg-transparent p-4 rounded-lg shadow-md'>
			{props.name ? (
				<>
					<h3 className='text-sm  font-bold'>{props.name}</h3>
					<small className='text-xs'>{props.email}</small>
				</>
			) : (
				<h3 className='text-sm font-bold'>{props.email}</h3>
			)}
			<p className=' text-xs mb-2'>{props.date.toDateString()}</p>
			<p className=' text-xs'>{props.comment}</p>
		</div>
	);
};

export default CommentSection;
