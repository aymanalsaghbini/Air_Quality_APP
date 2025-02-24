import axiosInstance from "../../../services/axiosInstance";

// Fetch all users
export const fetchAllUsers = async () => {
	const response = await axiosInstance.get("/users");
	return response.data;
};

// Fetch a user by ID
export const fetchUserById = async (id) => {
	const response = await axiosInstance.get(`/users/${id}`);
	return response.data;
};

// Create a new user
export const createNewUser = async (userData) => {
	const response = await axiosInstance.post("/users", userData);
	return response.data;
};

// Update a user by ID
export const updateUserById = async (id, updateData) => {
	delete updateData.id;
	const response = await axiosInstance.put(`/users/${id}`, updateData);
	return response.data;
};

// Delete a user by ID
export const deleteUserById = async (id) => {
	const response = await axiosInstance.delete(`/users/${id}`);
	return response.data;
};
