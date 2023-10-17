import prisma from '@/lib/db';

export type TicketPageFunctionsProps = {
	ticketid: string;
};

export const TicketPageFunctions = async (props: TicketPageFunctionsProps) => {
	const ticket = await prisma.ticket.findUnique({
		where: {
			id: props.ticketid,
		},
		include: {
			createdBy: true,
			assignedTo: true,
			project: true,
		},
	});

	if (!ticket) {
		return 'Ticket not found';
	}

	const ticketInformation: TicketInformation = {
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

	return ticketInformation;
};
