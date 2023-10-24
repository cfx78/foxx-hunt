'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type UsersRowProps = {
	name: string;
	email: string;
	tickets: string;
	projects: string;
	userId: string;
};

const UsersRow = (props: UsersRowProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<tr
				key={props.userId}
				onClick={() => setIsOpen(!isOpen)}
				className='cursor-pointer'>
				<td className='td-wrapper-start'>{props.name}</td>
				<td className='max-w-[5rem] lg:max-w-full td-wrapper truncate'>
					{props.email}
				</td>
				<td className='td-wrapper'>{props.tickets}</td>
				<td className='hidden td-wrapper lg:block'>{props.projects}</td>
			</tr>
			{isOpen && (
				<motion.tr
					key={props.userId}
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
							className='w-full px-4 py-2 text-center transition ease-in-out border-2 rounded-lg bg-accent text-accent-foreground border-accent-foreground hover:bg-accent-foreground hover:text-accent hover:border-accent'
							href={`/dashboard/users/${props.userId}`}>
							Go to User
						</Link>
					</th>
				</motion.tr>
			)}
		</>
	);
};

export default UsersRow;
