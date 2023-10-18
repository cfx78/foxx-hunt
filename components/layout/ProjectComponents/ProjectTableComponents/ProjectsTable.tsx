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

	return (
		<div className='flex-col justify-center items-center py-14'>
			<h1 className='text-center text-2xl font-bold my-5'>Projects</h1>
			<table>
				<thead>
					<tr>
						<th>
							<div className='table-heading-start'>Name</div>
						</th>
						<th>
							<div className='table-heading'>Tickets</div>
						</th>
						<th>
							<div className='table-heading '>Updated</div>
						</th>
						<th>
							<div className='table-heading'>Created</div>
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
