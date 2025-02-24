"use client";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const UserTable = ({ users, onEdit, onDelete }) => {
	return (
		<TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
			<Table aria-label="user table">
				<TableHead>
					<TableRow sx={{ backgroundColor: "#f4f4f4" }}>
						<TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
						<TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user, index) => (
						<TableRow key={user.id} sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell sx={{ textAlign: "right", whiteSpace: "nowrap" }}>
								<Button
									variant="contained"
									color="primary"
									size="small"
									sx={{ marginRight: 1, minWidth: 80 }}
									onClick={() => onEdit(user)}
								>
									Edit
								</Button>
								<Button
									variant="outlined"
									color="error"
									size="small"
									sx={{ minWidth: 80 }}
									onClick={() => onDelete(user.id)}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default UserTable;
