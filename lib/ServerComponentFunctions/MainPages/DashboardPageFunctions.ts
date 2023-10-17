import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import prisma from '../../db';
import { redirect } from 'next/navigation';

const DashboardFunctions = async () => {
	const session = await getServerSession(authOptions);

	if (session == null) {
		redirect('/');
	}

	const userEmail = session.user?.email;


	const user = await prisma.user.findUnique({
		where: {
			email: userEmail as string,
		},
	});

	const projects = await prisma.project.findMany({
		include: { tickets: true },
	});
	const BarGraphData = projects.map((project) => {
		return {
			name: project.name,
			LOW: project.tickets.filter((ticket) => ticket.priority === 'LOW')
				.length,
			MEDIUM: project.tickets.filter(
				(ticket) => ticket.priority === 'MEDIUM',
			).length,
			HIGH: project.tickets.filter((ticket) => ticket.priority === 'HIGH')
				.length,
		};
	});

	const tickets = await prisma.ticket.findMany({});

	const TicketStatusData = [
		{
			name: 'Open',
			value: tickets.filter((ticket) => ticket.status === 'OPEN').length,
		},
		{
			name: 'In Progress',
			value: tickets.filter((ticket) => ticket.status === 'IN_PROGRESS')
				.length,
		},
		{
			name: 'Done',
			value: tickets.filter((ticket) => ticket.status === 'DONE').length,
		},
	];

	const TicketTypeData = [
		{
			name: 'Bug',
			value: tickets.filter((ticket) => ticket.type === 'BUG').length,
		},
		{
			name: 'Feature',
			value: tickets.filter((ticket) => ticket.type === 'FEATURE').length,
		},
		{
			name: 'Task',
			value: tickets.filter((ticket) => ticket.type === 'TASK').length,
		},
	];

	const TicketPriorityData = [
		{
			name: 'Low',
			value: tickets.filter((ticket) => ticket.priority === 'LOW').length,
		},
		{
			name: 'Medium',
			value: tickets.filter((ticket) => ticket.priority === 'MEDIUM')
				.length,
		},
		{
			name: 'High',
			value: tickets.filter((ticket) => ticket.priority === 'HIGH')
				.length,
		},
	];

	return {
		user,
		projects,
		BarGraphData,
		TicketStatusData,
		TicketTypeData,
		TicketPriorityData,
	};
};

export default DashboardFunctions;
