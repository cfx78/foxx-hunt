'use client';

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

type DashboardBarGraphProps = {
	data: {
		name: string;
		LOW: number;
		MEDIUM: number;
		HIGH: number;
	}[];
};

const DashboardBarGraph = (props: DashboardBarGraphProps) => {
	return (
		<>
			<ResponsiveContainer
				width='80%'
				height='40%'
				className='mx-auto max-w-6xl  hidden lg:block '>
				<BarChart width={1000} height={1000} data={props.data}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='LOW' fill='#8e44d8' />
					<Bar dataKey='MEDIUM' fill='#19d' />
					<Bar dataKey='HIGH' fill='#82ca9d' />
				</BarChart>
			</ResponsiveContainer>
		</>
	);
};

export default DashboardBarGraph;
