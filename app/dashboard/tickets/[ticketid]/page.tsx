import './styles.modules.css';
import Header from '@/components/layout/Header';
import Ticket from '@/components/layout/TicketComponents/Ticket';
import prisma from '@/lib/db';
import {
	TicketPageFunctions,
	TicketPageFunctionsProps,
} from '@/lib/ServerComponentFunctions/DynamicPages/TicketPageFunctions';

type TicketPageParams = {
	params: {
		ticketid: string;
	};
};

const TicketPage = async ({ params: { ticketid } }: TicketPageParams) => {
	const props: TicketPageFunctionsProps = {
		ticketid,
	};

	const ticket = await prisma.ticket.findUnique({
		where: {
			id: ticketid,
		},
	});

	if (!ticket) {
		return <div>404</div>;
	}

	const data = await TicketPageFunctions(props);

	return (
		<div className='ticket-container'>
			<Header pageTitle={ticket.title} />
			<main>
				<Ticket ticket={data as TicketInformation} />
			</main>
		</div>
	);
};

export async function generateStaticParams() {
	const tickets = await prisma.ticket.findMany();

	return tickets.map((ticket) => ({
		ticketid: ticket.id,
	}));
}

export const revalidate = 3600;

export default TicketPage;
