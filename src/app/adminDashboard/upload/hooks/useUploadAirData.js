import { useState } from "react";
import { uploadAirData } from "@app/pages/airQuality/services/airQualityService";

const useUploadAirData = () => {
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [uploadedData, setUploadedData] = useState([]);

	const handleFileChange = (event) => {
		setError(null);
		setMessage(null);

		const selectedFile = event.target.files?.[0];

		if (!selectedFile) {
			setError("Please select a file.");
			return;
		}

		if (selectedFile.type !== "text/csv") {
			setError("Invalid file type. Only CSV files are allowed.");
			return;
		}

		setFile(selectedFile);
	};

	const handleUpload = async () => {
		if (!file) {
			setError("No file selected.");
			return;
		}

		setLoading(true);
		setError(null);
		setMessage(null);
		setUploadedData([]);

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await uploadAirData(formData);
			const { message, data } = response || {};

			if (message) {
				setMessage(message);
			}

			if (message?.includes("CSV file processed successfully") && Array.isArray(data)) {
				setUploadedData(data);
			} else {
				setError("Error: Data was not processed properly.");
			}

			setFile(null);
		} catch (error) {
			const errorMessage = error.response?.data?.message || "File upload failed due to an unknown error.";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return {
		file,
		error,
		message,
		loading,
		uploadedData,
		handleFileChange,
		handleUpload,
	};
};

export default useUploadAirData;
