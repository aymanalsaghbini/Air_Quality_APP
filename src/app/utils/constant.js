export const UserConstant = {
	ADMIN: "ADMIN",
	USER: "USER",
};

export const AirQualityConstant = {
	SENSORS_TITLE: {
		co_gt: "CO(GT)",
		pt08_s1_co: "PT08.S1(CO)",
		nmhc_gt: "NMHC(GT)",
		c6h6_gt: "C6H6(GT)",
		pt08_s2_nmhc: "PT08.S2(NMHC)",
		nox_gt: "NOx(GT)",
		pt08_s3_nox: "PT08.S3(NOx)",
		no2_gt: "NO2(GT)",
		pt08_s4_no2: "PT08.S4(NO2)",
		pt08_s5_o3: "PT08.S5(O3)",
		t: "Temperature (T)",
		rh: "Relative Humidity (RH)",
		ah: "Absolute Humidity (AH)",
	},

	COLOR_PALETTE: [
		"#8884d8",
		"#82ca9d",
		"#ff7300",
		"#ffbb28",
		"#ff3333",
		"#00C49F",
		"#0088FE",
		"#D2691E",
		"#BA55D3",
		"#4682B4",
		"#CD5C5C",
		"#32CD32",
	],

	UPLOADED_GRID_COLUMN: [
		{ field: "time", headerName: "Time", width: 130 },
		{ field: "co_gt", headerName: "CO(GT)", width: 120 },
		{ field: "pt08_s1_co", headerName: "PT08.S1(CO)", width: 150 },
		{ field: "nmhc_gt", headerName: "NMHC(GT)", width: 120 },
		{ field: "c6h6_gt", headerName: "C6H6(GT)", width: 120 },
		{ field: "pt08_s2_nmhc", headerName: "PT08.S2(NMHC)", width: 150 },
		{ field: "nox_gt", headerName: "NOx(GT)", width: 120 },
		{ field: "pt08_s3_nox", headerName: "PT08.S3(NOx)", width: 150 },
		{ field: "no2_gt", headerName: "NO2(GT)", width: 120 },
		{ field: "pt08_s4_no2", headerName: "PT08.S4(NO2)", width: 150 },
		{ field: "pt08_s5_o3", headerName: "PT08.S5(O3)", width: 150 },
		{ field: "t", headerName: "T", width: 100 },
		{ field: "rh", headerName: "RH", width: 100 },
		{ field: "ah", headerName: "AH", width: 100 },
	],
};
