import '../globals.css';
import type { Metadata } from 'next';
import { Providers } from '../providers';
import { Exo_2 } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import Sidebar from '@/components/layout/NavComponents/Sidebar';
import MobileNav from '@/components/layout/NavComponents/MobileNav';

const exo2 = Exo_2({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
		<html lang='en'>
			<body className={`w-full h-max ${exo2.className}`}>
				<Providers>
					<div className='w-1/4 hidden lg:block '>
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

					<div className='lg:w-3/4 mx-auto '>{children}</div>
				</Providers>
			</body>
		</html>
	);
}
