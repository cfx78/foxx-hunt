'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TicketType, TicketPriority } from '@prisma/client';

type CreateTicketProps = {
	projectName?: string;
	userID: string;
	projects: [];
};

const TicketTypeArray = Object.values(TicketType);
const TicketPriorityArray = Object.values(TicketPriority);
const CreateTicket = (props: CreateTicketProps) => {
	const router = useRouter();

	const [data, setData] = useState({
		title: '',
		body: '',
		project: props.projectName || '',
		userID: props.userID,
		priority: '',
		type: '',
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const response = await fetch('/api/newTicket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data }),
		});

		console.log(response);
		const ticket = await response.json();
		console.log(ticket);
		router.refresh();

		setData({
			title: '',
			body: '',
			project: '',
			userID: props.userID,
			priority: '',
			type: '',
		});
	};

	return (
		<div className='w-full bg-white rounded shadow-2xl p-8 m-4 mx-auto'>
			<h1 className='block w-full text-center text-gray-800 text-2xl font-bold mb-6'>
				{props.projectName
					? `Create Ticket for ${props.projectName} `
					: 'Create Ticket'}
			</h1>
			<form onSubmit={handleSubmit}>
				<div className='flex flex-col mb-4'>
					<label
						htmlFor='title'
						className='mb-2 font-bold text-lg text-gray-900'>
						Title
					</label>
					<input
						id='title'
						type='text'
						name='title'
						value={data.title}
						onChange={(e) =>
							setData({ ...data, title: e.target.value })
						}
						className='border py-2 px-3 text-grey-800'
					/>
				</div>

				<div className='flex flex-col mb-4'>
					<label
						htmlFor='body'
						className='mb-2 font-bold text-lg text-gray-900'>
						Detailed Description of Issue
					</label>
					<textarea
						rows={10}
						id='body'
						name='body'
						value={data.body}
						onChange={(e) =>
							setData({ ...data, body: e.target.value })
						}
						className='border py-2 px-3 text-grey-800 resize'></textarea>
				</div>
				{props.projectName ? (
					' '
				) : (
					<div className='flex flex-col mb-4'>
						<label
							htmlFor='projects'
							className='mb-2 font-bold text-lg text-gray-900'>
							Project
						</label>
						<select
							id='projects'
							name='projects'
							value={data.project}
							onChange={(e) =>
								setData({ ...data, project: e.target.value })
							}
							className='border py-2 px-3 text-gray-800 dark:text-gray-200'>
							<option value=''>
								--Please choose a project--
							</option>
							{props.projects.map((project) => (
								<option key={project} value={project}>
									{project}
								</option>
							))}
						</select>
					</div>
				)}
				<div className='flex flex-col mb-4'>
					<label
						htmlFor='priority'
						className='mb-2 font-bold text-lg text-gray-900'>
						Priority
					</label>
					<select
						id='priority'
						name='priority'
						value={data.priority}
						onChange={(e) =>
							setData({ ...data, priority: e.target.value })
						}
						className='border py-2 px-3 text-gray-800 dark:text-gray-200'>
						<option value=''>--Please choose a priority--</option>
						{TicketPriorityArray.map((priority) => (
							<option key={priority} value={priority}>
								{priority}
							</option>
						))}
					</select>
				</div>

				<div className='flex flex-col mb-4'>
					<label
						htmlFor='
						type'
						className='mb-2 font-bold text-lg text-gray-900'>
						Type
					</label>
					<select
						id='type'
						name='type'
						value={data.type}
						onChange={(e) =>
							setData({ ...data, type: e.target.value })
						}
						className='border py-2 px-3 text-gray-800 dark:text-gray-200'>
						<option value=''>--Please choose an option--</option>
						{TicketTypeArray.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>
				<button className='block bg-secondary-400 hover:bg-secondary-600 text-gray-200 uppercase text-lg mx-auto p-4 rounded transition ease-in-out '>
					Submit
				</button>
			</form>
		</div>
	);
};

export default CreateTicket;
