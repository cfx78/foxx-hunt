import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { ModeToggle } from '@/components/layout/darkmode';

import Popup from '@/components/layout/popup';

import Logout from '@/components/layout/logout';

import {
	PiGoogleLogoThin,
	PiGithubLogoThin,
	PiEnvelopeSimpleThin,
} from 'react-icons/pi';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
	const session = await getServerSession(authOptions);
	console.log(session);

	return (
		<main className='w-screen h-screen flex flex-col items-center justify-center p-4 relative'>
			{session != null && (
				<div className='top-32 absolute flex-col text-center justify-center items-center'>
					<p>
						{JSON.stringify(session?.user?.name)}
						{JSON.stringify(session?.user?.email)}
					</p>
					<Logout />
				</div>
			)}
			<Card className='absolute border-0 border-y-4 w-96 lg:w-3/5 lg:h-auto lg:py-4'>
				<div className='flex items-center justify-center w-full pt-4 pb-6'>
					<ModeToggle />
				</div>
				<CardHeader>
					<CardTitle className='text-center text-5xl'>
						<p>
							Foxx <span className='text-4xl'>🦊</span> Hunt
						</p>
					</CardTitle>
					<CardDescription className='text-center pt-2'>
						A Bug Tracker
					</CardDescription>
				</CardHeader>
				<CardContent className='text-center'>
					<p>sign in</p>
					<div className='flex w-full h-full items-center justify-evenly py-5'>
						<Popup
							trigger={<PiGoogleLogoThin className='w-6 h-6' />}
							title='Google'
							description='This would be a google sign in'
						/>
						<Popup
							trigger={<PiGithubLogoThin className='w-6 h-6' />}
							title='Github'
							description='This would be a github sign in'
						/>
						<Popup
							trigger={
								<PiEnvelopeSimpleThin className='w-6 h-6' />
							}
							title='Email'
							description='Welcome Back!'
						/>
					</div>
					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<span className='w-full border-t' />
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-background px-2 text-muted-foreground'>
								Or
							</span>
						</div>
					</div>
					<p className='pt-4'>sign up</p>
					<div className='flex w-full h-full items-center justify-evenly py-5'>
						<Popup
							trigger={<PiGoogleLogoThin className='w-6 h-6' />}
							title='Google'
							description='This would be a google sign up'
						/>
						<Popup
							trigger={<PiGithubLogoThin className='w-6 h-6' />}
							title='Github'
							description='This would be a github sign up'
						/>
						<Popup
							trigger={
								<PiEnvelopeSimpleThin className='w-6 h-6' />
							}
							title='Email'
							description='Sign Up with Email'
							registration={true}
						/>
					</div>
					<CardFooter></CardFooter>
				</CardContent>
			</Card>
		</main>
	);
}
