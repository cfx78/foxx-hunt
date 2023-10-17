'use client';

import ModeToggle from '../darkmode';
import Logout from '../logout';
import ProfileAvatar from '../ProfileAvatar';

import { RxDashboard, RxRulerSquare, RxReader, RxAvatar } from 'react-icons/rx';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';

type SidebarProps = {
	name: string;
	email: string;
	image?: string;
	role?: string;
};

const Sidebar = (props: SidebarProps) => {
	return (
		<>
			<nav className='flex-col bg-primary text-primary-foreground dark:text-accent-foreground top-0 left-0 fixed w-[6vw] border-8 h-full z-50'>
				<div className='flex flex-col items-center justify-center w-full gap-1 pt-3'>
					<div className='text-6xl '>🦊</div>
					<small className='text-sm text-center'>Foxx Hunt </small>
				</div>

				<div className='grid w-full pt-32 place-content-center'>
					<ModeToggle />
				</div>
				<div className='flex flex-col items-center justify-center '>
					<div className='flex items-center justify-center w-full pt-16 mb-2'>
						<ProfileAvatar image={props.image} role={props.role} />
					</div>
					<small className='text-xs'>{props.name}</small>
					<small className='text-xs'>{props.email}</small>
					<ul className='flex-col items-center justify-center w-full pt-20 space-y-20 text-center '>
						<li className='flex items-center justify-center w-full text-center'>
							<Tooltip
								content='Dashboard'
								placement='right'
								showArrow>
								<Link
									href='/dashboard'
									className='text-2xl text-center w-fit hover:text-accent-foreground'>
									<RxDashboard
										className='mx-auto text-2xl text-center w-fit'
										size={60}
									/>
								</Link>
							</Tooltip>
						</li>
						<li>
							<Tooltip
								content='Projects'
								placement='right'
								showArrow>
								<Link
									href='/dashboard/projects'
									className='text-2xl text-center w-fit hover:text-accent-foreground'>
									<RxRulerSquare
										className='mx-auto text-2xl text-center w-fit'
										size={50}
									/>
								</Link>
							</Tooltip>
						</li>
						<li>
							<Tooltip
								content='Tickets'
								placement='right'
								showArrow>
								<Link
									href='/dashboard/tickets'
									className='text-2xl text-center w-fit hover:text-accent-foreground'>
									<RxReader
										className='mx-auto text-2xl text-center w-fit'
										size={70}
									/>
								</Link>
							</Tooltip>
						</li>
						{props.role === 'ADMIN' && (
							<li>
								<Tooltip
									content='Users'
									placement='right'
									showArrow>
									<Link
										href='/dashboard/users'
										className='text-2xl text-center w-fit hover:text-accent-foreground'>
										<RxAvatar
											className='mx-auto text-2xl text-center w-fit'
											size={70}
										/>
									</Link>
								</Tooltip>
							</li>
						)}
					</ul>
				</div>
				<div className='flex items-center justify-center w-full pt-24'>
					<Logout />
				</div>
			</nav>
		</>
	);
};

export default Sidebar;
