import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import classes from "./SidebarMenu.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, Tooltip, tooltipClasses } from "@mui/material";
import brandIcon from "/assets/adminIcons/brandIcon.svg";
import appIcon from "/assets/adminIcons/appIcon.svg";

const dashboardMenu = [
  {
    menusName: "Dashboard",
    path: "dashboard",
    icons: <img src={brandIcon} className={`${classes.iconSize}`} />,
  },
  {
    menusName: "enquiry",
    path: "enquiry",
    icons: <img src={appIcon} className={`${classes.iconSize}`} />,
  },
];


const SidebarMenu = ({ menuCollapse }) => {
  const [toggled, setToggled] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    label: ({ open }) => ({
      fontWeight: open ? 700 : undefined,
    }),
  };

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgba(239, 135, 17, 1)",
      color: "#ffffff",
      boxShadow: theme.shadows[1],
      fontSize: 14,
      padding: "5px 15px",
    },
  }));

  const handleSubMenuClick = (menuName) => {
    setOpenSubMenu(openSubMenu === menuName ? null : menuName); // Toggle submenu
  };

  return (
    <div className={`${classes.sidebarSection}`}>
      <Sidebar
        className={`${classes.sidebarMain} ${menuCollapse ? "sidebarCollapse" : "sidebarNotCollapse"}`}
        collapsed={menuCollapse}
        toggled={toggled}
        width={menuCollapse ? "76px" : "205px"}
        onBackdropClick={() => setToggled(false)}
        breakPoint="sm"
      >
        <div className={`${classes.sidebarCard}`}>
          <Menu menuItemStyles={menuItemStyles}>
            {/* Dashboard menu */}
            {menuCollapse ? (
              <>
                {dashboardMenu.map((item, index) => (
                  <LightTooltip key={index} title={item.menusName} placement="right">
                    <MenuItem
                      icon={item.icons}
                      onClick={() => navigate(`/${item.path}`)}
                      className={`sidebarsMenu sidebarHideSubMenu ${currentPath === `/${item.path}` ? "activeMainMenuItem" : ""}`}
                    >
                      {item.menusName}
                    </MenuItem>
                  </LightTooltip>
                ))}
              </>
            ) : (
              <>
                {dashboardMenu.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => navigate(`/${item.path}`)}
                    icon={item.icons}
                    className={`sidebarsMenu ${currentPath === `/${item.path}` ? "activeMainMenuItem" : ""}`}
                  >
                    {item.menusName}
                  </MenuItem>
                ))}
              </>
            )}

      </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
