"use client";

import { Box, Button } from "@mui/material";
import React from "react";
import ErrorGif from "../assets/gifs/urban-line-305.gif";
import Image from "next/image";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI

		return { hasError: true };
	}
	componentDidCatch(error, errorInfo) {
		// You can use your own error logging service here
		console.log({ error, errorInfo });
	}

	handleClick = () => {
		this.setState({ hasError: false });
		location.replace("/");
	};

	render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
						justifyContent: "center",
						alignItems: "center",
						gap: 5,
					}}
				>
					<Image src={ErrorGif} alt="error-animation" />
					<h2>Oops, something went wrong!</h2>
					<Button variant="contained" type="button" onClick={this.handleClick}>
						Take me home!
					</Button>
				</Box>
			);
		}

		// Return children components in case of no error

		return this.props.children;
	}
}

export default ErrorBoundary;
