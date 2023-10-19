'use client';
import { useState } from 'react';
import CreatedTicketsRow from './CreatedTicketsRow';
import { TiArrowUnsorted } from 'react-icons/ti';

type CreatedTicketsTableProps = {
	ticketsArray: {
		id: string;
		title: string;
		status: string;
		priority: string;
		createdAt: Date;
		[key: string]: any;
	}[];
};

const CreatedTicketsTable = (props: CreatedTicketsTableProps) => {
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
					<th>
						<div
							className='table-heading cursor-pointer'
							onClick={() => sorting('createdAt')}>
							Created
							<TiArrowUnsorted />
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((ticket) => (
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
