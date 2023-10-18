import ProjectsTicketsRow from './ProjectsTicketsRow';

type TicketsTableProps = {
	ticketsArray: {
		id: string;
		title: string;
		status: string;
		priority: string;
		createdAt: Date;
	}[];
};

const ProjectTicketsTable = (props: TicketsTableProps) => {
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>
							<div className='table-heading-start'>Title</div>
						</th>
						<th>
							<div className='table-heading'>Status</div>
						</th>
						<th>
							<div className='table-heading'>Priority</div>
						</th>
						<th>
							<div className='table-heading'>Created</div>
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-gray-100'>
					{props.ticketsArray.map((ticket) => (
						<ProjectsTicketsRow
							key={ticket.id}
							id={ticket.id}
							title={ticket.title}
							status={ticket.status}
							priority={ticket.priority}
							createdAt={ticket.createdAt}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ProjectTicketsTable;
