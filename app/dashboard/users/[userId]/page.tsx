import Header from '@/components/layout/Header';
import './styles.modules.css';
import UserProfile from '@/components/layout/UserComponents/UserProfile';
import prisma from '@/lib/db';
import {
	UserPageFunctions,
	UserPageFunctionsProps,
} from '@/lib/ServerComponentFunctions/DynamicPages/UserPageFunctions';

type UserPageParams = {
	params: {
		userId: string;
	};
};

const UserPage = async ({ params: { userId } }: UserPageParams) => {
	const props: UserPageFunctionsProps = {
		userId,
	};

	const data = await UserPageFunctions(props);

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return <div>404</div>;
	}

	return (
		<div className='user-container'>
			{user.name !== undefined ||
			user.name !== null ||
			user.name !== '' ? (
				<Header pageTitle={user.name as string} />
			) : (
				<Header pageTitle={user.email} />
			)}
			<main className='flex justify-center items-center '>
				<UserProfile user={data as UserInformation} />
			</main>
		</div>
	);
};

export async function generateStaticParams() {
	const users = await prisma.user.findMany();

	return users.map((user) => ({
		userId: user.id,
	}));
}

export const revalidate = 3600;

export default UserPage;
