import DashboardBarGraph from '@/components/layout/Charts/DashboardBarGraph';
import Header from '@/components/layout/Header';
import TicketsPieChart from '@/components/layout/Charts/TicketsPieChart';
import DashboardFunctions from '@/lib/ServerComponentFunctions/MainPages/DashboardPageFunctions';

const Dashboard = async () => {
	const data = await DashboardFunctions();

	return (
		<div className='dashboard-container '>
			<Header pageTitle='Dashboard' />
			<main>
				<div className='bar-chart-container'>
					<h1 className='w-full pl-6 text-2xl text-center'>
						Project Tickets
					</h1>
					<DashboardBarGraph data={data.BarGraphData} />
				</div>
				<div className='pie-charts-container'>
					<div className='flex flex-col items-center justify-center w-full'>
						<h1 className='text-xl text-center'>Tickets by Type</h1>
						<TicketsPieChart data={data.TicketTypeData} />
					</div>
					<div className='flex flex-col items-center justify-center w-full py-60 lg:py-0'>
						<h1 className='text-xl text-center'>
							Tickets by Status
						</h1>
						<TicketsPieChart data={data.TicketStatusData} />
					</div>
					<div className='flex flex-col items-center justify-center w-full'>
						<h1 className='text-xl text-center'>
							Tickets by Priority
						</h1>
						<TicketsPieChart data={data.TicketPriorityData} />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
