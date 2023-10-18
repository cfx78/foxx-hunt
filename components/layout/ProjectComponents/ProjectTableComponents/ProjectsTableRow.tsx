'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

type ProjectRowProps = {
	name: string;
	createdAt: Date;
	updatedAt: Date;
	tickets: [];
	id: string;
};

const ProjectsTableRow = (props: ProjectRowProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<tr
				key={props.id}
				onClick={() => setIsOpen(!isOpen)}
				className='cursor-pointer'>
				<td>
					<div className='td-wrapper-start'>{props.name}</div>
				</td>
				<td>
					<div className='td-wrapper'> {props.tickets.length} </div>
				</td>
				<td>
					<div className='td-wrapper '>
						{props.updatedAt.toDateString()}
					</div>
				</td>
				<td>
					<div className='td-wrapper'>
						{props.createdAt.toDateString()}
					</div>
				</td>
			</tr>
			{isOpen && (
				<motion.tr
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
							className='w-full px-4 py-2 text-center border-2 rounded-lg bg-accent text-accent-foreground border-accent-foreground hover:bg-accent-foreground hover:text-accent hover:border-accent transition ease-in-out'
							href={`/dashboard/projects/${props.id}`}>
							Go to Project
						</Link>
					</th>
				</motion.tr>
			)}
		</>
	);
};

export default ProjectsTableRow;
