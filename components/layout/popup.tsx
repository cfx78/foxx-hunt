import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { type } from 'os';
import { Button } from '../ui/button';

type Props = {
	title: string;
	description: string;
	trigger: any;
};

const popup = (props: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='flex justify-between w-40  items-center'>
					{props.trigger} <span className='pl-1'>{props.title}</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{props.title}</DialogTitle>
					<DialogDescription>{props.description}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default popup;
