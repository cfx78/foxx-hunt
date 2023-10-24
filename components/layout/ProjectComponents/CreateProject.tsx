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
			className='w-full max-w-4xl p-8 m-4 mx-auto bg-white rounded shadow-2xl'
			onSubmit={handleSubmit}>
			<h1 className='block w-full mb-6 text-2xl font-bold text-center text-gray-800'>
				Create New Project
			</h1>
			<input
				value={createProject}
				type='text'
				placeholder='Project Name'
				name='projectName'
				onChange={(e) => setCreateProject(e.target.value)}
				className='px-3 py-2 text-gray-800 border rounded-sm border-primary dark:text-gray-200 mx-auto w-full'
			/>
			<button
				className='block px-2 py-4 w-full max-w-sm mx-auto text-lg text-gray-200 uppercase transition ease-in-out rounded bg-secondary-400 hover:bg-secondary-600  mt-4 '
				type='submit'>
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
