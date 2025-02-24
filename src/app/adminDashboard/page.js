"use client";

import UserManagement from "../pages/admin/UserManagement";
import { Typography, Container, Box } from "@mui/material";
import { useAuth } from "@app/context/AuthContext";
import UnauthorizedMessage from "@app/common/components/UnauthorizedMessage";
import { UserConstant } from "@app/utils/constant";
import withAuth from "@app/hooks/withAuth";

const AdminDashboard = () => {
	const { user } = useAuth();
	if (user && user?.role !== UserConstant.ADMIN) {
		return <UnauthorizedMessage />;
	}

	return (
		<Container>
			<Box my={4}>
				<Typography variant="h4" gutterBottom>
					Admin Dashboard
				</Typography>
				<Box sx={{ mb: 3 }}>
					<UserManagement />
				</Box>
			</Box>
		</Container>
	);
};

export default withAuth(AdminDashboard);
