const express = require ("express"); // Import Express framework
const mongoose = require('mongoose');
var cors = require('cors') // Import CORS middleware to enable cross-origin requests
const app = express(); // Create an instance of Express
const db = require('./db');
require('dotenv').config();
const path = require('path');
const allowedOrigins = ["http://localhost:5173", "https://farm2fresh-omega.vercel.app"];


const commodityRoutes = require('./routes/commodityRoutes');
const enquiryform = require('./routes/enquiryRoutes');
const authRoutes= require("./routes/authRoutes");
// Middleware to handle CORS
app.use(cors()) // Allow all origins by default

// Additional CORS configuration
app.use(
	cors({
	  origin: function (origin, callback) {
		// Allow requests with no origin (like mobile apps or curl requests)
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) {
		  return callback(null, true);
		} else {
		  return callback(new Error("Not allowed by CORS"));
		}
	  },
	  credentials: true, // Allow credentials
	})
  );

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/uploads', express.static('uploads')); 


// Use routes
app.use('/auth' , authRoutes);
app.use('/api', commodityRoutes);
app.use('/api/enquiryform', enquiryform);

// Start the server on port 3000
app.listen(PORT, () => {
    console.log(`server is on 3000`);
        
})