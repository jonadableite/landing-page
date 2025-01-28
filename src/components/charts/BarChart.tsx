// src/components/charts/BarChart.tsx
import {
	Bar,
	BarChart as RechartsBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts";

const data = [
	{ name: "Jan", value: 400 },
	{ name: "Fev", value: 300 },
	{ name: "Mar", value: 600 },
	{ name: "Abr", value: 800 },
	{ name: "Mai", value: 500 },
];

export const BarChart = () => (
	<ResponsiveContainer width="100%" height={300}>
		<RechartsBarChart data={data}>
			<XAxis dataKey="name" stroke="#888888" />
			<Tooltip
				cursor={{ fill: "rgba(100, 100, 100, 0.2)" }}
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

			<Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
			<defs>
				<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#25D366" />
					<stop offset="100%" stopColor="#128C7E" />
				</linearGradient>
			</defs>
		</RechartsBarChart>
	</ResponsiveContainer>
);
