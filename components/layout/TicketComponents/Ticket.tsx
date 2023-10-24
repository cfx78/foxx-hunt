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
		<div className='flow-root px-4 py-10 border border-gray-100 rounded-lg shadow-lg dark:border-gray-700 bg-slate-300 dark:bg-slate-700'>
			<dl className='-my-3 text-lg divide-y divide-gray-100 dark:divide-gray-700'>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Title
					</dt>
					<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
						{props.ticket.title}
					</dd>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Status
					</dt>
					{props.ticket.status === 'DONE' && (
						<dd className=' sm:col-span-2 text-success'>Closed</dd>
					)}
					{props.ticket.status === 'IN_PROGRESS' && (
						<dd className='sm:col-span-2 text-warning'>
							{props.ticket.status}
						</dd>
					)}
					{props.ticket.status === 'OPEN' && (
						<dd className='sm:col-span-2 text-danger'>
							{props.ticket.status}
						</dd>
					)}
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Priority
					</dt>
					{props.ticket.priority === 'LOW' && (
						<dd className='sm:col-span-2 text-success'>Low</dd>
					)}
					{props.ticket.priority === 'MEDIUM' && (
						<dd className='sm:col-span-2 text-warning'>Medium</dd>
					)}
					{props.ticket.priority === 'HIGH' && (
						<dd className='sm:col-span-2 text-danger'>High</dd>
					)}
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Type
					</dt>
					{props.ticket.type === 'TASK' && (
						<dd className='sm:col-span-2 text-success'>Task</dd>
					)}
					{props.ticket.type === 'FEATURE' && (
						<dd className='sm:col-span-2 text-warning'>Feature</dd>
					)}
					{props.ticket.type === 'BUG' && (
						<dd className='sm:col-span-2 text-danger'>Bug</dd>
					)}
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Project
					</dt>
					<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
						{props.ticket.project.name}
					</dd>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Created By
					</dt>
					<div className='flex flex-col'>
						{props.ticket.createdBy.name && (
							<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
								{props.ticket.createdBy.name}
							</dd>
						)}
						{props.ticket.createdBy.email && (
							<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
								{props.ticket.createdBy.email}
							</dd>
						)}
					</div>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Assigned To
					</dt>
					<div className='flex flex-col'>
						{(props.ticket.assignedTo && (
							<>
								{props.ticket.assignedTo?.name && (
									<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
										{props.ticket.assignedTo?.name}
									</dd>
								)}
								{props.ticket.assignedTo?.email && (
									<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
										{props.ticket.assignedTo?.email}
									</dd>
								)}
							</>
						)) ||
							'Not Assigned'}
					</div>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Created At
					</dt>
					<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
						{props.ticket.createdAt.toDateString()}
					</dd>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Updated At
					</dt>
					<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
						{props.ticket.updatedAt.toDateString()}
					</dd>
				</div>

				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Body
					</dt>
					<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
						{props.ticket.body}
					</dd>
				</div>
				{user.role === 'ADMIN' ? (
					<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
						<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
							Update Ticket
						</dt>
						<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
							<UpdateTicket
								priority={
									props.ticket.priority as TicketPriority
								}
								status={props.ticket.status as TicketStatus}
								ticketId={props.ticket.id}
								userEmail={user.email}
								title={props.ticket.title}
								key={props.ticket.id}
								usersArray={usersArray}
							/>
						</dd>
					</div>
				) : (
					<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
						<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
							Accept Ticket
						</dt>
						<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
							<AcceptTicketButton
								title={props.ticket.title}
								ticketId={props.ticket.id}
								userId={user.id}
							/>
						</dd>
					</div>
				)}

				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Comments
					</dt>
					<div className='flex flex-col gap-4'>
						<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
							<AddComment
								userEmail={user?.email as string}
								userName={user?.name as string}
								ticketId={props.ticket.id}
							/>
						</dd>

						{props.ticket.comments.map((comment) => (
							<dd key={comment.body}>
								<CommentSection
									name={comment.userName}
									email={comment.userEmail}
									date={comment.createdAt}
									comment={comment.body}
								/>
							</dd>
						))}
					</div>
				</div>
			</dl>
		</div>
	);
};

export default Ticket;
