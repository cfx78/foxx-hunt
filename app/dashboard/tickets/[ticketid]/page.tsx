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
			comments: {
				select: {
					id: true,
					body: true,
					createdAt: true,
					createdBy: true,
					createdByUserEmail: true,
				},
			},
			assignedTo: {
				select: {
					name: true,
					email: true,
				},
			},
			createdBy: {
				select: {
					name: true,
					email: true,
				},
			},
			project: {
				select: {
					name: true,
				},
			},
		},
	});

	if (!ticket) {
		return <h1>Ticket Not Found</h1>;
	}

	console.log(ticket?.comments);

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
			id: comment.id,
			body: comment.body,
			createdAt: comment.createdAt,
			createdBy: {
				name: comment.createdBy.name,
				email: comment.createdBy.email,
			},
			createdByUserEmail: comment.createdByUserEmail,
		})),
	};

	return (
		<div className='w-full min-h-screen grid place-content-center place-items-center mx-auto py-24 px-4'>
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
