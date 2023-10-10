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
			<tr key={props.id} onClick={() => setIsOpen(!isOpen)}>
				<td className='text-left'>{props.title}</td>
				<td>{props.status}</td>
				<td>{props.priority}</td>
				<td className='text-right'>{props.createdAt.toDateString()}</td>
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
					<th colSpan={4}>
						<Link
							className='w-full text-center py-2 px-4 border-2 rounded-lg bg-accent text-white '
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
