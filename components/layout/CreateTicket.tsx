type CreateTicketProps = {
	projectName: string;
	userID: string;
};

const CreateTicket = (props: CreateTicketProps) => {
	return (
		<div className='w-full h-screen py-24'>
			<h1>Create Ticket</h1>
			<p>{props.projectName}</p>
			<p>{props.userID}</p>
		</div>
	);
};

export default CreateTicket;
