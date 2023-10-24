import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type AssignedTicketsRowProps = {
	id: string;
	title: string;
	status: string;
	priority: string;
	createdAt: Date;
};

const AssignedTicketsRow = (props: AssignedTicketsRowProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<tr
				key={props.id}
				onClick={() => setIsOpen(!isOpen)}
				className='cursor-pointer'>
				<td>
					<div className='td-wrapper-start'>{props.title}</div>
				</td>
				<td>
					{props.status === 'DONE' && (
						<span className='bg-gray-100 text-gray-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 border border-gray-500'>
							CLOSED
						</span>
					)}
					{props.status === 'IN_PROGRESS' && (
						<span className='bg-blue-100 text-blue-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>
							IN PROGRESS
						</span>
					)}
					{props.status === 'OPEN' && (
						<span className='bg-indigo-100 text-indigo-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400'>
							OPEN
						</span>
					)}
				</td>
				<td>
					{props.priority === 'LOW' && (
						<span className='bg-green-100 text-green-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400'>
							{props.priority}
						</span>
					)}
					{props.priority === 'MEDIUM' && (
						<span className='bg-yellow-100 text-yellow-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300'>
							{props.priority}
						</span>
					)}
					{props.priority === 'HIGH' && (
						<span className='bg-red-100 text-red-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400'>
							{props.priority}
						</span>
					)}
				</td>
				<td className='hidden lg:block'>
					<div className='td-wrapper hidden lg:block'>
						{props.createdAt.toDateString()}
					</div>
				</td>
			</tr>
			{isOpen && (
				<motion.tr
					key={props.id}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.15,
						ease: 'easeInOut',
						type: 'tween',
						stiffness: 10,
					}}
					exit={{
						opacity: 0,
						y: -10,
						transition: {
							duration: 0.25,
							ease: 'easeInOut',
							type: 'tween',
							stiffness: 10,
						},
					}}>
					<th colSpan={4} className='p-6'>
						<Link
							className='w-full px-4 py-2 text-center border-2 rounded-lg bg-accent text-accent-foreground border-accent-foreground hover:bg-accent-foreground hover:text-accent hover:border-accent transition ease-in-out '
							href={`/dashboard/tickets/${props.id}`}>
							Go to Ticket
						</Link>
					</th>
				</motion.tr>
			)}
		</>
	);
};

export default AssignedTicketsRow;
