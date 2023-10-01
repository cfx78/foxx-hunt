'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@nextui-org/react';
import { useState } from 'react';

const RegistrationPage = () => {
	const router = useRouter();
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const response = await fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data }),
		});
		const user = await response.json();
		console.log(user);
		router.push('/');
	};
	return (
		<form onSubmit={handleSubmit}>
			<Input
				type='text'
				variant='underlined'
				label='Name'
				name='name'
				value={data.name}
				onChange={(e) => setData({ ...data, name: e.target.value })}
				className='max-w-xs'
			/>
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
			<Button className='w-full rounded-t-none' variant='ghost'>
				Submit
			</Button>
		</form>
	);
};

export default RegistrationPage;
