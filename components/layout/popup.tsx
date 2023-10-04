'use client';

import { useState } from 'react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '../ui/button';

import { Input } from '@nextui-org/react';

import { useRouter } from 'next/navigation';

import { signIn } from 'next-auth/react';

type Props = {
	title: string;
	description: string;
	trigger: any;
	registration?: boolean;
};

const Popup = (props: Props) => {
	const router = useRouter();

	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (props.registration) {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data }),
			});
			const user = await response.json();
			console.log(user);

			signIn('credentials', {
				...data,
				redirect: false,
			});

			router.push('/dashboard');
		} else {
			signIn('credentials', {
				...data,
				redirect: false,
			});
			router.push('/dashboard');
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='flex items-center justify-between w-40'>
					{props.trigger} <span className='pl-1'>{props.title}</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{props.title}</DialogTitle>
					<DialogDescription>{props.description}</DialogDescription>
				</DialogHeader>
				{props.title === 'Email' && (
					<div className='w-full h-full'>
						<form onSubmit={handleSubmit}>
							{props.registration && (
								<Input
									type='text'
									variant='underlined'
									label='Name'
									name='name'
									value={data.name}
									onChange={(e) =>
										setData({
											...data,
											name: e.target.value,
										})
									}
									className='max-w-xs'
								/>
							)}
							<Input
								type='email'
								variant='underlined'
								label='Email'
								name='email'
								value={data.email}
								isRequired
								onChange={(e) => {
									setData({ ...data, email: e.target.value });
								}}
							/>
							<Input
								isRequired
								type='password'
								variant='underlined'
								label='Password'
								name='password'
								value={data.password}
								onChange={(e) =>
									setData({
										...data,
										password: e.target.value,
									})
								}
							/>
							<Button
								className='w-full rounded-t-none'
								variant='ghost'>
								Submit
							</Button>
						</form>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default Popup;
