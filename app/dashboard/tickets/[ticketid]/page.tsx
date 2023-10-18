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

	const data = await TicketPageFunctions(props);

	return (
		<div className='w-full min-h-screen flex justify-center items-center mx-auto py-24 '>
			<Ticket ticket={data as TicketInformation} />
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
