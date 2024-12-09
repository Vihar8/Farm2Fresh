import { AppBar, Button, Toolbar } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="inherit" className="shadow-md">
    <Toolbar className="flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <MenuIcon className="cursor-pointer" />
        <h1 className="text-lg font-bold text-green-600">
          Farm<span className='text-black'>2</span><span className="text-green-600">Fresh</span>
        </h1>
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-4">
        <Button color="inherit">Sellers</Button>
        <Button color="inherit">Buyers</Button>
        <Button color="inherit">Mandi Prices</Button>
        <Button color="inherit">Pricing</Button>
        <Button color="inherit">More</Button>
      </div>

      {/* Language and Login */}
      <div className="flex space-x-4 items-center">
        <Link to='userlogin' className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded uppercase">
          Login
        </Link>
        <Link to='commoditylisting' className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded uppercase">
          Sell / Buy
        </Link>
      </div>
    </Toolbar>
  </AppBar>
);
}

export default Navbar
