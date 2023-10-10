type TicketsTableProps = {
	ticketsArray: {
		id: string;
		title: string;
		status: string;
		priority: string;
		createdAt: Date;
	}[];
	// ticketsArray: [
	// 	{
	// 		id: string;
	// 		title: string;
	// 		status: string;
	// 		priority: string;
	// 		createdAt: Date;
	// 	},
	// ];
};

const TicketsTable = (props: TicketsTableProps) => {
	return (
		<>
			<table className='table-auto w-full border-spacing-y-8 border-separate'>
				<thead>
					<tr>
						<th className='text-left underline-offset-2 underline'>
							Title
						</th>
						<th className=' underline-offset-2 underline'>
							Status
						</th>
						<th className='underline-offset-2 underline'>
							Priority
						</th>
						<th className='text-right underline-offset-2 underline'>
							Created
						</th>
					</tr>
				</thead>
				<tbody>
					{props.ticketsArray.map((ticket) => (
						<tr key={ticket.id}>
							<td className='text-left'>{ticket.title}</td>
							<td>{ticket.status}</td>
							<td>{ticket.priority}</td>
							<td className='text-right'>
								{ticket.createdAt.toDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default TicketsTable;
