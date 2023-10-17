import prisma from '@/lib/db';

export type UserPageFunctionsProps = {
	userId: string;
};

export const UserPageFunctions = async (props: UserPageFunctionsProps) => {
	const user = await prisma.user.findUnique({
		where: {
			id: props.userId,
		},
		include: {
			accounts: true,
			projects: true,
			ticketsAssigned: true,
			ticketsCreated: true,
		},
	});

	if (!user) {
		return 'User not found';
	}

	const userInformation: UserInformation = {
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

	return userInformation;
};
