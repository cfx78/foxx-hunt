'use client';
import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import Logout from '../logout';
import ProfileAvatar from '../ProfileAvatar';

import { motion } from 'framer-motion';
import ModeToggle from '../darkmode';
import Link from 'next/link';
type SidebarProps = {
	name: string;
	email: string;
	image?: string;
	role?: string;
};

const MobileNav = (props: SidebarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className='fixed top-0 left-0 z-50'>
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
				className='bg-accent px-24 w-full pb-56 pt-32 h-full rounded  top-0 left-0 fixed z-[200]'>
				<div className='top-0 grid w-full place-content-center text-warning dark:text-primary-300'>
					<ModeToggle />
				</div>
				<div className='absolute top-0 right-0 justify-end text-right'>
					<div className='z-50'>
						<Hamburger
							toggled={isMenuOpen}
							toggle={setIsMenuOpen}
						/>
					</div>
				</div>

				<div className='flex-col items-center w-full mx-auto text-center md:text-2xl justify-evenly '>
					<motion.span
						className='z-50 flex items-center justify-center w-full py-7'
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
						<Link
							onClick={() => setIsMenuOpen(false)}
							href='/dashboard'
							className='w-full text-2xl text-center md:text-5xl hover:text-primary'>
							Dashboard
						</Link>
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
						<Link
							onClick={() => setIsMenuOpen(false)}
							href='/dashboard/projects'
							className='w-full text-2xl text-center md:text-5xl hover:text-primary'>
							Projects
						</Link>
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
						<Link
							onClick={() => setIsMenuOpen(false)}
							href='/dashboard/tickets'
							className='w-full text-2xl text-center md:text-5xl hover:text-primary'>
							Tickets
						</Link>
					</motion.li>
					{props.role === 'ADMIN' && (
						<motion.li
							className=''
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
							<Link
								onClick={() => setIsMenuOpen(false)}
								href='/dashboard/users'
								className='w-full text-2xl text-center md:text-5xl hover:text-primary'>
								Users
							</Link>
						</motion.li>
					)}
					<motion.li className=' text-primary-900'>
						<Logout />
					</motion.li>
				</motion.ul>
				<motion.div
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
					exit={{ opacity: 0, y: 50 }}
					className='flex flex-col items-center justify-center w-full gap-1 pt-10'>
					<div className='text-6xl '>🦊</div>
					<small className='text-lg text-center'>Foxx Hunt </small>
				</motion.div>
			</motion.nav>
		</div>
	);
};

export default MobileNav;
