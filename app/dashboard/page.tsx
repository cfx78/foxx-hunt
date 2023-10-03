import Logout from '@/components/layout/logout';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import Sidebar from '@/components/layout/Sidebar';
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({ subsets: ['latin'], weight: '400' });

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
		<div className={exo2.className}>
			<Sidebar
				name={user?.name as string}
				email={user?.email as string}
				image={user?.image as string}
				role={user?.role as string}
			/>
			{session != null && (
				<div className='top-32 absolute flex-col text-center justify-evenly items-center py-12 px-8  w-full  mx-auto space-x-9'>
					<span>{session?.user?.name}</span>

					<span>{session?.user?.email}</span>

					<span>
						<Logout />
					</span>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
