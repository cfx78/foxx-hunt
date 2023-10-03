import Logout from '@/components/layout/logout';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
	const session = await getServerSession(authOptions);

	if (session == null) {
		redirect('/');
	}

	return (
		<div>
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
