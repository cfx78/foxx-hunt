'use client';
import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import Logout from './logout';
import ProfileAvatar from './ProfileAvatar';
type SidebarProps = {
	name: string;
	email: string;
	image?: string;
	role?: string;
};

const MobileNav = (props: SidebarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className='top-0 left-0 absolute '>
			<div className='z-50'>
				<Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
			</div>
			<nav
				className={`${
					isMenuOpen
						? 'translate-x-1 w-[95vw]'
						: '-translate-x-unit-9xl w-0'
				}   text-white bg-black px-24 pb-56 pt-32 ease-in-out transition-all h-full rounded`}>
				<div className='w-full text-center flex-col justify-evenly items-center mx-auto '>
					<span className='flex items-center justify-center w-full py-7'>
						<ProfileAvatar image={props.image} role={props.role} />
					</span>
					<p>{props.name}</p>
					<p>{props.email}</p>
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
			</nav>
		</div>
	);
};

export default MobileNav;
