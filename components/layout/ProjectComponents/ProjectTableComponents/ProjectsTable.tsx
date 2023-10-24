'use client';
import { useState } from 'react';
import ProjectsTableRow from './ProjectsTableRow';
import { TiArrowUnsorted } from 'react-icons/ti';

type ProjectsTableProps = {
	projectsArray: {
		id: string;
		name: string;
		createdAt: Date;
		updatedAt: Date;
		tickets: {
			id: string;
			title: string;
			status: string;
			priority: string;
			createdAt: Date;
		}[];
		[key: string]: any;
	}[];
};

const ProjectsTable = (props: ProjectsTableProps) => {
	const [order, setOrder] = useState('asc');
	const [data, setData] = useState(props.projectsArray);
	const sorting = (key: string) => {
		const sorted = [...props.projectsArray].sort((a, b) => {
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
		<div className='flex-col justify-center items-center py-14'>
			<h1 className='text-center text-2xl font-bold my-5'>Projects</h1>
			<table>
				<thead>
					<tr>
						<th>
							<div
								className='table-heading-start cursor-pointer'
								onClick={() => sorting('name')}>
								Name
								<TiArrowUnsorted />
							</div>
						</th>
						<th>
							<div
								className='table-heading cursor-pointer'
								onClick={() => sorting('tickets')}>
								Tickets
								<TiArrowUnsorted />
							</div>
						</th>
						<th className='hidden lg:block'>
							<div
								className='table-heading cursor-pointer hidden lg:block'
								onClick={() => sorting('updatedAt')}>
								Updated
								<TiArrowUnsorted />
							</div>
						</th>
						<th>
							<div
								className='table-heading cursor-pointer'
								onClick={() => sorting('createdAt')}>
								Created
								<TiArrowUnsorted />
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((project) => (
						<ProjectsTableRow
							key={project.id}
							name={project.name}
							createdAt={project.createdAt}
							updatedAt={project.updatedAt}
							tickets={project.tickets as []}
							id={project.id}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProjectsTable;
