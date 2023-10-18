'use client';

import AssignedTicketsRow from './AssignedTicketsRow';

type AssignedTicketsTableProps = {
	ticketsArray: {
		id: string;
		title: string;
		status: string;
		priority: string;
		createdAt: Date;
	}[];
};

const AssignedTicketsTable = (props: AssignedTicketsTableProps) => {
	return (
		<table className='table-auto w-full border-spacing-y-8 border-separate'>
			<thead>
				<tr>
					<th className='table-heading'>Title</th>
					<th className='table-heading'>Status</th>
					<th className='table-heading'>Priority</th>
					<th className='text-right underline-offset-2 underline'>
						Created
					</th>
				</tr>
			</thead>
			<tbody>
				{props.ticketsArray.map((ticket) => (
					<AssignedTicketsRow
						key={ticket.id}
						id={ticket.id}
						title={ticket.title}
						status={ticket.status}
						priority={ticket.priority}
						createdAt={ticket.createdAt}
					/>
				))}
			</tbody>
		</table>
	);
};

export default AssignedTicketsTable;
