import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import DashboardBarGraph from '@/components/layout/Charts/DashboardBarGraph';
import Header from '@/components/layout/Header';
import TicketsPieChart from '@/components/layout/Charts/TicketsPieChart';

const Dashboard = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	if (session == null) {
		redirect('/');
	}

	const userEmail = session.user?.email;
	console.log(userEmail);

	const user = await prisma.user.findUnique({
		where: {
			email: userEmail as string,
		},
	});
	console.log(user?.role);

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

	console.log(tickets);
	console.log(TicketStatusData);
	console.log(TicketTypeData);
	console.log(TicketPriorityData);
	console.log(BarGraphData);

	return (
		<div className='lg:max-w-[94.58vw] lg:mx-auto w-full max-w-screen  h-full lg:h-screen lg:top-0 lg:right-0 lg:fixed lg:py-24 lg:px-4 '>
			<Header pageTitle='Dashboard' />
			<div className='w-full h-full flex-col hidden lg:flex -mt-32 mb-[-38rem]   justify-center items-center gap-2'>
				<h1 className='text-2xl'>Project Tickets</h1>
				<DashboardBarGraph data={BarGraphData} />
			</div>
			<div className='w-full h-full flex-col lg:flex-row  lg:flex justify-evenly items-center'>
				<div className='w-full flex justify-center items-center flex-col'>
					<h1 className='text-xl text-center'>Tickets by Type</h1>
					<TicketsPieChart data={TicketTypeData} />
				</div>
				<div className='w-full flex justify-center items-center flex-col'>
					<h1 className='text-xl text-center'>Tickets by Status</h1>
					<TicketsPieChart data={TicketStatusData} />
				</div>
				<div className='w-full flex justify-center items-center flex-col'>
					<h1 className='text-xl text-center'>Tickets by Priority</h1>
					<TicketsPieChart data={TicketPriorityData} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
