'use client';
import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import Logout from './logout';
import ProfileAvatar from './ProfileAvatar';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
type SidebarProps = {
	name: string;
	email: string;
	image?: string;
	role?: string;
};

const MobileNav = (props: SidebarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className='top-0 left-0 fixed'>
			<div className='z-50'>
				<Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
			</div>
			<nav
				className={`${
					isMenuOpen ? '-translate-x-0 ' : '-translate-x-full'
				}   text-white bg-black px-24 w-full pb-56 pt-32 ease-in-out  transition h-full rounded duration-1000 top-0 left-0 fixed`}>
				<div className='text-right justify-end top-0 right-0 absolute'>
					{/* <Button
						className='absolute top-0 right-0'
						variant={'ghost'}
						size={'lg'}
						onClick={() => setIsMenuOpen(false)}>
						X
					</Button> */}
					<div className='z-50'>
						<Hamburger
							toggled={isMenuOpen}
							toggle={setIsMenuOpen}
						/>
					</div>
				</div>

				<div className='w-full text-center flex-col justify-evenly items-center mx-auto '>
					<motion.span
						className='flex items-center justify-center w-full py-7'
						animate={
							isMenuOpen
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: -50 }
						}
						transition={{
							duration: 0.75,
							ease: 'easeInOut',
							type: 'spring',
							stiffness: 100,
						}}>
						<ProfileAvatar image={props.image} role={props.role} />
					</motion.span>
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
