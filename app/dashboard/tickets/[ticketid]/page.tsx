import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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
					name: true,
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

	return (
		<div className='w-full min-h-screen grid place-content-center place-items-center mx-auto py-24 px-4'>
			<h1>Ticket Name: {ticket?.title}</h1>
			<h2>Ticket Status: {ticket?.status}</h2>
			<h2>Ticket Priority: {ticket?.priority}</h2>
			<h2>Ticket Type: {ticket?.type}</h2>
			<h2>Ticket Project: {ticket?.project?.name}</h2>
			<h2>Ticket Created By: {ticket?.createdBy?.name}</h2>
			<h2>Ticket Assigned To: {ticket?.assignedTo?.name}</h2>
			<h2>Ticket Body: {ticket?.body}</h2>
			<h2>Ticket Created At: {ticket?.createdAt.toDateString()}</h2>
			<h2>Ticket Updated At: {ticket?.updatedAt.toDateString()}</h2>
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
