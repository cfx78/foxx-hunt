import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CreateProject from '@/components/layout/ProjectComponents/CreateProject';
import ProjectsTable from '@/components/layout/ProjectComponents/ProjectTableComponents/ProjectsTable';

const Projects = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
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
	console.log(userRole);

	return (
		<div className='w-full min-h-screen py-24 flex-col justify-center items-center px-6'>
			{userRole === 'ADMIN' && <CreateProject />}
			<ProjectsTable />
		</div>
	);
};

export default Projects;
