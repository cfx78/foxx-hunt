import { getServerSession } from 'next-auth';
import AddComment from './AddComment';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db';
import CommentSection from './CommentSection';
import UpdateTicket from './UpdateTicket';
import { TicketPriority, TicketStatus } from '@prisma/client';
import AcceptTicketButton from './AcceptTicketButton';
import { redirect } from 'next/navigation';

type TicketProps = {
	ticket: TicketInformation;
};
const Ticket = async (props: TicketProps) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/');
	}

	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email as string,
		},
	});

	if (!user) {
		redirect('/');
	}

	const users = await prisma.user.findMany();
	const usersArray = users.map((user) => {
		return user.email;
	});

	return (
		<div className='w-full max-w-7xl bg-slate-300 dark:bg-slate-700 dark:text-slate-200 rounded-lg shadow-2xl p-10 m-4 mx-auto'>
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
					{props.ticket.status === 'DONE' && (
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
			{user.role === 'ADMIN' ? (
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Update Ticket
					</h3>
					<div className='w-full flex justify-center items-center flex-col'>
						<UpdateTicket
							priority={props.ticket.priority as TicketPriority}
							status={props.ticket.status as TicketStatus}
							ticketId={props.ticket.id}
							userEmail={user.email}
							title={props.ticket.title}
							key={props.ticket.id}
							usersArray={usersArray}
						/>
					</div>
				</div>
			) : (
				<div className='block w-full text-center  text-2xl font-bold mb-6'>
					<h3 className='text-2xl underline underline-offset-4 dark:decoration-slate-900'>
						Accept Ticket
					</h3>
					<div className='w-full flex justify-center items-center flex-col'>
						<AcceptTicketButton
							title={props.ticket.title}
							ticketId={props.ticket.id}
							userId={user.id}
						/>
					</div>
				</div>
			)}

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
					<CommentSection
						key={comment.body}
						name={comment.userName}
						email={comment.userEmail}
						date={comment.createdAt}
						comment={comment.body}
					/>
				))}
			</div>
		</div>
	);
};

export default Ticket;
