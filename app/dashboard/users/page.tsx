import './styles.modules.css';
import Header from '@/components/layout/Header';
import UsersTable from '@/components/layout/UserComponents/UsersTableComponents/UsersTable';
import prisma from '@/lib/db';

const UsersPage = async () => {
	const users = await prisma.user.findMany({
		include: {
			projects: true,
			ticketsAssigned: true,
		},
	});

	return (
		<div className='users-container'>
			<Header pageTitle='Users' />
			<main>
				<h1 className='w-full text-3xl text-center'>All Users</h1>
				<UsersTable usersArray={users as []} />
			</main>
		</div>
	);
};

export default UsersPage;
