"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

export default function withAuth(Component) {
	return function ProtectedRoute(props) {
		const { user, loading, logout, token } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!token) {
				logout();
			}
		}, [user, router]);

		if (loading) {
			return (
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw">
					<CircularProgress />
				</Box>
			);
		}

		return user ? <Component {...props} /> : null;
	};
}
