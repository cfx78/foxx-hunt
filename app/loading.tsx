'use client';
import { Spinner } from '@nextui-org/react';

const Loading = () => {
	return (
		<div className='w-screen h-screen grid place-content-center'>
			<Spinner label='Loading...' />
		</div>
	);
};

export default Loading;
