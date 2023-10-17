import Header from '@/components/layout/Header';
import UsersTable from '@/components/layout/UserComponents/UsersTable';

const UsersPage = () => {
	return (
		<div className='lg:max-w-[94.58vw] lg:mx-auto w-full max-w-screen  h-full lg:h-screen lg:top-0 lg:right-0 lg:fixed lg:py-24 lg:px-4'>
			<Header pageTitle='Users' />
			<div className='flex flex-col justify-center w-full h-full px-4 pt-56 mt-16 lg:pt-0 '>
				<h1 className='w-full text-3xl text-center'>All Users</h1>
				<UsersTable />
			</div>
		</div>
	);
};

export default UsersPage;
