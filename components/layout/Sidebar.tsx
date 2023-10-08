'use client';

import { Squash as Hamburger } from 'hamburger-react';
import ModeToggle from './darkmode';
import Logout from './logout';
import ProfileAvatar from './ProfileAvatar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { RxDashboard, RxRulerSquare, RxReader } from 'react-icons/rx';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';

type SidebarProps = {
	name: string;
	email: string;
	image?: string;
	role?: string;
};

const Sidebar = (props: SidebarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<motion.nav
				initial={{ width: '10vw' }}
				animate={
					isMenuOpen
						? {
								width: '25vw',
								zIndex: 50,
						  }
						: { width: '10vw' }
				}
				className='flex-col top-0 left-0 fixed w-[10vw] border-8 h-full'>
				<div className='w-full flex justify-center items-center'>
					<Hamburger
						toggled={isMenuOpen}
						toggle={setIsMenuOpen}
						size={32}
						rounded
					/>
				</div>

				<div className='w-full grid place-content-center pt-32'>
					<ModeToggle />
				</div>
				<div className='flex items-center justify-center w-full pt-16'>
					<ProfileAvatar image={props.image} role={props.role} />
				</div>
				<p
					className={
						isMenuOpen
							? 'block text-center pt-4 transition ease-in-out '
							: 'hidden'
					}>
					{props.name}
				</p>
				<p
					className={
						isMenuOpen
							? 'block text-center pt-2 delay-700 transition ease-in-out w-full truncate '
							: 'hidden'
					}>
					{props.email}
				</p>

				<ul className='flex-col items-center justify-center w-full pt-20 text-center space-y-20 '>
					<li className='w-full flex items-center justify-center text-center'>
						<Tooltip
							content='Dashboard'
							placement='right'
							showArrow>
							<Link
								href='/dashboard'
								className='w-full text-2xl text-center hover:text-primary'>
								<RxDashboard
									className='w-full text-center mx-auto text-2xl'
									size={60}
								/>

								<span
									className={
										isMenuOpen
											? 'block text-center pt-2'
											: 'hidden w-0'
									}>
									Dashboard
								</span>
							</Link>
						</Tooltip>
					</li>
					<li>
						<Tooltip content='Projects' placement='right' showArrow>
							<Link
								href='/dashboard/projects'
								className='w-full text-2xl text-center hover:text-primary'>
								<RxRulerSquare
									className='w-full text-center mx-auto text-2xl'
									size={50}
								/>
								<span
									className={
										isMenuOpen
											? 'block text-center pt-2'
											: 'hidden w-0'
									}>
									Projects
								</span>
							</Link>
						</Tooltip>
					</li>
					<li>
						<Tooltip content='Tickets' placement='right' showArrow>
							<Link
								href='/dashboard/tickets'
								className='w-full text-2xl text-center hover:text-primary'>
								<RxReader
									className='w-full text-center mx-auto text-2xl'
									size={70}
								/>
								<span
									className={
										isMenuOpen
											? 'block text-center pt-2'
											: 'hidden w-0'
									}>
									Tickets
								</span>
							</Link>
						</Tooltip>
					</li>
				</ul>
				<div className='flex items-center justify-center w-full pt-24'>
					<Logout />
				</div>
			</motion.nav>
		</>
	);
};

export default Sidebar;
