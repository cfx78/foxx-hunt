import './styles.modules.css';
import Header from '@/components/layout/Header';
import UsersTable from '@/components/layout/UserComponents/UsersTable';

const UsersPage = () => {
	return (
		<div className='users-container'>
			<Header pageTitle='Users' />
			<main>
				<h1 className='w-full text-3xl text-center'>All Users</h1>
				<UsersTable />
			</main>
		</div>
	);
};

export default UsersPage;
