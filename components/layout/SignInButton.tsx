'use client';

import {
	PiGoogleLogoThin,
	PiGithubLogoThin,
	PiUserThin,
	PiUserPlusThin,
} from 'react-icons/pi';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

type SignInButtonProps = {
	Google?: boolean;
	Github?: boolean;
	UserDemo?: boolean;
	AdminDemo?: boolean;
	email?: string;
	password?: string;
};

const SignInButton = (props: SignInButtonProps) => {
	const handleClick = () => {
		if (props.Google) {
			signIn('google', { callbackUrl: '/dashboard' });
		} else if (props.Github) {
			signIn('github', { callbackUrl: '/dashboard' });
		} else if (props.UserDemo) {
			signIn('credentials', {
				email: 'demo.user@email.com',
				password: '1234',
				callbackUrl: '/dashboard',
			});
		} else if (props.AdminDemo) {
			signIn('credentials', {
				email: 'demo.admin@email.com',
				password: '1234',
				callbackUrl: '/dashboard',
			});
		}
	};

	return (
		<Button
			variant={'outline'}
			onClick={handleClick}
			className='flex items-center justify-between w-40 space-x-1 transition-all focus:bg-white focus:text-black focus:animate-pulse light:focus:bg-black light:focus:text-white'>
			{props.Google && (
				<PiGoogleLogoThin className='w-6 h-6 cursor-pointer' />
			)}
			{props.Github && (
				<PiGithubLogoThin className='w-6 h-6 cursor-pointer' />
			)}
			{props.UserDemo && (
				<PiUserThin className='w-6 h-6 cursor-pointer' />
			)}
			{props.AdminDemo && (
				<PiUserPlusThin className='w-6 h-6 cursor-pointer' />
			)}

			{props.Google && 'Google'}
			{props.Github && 'Github'}
			{props.UserDemo && 'User Demo'}
			{props.AdminDemo && 'Admin Demo'}
		</Button>
	);
};

export default SignInButton;
