import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AssignedTicketsTable from '@/components/layout/TicketComponents/AssignedTicketsComponents/AssignedTicketsTable';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';

const TicketsPage = async () => {
	const session = await getServerSession(authOptions);

	const userEmail = session?.user?.email;

	const user = await prisma.user.findUnique({
		where: {
			email: userEmail as string,
		},
	});

	const userTickets = await prisma.ticket.findMany({
		where: {
			createdByUserId: user?.id,
		},
	});

	return (
		<div className='w-full min-h-screen py-24 flex-col justify-center items-center px-6'>
			<h1 className='text-3xl text-center'>Your Tickets</h1>
			<AssignedTicketsTable ticketsArray={userTickets as []} />
		</div>
	);
};

export default TicketsPage;
