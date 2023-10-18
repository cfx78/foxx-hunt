import prisma from '@/lib/db';
import UsersRow from './UsersRow';

const UsersTable = async () => {
	const users = await prisma.user.findMany({
		include: {
			projects: true,
			ticketsAssigned: true,
		},
	});

	return (
		<table>
			<thead>
				<tr>
					<th>
						<div className='table-heading-start'>Name</div>
					</th>
					<th>
						<div className='table-heading'>Email</div>
					</th>
					<th>
						<div className='table-heading'>Open Tickets</div>
					</th>
					<th>
						<div className='table-heading'>Projects Assigned</div>
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
						key={user.id}
					/>
				))}
			</tbody>
		</table>
	);
};

export default UsersTable;
