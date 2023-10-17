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

	return (
		<div className='w-full min-h-screen flex justify-center items-center mx-auto py-24 '>
			<UserProfile user={data as UserInformation} />
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
