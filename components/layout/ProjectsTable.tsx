import prisma from '@/lib/db';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const ProjectsTable = async () => {
	const projects = await prisma.project.findMany({
		include: {
			tickets: true,
		},
	});
	console.log('projects', projects);

	return (
		<Table className='w-full h-full'>
			<TableCaption>Projects</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Created</TableHead>
					<TableHead>Updated</TableHead>
					<TableHead className='text-right'>Tickets</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{projects.map((project) => (
					<TableRow key={project.id}>
						<TableCell>{project.name}</TableCell>
						<TableCell>
							{project.createdAt.toDateString()}
						</TableCell>
						<TableCell>
							{project.updatedAt.toDateString()}
						</TableCell>
						<TableCell className='text-right'>
							{project.tickets.length}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ProjectsTable;
