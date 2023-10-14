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
	console.log(`userId in UsersRow: ${props.userId}`);

	return (
		<>
			<tr key={props.userId} onClick={() => setIsOpen(!isOpen)}>
				<td className='text-left'>{props.name}</td>
				<td className='text-center '>{props.email}</td>
				<td className='text-center'>{props.tickets}</td>
				<td className='text-right'>{props.projects}</td>
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
					<th colSpan={4}>
						<Link
							className='w-full text-center py-2 px-4 border-2 rounded-lg bg-accent text-white '
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
