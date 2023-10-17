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
			<table className='w-full border-separate table-auto border-spacing-y-8'>
				<thead>
					<tr>
						<th className='text-left underline underline-offset-2'>
							Title
						</th>
						<th className='text-center underline underline-offset-2'>
							Status
						</th>
						<th className='text-center underline underline-offset-2'>
							Priority
						</th>
						<th className='text-center underline underline-offset-2'>
							Created
						</th>
					</tr>
				</thead>
				<tbody>
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
