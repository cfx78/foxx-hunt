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
import { Accordion, AccordionItem } from '@nextui-org/react';

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
		setUpdateMessage({
			newStatus: data.status,
			newPriority: data.priority,
			newUserEmail: data.assignedTo.email,
		});
		setIsUpdated(true);
		setTimeout(() => {
			setIsUpdated(false);
		}, 3000);

		setTimeout(() => {
			window.location.reload();
		}, 3000);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='flex items-center justify-between w-40 mt-2'>
					<span className='w-full text-center'>Update Ticket</span>
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
								className='block w-full p-2 text-sm border rounded-lg'
								value={update.status}
								onChange={(e) => {
									setUpdate({
										...update,
										status: e.target.value as TicketStatus,
									});
								}}>
								{Object.keys(TicketStatus).map(
									(status, index) => (
										<option key={index} value={status}>
											{status === 'OPEN' && 'Open'}
											{status === 'DONE' && 'Closed'}
											{status === 'IN_PROGRESS' &&
												'In Progress'}
										</option>
									),
								)}
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
								className='block w-full p-2 text-sm border rounded-lg'
								value={update.priority}
								onChange={(e) => {
									setUpdate({
										...update,
										priority: e.target
											.value as TicketPriority,
									});
								}}>
								{Object.keys(TicketPriority).map(
									(priority, index) => (
										<option key={index} value={priority}>
											{priority === 'LOW' && 'Low'}
											{priority === 'MEDIUM' && 'Medium'}
											{priority === 'HIGH' && 'High'}
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
								Choose the email associated with the user you
								are assigning
							</label>
							<select
								id='assignment'
								className='block w-full p-2 text-sm border rounded-lg'
								value={update.userEmail}
								onChange={(e) => {
									setUpdate({
										...update,
										userEmail: e.target.value,
									});
								}}>
								{props.usersArray.map((user, index) => (
									<option key={index} value={user}>
										{user}
									</option>
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

				{isUpdated && (
					<div className='w-full h-full text-success'>
						<p className='text-lg font-bold text-center'>
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
