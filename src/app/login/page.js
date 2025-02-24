"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Container, Box, Typography, CircularProgress } from "@mui/material";
import ai from "@app/common/assets/logos/ai.svg";
import Image from "next/image";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await login(email, password); // Login will handle redirection
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 8,
					p: 3,
					boxShadow: 3,
					borderRadius: 2,
					backgroundColor: "white",
				}}
			>
				<Image src={ai} width={120} height={100} alt="AI-Logo" />
				<Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
					Open Innovation AI
				</Typography>

				<form onSubmit={handleSubmit} style={{ width: "100%" }}>
					<TextField
						label="Email"
						type="email"
						variant="outlined"
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						sx={{ mb: 2 }}
						inputProps={{ autoComplete: "email" }}
					/>
					<TextField
						label="Password"
						type="password"
						variant="outlined"
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						sx={{ mb: 2 }}
					/>
					<Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1 }} disabled={loading}>
						{loading ? <CircularProgress size={24} color="secondary" /> : "Login"}
					</Button>
					{error && (
						<Typography variant="body2" color="error" sx={{ mt: 2 }}>
							{error}
						</Typography>
					)}
				</form>
			</Box>
		</Container>
	);
}
