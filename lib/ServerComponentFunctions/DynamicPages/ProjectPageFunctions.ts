import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export type ProjectPageFunctionsProps = {
	projectid: string;
};

export const ProjectPageFunctions = async (
	props: ProjectPageFunctionsProps,
) => {
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
			id: props.projectid,
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

	return { user, project, projectNames };
};
