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
import { TicketStatus, TicketPriority } from '@prisma/client';
import { Button } from '../../ui/button';
import {
	Accordion,
	AccordionItem,
	Select,
	SelectItem,
} from '@nextui-org/react';

type Props = {
	priority: TicketPriority;
	status: TicketStatus;
	userEmail: string;
	ticketId: string;
	title: string;
	usersArray: string[];
};

const UpdateTicket = (props: Props) => {
	const [update, setUpdate] = useState({
		priority: props.priority,
		status: props.status,
		userEmail: props.userEmail,
		ticketId: props.ticketId,
		title: props.title,
	});

	const [isUpdated, setIsUpdated] = useState(false);
	const [updateMessage, setUpdateMessage] = useState({
		newStatus: '',
		newPriority: '',
		newUserEmail: '',
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const response = await fetch('/api/updateTicket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ update }),
		});

		const data = await response.json();
		console.log(data);
		setUpdateMessage({
			newStatus: data.status,
			newPriority: data.priority,
			newUserEmail: data.assignedTo.email,
		});
		setIsUpdated(true);
		setTimeout(() => {
			setIsUpdated(false);
		}, 5000);

		setTimeout(() => {
			window.location.reload();
		}, 8000);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='flex items-center justify-between w-40 mt-2'>
					<span className='text-center w-full'>Update Ticket</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{props.title}</DialogTitle>
					<DialogDescription>
						Update the status, priority, or assignment of this
						ticket.
					</DialogDescription>
				</DialogHeader>

				<div className='w-full h-full'>
					<form onSubmit={handleSubmit}>
						<Accordion isCompact>
							<AccordionItem
								key='status'
								aria-label='Update Status Accordion Item'
								title='Update Status'>
								<label
									htmlFor='status'
									className='block mb-2 text-sm font-medium'>
									Choose a status
								</label>
								<select
									className='w-full border text-sm rounded-lg p-2 block'
									value={update.status}
									onChange={(e) => {
										setUpdate({
											...update,
											status: e.target
												.value as TicketStatus,
										});
										console.log(update.status);
									}}>
									{Object.keys(TicketStatus).map((status) => (
										<option value={status}>{status}</option>
									))}
								</select>
							</AccordionItem>
							<AccordionItem
								key='priority'
								aria-label='Update Priority Accordion Item'
								title='Update Priority'>
								<label
									htmlFor='priority'
									className='block mb-2 text-sm font-medium'>
									Choose a priority
								</label>
								<select
									id='priority'
									className='w-full border text-sm rounded-lg p-2 block'
									value={update.priority}
									onChange={(e) => {
										setUpdate({
											...update,
											priority: e.target
												.value as TicketPriority,
										});
										console.log(update.priority);
									}}>
									{Object.keys(TicketPriority).map(
										(priority) => (
											<option value={priority}>
												{priority}
											</option>
										),
									)}
								</select>
							</AccordionItem>
							<AccordionItem
								key='assignment'
								aria-label='Update Assignment Accordion Item'
								title='Update Assignment'>
								<label
									htmlFor='assignment'
									className='block mb-2 text-sm font-medium'>
									Choose the email associated with the user
									you are assigning
								</label>
								<select
									id='assignment'
									className='w-full border text-sm rounded-lg p-2 block'
									value={update.userEmail}
									onChange={(e) => {
										setUpdate({
											...update,
											userEmail: e.target.value,
										});
										console.log(update.userEmail);
									}}>
									{props.usersArray.map((user) => (
										<option value={user}>{user}</option>
									))}
								</select>
							</AccordionItem>
						</Accordion>
						<Button
							className='w-full rounded-t-none'
							type='submit'
							variant='ghost'>
							Submit
						</Button>
					</form>
				</div>
				{isUpdated && (
					<div className='w-full h-full text-success'>
						<p className='text-center text-lg font-bold'>
							Ticket Updated
						</p>
						<p>New Status: {updateMessage.newStatus}</p>
						<p>New Priority: {updateMessage.newPriority}</p>
						<p>New User Email: {updateMessage.newUserEmail}</p>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UpdateTicket;