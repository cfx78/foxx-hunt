'use client';

import { useState } from 'react';

const CreateProject = () => {
	const [createProject, setCreateProject] = useState('');
	const [projectCreated, setProjectCreated] = useState(false);
	const [project, setProject] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const response = await fetch('/api/newProject', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ createProject }),
		});

		const project = await response.json();
		setProject(project.name);
		setProjectCreated(true);
		setCreateProject('');
		setTimeout(() => {
			setProjectCreated(false);
		}, 5000);
	};

	return (
		<form
			className='w-full max-w-4xl mx-auto text-center border-5 py-5 px-3 rounded-lg'
			onSubmit={handleSubmit}>
			<h1>Create New Project</h1>
			<input
				value={createProject}
				type='text'
				placeholder='Project Name'
				name='projectName'
				onChange={(e) => setCreateProject(e.target.value)}
				className='my-2 py-2 px-1 bg-transparent
				border-b-2 w-full rounded-lg'
			/>
			<button className='w-44 py-2 border-b-3 rounded-full' type='submit'>
				Submit
			</button>
			{createProject && (
				<p className='py-3'>Project name will be: {createProject}</p>
			)}
			{projectCreated && createProject === '' && (
				<p className='text-success'>{project} Created</p>
			)}
		</form>
	);
};

export default CreateProject;
