'use client';

import { PiGoogleLogoThin } from 'react-icons/pi';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

const GoogleButton = () => {
	return (
		<Button
			variant={'outline'}
			onClick={() => signIn('google')}
			className='flex items-center justify-between space-x-1 w-40'>
			<PiGoogleLogoThin className='w-6 h-6' />
			<span>Google</span>
		</Button>
	);
};

export default GoogleButton;
