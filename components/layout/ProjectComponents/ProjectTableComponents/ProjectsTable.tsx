import prisma from '@/lib/db';
import ProjectsTableRow from './ProjectsTableRow';

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
		<div className='flex-col justify-center items-center py-14'>
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
						<th className='text-center underline-offset-2 underline hidden md:block'>
							Updated
						</th>
						<th className='text-right underline-offset-2 underline'>
							Tickets
						</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project) => (
						<ProjectsTableRow
							key={project.id}
							name={project.name}
							createdAt={project.createdAt}
							updatedAt={project.updatedAt}
							tickets={project.tickets as []}
							id={project.id}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProjectsTable;
