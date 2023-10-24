import Link from 'next/link';
import ChangeUserRole from './ChangeUserRole';
import AddToProjectButton from '../ProjectComponents/AddToProject';
import prisma from '@/lib/db';

type UserProfileProps = {
	user: UserInformation;
};

const UserProfile = async (props: UserProfileProps) => {
	const projects = await prisma.project.findMany();

	return (
		<div className='flow-root px-4 py-10 border border-gray-100 rounded-lg shadow-lg dark:border-gray-700 bg-slate-300 dark:bg-slate-700'>
			<dl className='-my-3 text-lg divide-y divide-gray-100 dark:divide-gray-700'>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Full name
					</dt>
					<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
						{props.user.name}
					</dd>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Email address
					</dt>
					<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
						{props.user.email}
					</dd>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Role
					</dt>

					<div className='flex flex-col gap-4'>
						<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
							{props.user.role}
						</dd>
						<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
							<ChangeUserRole
								userEmail={props.user.email}
								userId={props.user.id}
								userRole={props.user.role}
								userName={props.user.name}
							/>
						</dd>
					</div>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Current Projects
					</dt>
					<div className='flex flex-col gap-4 '>
						{props.user.projects.map((project) => (
							<dd
								key={project.id}
								className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
								<Link
									href={`/dashboard/projects/${project.id}`}
									className='text-blue-500 hover:text-blue-700'>
									{project.name}
								</Link>
							</dd>
						))}
						<dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
							<AddToProjectButton
								userId={props.user.id}
								projectNames={projects.map(
									(project) => project.name,
								)}
							/>
						</dd>
					</div>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Created Tickets
					</dt>
					<div className='flex flex-col gap-4'>
						{props.user.ticketsCreated.map((ticket) => (
							<dd
								key={ticket.id}
								className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
								<Link
									href={`/dashboard/tickets/${ticket.id}`}
									className='text-blue-500 hover:text-blue-700'>
									{ticket.title}
								</Link>
							</dd>
						))}
					</div>
				</div>
				<div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 even:dark:bg-gray-800 sm:grid-cols-3 sm:gap-4'>
					<dt className='text-3xl font-medium text-gray-900 underline underline-offset-2 dark:text-white'>
						Assigned Tickets
					</dt>
					<div className='flex flex-col gap-4'>
						{props.user.ticketsAssigned.map((ticket) => (
							<dd
								key={ticket.id}
								className='text-gray-700 dark:text-gray-200 sm:col-span-2 '>
								<Link
									href={`/dashboard/tickets/${ticket.id}`}
									className='text-blue-500 hover:text-blue-700 max-w-fit'>
									{ticket.title}
								</Link>
							</dd>
						))}
					</div>
				</div>
			</dl>
		</div>
	);
};

export default UserProfile;
