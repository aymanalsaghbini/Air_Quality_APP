import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const axiosInstance = axios.create({
	baseURL: API_URL,
});

// Add an interceptor to include the token
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token"); // Retrieve the token from localStorage
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
