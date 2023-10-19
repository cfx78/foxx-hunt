'use client';
import { useState } from 'react';
import UsersRow from './UsersRow';
import { TiArrowUnsorted } from 'react-icons/ti';

type UsersTableProps = {
	usersArray: {
		id: string;
		name: string;
		email: string;
		ticketsAssigned: string[];
		projects: string[];
		[key: string]: any;
	}[];
};

const UsersTable = (props: UsersTableProps) => {
	const [order, setOrder] = useState('asc');
	const [data, setData] = useState(props.usersArray);
	const sorting = (key: string) => {
		const sorted = [...props.usersArray].sort((a, b) => {
			if (order === 'asc') {
				setOrder('desc');
				return a[key] > b[key] ? 1 : -1;
			} else {
				setOrder('asc');
				return a[key] < b[key] ? 1 : -1;
			}
		});
		setData(sorted);
	};

	return (
		<table>
			<thead>
				<tr>
					<th>
						<div
							className='table-heading cursor-pointer-start cursor-pointer'
							onClick={() => sorting('name')}>
							Name
							<TiArrowUnsorted />
						</div>
					</th>
					<th>
						<div
							className='table-heading cursor-pointer'
							onClick={() => sorting('email')}>
							Email
							<TiArrowUnsorted />
						</div>
					</th>
					<th>
						<div
							className='table-heading cursor-pointer'
							onClick={() => sorting('ticketsAssigned')}>
							Tickets <TiArrowUnsorted />
						</div>
					</th>
					<th>
						<div
							className='table-heading cursor-pointer'
							onClick={() => sorting('projects')}>
							Projects <TiArrowUnsorted />
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((user) => (
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
