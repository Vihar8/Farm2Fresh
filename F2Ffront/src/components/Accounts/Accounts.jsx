import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState,useContext } from "react";
import classes from "../Headers/Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import JWTContext from '../../context/JWTContext';

const Accounts = () => {
  const [openProfile, setopenProfile] = useState(null);
  
  const { state, logout } = useContext(JWTContext);
  const { isLoggedIn, user } = state;
  const navigate = useNavigate(); 
  const open = Boolean(openProfile);
  const handleProfileClick = (event) => {
    setopenProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setopenProfile(null);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from JWTContext
      navigate(`/`, { replace: true }); // Redirect to the home page after logging out
    } catch (err) {
      console.error("Logout failed:", err); // Handle errors during logout
    }
  };

  const profileMenu = [
    {
      to: "/",
      icon: <LogoutOutlined />,
      text: "Logout",
      onClick: handleLogout, // Attach the logout function here
    },
  ];

  return (
    <>
      <Tooltip title="Account Details" arrow>
        <div
          onClick={handleProfileClick}
          className={`${classes.accountBtn}`}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <UserOutlined className={`${classes.userIconSize}`} />
          <div className={`${classes.userSeparate}`}>
            {isLoggedIn && <span className={`${classes.userName}`}>{user.name}</span>}
            {isLoggedIn && <span className={`${classes.userName}`}>{user.email}</span>}
          </div>
        </div>
      </Tooltip>

      <Menu
        anchorEl={openProfile}
        id="account-menu"
        open={open}
        onClick={handleProfileClose}
        onClose={handleProfileClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "200px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {profileMenu.map((item, index) => (
          <MenuItem key={index} className="menuHover !p-0" onClick={item.onClick}>
            <Link to={item.to} className={`${classes.menuLink}`}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <span className={`${classes.menuName}`}>{item.text}</span>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Accounts;
