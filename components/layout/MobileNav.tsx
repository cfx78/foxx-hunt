'use client';
import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import Logout from './logout';
import ProfileAvatar from './ProfileAvatar';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import ModeToggle from './darkmode';
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
			<div>
				<Hamburger
					toggled={isMenuOpen}
					toggle={setIsMenuOpen}
					rounded
				/>
			</div>
			<motion.nav
				initial={{ opacity: 0, x: -1000 }}
				animate={
					isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -1000 }
				}
				transition={{
					duration: 0.35,
					ease: 'easeInOut',
					type: 'tween',
					stiffness: 10,
				}}
				exit={{
					opacity: 0.75,
					x: -1000,
					transition: {
						duration: 0.35,
						ease: 'easeInOut',
						type: 'tween',
						stiffness: 10,
					},
				}}
				className='bg-accent px-24 w-full pb-56 pt-32 h-full rounded  top-0 left-0 fixed'>
				<div className='w-full grid place-content-center  top-0'>
					<ModeToggle />
				</div>
				<div className='text-right justify-end top-0 right-0 absolute'>
					<div className='z-50'>
						<Hamburger
							toggled={isMenuOpen}
							toggle={setIsMenuOpen}
						/>
					</div>
				</div>

				<div className='w-full text-center flex-col md:text-2xl justify-evenly items-center mx-auto '>
					<motion.span
						className='flex items-center justify-center w-full py-7'
						viewport={{ once: true }}
						initial={{ opacity: 0, y: -50 }}
						animate={
							isMenuOpen
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: -50 }
						}
						transition={{
							duration: 0.45,
							ease: 'easeInOut',
							type: 'spring',
							stiffness: 100,
							delay: 0.5,
						}}>
						<ProfileAvatar image={props.image} role={props.role} />
					</motion.span>
					<motion.p
						viewport={{ once: true }}
						initial={{ opacity: 0, y: -50 }}
						animate={
							isMenuOpen
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: -50 }
						}
						transition={{
							duration: 0.55,
							ease: 'easeInOut',
							type: 'spring',
							stiffness: 100,
							delay: 0.6,
						}}
						exit={{ opacity: 0, y: -50 }}>
						{props.name}
					</motion.p>
					<motion.p
						initial={{ opacity: 0, y: -50 }}
						animate={
							isMenuOpen
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: -50 }
						}
						transition={{
							duration: 0.65,
							ease: 'easeInOut',
							type: 'spring',
							stiffness: 100,
							delay: 0.7,
						}}
						exit={{ opacity: 0, y: -50 }}>
						{props.email}
					</motion.p>
				</div>
				<motion.ul
					initial={{ opacity: 0 }}
					animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
					transition={{
						duration: 0.75,
						ease: 'easeInOut',
						type: 'spring',
						stiffness: 100,
					}}
					exit={{ opacity: 0 }}
					className='flex-col items-center justify-center w-full pt-16 text-center space-y-9'>
					<motion.li
						initial={{ opacity: 0, y: 50 }}
						animate={
							isMenuOpen
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 50 }
						}
						transition={{
							duration: 0.75,
							ease: 'easeInOut',
							type: 'spring',
							stiffness: 100,
						}}
						exit={{ opacity: 0, y: 50 }}>
						<a
							href='/dashboard'
							className='w-full md:text-5xl text-2xl text-center hover:text-primary'>
							Dashboard
						</a>
					</motion.li>
					<motion.li
						initial={{ opacity: 0, y: 50 }}
						animate={
							isMenuOpen
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 50 }
						}
						transition={{
							duration: 0.75,
							ease: 'easeInOut',
							type: 'spring',
							stiffness: 100,
						}}
						exit={{ opacity: 0, y: 50 }}>
						<a
							href='/dashboard'
							className='w-full md:text-5xl text-2xl text-center hover:text-primary'>
							Projects
						</a>
					</motion.li>
					<motion.li
						initial={{ opacity: 0, y: 50 }}
						animate={
							isMenuOpen
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 50 }
						}
						transition={{
							duration: 0.75,
							ease: 'easeInOut',
							type: 'spring',
							stiffness: 100,
						}}
						exit={{ opacity: 0, y: 50 }}>
						<a
							href='/dashboard'
							className='w-full md:text-5xl text-2xl text-center hover:text-primary'>
							Tickets
						</a>
					</motion.li>
					<motion.li className=''>
						<Logout />
					</motion.li>
				</motion.ul>
			</motion.nav>
		</div>
	);
};

export default MobileNav;
