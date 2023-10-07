'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const Logout = () => {
	return (
		<Button
			variant='outline'
			className='hover:bg-slate-400 hover:text-slate-950 md:text-xl lg:text-base lg:py-2 lg:px-4'
			onClick={() => signOut()}>
			Logout
		</Button>
	);
};

export default Logout;
