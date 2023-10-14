import Ticket from '@/components/layout/TicketComponents/Ticket';

import prisma from '@/lib/db';

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
