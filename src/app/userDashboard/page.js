"use client";

import withAuth from "@app/hooks/withAuth";
import UserPage from "@app/pages/user/page";

function DashboardPage() {
	return <UserPage />;
}

export default withAuth(DashboardPage);
