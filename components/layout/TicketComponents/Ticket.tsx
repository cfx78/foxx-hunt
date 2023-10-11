import { getServerSession } from 'next-auth';
import AddComment from './AddComment';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db';

type TicketProps = {
	ticket: TicketInformation;
};
const Ticket = async (props: TicketProps) => {
	const session = await getServerSession(authOptions);

	console.log(session?.user?.email);

	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email as string,
		},
	});

	console.log('user', user?.email);

	return (
		<div className='w-[90vw] lg:w-[25vw] bg-slate-300 dark:bg-slate-700 dark:text-slate-200 rounded-lg shadow-2xl p-10 m-4 mx-auto'>
			<div className='block w-full lg:text-left lg:gap-8  text-center font-bold mb-6'>
				<h2 className='text-4xl underline underline-offset-4 dark:decoration-slate-900'>
					Title
				</h2>
				<p className='text-2xl'>{props.ticket.title}</p>
			</div>
			<div className='lg:w-full lg lg:grid lg:grid-cols-2'>
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Status
					</h3>
					{props.ticket.status === 'CLOSED' && (
						<p className='text-lg text-success'>
							{props.ticket.status}
						</p>
					)}
					{props.ticket.status === 'IN_PROGRESS' && (
						<p className='text-lg text-warning'>
							{props.ticket.status}
						</p>
					)}
					{props.ticket.status === 'OPEN' && (
						<p className='text-lg text-danger'>
							{props.ticket.status}
						</p>
					)}
				</div>
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Priority
					</h3>
					{props.ticket.priority === 'LOW' && (
						<p className='text-lg text-success'>
							{props.ticket.priority}
						</p>
					)}
					{props.ticket.priority === 'MEDIUM' && (
						<p className='text-lg text-warning'>
							{props.ticket.priority}
						</p>
					)}
					{props.ticket.priority === 'HIGH' && (
						<p className='text-lg text-danger'>
							{props.ticket.priority}
						</p>
					)}
				</div>
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Type
					</h3>
					{props.ticket.type === 'TASK' && (
						<p className='text-lg text-success'>
							{props.ticket.type}
						</p>
					)}
					{props.ticket.type === 'FEATURE' && (
						<p className='text-lg text-warning'>
							{props.ticket.type}
						</p>
					)}
					{props.ticket.type === 'BUG' && (
						<p className='text-lg text-danger'>
							{props.ticket.type}
						</p>
					)}
				</div>
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Project
					</h3>
					<p className='text-lg'>{props.ticket.project.name}</p>
				</div>
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Created By
					</h3>
					<ul>
						<li className='text-lg'>
							{props.ticket.createdBy.name &&
								props.ticket.createdBy.name}
						</li>
						<li className='text-lg'>
							{props.ticket.createdBy.email &&
								props.ticket.createdBy.email}
						</li>
					</ul>
				</div>
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Assigned To
					</h3>
					{(props.ticket.assignedTo && (
						<ul>
							{props.ticket.assignedTo?.name && (
								<li className='text-lg'>
									{props.ticket.assignedTo?.name}
								</li>
							)}
							{props.ticket.assignedTo?.email && (
								<li className='text-lg'>
									{props.ticket.assignedTo?.email}
								</li>
							)}
						</ul>
					)) ||
						'Not Assigned'}
				</div>
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Created At
					</h3>
					<p className='text-lg'>
						{props.ticket.createdAt.toDateString()}
					</p>
				</div>
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Updated At
					</h3>
					<p className='text-lg'>
						{props.ticket.updatedAt.toDateString()}
					</p>
				</div>
			</div>
			<div className='block w-full text-center  text-2xl font-bold mb-6'>
				<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
					Body
				</h3>
				<p className='text-lg'>{props.ticket.body}</p>
			</div>

			<div className='block w-full text-center  text-2xl font-bold mb-6'>
				<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
					Comments
				</h3>
				<div className='w-full flex justify-center items-center flex-col'>
					<AddComment
						userEmail={user?.email as string}
						userName={user?.name as string}
						ticketId={props.ticket.id}
					/>
				</div>

				{props.ticket.comments.map((comment) => (
					<li key={comment.body}>
						<h4 className='text-xl underline underline-offset-4 dark:decoration-slate-900'>
							{' '}
							{comment.body}
						</h4>
						<h4 className='text-xl underline underline-offset-4 dark:decoration-slate-900'>
							{comment.userName && comment.userEmail + '-'}
							{comment.userEmail}
						</h4>
						<h4 className='text-xl underline underline-offset-4 dark:decoration-slate-900'>
							{comment.createdAt.toDateString()}
						</h4>
					</li>
				))}
			</div>
		</div>
	);
};

export default Ticket;
{
	/* <h1>Ticket Name: {ticket?.title}</h1>
			<h2>Ticket Status: {ticket?.status}</h2>
			<h2>Ticket Priority: {ticket?.priority}</h2>
			<h2>Ticket Type: {ticket?.type}</h2>
			<h2>Ticket Project: {ticket?.project?.name}</h2>
			<h2>Ticket Created By: {ticket?.createdBy?.name}</h2>
			<h2>Ticket Assigned To: {ticket?.assignedTo?.name}</h2>
			<h2>Ticket Body: {ticket?.body}</h2>
			<h2>Ticket Created At: {ticket?.createdAt.toDateString()}</h2>
			<h2>Ticket Updated At: {ticket?.updatedAt.toDateString()}</h2>
			<h2>Ticket Comments:</h2>
			<ul>
				{ticket?.comments.map((comment) => (
					<li key={comment.id}>
						<h3>Comment Body: {comment.body}</h3>
						<h3>
							Comment Created By: {comment.createdBy.name}-
							{comment.createdByUserEmail}
						</h3>
						<h3>
							Comment Created At:{' '}
							{comment.createdAt.toDateString()}
						</h3>
					</li>
				))}
			</ul> */
}
