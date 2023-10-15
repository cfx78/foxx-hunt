import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import DashboardBarGraph from '@/components/layout/Charts/DashboardBarGraph';

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

	console.log(BarGraphData);

	return (
		<div className='w-full h-full top-0 right-0 fixed py-24 px-4 flex justify-center items-center'>
			<DashboardBarGraph data={BarGraphData} />
		</div>
	);
};

export default Dashboard;
