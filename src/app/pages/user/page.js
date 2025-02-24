import AirQualityChart from "@app/pages/airQuality/AirQualityChartPage";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const UserPage = () => {
	return (
		<Container>
			<Box my={4}>
				<Typography variant="h4" gutterBottom>
					Air Quality Report
				</Typography>
				<Box sx={{ mb: 3 }}>
					<AirQualityChart />;
				</Box>
			</Box>
		</Container>
	);
};

export default UserPage;
