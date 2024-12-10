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
       <img className='w-14' src='./f2f.jpg' alt='logo'/>
        <h1 className="text-lg font-bold text-greenCustom">
          Farm<span className='text-black'>2</span><span className="text-greenCustom">Fresh</span>
        </h1>
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-4">
        <Button color="inherit">Sellers</Button>
        <Button color="inherit">Buyers</Button>
        <Button color="inherit">Mandi Prices</Button>
        <Button color="inherit">Pricing</Button>

      </div>

      {/* Language and Login */}
      <div className="flex space-x-4 items-center">
        <Link to='userlogin' className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded uppercase">
          Login
        </Link>
        <Link to='commoditylisting' className="bg-greenCustom hover:bg-green-700 text-white font-medium py-2 px-4 rounded uppercase">
          Sell / Buy
        </Link>
      </div>
    </Toolbar>
  </AppBar>
);
}

export default Navbar
