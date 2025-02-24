import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";

const FiltersSection = ({ filters, setFilters, sensorTitles, handleFilterChange, addFilter, removeFilter }) => {
	return (
		<Box mb={2}>
			{filters.map((filter, index) => (
				<Box key={index} display="flex" gap={2} mb={2}>
					<FormControl fullWidth>
						<InputLabel>Sensor</InputLabel>
						<Select value={filter.sensor} onChange={(e) => handleFilterChange(index, "sensor", e.target.value)}>
							{Object.entries(sensorTitles).map(([key, value]) => (
								<MenuItem key={key} value={key}>
									{value}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel>Operator</InputLabel>
						<Select value={filter.operator} onChange={(e) => handleFilterChange(index, "operator", e.target.value)}>
							{["gte", "lte", "gt", "lt"].map((operator) => (
								<MenuItem key={operator} value={operator}>
									{operator}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<TextField
						label="Value"
						type="number"
						value={filter.value}
						onChange={(e) => handleFilterChange(index, "value", e.target.value)}
						fullWidth
					/>

					<Button variant="contained" color="secondary" onClick={() => removeFilter(index)}>
						Remove
					</Button>
				</Box>
			))}

			<Button variant="contained" color="primary" onClick={addFilter}>
				Add Filter
			</Button>
		</Box>
	);
};

export default FiltersSection;
