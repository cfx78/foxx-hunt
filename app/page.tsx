import Image from 'next/image';
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

import {
	PiGoogleLogoThin,
	PiGithubLogoThin,
	PiEnvelopeSimpleThin,
} from 'react-icons/pi';

export default function Home() {
	return (
		<main className='w-screen h-screen flex flex-col items-center justify-center p-4 relative'>
			<Card className='absolute border-4 w-96 lg:w-2/5 lg:h-auto'>
				<div className='flex items-center justify-center w-full pt-4 '>
					<ModeToggle />
				</div>
				<CardHeader>
					<CardTitle className='text-center text-5xl'>
						<p>Welcome To Foxx Hunt</p>
					</CardTitle>
					<CardDescription className='text-center pt-2'>
						My Version of A Bug Tracker
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
							description='This would be a email sign in'
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
					<div className='flex h-full items-center justify-around py-5 flow'>
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
							description='This would be a email sign up'
						/>
					</div>
				</CardContent>
				<CardFooter>
					<p className='w-full  text-center text-4xl'>🦊</p>
				</CardFooter>
			</Card>
		</main>
	);
}
