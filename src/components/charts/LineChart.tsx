// src/components/charts/LineChart.tsx
import {
	Line,
	LineChart as RechartsLineChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const data = [
	{ name: "Jan", value: 240 },
	{ name: "Fev", value: 139 },
	{ name: "Mar", value: 980 },
	{ name: "Abr", value: 390 },
	{ name: "Mai", value: 480 },
];

export const LineChart = () => (
	<ResponsiveContainer width="100%" height={300}>
		<RechartsLineChart data={data}>
			<Tooltip
				contentStyle={{
					background: "rgba(0, 0, 0, 0.8)",
					color: "#FFFFFF",
					border: "1px solid #333",
					borderRadius: "8px",
				}}
				labelStyle={{
					color: "#FFFFFF",
					fontWeight: "bold",
				}}
			/>

			<Line
				type="monotone"
				dataKey="value"
				stroke="#25D366"
				strokeWidth={2}
				dot={{ fill: "#25D366" }}
			/>
		</RechartsLineChart>
	</ResponsiveContainer>
);
