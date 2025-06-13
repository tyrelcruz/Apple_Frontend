import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as ReportsIcon,
  Article as ArticleIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const Drawer = () => {
  const location = useLocation();
  const { userType } = useAuth();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    // Only show Users tab for admin
    ...(userType === "admin"
      ? [
          {
            text: "Users",
            icon: <PeopleIcon />,
            path: "/dashboard/users",
          },
        ]
      : []),
    {
      text: "Articles",
      icon: <ArticleIcon />,
      path: "/dashboard/articles",
    },
    {
      text: "Reports",
      icon: <ReportsIcon />,
      path: "/dashboard/reports",
    },
  ];

  return (
    <List component="nav">
      {menuItems.map((item) => (
        <ListItemButton
          key={item.text}
          component={Link}
          to={item.path}
          selected={location.pathname === item.path}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(25, 118, 210, 0.08)",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.12)",
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      {/* Add more items or sections here if needed */}
    </List>
  );
};

export default Drawer;
