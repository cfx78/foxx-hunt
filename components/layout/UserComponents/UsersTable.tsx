import prisma from '@/lib/db';
import UsersRow from './UsersRow';

const UsersTable = async () => {
	const users = await prisma.user.findMany({
		include: {
			projects: true,
			ticketsAssigned: true,
		},
	});
	console.log(`userID in UsersTable: ${users[0].id}`);

	return (
		<>
			<div>
				<table className='table-auto w-full border-spacing-y-8 border-separate'>
					<thead>
						<tr>
							<th className='text-left underline-offset-2 underline'>
								Name
							</th>
							<th className='text-center underline-offset-2 underline'>
								Email
							</th>
							<th className='underline-offset-2 underline text-center'>
								Open Tickets
							</th>
							<th className='text-right underline-offset-2 underline'>
								Projects Assigned
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<UsersRow
								email={user.email}
								name={user.name as string}
								tickets={user.ticketsAssigned.length.toString()}
								projects={user.projects.length.toString()}
								userId={user.id}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default UsersTable;
