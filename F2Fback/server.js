const express = require ("express"); // Import Express framework
const mongoose = require('mongoose');
var cors = require('cors') // Import CORS middleware to enable cross-origin requests
const app = express(); // Create an instance of Express
const db = require('./db');
require('dotenv').config();
const path = require('path');


const commodityRoutes = require('./routes/commodityRoutes');
const enquiryform = require('./routes/enquiryRoutes');
const authRoutes= require("./routes/authRoutes");
// Middleware to handle CORS
app.use(cors()) // Allow all origins by default

// Additional CORS configuration
app.use(
	cors({
		origin:"http://localhost:5173", // Allow requests from this origin (adjust the URL as per your frontend)
		credentials:true, // Allow credentials (cookies, authorization headers) to be included in requests
	})
)


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