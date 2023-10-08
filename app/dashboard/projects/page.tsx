import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CreateProject from '@/components/layout/CreateProject';

const Projects = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	if (session == null) {
		redirect('/');
	}

	const userEmail = session.user?.email;
	console.log(userEmail);

	return (
		<div className='w-full h-screen py-14 flex-col justify-center items-center px-6  mx-auto'>
			<CreateProject />
		</div>
	);
};

export default Projects;
