"use client";
import { Box, Grid, List, ListItem } from "@mui/material";
import React from "react";
import Image from "next/image";
import ai from "../assets/logos/ai.svg";
import aibig from "../assets/logos/ai-big.png";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Menu, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import { SideBarMenuItems } from "../components/MenuItems";
import { Drawer } from "../components/Drawer";
import { DrawerHeader } from "../components/DrawerHeader";
import { CustomListItem } from "../widgets";
import { useAuth } from "@app/context/AuthContext";

const Sidebar = ({ open, setOpen }) => {
	const pathname = usePathname();
	const [isSelected, setIsSelected] = useState("");
	const [expand, setExpand] = useState(true);

	const { user } = useAuth();

	// Filter items based on the user's role
	const getFilteredMenuItems = () => {
		if (!user) return []; // If no user, return empty array
		const role = user?.role; // Get the user's role
		return SideBarMenuItems.filter(
			(menuItem) => !menuItem.accessibleTo || menuItem.accessibleTo.includes(role) // Filter by role
		);
	};

	const filteredMenuItems = getFilteredMenuItems();

	useEffect(() => {
		setIsSelected(pathname);
	}, [pathname]);

	const theme = useTheme();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Grid xs="auto" item>
			<Drawer
				variant="permanent"
				open={open}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					"& .MuiDrawer-paper": {
						height: "auto",
						bottom: 0,
						boxShadow: 0,
						border: 0,
						backgroundColor: "#fefefe",
						backgroundImage: "linear-gradient(to bottom, #fff 40%, rgba(231, 231, 231) 10%)",
						backgroundPosition: "right",
						backgroundSize: "1px 10px",
						backgroundRepeat: "repeat-y",
					},
				}}
			>
				<DrawerHeader>
					{open ? (
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
						</IconButton>
					) : (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								...(open && { display: "none" }),
							}}
						>
							<Menu />
						</IconButton>
					)}
				</DrawerHeader>
				<List
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<ListItem sx={{ py: "15px" }}>
						{open ? (
							<Box
								sx={{
									width: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Image src={aibig} width={200} height={40} alt="AI-big-Logo" />
							</Box>
						) : (
							<Image src={ai} width={40} alt="AI-Logo" />
						)}
					</ListItem>
					{/* Add URL for any sub pages you want to create in the dashboard directory */}
					{filteredMenuItems.map((menuItem, index) => {
						return (
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
								key={index}
							>
								<CustomListItem
									menuItem={menuItem}
									isSelected={isSelected}
									expand={expand}
									setExpand={setExpand}
									open={open}
								/>
								{!!menuItem.subMenu.length &&
									menuItem.subMenu.map((item, index) => (
										<Collapse key={index} in={expand} timeout="auto" unmountOnExit>
											<List
												component="div"
												disablePadding
												sx={
													{
														// display: menuItem.accessibleTo.includes(userInfo?.role) ? "block" : "none",
													}
												}
											>
												<CustomListItem
													menuItem={item}
													isSelected={isSelected}
													expand={expand}
													setExpand={setExpand}
													open={open}
												/>
											</List>
										</Collapse>
									))}
							</Box>
						);
					})}
				</List>
			</Drawer>
		</Grid>
	);
};

export default Sidebar;
