import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CreateTicket from '@/components/layout/TicketComponents/CreateTicket';
import TicketsTable from '@/components/layout/TicketComponents/TicketsTable';
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

	console.log(user);

	const projects = await prisma.project.findMany({
		select: {
			name: true,
		},
	});

	const projectNames = projects?.map((project) => project.name);

	console.log(projects?.map((project) => project.name));
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

	console.log(project);

	return (
		<div className='w-full min-h-screen grid place-content-center place-items-center mx-auto py-24 px-4'>
			<h1 className='text-3xl underline underline-offset-4 pb-6'>
				{project?.name}
			</h1>
			<CreateTicket
				userID={user?.id as string}
				projectName={project?.name as string}
				projects={projectNames as []}
			/>
			<h2 className='py-5 text-2xl'>{project?.name} Tickets</h2>

			<TicketsTable ticketsArray={project?.tickets as []} />
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
