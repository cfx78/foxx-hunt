import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import ModeToggle from '@/components/layout/darkmode';

import Popup from '@/components/layout/popup';

import { PiEnvelopeSimpleThin } from 'react-icons/pi';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

import SignInButton from '@/components/layout/SignInButton';

export default async function Home() {
	const session = await getServerSession(authOptions);
	console.log(session);

	return (
		<main className='relative flex flex-col items-center justify-center w-screen h-screen p-4'>
			<Card className='absolute border-0 shadow-2xl border-y-4 w-96 lg:w-3/5 lg:h-auto lg:py-4'>
				<div className='flex items-center justify-center w-full pt-4 pb-6'>
					<ModeToggle />
				</div>
				<CardHeader>
					<CardTitle className='text-5xl text-center'>
						<p>
							Foxx <span className='text-4xl'>🦊</span> Hunt
						</p>
					</CardTitle>
					<CardDescription className='pt-2 text-center'>
						A Bug Tracker
					</CardDescription>
				</CardHeader>
				<CardContent className='text-center'>
					<p>sign in</p>
					<div className='flex items-center w-full h-full py-5 justify-evenly'>
						<SignInButton Google />
						<SignInButton Github />
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
							<span className='px-2 bg-background text-muted-foreground'>
								Or
							</span>
						</div>
					</div>
					<p className='pt-4'>sign up</p>
					<div className='flex items-center w-full h-full py-5 justify-evenly'>
						<SignInButton Google />
						<SignInButton Github />
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
