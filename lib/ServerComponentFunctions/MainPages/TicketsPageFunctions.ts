import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import prisma from '../../db';

const TicketsPageFunctions = async () => {
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

	return { userTickets };
};

export default TicketsPageFunctions;