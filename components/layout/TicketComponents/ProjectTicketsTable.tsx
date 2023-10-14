type TicketsTableProps = {
	ticketsArray: {
		id: string;
		title: string;
		status: string;
		priority: string;
		createdAt: Date;
	}[];
};

const ProjectTicketsTable = (props: TicketsTableProps) => {
	return (
		<>
			<table className='table-auto w-full border-spacing-y-8 border-separate'>
				<thead>
					<tr>
						<th className='text-left underline-offset-2 underline'>
							Title
						</th>
						<th className=' text-center underline-offset-2 underline'>
							Status
						</th>
						<th className='underline-offset-2 underline text-center'>
							Priority
						</th>
						<th className='text-center underline-offset-2 underline'>
							Created
						</th>
					</tr>
				</thead>
				<tbody>
					{props.ticketsArray.map((ticket) => (
						<tr key={ticket.id}>
							<td className='text-left'>{ticket.title}</td>
							<td className='text-center'>{ticket.status}</td>
							<td className='text-center'>{ticket.priority}</td>
							<td className='text-center'>
								{ticket.createdAt.toDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ProjectTicketsTable;
