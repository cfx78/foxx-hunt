import './styles.modules.css';
import ModeToggle from '@/components/layout/darkmode';
import Popup from '@/components/layout/popup';
import { PiEnvelopeSimpleThin } from 'react-icons/pi';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import SignInButton from '@/components/layout/SignInButton';

export default async function Home() {
	return (
		<main>
			<Card className='main-card'>
				<div className='toggle-theme'>
					<ModeToggle />
				</div>
				<CardHeader>
					<CardTitle className=' main-card-title'>
						<p>
							Foxx
							<span className='p-3 text-2xl lg:text-4xl'>🦊</span>
							Hunt
						</p>
					</CardTitle>
					<CardDescription className='pt-2 text-center'>
						A Bug Tracker
					</CardDescription>
				</CardHeader>
				<CardContent className='text-center'>
					<p>sign in</p>
					<div className='flex items-center w-full h-full gap-2 py-5 justify-evenly'>
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
					<div className='flex items-center w-full h-full gap-2 py-5 justify-evenly'>
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
					<CardFooter className='flex items-center w-full h-full gap-4 py-5 justify-evenly'>
						<SignInButton UserDemo />
						<SignInButton AdminDemo />
					</CardFooter>
				</CardContent>
			</Card>
		</main>
	);
}
