'use client';

import { PiGoogleLogoThin, PiGithubLogoThin } from 'react-icons/pi';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

type SignInButtonProps = {
	Google?: boolean;
	Github?: boolean;
};

const SignInButton = (props: SignInButtonProps) => {
	const handleClick = () => {
		if (props.Google) {
			signIn('google', { callbackUrl: '/dashboard' });
		} else if (props.Github) {
			signIn('github', { callbackUrl: '/dashboard' });
		}
	};
	console.log(
		'🚀 ~ file: SignInButton.tsx:20 ~ handleClick ~ handleClick:',
		handleClick,
	);

	return (
		<Button
			variant={'outline'}
			onClick={handleClick}
			className='flex items-center justify-between w-40 space-x-1 transition-all focus:bg-white focus:text-black focus:animate-pulse light:focus:bg-black light:focus:text-white'>
			{props.Google ? (
				<PiGoogleLogoThin className='w-6 h-6 cursor-pointer ' />
			) : (
				<PiGithubLogoThin className='w-6 h-6 cursor-pointer' />
			)}
			{props.Google ? 'Google' : 'Github'}
		</Button>
	);
};

export default SignInButton;
