import axiosInstance from "@app/services/axiosInstance";

export const getAirQualityData = async (startDate, endDate, filters = []) => {
	try {
		// Filter out invalid filters where sensor or value is empty/null
		const validFilters = filters.filter(({ sensor, value }) => sensor && value !== "" && value !== null);

		// Convert valid filters into query string format
		const filterString = validFilters.map(({ sensor, operator, value }) => `${sensor}:${operator}:${value}`).join(",");

		const params = { startDate, endDate };
		if (filterString) {
			params.filters = filterString;
		}

		const response = await axiosInstance.get("/air-quality/data", { params });
		return response.data; // Expecting an array of air quality data
	} catch (error) {
		console.error("Error fetching air quality data:", error);
		throw error;
	}
};

export const uploadAirData = async (formData) => {
	try {
		const response = await axiosInstance.post(`/air-quality/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data.message;
	} catch (error) {
		throw error;
	}
};
