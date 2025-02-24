"use client";

import { Typography } from "@mui/material";

const UnauthorizedMessage = () => {
	const message = "Unauthorized - You don't have access to this content.";
	return (
		<Typography variant="h6" sx={{ m: 3 }}>
			{message}
		</Typography>
	);
};

export default UnauthorizedMessage;
