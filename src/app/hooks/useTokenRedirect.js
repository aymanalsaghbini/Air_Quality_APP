"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeToken, getRoleFromToken, isTokenExpired } from "@app/utils/tokenUtils";
import { useAuth } from "@app/context/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { UserConstant } from "@app/utils/constant";

export const useTokenRedirect = () => {
	const router = useRouter();
	const { logout } = useAuth();
	const [isTokenChecked, setIsTokenChecked] = useState(false); // Track token check status

	useEffect(() => {
		const token = localStorage.getItem("token");

		// If no token or invalid token, log out and redirect to login page
		if (!token) {
			logout();
			router.replace("/login"); // Immediately redirect
			return;
		}

		const userData = decodeToken(token);

		if (userData) {
			const isTokenExp = isTokenExpired(userData);
			if (isTokenExp) {
				logout();
				router.replace("/login"); // Immediately redirect after logout
				return;
			}

			const role = getRoleFromToken(userData);
			// Redirect based on the role
			switch (role) {
				case UserConstant.ADMIN:
					router.replace("/adminDashboard");
					break;
				case UserConstant.USER:
					router.replace("/userDashboard");
					break;
				default:
					router.replace("/login");
					break;
			}
		}

		// Set token checked status to true after processing
		setIsTokenChecked(true);
	}, [router, logout]);

	if (!isTokenChecked) {
		// Show loading screen while checking token
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw">
				<CircularProgress />
			</Box>
		);
	}

	// Return null when token has been checked
	return null;
};
