import './styles.modules.css';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Header from '@/components/layout/Header';
import CreateTicket from '@/components/layout/TicketComponents/CreateTicket';
import ProjectTicketsTable from '@/components/layout/TicketComponents/ProjectTicketsTableComponents/ProjectTicketsTable';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
type ProjectPageParams = {
	params: {
		projectid: string;
	};
};

const ProjectPage = async ({ params: { projectid } }: ProjectPageParams) => {
	const userSession = await getServerSession(authOptions);

	if (userSession === null) {
		redirect('/');
	}

	const userEmail = userSession.user?.email;

	const user = await prisma.user.findUnique({
		where: {
			email: userEmail as string,
		},
	});

	const projects = await prisma.project.findMany({
		select: {
			name: true,
		},
	});

	const projectNames = projects?.map((project) => project.name);

	const project = await prisma.project.findUnique({
		where: {
			id: projectid,
		},
		include: {
			tickets: {
				select: {
					id: true,
					title: true,
					status: true,
					assignedTo: true,
					assignedToId: true,
					createdAt: true,
					updatedAt: true,
					createdBy: true,
					createdByUserId: true,
					body: true,
					comments: true,
					project: true,
					projectName: true,
					priority: true,
					type: true,
				},
				orderBy: {
					createdAt: 'asc',
				},
			},
		},
	});

	return (
		<div className='project-container'>
			<Header pageTitle={project?.name as string} />
			<main>
				<CreateTicket
					userID={user?.id as string}
					projectName={project?.name as string}
					projects={projectNames as []}
				/>
				<h2 className='py-5 text-4xl text-center'>
					{`'${project?.name}'`} Tickets
				</h2>

				<ProjectTicketsTable ticketsArray={project?.tickets as []} />
			</main>
		</div>
	);
};

export async function generateStaticParams() {
	const projects = await prisma.project.findMany();

	return projects.map((project) => ({
		projectid: project.id,
	}));
}

export const revalidate = 3600;

export default ProjectPage;
