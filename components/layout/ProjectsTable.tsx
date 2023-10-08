import prisma from '@/lib/db';

const ProjectsTable = async () => {
	const projects = await prisma.project.findMany({
		include: {
			tickets: true,
		},

		orderBy: {
			createdAt: 'desc',
		},
	});
	console.log('projects', projects);

	return (
		<div className='flex-col justify-center items-center'>
			<h1 className='text-center text-2xl font-bold my-5'>Projects</h1>
			<table className='table-auto w-full border-spacing-y-8 border-separate'>
				<thead>
					<tr>
						<th className='text-left underline-offset-2 underline'>
							Name
						</th>
						<th className='text-center underline-offset-2 underline'>
							Created
						</th>
						<th className='text-center underline-offset-2 underline'>
							Updated
						</th>
						<th className='text-right underline-offset-2 underline'>
							Tickets
						</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project) => (
						<tr key={project.id}>
							<td className='text-left'>{project.name}</td>
							<td className='text-center'>
								{project.createdAt.toDateString()}
							</td>
							<td className='text-center'>
								{project.updatedAt.toDateString()}
							</td>
							<td className='text-right'>
								{project.tickets.length}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProjectsTable;
