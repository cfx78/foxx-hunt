'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

const Colors = ['#8e44d8', '#19d', '#82ca9d'];

type TicketsPieChartProps = {
	data: { name: string; value: number }[];
};

const TicketsPieChart = (props: TicketsPieChartProps) => {
	return (
		<PieChart width={400} height={300}>
			<Legend />
			<Pie
				data={props.data}
				dataKey='value'
				nameKey='name'
				cx='50%'
				cy='50%'
				label={true}
				outerRadius={80}>
				{props.data.map((entry, index) => (
					<Cell
						key={`cell-${index}`}
						fill={Colors[index % Colors.length]}
					/>
				))}
			</Pie>
		</PieChart>
	);
};

export default TicketsPieChart;
