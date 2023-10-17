'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<table className='table-auto w-full border-spacing-y-8 border-separate'>
				<thead>
					<tr>
						<th className='text-left underline-offset-2 underline'>
							Title
						</th>
						<th className=' underline-offset-2 underline text-center'>
							Status
						</th>
						<th className='underline-offset-2 underline text-center'>
							Priority
						</th>
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
		</div>
	);
};

export default AssignedTicketsTable;
