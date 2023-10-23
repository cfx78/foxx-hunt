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

	const userId = user?.id;

	const projects = await prisma.project.findMany();

	const projectNames = projects.map((project) => project.name);

	const createdUserTickets = await prisma.ticket.findMany({
		where: {
			createdByUserId: userId,
		},

		include: {
			createdBy: true,
			assignedTo: true,
			project: true,
		},
	});

	const assignedUserTickets = await prisma.ticket.findMany({
		where: {
			assignedToId: user?.id,
		},

		include: {
			createdBy: true,
			assignedTo: true,
			project: true,
		},
	});

	return { createdUserTickets, assignedUserTickets, userId, projectNames };
};

export default TicketsPageFunctions;
