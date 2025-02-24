"use client";
import { Typography, Button, TextField, CircularProgress, Alert, Paper, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DataGrid } from "@mui/x-data-grid";
import withAuth from "@app/hooks/withAuth";
import { AirQualityConstant } from "@app/utils/constant";
import useUploadAirData from "./hooks/useUploadAirData";

const UploadAirDataFile = () => {
	const { file, error, message, loading, uploadedData, handleFileChange, handleUpload } = useUploadAirData();
	const columns = [
		{
			field: "date",
			headerName: "Date",
			width: 150,
			renderCell: (params) => new Date(params.value).toISOString().split("T")[0],
		},
		...AirQualityConstant.UPLOADED_GRID_COLUMN,
	];

	return (
		<Box p={4}>
			<Typography variant="h4" gutterBottom>
				Upload Air Quality CSV
			</Typography>
			<Box sx={{ p: 5 }}>
				<Paper sx={{ p: 4, boxShadow: 4, borderRadius: 3, bgcolor: "background.paper" }}>
					<Typography variant="h5" gutterBottom>
						Upload Air Quality CSV
					</Typography>

					<TextField
						type="file"
						inputProps={{ accept: ".csv" }}
						onChange={handleFileChange}
						fullWidth
						variant="outlined"
					/>

					{error && (
						<Alert severity="error" sx={{ mt: 2 }}>
							{error}
						</Alert>
					)}
					{message && (
						<Alert severity="success" sx={{ mt: 2 }}>
							{message}
						</Alert>
					)}

					<Button
						variant="contained"
						startIcon={<CloudUploadIcon />}
						sx={{ mt: 2 }}
						onClick={handleUpload}
						disabled={!file || loading}
					>
						{loading ? <CircularProgress size={24} /> : "Upload"}
					</Button>

					{uploadedData.length > 0 && (
						<Box component={Paper} sx={{ marginTop: 4, overflow: "auto", width: "100%", maxWidth: "80rem" }}>
							<DataGrid
								getRowId={(row) => row.date}
								rows={uploadedData}
								columns={columns}
								pageSize={50}
								disableSelectionOnClick
							/>
						</Box>
					)}
				</Paper>
			</Box>
		</Box>
	);
};
export default withAuth(UploadAirDataFile);
