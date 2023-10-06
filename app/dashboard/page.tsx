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
		<h1>
			<MobileNav
				name={user?.name as string}
				email={user?.email as string}
				image={user?.image as string}
				role={user?.role as string}
			/>
			Hey
		</h1>
	);
};

export default Dashboard;
