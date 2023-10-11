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

import { Textarea } from '@nextui-org/react';

type Props = {
	createdByEmail: string | undefined | null;
	ticketID: string;
};

const AddComment = (props: Props) => {
	const [comment, setComment] = useState({
		body: '',
		createdBy: props.createdByEmail,
		ticketId: props.ticketID,
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const response = await fetch('/api/newComment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ comment }),
		});

		console.log(response);

		setComment({
			body: '',
			createdBy: props.createdByEmail,
			ticketId: props.ticketID,
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='flex items-center justify-between w-40 mt-2'>
					<span className='text-center w-full'>Add Comment</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Comment</DialogTitle>
					<DialogDescription>
						Leave a message for any updates or suggestions for
						ticket
					</DialogDescription>
				</DialogHeader>

				<div className='w-full h-full'>
					<form onSubmit={handleSubmit}>
						<Textarea
							type='textarea'
							variant='underlined'
							label='Comment'
							name='name'
							value={comment.body}
							onChange={(e) =>
								setComment({ ...comment, body: e.target.value })
							}
							className='max-w-xs'
						/>

						<Button
							className='w-full rounded-t-none'
							type='submit'
							variant='ghost'>
							Submit
						</Button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddComment;
