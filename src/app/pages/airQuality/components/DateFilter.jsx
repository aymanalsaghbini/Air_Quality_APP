import { Box, TextField, Button } from "@mui/material";

const DateFilter = ({ startDate, endDate, setStartDate, setEndDate, handleApplyFilters }) => {
	return (
		<Box display="flex" gap={2} mb={2}>
			<TextField
				label="Start Date"
				type="date"
				InputLabelProps={{ shrink: true }}
				value={startDate}
				onChange={(e) => setStartDate(e.target.value)}
			/>
			<TextField
				label="End Date"
				type="date"
				InputLabelProps={{ shrink: true }}
				value={endDate}
				onChange={(e) => setEndDate(e.target.value)}
			/>
			<Button variant="contained" color="primary" onClick={handleApplyFilters}>
				Apply Filters
			</Button>
		</Box>
	);
};

export default DateFilter;
