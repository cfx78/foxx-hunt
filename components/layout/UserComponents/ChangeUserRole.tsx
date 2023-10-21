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
import { Button } from '../../ui/button';

type Props = {
	userId: string;
	userRole: string;
	userName: string | undefined | null;
	userEmail: string;
};

const AcceptTicketButton = (props: Props) => {
	const [update, setUpdate] = useState({
		userId: props.userId,
		userRole: props.userRole,
	});
	const [isUpdated, setIsUpdated] = useState(false);

	const updateRole = () => {
		if (props.userRole === 'ADMIN') {
			setUpdate({ userId: props.userId, userRole: 'USER' });
		} else {
			setUpdate({ userId: props.userId, userRole: 'ADMIN' });
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		updateRole();

		await fetch('/api/updateRole', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ update }),
		});

		setIsUpdated(true);
		setTimeout(() => {
			setIsUpdated(false);
		}, 3000);

		setTimeout(() => {
			window.location.reload();
		}, 3000);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='w-40 px-4 py-2 text-center border-2 rounded-lg bg-accent text-accent-foreground border-accent-foreground hover:bg-accent-foreground hover:text-accent hover:border-accent transition ease-in-out'
					onClick={updateRole}>
					<span className='text-center w-full'>
						{props.userRole === 'ADMIN'
							? 'Revoke Admin'
							: 'Grant Admin'}
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center text-warning'>
						{props.userRole === 'ADMIN'
							? 'Warning, you are about to revoke administrative privileges'
							: 'Warning, you are about to grant administrative privileges'}
					</DialogTitle>
					<DialogDescription>
						{props.userRole === 'ADMIN'
							? 'Are you sure you want to revoke administrative privileges from'
							: 'Are you sure you want to grant administrative privileges to'}{' '}
						{props.userName !== undefined || null || ''
							? props.userName
							: props.userEmail}
					</DialogDescription>
				</DialogHeader>

				<Button
					className='w-full rounded-t-none'
					type='submit'
					variant='ghost'
					onClick={handleSubmit}>
					Update
				</Button>
				{isUpdated && (
					<div className='w-full h-full text-success'>
						<p className='text-center text-lg font-bold'>
							Administrative Privileges Updated
						</p>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default AcceptTicketButton;
