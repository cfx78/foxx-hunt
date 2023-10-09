import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CreateTicket from '@/components/layout/TicketComponents/CreateTicket';
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
				},
			},
		},
	});

	console.log(project);

	return (
		<div className='w-full h-screen py-24'>
			<h1>{project?.name}</h1>
			<p>{project?.createdAt.toDateString()}</p>
			<p>{project?.updatedAt.toDateString()}</p>
			{project?.tickets?.map((ticket) => (
				<div key={ticket.id}>
					<h1>{ticket.title}</h1>
					<p>{ticket.createdAt.toDateString()}</p>
					<p>{ticket.updatedAt.toDateString()}</p>
				</div>
			))}
			<CreateTicket
				userID={user?.id as string}
				projectName={project?.name as string}
				projects={projectNames as []}
			/>
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
