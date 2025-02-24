import { Box, Typography } from "@mui/material";

const CustomTooltip = ({ active, payload, label, activeSensors, sensorTitles }) => {
	if (active && payload) {
		const filteredPayload = payload.filter((entry) => activeSensors.has(entry.dataKey));

		if (filteredPayload.length === 0) return null;

		return (
			<Box sx={{ background: "#fff", padding: 1, border: "1px solid #ccc", borderRadius: 4 }}>
				<Typography variant="subtitle2">
					{new Date(label).toLocaleString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
						timeZone: "UTC",
					})}
				</Typography>
				{filteredPayload.map((entry, index) => (
					<Typography key={index} variant="body2" color={entry.color}>
						{sensorTitles[entry.dataKey]}: {entry.value}
					</Typography>
				))}
			</Box>
		);
	}
	return null;
};

export default CustomTooltip;
