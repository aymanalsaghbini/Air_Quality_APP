"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import Sidebar from "./common/layout/Sidebar";
import ErrorBoundary from "./common/widgets/ErrorBoundary";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Grid from "@mui/material/Grid";
import theme from "./common/styles/theme";

export default function RootLayout({ children }) {
	const [open, setOpen] = useState(false);

	return (
		<ErrorBoundary>
			<AuthProvider>
				<html lang="en">
					<body>
						<Grid container sx={{ display: "flex", flexGrow: 1 }}>
							<AuthContent open={open} setOpen={setOpen} children={children} />
						</Grid>
					</body>
				</html>
			</AuthProvider>
		</ErrorBoundary>
	);
}

const AuthContent = ({ open, setOpen, children }) => {
	const { user } = useAuth(); // Access user from the Auth context

	return (
		<>
			{/* Render Sidebar only if user is authenticated */}
			{user && <Sidebar open={open} setOpen={setOpen} />}
			<Grid item xs sx={{ width: "100%", height: "100%" }}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</Grid>
		</>
	);
};
