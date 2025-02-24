import { useState, useEffect } from "react";
import { getAirQualityData } from "../services/airQualityService";

const useAirQualityData = (startDate, endDate, filters) => {
	const [data, setData] = useState([]);
	const [sensorKeys, setSensorKeys] = useState([]);
	const [activeSensors, setActiveSensors] = useState(new Set());

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getAirQualityData(startDate, endDate, filters);
				if (result.length > 0) {
					const keys = Object.keys(result[0]).filter((key) => key !== "id" && key !== "date" && key !== "time");
					setSensorKeys(keys);
					setActiveSensors(new Set(keys));
				}
				setData(result);
			} catch (error) {
				console.error("Error fetching data", error);
			}
		};

		fetchData();
	}, [startDate, endDate, filters]);

	return { data, sensorKeys, activeSensors, setActiveSensors };
};

export default useAirQualityData;
