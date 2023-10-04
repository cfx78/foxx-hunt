import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import ModeToggle from '@/components/layout/darkmode';

const Projects = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	if (session == null) {
		redirect('/');
	}

	const userEmail = session.user?.email;
	console.log(userEmail);

	const projects = await prisma.project.create({
		data: {
			name: 'Foxx Hunt',
		},

        
	});
	console.log(projects);
	return (
		<>
			{session != null && (
				<main className='absolute top-0 flex-col h-full items-center w-[90%] right-0  mx-auto border-5 border-slate-400 '>
					<div className='flex justify-center w-full top-0 text-center space-x-9 border border-inherit py-16'>
						<h1 className='text-4xl font-bold'>Dashboard</h1>
						<span className='self-end'>
							<ModeToggle />
						</span>
					</div>
				</main>
			)}
		</>
	);
};

export default Projects;
