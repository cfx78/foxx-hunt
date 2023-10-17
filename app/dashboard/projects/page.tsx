import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CreateProject from '@/components/layout/ProjectComponents/CreateProject';
import ProjectsTable from '@/components/layout/ProjectComponents/ProjectTableComponents/ProjectsTable';
import Header from '@/components/layout/Header';

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
		<div className='lg:max-w-[94.58vw] lg:mx-auto w-full max-w-screen  h-full lg:h-screen lg:top-0 lg:right-0 lg:fixed lg:py-24 lg:px-4'>
			<Header pageTitle='Projects' />
			<div className='flex flex-col justify-center w-full h-full px-4 pt-56 mt-16 lg:pt-0 '>
				{userRole === 'ADMIN' && <CreateProject />}
				<ProjectsTable />
			</div>
		</div>
	);
};

export default Projects;
