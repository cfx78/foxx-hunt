import CreatedTicketsRow from './CreatedTicketsRow';

type CreatedTicketsTableProps = {
	ticketsArray: {
		id: string;
		title: string;
		status: string;
		priority: string;
		createdAt: Date;
	}[];
};

const CreatedTicketsTable = (props: CreatedTicketsTableProps) => {
	return (
		<table>
			<thead>
				<tr>
					<th>
						<div className='table-heading'>Title</div>
					</th>
					<th>
						<div className='table-heading'>Status</div>
					</th>
					<th>
						<div className='table-heading'>Priority</div>
					</th>
					<th>
						<div className='table-date'>Created</div>
					</th>
				</tr>
			</thead>
			<tbody className='text-sm divide-y divide-gray-100'>
				{props.ticketsArray.map((ticket) => (
					<CreatedTicketsRow
						createdAt={ticket.createdAt}
						id={ticket.id}
						priority={ticket.priority}
						status={ticket.status}
						title={ticket.title}
						key={ticket.id}
					/>
				))}
			</tbody>
		</table>
	);
};

export default CreatedTicketsTable;
