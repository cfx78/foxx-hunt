import Link from 'next/link';
import ChangeUserRole from './ChangeUserRole';

type UserProfileProps = {
	user: UserInformation;
};

const UserProfile = (props: UserProfileProps) => {
	return (
		<div className='bg-white w-full max-w-2xl overflow-hidden shadow rounded-lg border'>
			<div className='px-4 py-5 sm:px-6'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>
					User Profile
				</h3>
				<p className='mt-1 max-w-2xl text-sm text-gray-500'>
					Current information about the user.
				</p>
			</div>
			<div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
				<dl className='sm:divide-y sm:divide-gray-200'>
					<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>
							Full name
						</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
							{props.user.name}
						</dd>
					</div>
					<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>
							Email address
						</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
							{props.user.email}
						</dd>
					</div>
					<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>
							Role
						</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center '>
							{props.user.role}
							<ChangeUserRole
								userEmail={props.user.email}
								userId={props.user.id}
								userRole={props.user.role}
								userName={props.user.name}
							/>
						</dd>
					</div>
					<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>
							Current Projects
						</dt>
						{props.user.projects.map((project) => (
							<dd
								key={project.id}
								className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
								<div>
									<Link
										href={`/dashboard/projects/${project.id}`}
										className='text-blue-500 hover:text-blue-700'>
										{project.name}
									</Link>
								</div>
							</dd>
						))}
					</div>
					<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>
							Created Tickets
						</dt>
						<dd className='mt-1 text-sm space-x-8 flex items-center w-full max-w-md text-gray-900 sm:mt-0 sm:col-span-2'>
							{props.user.ticketsCreated.map((ticket) => (
								<Link
									key={ticket.id}
									href={`/dashboard/tickets/${ticket.id}`}
									className='text-blue-500 hover:text-blue-700'>
									{ticket.title}
								</Link>
							))}
						</dd>
					</div>
					<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>
							Assigned Tickets
						</dt>
						{props.user.ticketsAssigned.map((ticket) => (
							<dd
								key={ticket.id}
								className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
								<div>
									<Link
										href={`/dashboard/tickets/${ticket.id}`}
										className='text-blue-500 hover:text-blue-700'>
										{ticket.title}
									</Link>
								</div>
							</dd>
						))}
					</div>
				</dl>
			</div>
		</div>
	);
};

export default UserProfile;
