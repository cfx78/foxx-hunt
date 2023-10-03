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
		<div className='h-screen w-full relative flex-col items-center justify-center'>
			<div className='h-full w-full  relative'>
				<span className='text-5xl pl-6  pt-3 text-center absolute'>
					<h1 className='text-4xl underline underline-offset-2  pl-1 pb-3 text-center'>
						Foxx Hunt
					</h1>
					🦊
				</span>
			</div>
			<nav
				className='h-[90%] bottom-1 rounded-t-lg  shadow-slate-400 shadow-inner absolute bg-secondary
				 w-52  self-center flex-col justify-around items-center'>
				<div className='top-0 pt-6 text-center w-full '>
					<ModeToggle />
				</div>

				<div className='flex-col px-2 text-center pt-10 space-y-4 relative  justify-center items-center w-full'>
					<p className='text-xl'>{props.name}</p>
					<p className='text-lg text-ellipsis overflow-hidden'>
						{props.email}
					</p>
				</div>
				<div className='w-full flex justify-center items-center pt-7'>
					<ProfileAvatar image={props.image} role={props.role} />
				</div>

				<ul className='flex-col text-center pt-16 space-y-9  justify-center items-center w-full'>
					<li>
						<a
							href='/dashboard'
							className='text-center text-2xl w-full hover:text-primary'>
							Dashboard
						</a>
					</li>
					<li>
						<a
							href='/dashboard'
							className='text-center text-2xl w-full hover:text-primary'>
							Projects
						</a>
					</li>
					<li>
						<a
							href='/dashboard'
							className='text-center text-2xl w-full hover:text-primary'>
							Tickets
						</a>
					</li>
				</ul>
				<div className='w-full pt-24 flex justify-center items-center'>
					<Logout />
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;
