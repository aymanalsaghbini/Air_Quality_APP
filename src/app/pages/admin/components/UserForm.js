"use client";
import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import { UserConstant } from "@app/utils/constant";

// Define the initial form data structure
const initialFormData = {
	email: "",
	password: "",
	role: UserConstant.USER,
};

const UserForm = ({ onSubmit, initialData, onCancel }) => {
	const [formData, setFormData] = useState(initialFormData);

	// Set initial data when editing
	useEffect(() => {
		if (initialData) {
			setFormData({ ...initialData, password: "" }); // Exclude password for security
		}
	}, [initialData]);

	// Handle form field changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		const submitData = { ...formData };

		// Remove empty password field when updating
		if (!submitData.password) {
			delete submitData.password;
		}

		onSubmit(submitData);
		resetForm(); // Reset the form after submission
	};

	// Reset form to initial state
	const resetForm = () => {
		setFormData(initialFormData);
		if (onCancel) onCancel(); // Callback for cancel event
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}
		>
			{/* Email Input */}
			<TextField
				label="Email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				fullWidth
				required
				margin="normal"
				type="email"
			/>

			{/* Show password field only when creating a new user */}
			{!initialData && (
				<TextField
					label="Password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					fullWidth
					required
					margin="normal"
					type="password"
				/>
			)}

			{/* Role Selection */}
			<FormControl fullWidth required margin="normal">
				<InputLabel>Role</InputLabel>
				<Select name="role" value={formData.role} onChange={handleChange}>
					<MenuItem value={UserConstant.USER}>User</MenuItem>
					<MenuItem value={UserConstant.ADMIN}>Admin</MenuItem>
				</Select>
			</FormControl>

			{/* Action Buttons */}
			<Box mt={2}>
				<Button variant="contained" color="primary" type="submit" fullWidth sx={{ mb: 1 }}>
					{initialData ? "Update" : "Create"}
				</Button>
				{initialData && (
					<Button variant="outlined" color="secondary" onClick={resetForm} fullWidth>
						Cancel
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default UserForm;
