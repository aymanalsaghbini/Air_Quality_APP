import { useState } from "react";

const useFilters = () => {
	const [filters, setFilters] = useState([]);

	const handleFilterChange = (index, key, value) => {
		const updatedFilters = [...filters];
		updatedFilters[index][key] = value;
		setFilters(updatedFilters);
	};

	const addFilter = () => setFilters([...filters, { sensor: "", operator: "gte", value: "" }]);

	const removeFilter = (index) => setFilters(filters.filter((_, i) => i !== index));

	return { filters, setFilters, handleFilterChange, addFilter, removeFilter };
};

export default useFilters;
