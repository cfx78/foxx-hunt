import UserProfile from '@/components/layout/UserComponents/UserProfile';

import prisma from '@/lib/db';

type UserPageParams = {
	params: {
		userId: string;
	};
};

const UserPage = async ({ params: { userId } }: UserPageParams) => {
	console.log(`userId: ${userId}`);
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			accounts: true,
			projects: true,
			ticketsAssigned: true,
			ticketsCreated: true,
		},
	});

	if (!user) {
		return <h1>Ticket Not Found</h1>;
	}

	console.log(`user: ${user}`);

	const userInformation = {
		id: user.id,
		email: user.email,
		name: user.name || '',
		role: user.role,
		ticketsCreated: user.ticketsCreated.map((ticket) => ({
			id: ticket.id,
			title: ticket.title,
			status: ticket.status,
			priority: ticket.priority,
			type: ticket.type,
			createdAt: ticket.createdAt,
			updatedAt: ticket.updatedAt,
			project: ticket.projectName,
		})),
		ticketsAssigned: user.ticketsAssigned.map((ticket) => ({
			id: ticket.id,
			title: ticket.title,
			status: ticket.status,
			priority: ticket.priority,
			type: ticket.type,
			createdAt: ticket.createdAt,
			updatedAt: ticket.updatedAt,

			project: ticket.projectName,
		})),
		projects: user.projects.map((project) => ({
			id: project.id,
			name: project.name,
		})),
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};

	return (
		<div className='w-full min-h-screen grid place-content-center place-items-center mx-auto py-24 '>
			<UserProfile user={userInformation} />
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
