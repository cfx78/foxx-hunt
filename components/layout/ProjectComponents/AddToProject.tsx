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
	projectNames: string[];
};

const AddToProjectButton = (props: Props) => {
	const [update, setUpdate] = useState({
		userId: props.userId,
		project: '',
	});
	const [isUpdated, setIsUpdated] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		console.log(update);

		await fetch('/api/addToProject', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ update }),
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
					className='w-40 px-4 py-2 text-center border-2 rounded-lg bg-accent text-accent-foreground border-accent-foreground hover:bg-accent-foreground hover:text-accent hover:border-accent transition ease-in-out'>
					<span className='text-center w-full'>Add to Project</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center text-warning'>
						Project
					</DialogTitle>
					<DialogDescription>
						Choose a project to add this user to.
					</DialogDescription>
				</DialogHeader>
				<select
					id='assignment'
					className='w-full border text-sm rounded-lg p-2 block'
					value={update.project}
					onChange={(e) => {
						setUpdate({
							...update,
							project: e.target.value,
						});
					}}>
					{props.projectNames.map((project, index) => (
						<option key={index} value={project}>
							{project}
						</option>
					))}
				</select>

				<Button
					className='w-full rounded-t-none'
					type='submit'
					variant='ghost'
					onClick={handleSubmit}>
					Update
				</Button>
				{isUpdated && (
					<div className='w-full h-full text-success'>
						<p className='text-center text-lg font-bold'>
							User Added to Project
						</p>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default AddToProjectButton;
