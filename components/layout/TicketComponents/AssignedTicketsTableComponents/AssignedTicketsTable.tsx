'use client';

import { useState } from 'react';
import AssignedTicketsRow from './AssignedTicketsRow';
import { TiArrowUnsorted } from 'react-icons/ti';

type AssignedTicketsTableProps = {
	ticketsArray: {
		id: string;
		title: string;
		status: string;
		priority: string;
		createdAt: Date;
		[key: string]: any;
	}[];
};

const AssignedTicketsTable = (props: AssignedTicketsTableProps) => {
	const [order, setOrder] = useState('asc');
	const [data, setData] = useState(props.ticketsArray);
	const sorting = (key: string) => {
		const sorted = [...props.ticketsArray].sort((a, b) => {
			if (order === 'asc') {
				setOrder('desc');
				return a[key] > b[key] ? 1 : -1;
			} else {
				setOrder('asc');
				return a[key] < b[key] ? 1 : -1;
			}
		});
		setData(sorted);
	};
	return (
		<table>
			<thead>
				<tr>
					<th>
						<div
							className='table-heading-start cursor-pointer'
							onClick={() => sorting('title')}>
							Title
							<TiArrowUnsorted />
						</div>
					</th>
					<th>
						<div
							className='table-heading cursor-pointer'
							onClick={() => sorting('status')}>
							Status
							<TiArrowUnsorted />
						</div>
					</th>
					<th>
						<div
							className='table-heading cursor-pointer'
							onClick={() => sorting('priority')}>
							Priority
							<TiArrowUnsorted />
						</div>
					</th>
					<th className='hidden lg:block'>
						<div
							className='table-heading cursor-pointer hidden lg:block'
							onClick={() => sorting('createdAt')}>
							Created
							<TiArrowUnsorted />
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((ticket) => (
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
