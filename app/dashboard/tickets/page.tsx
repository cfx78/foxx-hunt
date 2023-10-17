import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Header from '@/components/layout/Header';
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
		<div className='lg:max-w-[94.58vw] lg:mx-auto w-full max-w-screen  h-full lg:h-screen lg:top-0 lg:right-0 lg:fixed lg:py-24 lg:px-4'>
			<Header pageTitle='Tickets' />
			<div className='flex flex-col justify-center w-full h-full px-4 pt-56 mt-16 lg:pt-0 '>
				<h1 className='w-full text-3xl text-center'>Your Tickets</h1>
				<AssignedTicketsTable ticketsArray={userTickets as []} />
			</div>
		</div>
	);
};

export default TicketsPage;
