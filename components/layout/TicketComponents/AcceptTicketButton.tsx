'use client';

import { useState } from 'react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';

type Props = {
	userId: string;
	ticketId: string;
	title: string;
};

const AcceptTicketButton = (props: Props) => {
	const userId = props.userId;
	const ticketId = props.ticketId;
	const update = {
		userId,
		ticketId,
	};
	const [isUpdated, setIsUpdated] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const response = await fetch('/api/acceptTicket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ update }),
		});

		const data = await response.json();
		console.log(data);

		setIsUpdated(true);
		setTimeout(() => {
			setIsUpdated(false);
		}, 5000);

		setTimeout(() => {
			window.location.reload();
		}, 5000);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='flex items-center justify-between w-40 mt-2'>
					<span className='text-center w-full'>Accept Ticket</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center text-warning'>
						Warning you are about to accept this ticket
					</DialogTitle>
					<DialogDescription>
						Are you sure you want to accept the '{props.title}'
						ticket?
					</DialogDescription>
				</DialogHeader>

				<Button
					className='w-full rounded-t-none'
					type='submit'
					variant='ghost'
					onSubmit={handleSubmit}>
					Accept
				</Button>
				{isUpdated && (
					<div className='w-full h-full text-success'>
						<p className='text-center text-lg font-bold'>
							You Have Accepted this Ticket
						</p>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default AcceptTicketButton;
