import { getServerSession } from 'next-auth';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Navigation = async () => {
	const session = await getServerSession(authOptions);
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
	return (
		<>
			<div className='hidden lg:block'>
				<Sidebar
					name={user?.name as string}
					email={user?.email as string}
					image={user?.image as string}
					role={user?.role as string}
				/>
			</div>
			<div className='lg:hidden'>
				<MobileNav
					name={user?.name as string}
					email={user?.email as string}
					image={user?.image as string}
					role={user?.role as string}
				/>
			</div>
		</>
	);
};

export default Navigation;
