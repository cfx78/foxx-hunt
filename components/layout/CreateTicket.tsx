'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CreateTicketProps = {
	projectName: string;
	userID: string;
	projects: [];
};

const CreateTicket = (props: CreateTicketProps) => {
	const router = useRouter();

	const [data, setData] = useState({
		title: '',
		body: '',
		project: '',
		userID: props.userID,
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
		});
	};

	return (
		<div className='w-full h-screen py-24'>
			<h1>Create Ticket</h1>
			<p>{props.projectName}</p>
			<p>{props.userID}</p>
			<form
				className='w-full h-full flex-col justify-center items-center '
				onSubmit={handleSubmit}>
				<label htmlFor=''>
					Title
					<input
						type='text'
						name='title'
						value={data.title}
						onChange={(e) =>
							setData({ ...data, title: e.target.value })
						}
					/>
				</label>
				<br />
				<label htmlFor=''>
					Body
					<textarea
						name='body'
						value={data.body}
						onChange={(e) =>
							setData({ ...data, body: e.target.value })
						}></textarea>
				</label>
				<br />
				<label htmlFor=''>
					Project
					<select
						name='projects'
						value={data.project}
						onChange={(e) =>
							setData({ ...data, project: e.target.value })
						}>
						<option value=''>--Please choose an option--</option>
						{props.projects.map((project) => (
							<option key={project} value={project}>
								{project}
							</option>
						))}
					</select>
				</label>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default CreateTicket;
