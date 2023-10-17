import './styles.modules.css';
import Header from '@/components/layout/Header';
import AssignedTicketsTable from '@/components/layout/TicketComponents/AssignedTicketsComponents/AssignedTicketsTable';
import TicketsPageFunctions from '@/lib/ServerComponentFunctions/MainPages/TicketsPageFunctions';

const TicketsPage = async () => {
	const data = await TicketsPageFunctions();

	return (
		<div className='tickets-container'>
			<Header pageTitle='Tickets' />
			<main>
				<h1 className='w-full text-3xl text-center'>Your Tickets</h1>
				<AssignedTicketsTable ticketsArray={data.userTickets as []} />
			</main>
		</div>
	);
};

export default TicketsPage;
