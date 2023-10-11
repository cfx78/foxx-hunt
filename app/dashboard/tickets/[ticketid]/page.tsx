import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Ticket from '@/components/layout/TicketComponents/Ticket';
import CreateTicket from '@/components/layout/TicketComponents/CreateTicket';
import ProjectTicketsTable from '@/components/layout/TicketComponents/ProjectTicketsTable';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
type TicketPageParams = {
	params: {
		ticketid: string;
	};
};

const TicketPage = async ({ params: { ticketid } }: TicketPageParams) => {
	const ticket = await prisma.ticket.findUnique({
		where: {
			id: ticketid,
		},
		include: {
			createdBy: true,
			assignedTo: true,
			project: true,
		},
	});

	if (!ticket) {
		return <h1>Ticket Not Found</h1>;
	}

	console.log(`ticket: ${ticket.createdBy.name}`);

	const ticketInformation = {
		id: ticket.id,
		title: ticket.title,
		status: ticket.status,
		priority: ticket.priority,
		type: ticket.type,
		body: ticket.body,
		createdAt: ticket.createdAt,
		updatedAt: ticket.updatedAt,
		createdBy: {
			name: ticket.createdBy?.name,
			email: ticket.createdBy.email,
		},
		assignedTo: {
			name: ticket.assignedTo?.name,
			email: ticket.assignedTo?.email,
		},
		project: { name: ticket.project?.name },
		comments: ticket.comments.map((comment) => ({
			body: comment.body,
			createdAt: comment.createdAt,
			userName: comment.userName,
			userEmail: comment.userEmail,
		})),
	};

	return (
		<div className='w-full min-h-screen grid place-content-center place-items-center mx-auto py-24 '>
			<Ticket ticket={ticketInformation} />
			<h1>Ticket Name: {ticket?.title}</h1>
			<h2>Ticket Status: {ticket?.status}</h2>
			<h2>Ticket Priority: {ticket?.priority}</h2>
			<h2>Ticket Type: {ticket?.type}</h2>
			<h2>Ticket Project: {ticket?.project?.name}</h2>as
			<h2>Ticket Created By: {ticket?.createdBy?.name}</h2>
			<h2>Ticket Assigned To: {ticket?.assignedTo?.name}</h2>
			<h2>Ticket Body: {ticket?.body}</h2>
			<h2>Ticket Created At: {ticket?.createdAt.toDateString()}</h2>
			<h2>Ticket Updated At: {ticket?.updatedAt.toDateString()}</h2>
			<h2>Ticket Comments:</h2>
			<ul>
				{/* {ticket?.comments.map((comment) => (
					<li key={comment.id}>
						<h3>Comment Body: {comment.body}</h3>
						<h3>
							Comment Created By: {comment.createdBy.name}-
							{comment.createdById}
						</h3>
						<h3>
							Comment Created At:{' '}
							{comment.createdAt.toDateString()}
						</h3>
					</li>
				))} */}
			</ul>
		</div>
	);
};

export async function generateStaticParams() {
	const tickets = await prisma.ticket.findMany();

	return tickets.map((ticket) => ({
		ticketid: ticket.id,
	}));
}

export const revalidate = 3600;

export default TicketPage;
