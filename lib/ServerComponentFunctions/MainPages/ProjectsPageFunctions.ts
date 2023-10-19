import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '../../db';

const ProjectsPageFunctions = async () => {
	const session = await getServerSession(authOptions);

	if (session == null) {
		redirect('/');
	}

	const userEmail = session.user?.email;

	const user = await prisma.user.findUnique({
		where: {
			email: userEmail as string,
		},
	});

	const userRole = user?.role;

	const projects = await prisma.project.findMany({
		include: {
			tickets: true,
		},

		orderBy: {
			createdAt: 'desc',
		},
	});

	return { userRole, projects };
};

export default ProjectsPageFunctions;
