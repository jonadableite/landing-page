// src/components/charts/PieChart.tsx
import {
	Cell,
	Pie,
	PieChart as RechartsPieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const data = [
	{ name: "Leads", value: 400 },
	{ name: "Conversões", value: 300 },
	{ name: "Vendas", value: 300 },
];

const COLORS = ["#25D366", "#34B7F1", "#075E54"];

export const PieChart = () => (
	<ResponsiveContainer width="100%" height={300}>
		<RechartsPieChart>
			<Pie
				data={data}
				innerRadius={60}
				outerRadius={80}
				paddingAngle={5}
				dataKey="value"
			>
				{data.map((_, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Tooltip
				contentStyle={{
					background: "rgba(255, 255, 255, 0.419)",
					color: "#FFFFFF",
					border: "1px solid #333",
					borderRadius: "8px",
				}}
				labelStyle={{
					color: "#FFFFFF",
					fontWeight: "bold",
				}}
			/>
		</RechartsPieChart>
	</ResponsiveContainer>
);
