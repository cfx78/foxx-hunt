import ModeToggle from './darkmode';
import Logout from './logout';
import ProfileAvatar from './ProfileAvatar';
type SidebarProps = {
	name: string;
	email: string;
	image?: string;
	role?: string;
};

const Sidebar = (props: SidebarProps) => {
	return (
		<>
			<nav className='flex-col top-0 left-0 fixed w-[10vw] border-8 h-full hidden lg:block'>
				<div className=''>
					<p className='text-xl text-center'>{props.name}</p>
					<p className='overflow-hidden text-lg text-ellipsis text-center'>
						{props.email}
					</p>
				</div>
				<div className='flex items-center justify-center w-full pt-7'>
					<ProfileAvatar image={props.image} role={props.role} />
				</div>

				<ul className='flex-col items-center justify-center w-full pt-16 text-center space-y-9'>
					<li>
						<a
							href='/dashboard'
							className='w-full text-2xl text-center hover:text-primary'>
							Dashboard
						</a>
					</li>
					<li>
						<a
							href='/dashboard'
							className='w-full text-2xl text-center hover:text-primary'>
							Projects
						</a>
					</li>
					<li>
						<a
							href='/dashboard'
							className='w-full text-2xl text-center hover:text-primary'>
							Tickets
						</a>
					</li>
				</ul>
				<div className='flex items-center justify-center w-full pt-24'>
					<Logout />
				</div>
			</nav>
		</>
	);
};

export default Sidebar;
