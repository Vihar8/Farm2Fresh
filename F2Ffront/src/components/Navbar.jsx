// // import { AppBar, Button, Toolbar, IconButton, Menu, MenuItem, Drawer, Divider, List, ListItem, ListItemText, Avatar } from '@mui/material';
// // import AccountCircle from '@mui/icons-material/AccountCircle';
// // import React, { useContext, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import JWTContext from '../context/JWTContext';
// // import { FaBars, FaTimes } from 'react-icons/fa';

// // const Navbar = () => {
// //   const { state, logout } = useContext(JWTContext);
// //   const { isLoggedIn, user } = state;
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const [openMenu, setOpenMenu] = useState(false);

// //   const handleMenuOpen = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const handleDrawerToggle = () => {
// //     setOpenMenu(!openMenu);
// //   };

// //   return (
// //     <AppBar position="static" color="inherit" className="shadow-md">
// //       <Toolbar className="flex justify-between items-center px-4">
// //         {/* Logo */}
// //         <Link to="/home" className="flex-shrink-0">
// //           <div className="flex items-center -space-x-2">
// //             <img className="w-20 md:w-28" src="./f2f.jpg" alt="logo" />
// //             <h1 className="text-lg font-bold text-greenCustom mt-2">
// //               Farm<span className="text-black">2</span><span className="text-greenCustom">Fresh</span>
// //             </h1>
// //           </div>
// //         </Link>

// //         {/* Desktop Links */}
// //         <div className="hidden md:flex space-x-4">
// //           <Link to="/my-listing" className="text-black hover:text-greenCustom font-medium">
// //             My Listing
// //           </Link>
// //           <Link to="/sellers" className="text-black hover:text-greenCustom font-medium">
// //             Sellers
// //           </Link>
// //           <Link to="/buyers" className="text-black hover:text-greenCustom font-medium">
// //             Buyers
// //           </Link>
// //           <Link to="/mandi-prices" className="text-black hover:text-greenCustom font-medium">
// //             Mandi Prices
// //           </Link>
// //         </div>

// //         {/* Desktop Login/Profile and Sell/Buy */}
// //         <div className="hidden md:flex space-x-4 items-center">
// //           {!isLoggedIn ? (
// //             <Link
// //               to="/login"
// //               className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
// //             >
// //               Login/Register
// //             </Link>
// //           ) : (
// //             <>
// //               <IconButton onClick={handleMenuOpen} color="inherit">
// //                 {user?.profilePic ? (
// //                   <Avatar alt={user?.name} src={user?.profilePic} />
// //                 ) : (
// //                   <AccountCircle />
// //                 )}
// //                 </IconButton>
// //                 <Menu
// //                   anchorEl={anchorEl}
// //                   open={Boolean(anchorEl)}
// //                   onClose={handleMenuClose}
// //                 >
// //                   {user && <MenuItem onClick={handleMenuClose}>Hello, {user?.name}</MenuItem>}
// //                   {user && <MenuItem onClick={handleMenuClose}>{user?.email}</MenuItem>}
// //                   <div className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-1 px-4 rounded block ml-3 w-[90%]"
// //                   >
// //                     <MenuItem
// //                       onClick={logout}
// //                     >
// //                       Logout
// //                     </MenuItem>
// //                   </div>
// //                 </Menu>
// //               </>
// //           )}
// //           <Link
// //             to="/commoditylisting"
// //             className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
// //           >
// //             Sell / Buy
// //           </Link>
// //         </div>

// //         {/* Mobile Login and Menu */}
// //         <div className="md:hidden flex items-center space-x-1 mt-2">
// //           {!isLoggedIn ? (
// //             <Link
// //               to="/login"
// //               className="bg-greenCustom hover:bg-green-700 text-white font-medium py-1.5 px-3 rounded text-sm"
// //             >
// //               Login/Register
// //             </Link>
// //           ) : (
// //             <IconButton color="inherit">
// //               {user?.profilePic &&
// //                 <Avatar alt={user?.name} src={user?.profilePic} sx={{ width: 32, height: 32 }} />
// //               }
// //             </IconButton>
// //           )}
// //           <IconButton onClick={handleDrawerToggle} color="inherit">
// //             {openMenu ? <FaTimes /> : <FaBars />}
// //           </IconButton>
// //         </div>

// //         {/* Mobile Drawer */}
// //         <Drawer
// //           anchor="right"
// //           open={openMenu}
// //           onClose={handleDrawerToggle}
// //           className="md:hidden"
// //           transitionDuration={300}
// //         >
// //           <div className="flex flex-col p-4 bg-white space-y-8 w-72">
// //             {/* Close icon for both logged-in and non-logged-in states */}
// //             <div className="flex items-center justify-between">
// //               {isLoggedIn ? (
// //                 <div className="flex items-center space-x-3">
// //                   {user?.profilePic ? (
// //                     <Avatar alt={user?.name} src={user?.profilePic} />
// //                   ) : (
// //                     <AccountCircle />
// //                   )}
// //                   <div className='flex-col justify-center'>
// //                     <p className="text-lg text-black font-semibold">{user?.name || 'Guest'}</p>
// //                     <p className="text-sm text-black">{user?.email || ''}</p>
// //                   </div>
// //                 </div>
// //               ) :(
// //                   <>
// //                     <AccountCircle />
// //                     <div className='flex-col justify-center'>
// //                       <p className="text-lg text-black font-semibold">Guest</p>
// //                     </div>
// //                   </>
// //                 )}
// //               <IconButton onClick={handleDrawerToggle}>
// //                 <FaTimes />
// //               </IconButton>
// //             </div>
// //             <Divider />
// //             <List>
// //               <ListItem button component={Link} to="/my-listing" onClick={handleDrawerToggle}>
// //                 <ListItemText primary="My Listing" />
// //               </ListItem>
// //               <ListItem button component={Link} to="/sellers" onClick={handleDrawerToggle}>
// //                 <ListItemText primary="Sellers" />
// //               </ListItem>
// //               <ListItem button component={Link} to="/buyers" onClick={handleDrawerToggle}>
// //                 <ListItemText primary="Buyers" />
// //               </ListItem>
// //               <ListItem button component={Link} to="/mandi-prices" onClick={handleDrawerToggle}>
// //                 <ListItemText primary="Mandi Prices" />
// //               </ListItem>
// //               <ListItem className="p-0">
// //                 <Link
// //                   to="/commoditylisting"
// //                   className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-center block w-full"
// //                 >
// //                   Sell / Buy
// //                 </Link>
// //               </ListItem></List>
// //             {isLoggedIn && (
// //               <>
// //                 <Divider />
// //                 <div className="flex flex-col space-y-2 ">
// //            <Link
// //                 to="/home"
// //                 className="bg-orange-600  hover:bg-orange-700 text-white font-medium py-2 ml-5 rounded text-center block w-56"
// //                 onClick={() => { logout(); handleDrawerToggle(); }}
// //               >
// //                 Logout
// //               </Link>
// //             </div>
// //               </>
// //             )}
// //           </div>
// //         </Drawer>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default Navbar;


// import { AppBar, Button, Toolbar, IconButton, Menu, MenuItem, Drawer, Divider, List, ListItem, ListItemText, Avatar } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import JWTContext from '../context/JWTContext';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { FiLogIn, FiLogOut } from 'react-icons/fi'; // Added import for login/logout icons

// const Navbar = () => {
//   const { state, logout } = useContext(JWTContext);
//   const { isLoggedIn, user } = state;
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openMenu, setOpenMenu] = useState(false);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDrawerToggle = () => {
//     setOpenMenu(!openMenu);
//   };

//   return (
//     <AppBar position="static" color="inherit" className="shadow-md">
//       <Toolbar className="flex justify-between items-center px-4">
//         {/* Logo */}
//         <Link to="/home" className="flex-shrink-0">
//           <div className="flex items-center -space-x-2">
//             <img className="w-20 md:w-28" src="./f2f.jpg" alt="logo" />
//             <h1 className="text-lg font-bold text-greenCustom mt-2">
//               Farm<span className="text-black">2</span><span className="text-greenCustom">Fresh</span>
//             </h1>
//           </div>
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-4">
//           <Link to="/my-listing" className="text-black hover:text-greenCustom font-medium">
//             My Listing
//           </Link>
//           <Link to="/sellers" className="text-black hover:text-greenCustom font-medium">
//             Sellers
//           </Link>
//           <Link to="/buyers" className="text-black hover:text-greenCustom font-medium">
//             Buyers
//           </Link>
//           <Link to="/mandi-prices" className="text-black hover:text-greenCustom font-medium">
//             Mandi Prices
//           </Link>
//         </div>

//         {/* Desktop Login/Profile and Sell/Buy */}
//         <div className="hidden md:flex space-x-4 items-center">
//           {!isLoggedIn ? (
//             <Link
//               to="/login"
//               className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex items-center gap-2"
//             >
//               <FiLogIn className="text-lg" /> Login/Register
//             </Link>
//           ) : (
//             <>
//               <IconButton onClick={handleMenuOpen} color="inherit">
//                 {user?.profilePic ? (
//                   <Avatar alt={user?.name} src={user?.profilePic} />
//                 ) : (
//                   <AccountCircle />
//                 )}
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                 >
//                   {user && <MenuItem onClick={handleMenuClose}>Hello, {user?.name}</MenuItem>}
//                   {user && <MenuItem onClick={handleMenuClose}>{user?.email}</MenuItem>}
//                   <div className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-1 px-4 rounded block ml-3 w-[90%]"
//                   >
//                     <MenuItem
//                       onClick={logout}
//                       className="flex items-center gap-2"
//                     >
//                       <FiLogOut className="text-lg" /> Logout
//                     </MenuItem>
//                   </div>
//                 </Menu>
//               </>
//           )}
//           <Link
//             to="/commoditylisting"
//             className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
//           >
//             Sell / Buy
//           </Link>
//         </div>

//         {/* Mobile Login and Menu */}
//         <div className="md:hidden flex items-center space-x-1 mt-2">
//           {!isLoggedIn ? (
//             <Link
//               to="/login"
//               className="bg-greenCustom hover:bg-green-700 text-white font-medium py-1.5 px-3 rounded text-sm flex items-center gap-2"
//             >
//               <FiLogIn className="text-lg" /> Login/Register
//             </Link>
//           ) : (
//             <IconButton color="inherit">
//               {user?.profilePic &&
//                 <Avatar alt={user?.name} src={user?.profilePic} sx={{ width: 32, height: 32 }} />
//               }
//             </IconButton>
//           )}
//           <IconButton onClick={handleDrawerToggle} color="inherit">
//             {openMenu ? <FaTimes /> : <FaBars />}
//           </IconButton>
//         </div>

//         {/* Mobile Drawer */}
//         <Drawer
//           anchor="right"
//           open={openMenu}
//           onClose={handleDrawerToggle}
//           className="md:hidden"
//           transitionDuration={300}
//         >
//           <div className="flex flex-col p-4 bg-white space-y-8 w-72">
//             {/* Close icon for both logged-in and non-logged-in states */}
//             <div className="flex items-center justify-between">
//               {isLoggedIn ? (
//                 <div className="flex items-center space-x-3">
//                   {user?.profilePic ? (
//                     <Avatar alt={user?.name} src={user?.profilePic} />
//                   ) : (
//                     <AccountCircle />
//                   )}
//                   <div className='flex-col justify-center'>
//                     <p className="text-lg text-black font-semibold">{user?.name || 'Guest'}</p>
//                     <p className="text-sm text-black">{user?.email || ''}</p>
//                   </div>
//                 </div>
//               ) :(
//                   <>
//                     <AccountCircle />
//                     <div className='flex-col justify-center'>
//                       <p className="text-lg text-black font-semibold">Guest</p>
//                     </div>
//                   </>
//                 )}
//               <IconButton onClick={handleDrawerToggle}>
//                 <FaTimes />
//               </IconButton>
//             </div>
//             <Divider />
//             <List>
//               <ListItem button component={Link} to="/my-listing" onClick={handleDrawerToggle}>
//                 <ListItemText primary="My Listing" />
//               </ListItem>
//               <ListItem button component={Link} to="/sellers" onClick={handleDrawerToggle}>
//                 <ListItemText primary="Sellers" />
//               </ListItem>
//               <ListItem button component={Link} to="/buyers" onClick={handleDrawerToggle}>
//                 <ListItemText primary="Buyers" />
//               </ListItem>
//               <ListItem button component={Link} to="/mandi-prices" onClick={handleDrawerToggle}>
//                 <ListItemText primary="Mandi Prices" />
//               </ListItem>
//               <ListItem className="p-0">
//                 <Link
//                   to="/commoditylisting"
//                   className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-center block w-full"
//                 >
//                   Sell / Buy
//                 </Link>
//               </ListItem></List>
//             {isLoggedIn && (
//               <>
//                 <Divider />
//                 <div className="flex flex-col space-y-2 ">
//            <Link
//                 to="/home"
//                 className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 ml-5 rounded text-center block w-56 flex items-center justify-center gap-2"
//                 onClick={() => { logout(); handleDrawerToggle(); }}
//               >
//                 <FiLogOut className="text-lg" /> Logout
//               </Link>
//             </div>
//               </>
//             )}
//           </div>
//         </Drawer>
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
import { FiLogIn, FiLogOut, FiShoppingCart, FiList, FiUsers, FiShoppingBag, FiDollarSign } from 'react-icons/fi'; // Added new icons

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
      <Toolbar className="flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/home" className="flex-shrink-0">
          <div className="flex items-center -space-x-2">
            <img className="w-[87px] md:w-32" src="/f2f.jpg" alt="logo" />
            <h1 className="text-lg font-bold text-greenCustom mt-2">
              Farm<span className="text-black">2</span><span className="text-greenCustom">Fresh</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/my-listing" className="text-black hover:text-greenCustom font-medium flex items-center gap-2">
            <FiList className="text-lg" /> My Listing
          </Link>
          <Link to="/sellers" className="text-black hover:text-greenCustom font-medium flex items-center gap-2">
            <FiUsers className="text-lg" /> Sellers
          </Link>
          <Link to="/buyers" className="text-black hover:text-greenCustom font-medium flex items-center gap-2">
            <FiShoppingBag className="text-lg" /> Buyers
          </Link>
          <Link to="/mandi-prices" className="text-black hover:text-greenCustom font-medium flex items-center gap-2">
            <FiDollarSign className="text-lg" /> Mandi Prices
          </Link>
        </div>

        {/* Desktop Login/Profile and Sell/Buy */}
        <div className="hidden md:flex space-x-4 items-center">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex items-center gap-2"
            >
              <FiLogIn className="text-lg" /> Login/Register
            </Link>
          ) : (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                {user?.profilePic ? (
                  <Avatar alt={user?.name} src={user?.profilePic} />
                ) : (
                  <AccountCircle />
                )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {user && <MenuItem onClick={handleMenuClose}>Hello, {user?.name} ({user?.user_type})</MenuItem>}
                  {user && <MenuItem onClick={handleMenuClose}>{user?.email}</MenuItem>}
                  <div className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-1 px-4 rounded block ml-3 w-[90%]"
                  >
                    <MenuItem
                      onClick={logout}
                      className="flex items-center gap-2"
                    >
                      <FiLogOut className="text-lg" /> Logout
                    </MenuItem>
                  </div>
                </Menu>
              </>
          )}
          <Link
            to="/commoditylisting"
            className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex items-center gap-2"
          >
            <FiShoppingCart className="text-lg" /> Sell / Buy
          </Link>
        </div>

        {/* Mobile Login and Menu */}
        <div className="md:hidden flex items-center space-x-1 mt-2">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-greenCustom hover:bg-green-700 text-white font-medium py-1.5 px-3 rounded text-sm flex items-center gap-2"
            >
              <FiLogIn className="text-lg" /> Login/Register
            </Link>
          ) : (
            <IconButton color="inherit">
              {user?.profilePic &&
                <Avatar alt={user?.name} src={user?.profilePic} sx={{ width: 32, height: 32 }} />
              }
            </IconButton>
          )}
          <IconButton onClick={handleDrawerToggle} color="inherit">
            {openMenu ? <FaTimes /> : <FaBars />}
          </IconButton>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={openMenu}
          onClose={handleDrawerToggle}
          className="md:hidden"
          transitionDuration={300}
        >
          <div className="flex flex-col p-4 bg-white space-y-8 w-72">
            {/* Close icon for both logged-in and non-logged-in states */}
            <div className="flex items-center justify-between">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {user?.profilePic ? (
                    <Avatar alt={user?.name} src={user?.profilePic} />
                  ) : (
                    <AccountCircle />
                  )}
                  <div className='flex-col justify-center'>
                    <p className="text-lg text-black font-semibold">{user?.name || 'Guest'} ({user?.user_type})</p>
                    <p className="text-sm text-black">{user?.email || ''}</p>
                  </div>
                </div>
              ) :(
                  <>
                    <AccountCircle />
                    <div className='flex-col justify-center'>
                      <p className="text-lg text-black font-semibold">Guest</p>
                    </div>
                </>
              )}
              <IconButton onClick={handleDrawerToggle}>
                <FaTimes />
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button component={Link} to="/my-listing" onClick={handleDrawerToggle} className="group">
                <FiList
                  className="group-hover:text-green-500 text-lg mr-2"
                />
                <ListItemText primary="My Listing"
                  className="group-hover:text-green-500"
                />
              </ListItem>
              <ListItem button component={Link} to="/sellers" onClick={handleDrawerToggle} className="group">
                <FiUsers
                  className="group-hover:text-green-500 text-lg mr-2" />
                <ListItemText primary="Sellers"
                  className="group-hover:text-green-500"
                />
              </ListItem>
              <ListItem button component={Link} to="/buyers" onClick={handleDrawerToggle} className="group">
                <FiShoppingBag className="group-hover:text-green-500 text-lg mr-2" />
                <ListItemText primary="Buyers"
                  className="group-hover:text-green-500"
                />
              </ListItem>
              <ListItem button component={Link} to="/mandi-prices" onClick={handleDrawerToggle} className="group">
                <FiDollarSign className="group-hover:text-green-500 text-lg mr-2" />
                <ListItemText primary="Mandi Prices"
                  className="group-hover:text-green-500"
                />
              </ListItem>
              <ListItem className="mt-3">
                <Link
                  to="/commoditylisting"
                  onClick={handleDrawerToggle}
                  className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-center w-full flex items-center justify-center gap-2"
                >
                  <FiShoppingCart className="text-lg" /> Sell / Buy
                </Link>
              </ListItem></List>
            {isLoggedIn && (
              <>
                <Divider />
                <div className="flex flex-col space-y-2 ">
           <Link
                to="/home"
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 ml-5 rounded text-center w-56 flex items-center justify-center gap-2"
                onClick={() => { logout(); handleDrawerToggle(); }}
              >
                <FiLogOut className="text-lg" /> Logout
              </Link>
            </div>
              </>
            )}
          </div>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;