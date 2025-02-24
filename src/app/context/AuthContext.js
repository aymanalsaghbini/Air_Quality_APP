"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../services/axiosInstance";
import { decodeToken, getRoleFromToken, isTokenExpired } from "@app/utils/tokenUtils";
import { UserConstant } from "@app/utils/constant";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null; // Check if window is defined

	useEffect(() => {
		if (!token) {
			logout();
		}

		if (token) {
			const userData = decodeToken(token);
			if (userData) {
				setUser(userData);
				const isTokenExp = isTokenExpired(userData);
				if (isTokenExp === true) {
					logout();
				}
			}
		}
		setLoading(false);
	}, []);

	const login = async (email, password) => {
		try {
			const res = await axiosInstance.post("/auth/login", {
				email,
				password,
			});

			const { access_token } = res.data;
			// Store the token securely in localStorage
			localStorage.setItem("token", access_token);

			// Decode token to get user data
			const userData = decodeToken(access_token);
			if (userData) {
				setUser(userData); // Set entire payload for user context
				const role = getRoleFromToken(userData);
				router.push(role === UserConstant.ADMIN ? "/adminDashboard" : "/userDashboard");
			}
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	};

	const logout = () => {
		// Remove the token from localStorage
		localStorage.removeItem("token");

		// Redirect to login page first
		router.push("/login");

		// Update state to reflect the logout
		setUser(null);
		setLoading(false);
	};

	return <AuthContext.Provider value={{ user, login, logout, loading, token }}>{children}</AuthContext.Provider>;
};
