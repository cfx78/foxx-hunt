import './styles.modules.css';
import Header from '@/components/layout/Header';
import AssignedTicketsTable from '@/components/layout/TicketComponents/AssignedTicketsTableComponents/AssignedTicketsTable';
import CreateTicket from '@/components/layout/TicketComponents/CreateTicket';
import CreatedTicketsTable from '@/components/layout/TicketComponents/CreatedTicketsTableComponents/CreatedTicketsTable';
import TicketsPageFunctions from '@/lib/ServerComponentFunctions/MainPages/TicketsPageFunctions';

const TicketsPage = async () => {
	const data = await TicketsPageFunctions();

	return (
		<div className='tickets-container'>
			<Header pageTitle='Tickets' />
			<main>
				<section>
					<CreateTicket
						userID={data.userId as string}
						projects={data.projectNames as []}
					/>
				</section>
				<section>
					<h1 className='w-full text-3xl text-center pb-3'>
						Assigned Tickets
					</h1>
					<AssignedTicketsTable
						ticketsArray={data.assignedUserTickets as []}
					/>
				</section>
				<section>
					<h1 className='w-full text-3xl text-center pb-3'>
						Created Tickets
					</h1>
					<CreatedTicketsTable
						ticketsArray={data.createdUserTickets as []}
					/>
				</section>
			</main>
		</div>
	);
};

export default TicketsPage;
