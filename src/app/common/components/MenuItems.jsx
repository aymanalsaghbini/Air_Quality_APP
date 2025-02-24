import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Logout } from "@mui/icons-material";
import { UserConstant } from "@app/utils/constant";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const SideBarMenuItems = [
	{
		label: "User Dashboard",
		href: "/",
		icon: <DashboardOutlinedIcon />,
		subMenu: [],
		accessibleTo: [UserConstant.ADMIN, UserConstant.USER],
	},
	{
		label: "Upload Air Data",
		href: "/adminDashboard/upload",
		icon: <CloudUploadIcon />,
		subMenu: [],
		accessibleTo: [UserConstant.ADMIN],
	},
	{
		label: "Air Quality",
		href: "/userDashboard",
		icon: <SsidChartIcon />,
		subMenu: [],
		accessibleTo: [UserConstant.ADMIN],
	},

	{
		label: "Settings",
		icon: <SettingsOutlinedIcon />,
		subMenu: [
			{
				label: "Logout",
				href: "#",
				icon: <Logout />,
			},
		],
		accessibleTo: [UserConstant.ADMIN, UserConstant.USER],
	},
];
