"use client";
import React, { useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import DateFilter from "./components/DateFilter";
import FiltersSection from "./components/FiltersSection";
import AirQualityChartComponent from "./components/AirQualityChartComponent";
import { AirQualityConstant } from "@app/utils/constant";
import useAirQualityData from "./hooks/useAirQualityData";
import useFilters from "./hooks/useFilters";

const AirQualityChart = () => {
	const [startDate, setStartDate] = useState("2004-03-01");
	const [endDate, setEndDate] = useState("2004-03-11");
	const { filters, setFilters, handleFilterChange, addFilter, removeFilter } = useFilters();
	const { data, sensorKeys, activeSensors, setActiveSensors } = useAirQualityData(startDate, endDate, filters);

	const sensorTitles = AirQualityConstant.SENSORS_TITLE;
	const colorPalette = AirQualityConstant.COLOR_PALETTE;

	const handleApplyFilters = () => {
		if (filters.length > 0 || startDate || endDate) {
			// Fetching happens automatically due to the useEffect inside useAirQualityData
		}
	};

	const handleLegendClick = (event) => {
		const sensorKey = event.dataKey;
		const newActiveSensors = new Set(activeSensors);
		newActiveSensors.has(sensorKey) ? newActiveSensors.delete(sensorKey) : newActiveSensors.add(sensorKey);
		setActiveSensors(newActiveSensors);
	};

	return (
		<Container>
			<Paper sx={{ p: 4, boxShadow: 4, borderRadius: 3 }}>
				<Typography variant="h4" gutterBottom>
					Air Quality Data Visualization
				</Typography>
				<DateFilter {...{ startDate, endDate, setStartDate, setEndDate, handleApplyFilters }} />
				<FiltersSection {...{ filters, setFilters, sensorTitles, handleFilterChange, addFilter, removeFilter }} />
				<AirQualityChartComponent
					{...{ data, sensorKeys, activeSensors, handleLegendClick, sensorTitles, colorPalette }}
				/>
			</Paper>
		</Container>
	);
};

export default AirQualityChart;
