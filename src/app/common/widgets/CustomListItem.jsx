import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { drawerWidth } from "../components/Drawer";
import { useAuth } from "@app/context/AuthContext";

export const CustomListItem = ({ menuItem, isSelected, expand, setExpand, open }) => {
	const { user, logout } = useAuth();
	const theme = useTheme();
	const pathname = usePathname();
	const isAuthenticated = true;

	const handleClick = () => {
		if (menuItem.subMenu?.length > 0) {
			setExpand(!expand);
		} else if (menuItem.label === "Logout") {
			logout();
		}
	};

	return (
		<ListItem
			disablePadding
			sx={{
				borderRadius: "7px",
				marginBottom: 1.5,
				justifyContent: "center",
				display: !isAuthenticated && menuItem.label === "Logout" && "none",
			}}
		>
			<Link href={menuItem.subMenu?.length ? {} : menuItem.href} style={{ textDecoration: "none" }}>
				<ListItemButton
					sx={{
						width: open ? drawerWidth - 20 : `calc(${theme.spacing(6)} + 1px)`,
						borderRadius: "7px",
						backgroundColor: isSelected === menuItem.href && "#f6f6f6 !important",
					}}
					onClick={handleClick}
					selected={isSelected ? pathname.includes(menuItem.href) : false}
				>
					<ListItemIcon
						sx={{
							color: isSelected === menuItem.href && "black",
							fontSize: { xs: "12px", md: "14px" },
						}}
					>
						{menuItem.icon}
					</ListItemIcon>
					{open && (
						<>
							<ListItemText
								primary={menuItem.label}
								primaryTypographyProps={{
									fontSize: { xs: "12px", md: "14px" },
									fontWeight: isSelected === menuItem.href && 600,
									color: "black",
								}}
							/>
							{!!menuItem.subMenu?.length &&
								(expand ? (
									<ListItemIcon
										sx={{
											ml: 20,
											color: isSelected === menuItem.href && "black",
											fontSize: { xs: "12px", md: "14px" },
										}}
									>
										<ExpandLess />
									</ListItemIcon>
								) : (
									<ListItemIcon
										sx={{
											ml: 20,
											color: isSelected === menuItem.href && "black",
											fontSize: { xs: "12px", md: "14px" },
										}}
									>
										<ExpandMore />
									</ListItemIcon>
								))}
						</>
					)}
				</ListItemButton>
			</Link>
		</ListItem>
	);
};
