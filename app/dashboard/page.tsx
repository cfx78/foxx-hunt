import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import ModeToggle from '@/components/layout/darkmode';
import MobileNav from '@/components/layout/MobileNav';

const Dashboard = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	if (session == null) {
		redirect('/');
	}

	const userEmail = session.user?.email;
	console.log(userEmail);

	const user = await prisma.user.findUnique({
		where: {
			email: userEmail as string,
		},
	});
	console.log(user?.role);
	return (
		<>
			{session != null && (
				<main className='absolute top-0 flex-col h-full items-center w-full lg:w-[90vw] right-0  mx-auto border-5 border-slate-400 '>
					<div className='flex justify-center w-full top-0 text-center space-x-9 border border-inherit py-16'>
						<MobileNav
							email={user?.email as string}
							name={user?.name as string}
							image={user?.image as string}
							role={user?.role as string}
						/>
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

export default Dashboard;
