// import { AppBar, Button, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import JWTContext from '../context/JWTContext'; // Update the path as per your folder structure

// const Navbar = () => {
//   const { state, logout } = useContext(JWTContext); // Access state and logout from JWTContext
//   const { isLoggedIn, user } = state; // Destructure the state
//   const [anchorEl, setAnchorEl] = useState(null); // Manage the profile menu state

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar position="static" color="inherit" className="shadow-md">
//       <Toolbar className="flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <img className="w-32" src="./f2f.jpg" alt="logo" />
//           <h1 className="text-lg font-bold text-greenCustom">
//             Farm<span className="text-black">2</span><span className="text-greenCustom">Fresh</span>
//           </h1>
//         </div>

//         {/* Links */}
//         <div className="hidden md:flex space-x-4">
//           <Button color="inherit">Sellers</Button>
//           <Button color="inherit">Buyers</Button>
//           <Button color="inherit">Mandi Prices</Button>
//           <Button color="inherit">Pricing</Button>
//         </div>

//         {/* Login/Profile */}
//         <div className="flex space-x-4 items-center">
//           {!isLoggedIn ? (
//             <Link
//               to="/"
//               className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded uppercase"
//             >
//               Login
//             </Link>
//           ) : (
//             <>
//               <IconButton onClick={handleMenuOpen} color="inherit">
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//               >
//                 { user && <MenuItem onClick={handleMenuClose}>Hello, {user?.name}</MenuItem>}
//                 <MenuItem onClick={logout}>Logout</MenuItem>
//               </Menu>
//             </>
//           )}
//           <Link
//             to="commoditylisting"
//             className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded uppercase"
//           >
//             Sell / Buy
//           </Link>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;


import { AppBar, Button, Toolbar, IconButton, Menu, MenuItem, Drawer, Divider, List, ListItem, ListItemText, Avatar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import JWTContext from '../context/JWTContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { state, logout } = useContext(JWTContext);
  const { isLoggedIn, user } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <AppBar position="static" color="inherit" className="shadow-md">
      <Toolbar className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/home"> <div className="flex items-center space-x-2">
         <img className="w-32" src="./f2f.jpg" alt="logo" />
          <h1 className="text-lg font-bold text-greenCustom">
            Farm<span className="text-black">2</span><span className="text-greenCustom">Fresh</span>
          </h1>
        </div></Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/sellers" className="text-black hover:text-greenCustom font-medium">
            Sellers
          </Link>
          <Link to="/buyers" className="text-black hover:text-greenCustom font-medium">
            Buyers
          </Link>
          <Link to="/mandi-prices" className="text-black hover:text-greenCustom font-medium">
            Mandi Prices
          </Link>
        </div>


        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <IconButton onClick={handleDrawerToggle} color="inherit">
            {openMenu ? <FaTimes /> : <FaBars />} {/* Toggle between hamburger and close icons */}
          </IconButton>
        </div>

        {/* Login/Profile */}
        <div className="flex space-x-4 items-center">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded uppercase"
            >
              Login
            </Link>
          ) : (
            <>
              <div className="hidden md:block"> {/* Hide profile icon on mobile */}
                <IconButton onClick={handleMenuOpen} color="inherit">
                  {user?.profilePic ? (
                    <Avatar alt={user?.name} src={user?.profilePic} /> // Show profile pic if available
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                { user && <MenuItem onClick={handleMenuClose}>Hello, {user?.name}</MenuItem>}
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          )}
          <Link
            to="/commoditylisting"
            className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded uppercase"
          >
            Sell / Buy
          </Link>
        </div>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={openMenu}
        onClose={handleDrawerToggle}
        className="md:hidden"
        transitionDuration={300} // Smooth transition for drawer
      >
        <div className="flex flex-col p-4 bg-white space-y-14 w-96">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 ">
              {user?.profilePic ? (
                <Avatar alt={user?.name} src={user?.profilePic} />
              ) : (
                <AccountCircle />
              )}
              <p className="text-xl text-black font-semibold">{user?.name || 'Guest'}</p>
            </div>
            <IconButton onClick={handleDrawerToggle}>
              <FaTimes />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/sellers" onClick={handleDrawerToggle}>
              <ListItemText primary="Sellers" />
            </ListItem>
            <ListItem button component={Link} to="/buyers" onClick={handleDrawerToggle}>
              <ListItemText primary="Buyers" />
            </ListItem>
            <ListItem button component={Link} to="/mandi-prices" onClick={handleDrawerToggle}>
              <ListItemText primary="Mandi Prices" />
            </ListItem>
          </List>

          {/* Login/Profile in mobile view */}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded uppercase text-center"
              onClick={handleDrawerToggle}
            >
              Login
            </Link>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded uppercase text-center"
                onClick={() => { logout(); handleDrawerToggle(); }}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
