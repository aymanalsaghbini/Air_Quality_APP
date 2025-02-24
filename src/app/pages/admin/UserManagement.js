"use client";

import { useEffect, useState } from "react";
import { fetchAllUsers, createNewUser, updateUserById, deleteUserById } from "./services/userService";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import { useAuth } from "../../context/AuthContext";
import { Typography, CircularProgress, Box, Paper, Alert, Divider } from "@mui/material";
import { UserConstant } from "@app/utils/constant";

const UserManagement = () => {
	const { user } = useAuth();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedUser, setSelectedUser] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (user?.role === UserConstant.ADMIN) {
			loadUsers();
		}
	}, [user]);

	const loadUsers = async () => {
		try {
			setLoading(true);
			const data = await fetchAllUsers();
			setUsers(data);
			setError(null);
		} catch (err) {
			setError(`Failed to load users: ${err.response.data.message}`);
		} finally {
			setLoading(false);
		}
	};

	const handleCreate = async (newUser) => {
		try {
			await createNewUser(newUser);
			await loadUsers();
		} catch (err) {
			setError(`Failed to create users: ${err.response.data.message}`);
		}
	};

	const handleUpdate = async (updatedUser) => {
		try {
			await updateUserById(updatedUser.id, updatedUser);
			await loadUsers();
		} catch (err) {
			setError(`Failed to update users: ${err.response.data.message}`);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteUserById(id);
			await loadUsers();
		} catch (err) {
			setError(`Failed to delete users: ${err.response.data.message}`);
		}
	};

	const resetForm = () => {
		setSelectedUser(null);
		setIsEditing(false);
	};

	return (
		<Box sx={{ p: 3 }}>
			{/* Loading Indicator */}
			{loading ? (
				<Box display="flex" justifyContent="center" alignItems="center" height="50vh">
					<CircularProgress size={60} />
				</Box>
			) : (
				<Paper sx={{ p: 4, boxShadow: 4, borderRadius: 3, bgcolor: "background.paper" }}>
					<Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
						User Management
					</Typography>

					{error && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					<Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
						Users List
					</Typography>
					<Box sx={{ mb: 3 }}>
						<UserTable
							users={users}
							onEdit={(user) => {
								setSelectedUser(user);
								setIsEditing(true);
							}}
							onDelete={handleDelete}
						/>
					</Box>

					{/* Divider for better separation */}
					<Box sx={{ my: 3 }}>
						<Divider />
					</Box>

					{/* User Form Section */}
					<Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
						{isEditing ? "Edit User" : "Create New User"}
					</Typography>
					<UserForm
						onSubmit={isEditing ? handleUpdate : handleCreate}
						initialData={selectedUser}
						onCancel={resetForm}
					/>
				</Paper>
			)}
		</Box>
	);
};

export default UserManagement;
