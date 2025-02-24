import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";

const AirQualityChartComponent = ({
	data,
	sensorKeys,
	activeSensors,
	handleLegendClick,
	sensorTitles,
	colorPalette,
}) => {
	const sortedData = data.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

	return (
		<ResponsiveContainer width="100%" height={500}>
			<LineChart data={sortedData}>
				<XAxis
					dataKey="date"
					tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString("en-US", { timeZone: "UTC" })}
				/>
				<YAxis />
				<Tooltip content={<CustomTooltip activeSensors={activeSensors} sensorTitles={sensorTitles} />} />
				<Legend
					onClick={handleLegendClick}
					verticalAlign="bottom"
					align="center"
					wrapperStyle={{ cursor: "pointer" }}
				/>

				{sensorKeys.map((key, index) => (
					<Line
						key={key}
						type="monotone"
						dataKey={key}
						stroke={activeSensors.has(key) ? colorPalette[index % colorPalette.length] : "#D3D3D3"}
						strokeWidth={activeSensors.has(key) ? 2 : 1}
						name={sensorTitles[key] || key}
						dot={false}
					/>
				))}
			</LineChart>
		</ResponsiveContainer>
	);
};

export default AirQualityChartComponent;
