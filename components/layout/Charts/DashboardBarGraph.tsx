'use client';

import {
	BarChart,
	Bar,
	Cell,
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
			<ResponsiveContainer width='80%' height='100%'>
				<BarChart
					width={700}
					height={500}
					data={props.data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}>
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
