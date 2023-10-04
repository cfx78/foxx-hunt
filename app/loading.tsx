'use client';
import { Spinner } from '@nextui-org/react';

const Loading = () => {
	return (
		<div className='grid w-screen h-screen place-content-center'>
			<Spinner label='Loading...' />
		</div>
	);
};

export default Loading;
